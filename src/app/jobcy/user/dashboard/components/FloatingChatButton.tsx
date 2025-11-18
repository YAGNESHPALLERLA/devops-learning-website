"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { useChat } from "../hooks/useChat";

interface ConnectedUser {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
}

interface FloatingChatButtonProps {
  isDark?: boolean;
}

export default function FloatingChatButton({ isDark = false }: FloatingChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [loading, setLoading] = useState(false);
  
  const {
    getOrCreateChat,
    setCurrentChat,
    joinChat,
    fetchMessages,
  } = useChat();

  useEffect(() => {
    fetchConnectedUsers();
  }, []);

  // Listen for connection accepted event to refresh list
  useEffect(() => {
    const handleConnectionAccepted = () => {
      fetchConnectedUsers();
    };
    window.addEventListener('connectionAccepted', handleConnectionAccepted);
    return () => {
      window.removeEventListener('connectionAccepted', handleConnectionAccepted);
    };
  }, []);

  const fetchConnectedUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);
      const response = await fetch(`${"/api/jobcy"}/connections/connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConnectedUsers(data);
      }
    } catch (error) {
      console.error("Error fetching connected users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChat = async (user: ConnectedUser) => {
    try {
      const chat = await getOrCreateChat(user.id.toString());
      if (chat) {
        setCurrentChat(chat);
        joinChat(chat.id);
        await fetchMessages(chat.id);
        // Dispatch event to open chat modal in ConnectTab
        window.dispatchEvent(new CustomEvent('openChat', { detail: { user } }));
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error opening chat:", error);
      alert("Failed to open chat");
    }
  };

  const getGradientColors = (name: string) => {
    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-emerald-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600",
      "from-violet-500 to-purple-600",
      "from-amber-500 to-orange-600",
      "from-teal-500 to-cyan-600",
    ];
    const index = name ? name.length % gradients.length : 0;
    return gradients[index];
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-110 text-white"
          title="Chat with connections"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>

        {/* Chat List Panel */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 bg-[#0a0a0a] border-b border-gray-700 flex items-center justify-between">
              <h3 className="font-bold text-white">Chat with Connections</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              ) : connectedUsers.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No connections yet</p>
                  <p className="text-sm mt-1">Connect with people to start chatting</p>
                </div>
              ) : (
                <div className="p-2">
                  {connectedUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleOpenChat(user)}
                      className="w-full p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-3 text-left"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${getGradientColors(user.name)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.title || "Professional"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

