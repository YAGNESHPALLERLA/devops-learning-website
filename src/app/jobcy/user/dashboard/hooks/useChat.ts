"use client";
import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
  isRead: boolean;
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
  const fetchMessages = useCallback(async (chatId: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${"/api/jobcy"}/chat/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
      } else {
        setError("Failed to fetch messages");
      }
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = async (content: string) => {
    if (!currentChat) return;

    try {
      // Try Socket.IO first if available
      if (socket && isConnected) {
        socket.emit("send-message", {
          chatId: currentChat.id,
          content: content
        });
      } else {
        // Fallback to REST API
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated");
          return;
        }

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
          const formattedMessage = {
            id: data.message.id?.toString() || data.message._id?.toString(),
            content: data.message.content,
            sender: {
              id: data.message.sender.id?.toString() || data.message.sender._id?.toString(),
              _id: data.message.sender.id?.toString() || data.message.sender._id?.toString(),
              name: data.message.sender.name,
              email: data.message.sender.email
            },
            isRead: data.message.isRead || false,
            createdAt: data.message.createdAt || new Date().toISOString()
          };
          // Add message to local state
          setMessages(prev => [...prev, formattedMessage]);
          // Refresh messages to ensure consistency
          if (currentChat) {
            await fetchMessages(currentChat.id);
          }
        } else {
          setError("Failed to send message");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
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

  return {
    socket,
    isConnected,
    chats,
    currentChat,
    messages,
    isLoading,
    error,
    fetchChats,
    getOrCreateChat,
    fetchMessages,
    sendMessage,
    joinChat,
    leaveChat,
    sendTyping,
    stopTyping,
    setCurrentChat,
    setMessages
  };
}
