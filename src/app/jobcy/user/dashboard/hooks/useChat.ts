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

    // Disable Socket.IO for now since we don't have a Socket.IO server
    // const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "https://jobcy-job-portal.vercel.app", {
    //   auth: {
    //     token: token
    //   }
    // });
    
    // Mock socket connection for now - disable Socket.IO to prevent 404 errors
    console.log("Socket.IO disabled - using mock connection");
    setIsConnected(true);
    setSocket(null);

    return () => {
      // No cleanup needed for mock socket
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
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token");
        return;
      }

      // Send via REST API
      const response = await fetch(`/api/jobcy/chat/messages/${currentChat.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Message sent successfully:", data);
        
        // Add the message to local state immediately for better UX
        const newMessage = {
          id: data.message.id,
          content: data.message.content,
          sender: data.message.sender,
          isRead: data.message.isRead,
          createdAt: data.message.createdAt
        };
        
        setMessages(prev => [...prev, newMessage]);
      } else {
        const errorData = await response.json();
        console.error("Failed to send message:", errorData);
        setError("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    } finally {
      setIsLoading(false);
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
