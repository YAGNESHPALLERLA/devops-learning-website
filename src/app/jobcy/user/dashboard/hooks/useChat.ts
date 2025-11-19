"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    _id?: string;
    name: string;
    email: string;
  };
  isRead: boolean;
  readAt?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'seen';
  deletedForSender?: boolean;
  deletedForEveryone?: boolean;
  createdAt: string;
}

interface Chat {
  id: string;
  otherParticipant: {
    id: string;
    name: string;
    email: string;
  };
  lastMessage: string;
  lastMessageTime: string;
}

export function useChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const fetchUnreadCountRef = useRef<(() => Promise<void>) | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    
    // Disable Socket.io if:
    // 1. No socket URL is configured
    // 2. Socket URL is undefined or empty
    // 3. We're trying to connect to the same domain (Next.js doesn't have Socket.io server)
    const isProduction = typeof window !== "undefined" && window.location.hostname !== "localhost";
    const currentHost = typeof window !== "undefined" ? window.location.origin : "";
    const shouldDisableSocket = !socketUrl || 
      (typeof socketUrl === "string" && socketUrl.trim() === "") ||
      (socketUrl && socketUrl.includes("localhost") && isProduction) ||
      (socketUrl === currentHost); // Don't try to connect to Next.js server
    
    if (shouldDisableSocket) {
      // Silently use REST API only - no console logs to avoid noise
      setIsConnected(false);
      return;
    }

    let newSocket: Socket | null = null;
    
    try {
      newSocket = io(socketUrl, {
        auth: {
          token: token
        },
        transports: ["polling", "websocket"],
        reconnection: false, // Disable auto-reconnection to avoid spam
        reconnectionAttempts: 0,
        timeout: 3000, // Shorter timeout
        autoConnect: true,
      });

      newSocket.on("connect", () => {
        console.log("Connected to chat server");
        setIsConnected(true);
        setError(null);
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      newSocket.on("connect_error", () => {
        // Silently fail - don't log errors to avoid console spam
        setIsConnected(false);
        // Close socket to prevent further connection attempts
        if (newSocket) {
          newSocket.close();
          newSocket = null;
        }
      });

      newSocket.on("new-message", (message: Message) => {
        setMessages(prev => [...prev, message]);
        // Refresh unread count when new message arrives
        if (fetchUnreadCountRef.current) {
          fetchUnreadCountRef.current();
        }
      });

      newSocket.on("user-typing", (data) => {
        console.log(`${data.userName} is typing...`);
      });

      newSocket.on("user-stop-typing", (data) => {
        console.log(`${data.userName} stopped typing`);
      });

      newSocket.on("message-error", (error) => {
        setError(error.error);
      });

      setSocket(newSocket);
    } catch {
      // Silently fail - use REST API fallback
      setIsConnected(false);
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  // Get all chats for the user
  const fetchChats = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${"/api/jobcy"}/chat/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChats(data.chats);
      } else {
        setError("Failed to fetch chats");
      }
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get or create a chat with a specific user
  const getOrCreateChat = useCallback(async (userId: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${"/api/jobcy"}/chat/chat/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Find the other participant (the one matching the userId we're chatting with)
        // Backend returns participants with _id field
        interface Participant {
          _id?: string;
          id?: string;
          name?: string;
          email?: string;
        }
        const otherParticipant = data.chat.participants.find((p: Participant) => p._id === userId || p.id === userId);
        const chat = {
          id: data.chat.id,
          otherParticipant: {
            id: otherParticipant?._id || otherParticipant?.id || userId,
            name: otherParticipant?.name || 'Unknown',
            email: otherParticipant?.email || ''
          },
          lastMessage: data.chat.lastMessage,
          lastMessageTime: data.chat.lastMessageTime
        };
        setCurrentChat(chat);
        return chat;
      } else {
        setError("Failed to create chat");
        return null;
      }
    } catch {
      setError("Network error");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get messages for a specific chat
  const fetchMessages = useCallback(async (chatId: string, markAsRead = false) => {
    if (!chatId) return;
    
    try {
      // Don't set loading for polling updates to avoid UI flicker
      if (!markAsRead) {
        setIsLoading(true);
      }
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await fetch(`${"/api/jobcy"}/chat/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const currentUserId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').id : null;
        
        const formattedMessages = data.messages.map((msg: Message) => ({
          ...msg,
          status: msg.isRead ? 'seen' : (msg.readAt ? 'delivered' : 'sent'),
          // Filter out messages deleted for sender
          ...(msg.deletedForSender && msg.sender.id === currentUserId ? { content: '[Message deleted]' } : {})
        }));
        
        // Only update if messages actually changed to avoid unnecessary re-renders
        setMessages(prev => {
          const prevIds = new Set(prev.map((m: Message) => m.id));
          const newIds = new Set(formattedMessages.map((m: Message) => m.id));
          const idsMatch = prevIds.size === newIds.size && 
                          [...prevIds].every(id => newIds.has(id));
          
          if (!idsMatch || prev.length !== formattedMessages.length) {
            return formattedMessages;
          }
          return prev;
        });
        
        // Mark unread messages as read
        if (markAsRead) {
          const unreadMessages = formattedMessages.filter((msg: Message) => 
            !msg.isRead && msg.sender.id !== currentUserId && msg.sender._id !== currentUserId
          );
          
          // Mark as read in parallel
          Promise.all(
            unreadMessages.map(msg => 
              fetch(`${"/api/jobcy"}/chat/messages/${msg.id}/read`, {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }).catch(err => console.error('Error marking message as read:', err))
            )
          );
        }
      } else {
        setError("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Network error");
    } finally {
      if (!markAsRead) {
        setIsLoading(false);
      }
    }
  }, []);

  // Send a message
  const sendMessage = async (content: string) => {
    if (!currentChat) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        return;
      }

      // Optimistically add message with 'sending' status
      const tempMessage: Message = {
        id: `temp-${Date.now()}`,
        content,
        sender: {
          id: JSON.parse(localStorage.getItem('user') || '{}').id || '',
          name: JSON.parse(localStorage.getItem('user') || '{}').name || 'You',
          email: JSON.parse(localStorage.getItem('user') || '{}').email || ''
        },
        isRead: false,
        status: 'sending',
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, tempMessage]);

      // Try Socket.IO first if available
      if (socket && isConnected) {
        socket.emit("send-message", {
          chatId: currentChat.id,
          content: content
        });
      } else {
        // Fallback to REST API
        const response = await fetch(`${"/api/jobcy"}/chat/messages/${currentChat.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (response.ok) {
          const data = await response.json();
          // Format message to match expected structure
          const formattedMessage: Message = {
            id: data.message.id?.toString() || data.message._id?.toString(),
            content: data.message.content,
            sender: {
              id: data.message.sender.id?.toString() || data.message.sender._id?.toString(),
              _id: data.message.sender.id?.toString() || data.message.sender._id?.toString(),
              name: data.message.sender.name,
              email: data.message.sender.email
            },
            isRead: data.message.isRead || false,
            status: 'sent',
            createdAt: data.message.createdAt || new Date().toISOString()
          };
          // Replace temp message with real one
          setMessages(prev => prev.map(msg => 
            msg.id === tempMessage.id ? formattedMessage : msg
          ));
          // Refresh messages to ensure consistency
          if (currentChat) {
            setTimeout(() => fetchMessages(currentChat.id, true), 1000);
          }
        } else {
          // Remove temp message on error
          setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
          setError("Failed to send message");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  // Delete a message
  const deleteMessage = async (messageId: string, deleteForEveryone: boolean) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        return;
      }

      const response = await fetch(`${"/api/jobcy"}/chat/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deleteForEveryone }),
      });

      if (response.ok) {
        if (deleteForEveryone) {
          setMessages(prev => prev.filter(msg => msg.id !== messageId));
        } else {
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, deletedForSender: true } : msg
          ));
        }
        // Refresh messages
        if (currentChat) {
          await fetchMessages(currentChat.id);
        }
      } else {
        setError("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Failed to delete message");
    }
  };

  // Join a chat room
  const joinChat = (chatId: string) => {
    if (socket) {
      socket.emit("join-chat", chatId);
    }
  };

  // Leave a chat room
  const leaveChat = (chatId: string) => {
    if (socket) {
      socket.emit("leave-chat", chatId);
    }
  };

  // Send typing indicator
  const sendTyping = (chatId: string) => {
    if (socket) {
      socket.emit("typing", { chatId });
    }
  };

  // Stop typing indicator
  const stopTyping = (chatId: string) => {
    if (socket) {
      socket.emit("stop-typing", { chatId });
    }
  };

  // Fetch unread message count across all chats
  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUnreadCount(0);
        return;
      }

      const currentUserId = localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user') || '{}').id 
        : null;
      
      if (!currentUserId) {
        setUnreadCount(0);
        return;
      }

      // Fetch all chats
      const chatsResponse = await fetch(`${"/api/jobcy"}/chat/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!chatsResponse.ok) {
        return;
      }

      const chatsData = await chatsResponse.json();
      const userChats = chatsData.chats || [];

      // Count unread messages across all chats
      let totalUnread = 0;

      for (const chat of userChats) {
        const chatId = chat._id?.toString() || chat.id?.toString();
        if (!chatId) continue;

        try {
          const messagesResponse = await fetch(`${"/api/jobcy"}/chat/messages/${chatId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (messagesResponse.ok) {
            const messagesData = await messagesResponse.json();
            const chatMessages = messagesData.messages || [];
            
            // Count unread messages (not read and not sent by current user)
            const unreadInChat = chatMessages.filter((msg: Message) => 
              !msg.isRead && 
              msg.sender.id !== currentUserId && 
              msg.sender._id !== currentUserId &&
              !msg.deletedForEveryone
            ).length;
            
            totalUnread += unreadInChat;
          }
        } catch (error) {
          console.error(`Error fetching messages for chat ${chatId}:`, error);
        }
      }

      setUnreadCount(totalUnread);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  }, []);

  // Store the function in a ref so it can be accessed in socket listeners
  useEffect(() => {
    fetchUnreadCountRef.current = fetchUnreadCount;
  }, [fetchUnreadCount]);

  // Poll for new messages when chat is active
  useEffect(() => {
    if (!currentChat) return;
    
    // Fetch immediately when chat changes
    fetchMessages(currentChat.id, true);
    
    // Then poll every 2 seconds for real-time updates
    const interval = setInterval(() => {
      fetchMessages(currentChat.id, true);
    }, 2000); // Poll every 2 seconds for better real-time feel
    
    return () => clearInterval(interval);
  }, [currentChat?.id]); // Only depend on chat ID to avoid re-creating interval

  // Fetch unread count on mount and periodically
  useEffect(() => {
    fetchUnreadCount();
    
    // Refresh unread count every 5 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  // Refresh unread count when messages are marked as read
  useEffect(() => {
    if (currentChat) {
      // Refresh count after a short delay to allow read status to update
      const timeout = setTimeout(() => {
        fetchUnreadCount();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [messages, currentChat, fetchUnreadCount]);

  return {
    socket,
    isConnected,
    chats,
    currentChat,
    messages,
    isLoading,
    error,
    unreadCount,
    fetchChats,
    getOrCreateChat,
    fetchMessages,
    sendMessage,
    deleteMessage,
    joinChat,
    leaveChat,
    sendTyping,
    stopTyping,
    setCurrentChat,
    setMessages,
    fetchUnreadCount
  };
}
