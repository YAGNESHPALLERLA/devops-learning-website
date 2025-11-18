"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Users, MessageCircle, Send, X, Sparkles, UserCheck, Clock, 
  CheckCircle, XCircle, Bell, Heart, Share2, MessageSquare, Image as ImageIcon,
  Video, FileText, MoreVertical, ThumbsUp, ThumbsDown, Edit2, Trash2
} from "lucide-react";
import ConnectionCard from "./ConnectionCard";
import { useChat } from "../hooks/useChat";

interface Connection {
  id: string | number;
  name: string;
  title?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  status?: "seeking" | "open" | "employed";
  connected?: boolean;
}

interface ConnectionRequest {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email?: string;
    professionalRole?: string;
    currentLocation?: string;
  };
  receiver?: {
    _id: string;
    name: string;
  };
  message?: string;
  status: string;
  createdAt: string;
}

interface ActualConnection {
  id: string;
  name: string;
  title?: string;
  location?: string;
  email?: string;
  connected: boolean;
  connectedAt?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    _id?: string;
    name: string;
    email: string;
  };
  isRead: boolean;
  createdAt: string;
}

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    title?: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  createdAt: string;
  commentsList?: Comment[];
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  likes: number;
  liked: boolean;
  createdAt: string;
}

interface ConnectTabProps {
  connections: Connection[];
  isDark?: boolean;
}

export default function ConnectTab({ connections, isDark = false }: ConnectTabProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [connectionsState, setConnectionsState] = useState<Connection[]>(connections);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [actualConnections, setActualConnections] = useState<ActualConnection[]>([]);
  const [activeTab, setActiveTab] = useState<'feed' | 'discover' | 'requests' | 'connections'>('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  
  // Real-time chat functionality
  const {
    isConnected,
    chats,
    currentChat,
    messages,
    isLoading,
    error: chatError,
    fetchChats,
    getOrCreateChat,
    fetchMessages,
    sendMessage,
    joinChat,
    sendTyping,
    stopTyping,
    setCurrentChat
  } = useChat();

  // Sync with prop changes
  React.useEffect(() => {
    setConnectionsState(connections);
  }, [connections]);

  // Fetch connection requests and actual connections
  const fetchConnectionData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const receivedRes = await fetch(`${"/api/jobcy"}/connections/received`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (receivedRes.ok) {
        const data = await receivedRes.json();
        setPendingRequests(data);
      }

      const sentRes = await fetch(`${"/api/jobcy"}/connections/sent`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (sentRes.ok) {
        const data = await sentRes.json();
        setSentRequests(data);
      }

      const connectionsRes = await fetch(`${"/api/jobcy"}/connections/connections`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (connectionsRes.ok) {
        const data = await connectionsRes.json();
        setActualConnections(data);
      }
    } catch (error) {
      console.error("Error fetching connection data:", error);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${"/api/jobcy"}/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Mock posts for demo
      setPosts([
        {
          id: "1",
          author: { id: "1", name: "John Doe", title: "Software Engineer" },
          content: "Excited to share that I've completed my AWS certification! Looking forward to applying these skills in my next project. #AWS #CloudComputing",
          likes: 24,
          comments: 5,
          shares: 3,
          liked: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          author: { id: "2", name: "Jane Smith", title: "Data Scientist" },
          content: "Just finished an amazing project on machine learning! The results exceeded our expectations. Grateful for the team's hard work.",
          likes: 18,
          comments: 8,
          shares: 2,
          liked: true,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
      ]);
    }
  };

  useEffect(() => {
    fetchConnectionData();
    fetchPosts();
    if (isConnected) {
      fetchChats();
    }
  }, [isConnected, fetchChats]);

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

  const isUserConnected = (userId: string | number) => {
    return actualConnections.some(conn => 
      conn.id?.toString() === userId?.toString()
    );
  };

  const hasPendingRequest = (userId: string | number) => {
    return pendingRequests.some(req => 
      req.sender._id?.toString() === userId?.toString()
    ) || sentRequests.some(req => 
      req.receiver?._id?.toString() === userId?.toString()
    );
  };

  const filteredConnections = connectionsState.filter((conn) => {
    const connected = isUserConnected(conn.id);
    if (connected) return false;
    const pending = hasPendingRequest(conn.id);
    if (pending) return false;
    const nameMatch = conn.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const titleMatch = conn.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || titleMatch;
  });

  const connectedConnections = actualConnections;

  const handleConnect = async (connection: Connection) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to send connection requests");
      return;
    }

    try {
      const response = await fetch(`${"/api/jobcy"}/connections/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: connection.id,
          message: `Hi ${connection.name}, I would like to connect with you!`
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Connection request sent to ${connection.name}!`);
        await fetchConnectionData();
      } else {
        alert(data.message || "Failed to send connection request");
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Failed to send connection request. Please try again.");
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${"/api/jobcy"}/connections/${requestId}/accept`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPendingRequests(prev => prev.filter(req => req._id !== requestId));
        await fetchConnectionData();
        await fetchChats();
        alert("✅ Connection request accepted!");
      } else {
        alert("Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${"/api/jobcy"}/connections/${requestId}/reject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPendingRequests(prev => prev.filter(req => req._id !== requestId));
        await fetchConnectionData();
        alert("Connection request rejected");
      } else {
        alert("Failed to reject request");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    }
  };

  const handleMessage = async (connection: Connection | ActualConnection) => {
    const isConnected = actualConnections.some(conn => conn.id.toString() === connection.id.toString());
    
    if (isConnected) {
      try {
        const chat = await getOrCreateChat(connection.id.toString());
        if (chat) {
          setSelectedConnection(connection as Connection);
          setCurrentChat(chat);
          joinChat(chat.id);
          await fetchMessages(chat.id);
          setShowChatModal(true);
        }
      } catch (error) {
        console.error("Error opening chat:", error);
        alert("Failed to open chat");
      }
    } else {
      alert("You can only message accepted connections");
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to create a post");
      return;
    }

    try {
      const response = await fetch(`${"/api/jobcy"}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newPostContent,
          image: newPostImage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the new post to the list
        setPosts([data, ...posts]);
        setNewPostContent("");
        setNewPostImage(null);
        setShowPostModal(false);
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("Failed to create post:", errorData);
        
        // Fallback: create post locally for demo purposes
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : { id: "current", name: "You" };
        
        const newPost: Post = {
          id: Date.now().toString(),
          author: { id: user.id || "current", name: user.name || "You", title: user.title },
          content: newPostContent,
          image: newPostImage || undefined,
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false,
          createdAt: new Date().toISOString(),
        };
        setPosts([newPost, ...posts]);
        setNewPostContent("");
        setNewPostImage(null);
        setShowPostModal(false);
        console.log("Post created locally (API unavailable)");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Fallback: create post locally for demo purposes
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { id: "current", name: "You" };
      
      const newPost: Post = {
        id: Date.now().toString(),
        author: { id: user.id || "current", name: user.name || "You", title: user.title },
        content: newPostContent,
        image: newPostImage || undefined,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setNewPostImage(null);
      setShowPostModal(false);
      console.log("Post created locally (network error)");
    }
  };

  const handleLikePost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const updatedPosts = posts.map(p => 
      p.id === postId 
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    );
    setPosts(updatedPosts);

    // API call would go here
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${"/api/jobcy"}/posts/${postId}/like`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId: string, comment: string) => {
    if (!comment.trim()) return;

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { id: "current", name: "You" };

    const newComment: Comment = {
      id: Date.now().toString(),
      author: { id: user.id || "current", name: user.name || "You" },
      content: comment,
      likes: 0,
      liked: false,
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = posts.map(p => 
      p.id === postId 
        ? { 
            ...p, 
            comments: p.comments + 1,
            commentsList: [...(p.commentsList || []), newComment]
          }
        : p
    );
    setPosts(updatedPosts);

    // API call would go here
    try {
      if (token) {
        await fetch(`${"/api/jobcy"}/posts/${postId}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ content: comment })
        });
      }
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Tabs */}
      <div className="mb-6 p-6 rounded-2xl bg-[#1a1a1a] border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Professional Network
              </h2>
              <p className="text-sm text-gray-400">
                Build meaningful connections
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-gray-700">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
              <span className="text-xs font-medium text-gray-300">
                {isConnected ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'feed'
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'discover'
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === 'discover'
                ? "bg-white/20"
                : "bg-gray-700"
            }`}>
              {filteredConnections.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'requests'
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Requests</span>
            {pendingRequests.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'requests'
                  ? "bg-white/20"
                  : "bg-orange-500 text-white animate-pulse"
              }`}>
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('connections')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'connections'
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Connected</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === 'connections'
                ? "bg-white/20"
                : "bg-gray-700"
            }`}>
              {connectedConnections.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* FEED TAB - LinkedIn Style */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Create Post Card */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColors("You")} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">Y</span>
                </div>
                <button
                  onClick={() => setShowPostModal(true)}
                  className="flex-1 text-left px-4 py-3 rounded-xl bg-[#0a0a0a] border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                >
                  Start a post...
                </button>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-sm">Photo</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                  <Video className="w-5 h-5" />
                  <span className="text-sm">Video</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">Document</span>
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
              <div key={post.id} className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColors(post.author.name)} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">
                        {post.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{post.author.name}</h3>
                      <p className="text-sm text-gray-400">{post.author.title || "Professional"}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(post.createdAt)}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{post.content}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="mt-4 rounded-xl w-full max-h-96 object-cover" />
                  )}
                </div>

                {/* Post Stats */}
                <div className="flex items-center justify-between py-3 border-t border-b border-gray-700 mb-3">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      post.liked
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`} />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button
                    onClick={() => {
                      const newSet = new Set(expandedComments);
                      if (newSet.has(post.id)) {
                        newSet.delete(post.id);
                      } else {
                        newSet.add(post.id);
                      }
                      setExpandedComments(newSet);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-all">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>

                {/* Comments Section */}
                {expandedComments.has(post.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {post.commentsList?.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${getGradientColors(comment.author.name)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-xs font-bold">
                              {comment.author.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-[#0a0a0a] rounded-xl p-3">
                              <p className="font-semibold text-white text-sm mb-1">{comment.author.name}</p>
                              <p className="text-gray-300 text-sm">{comment.content}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-1 ml-2">
                              <button className="text-xs text-gray-400 hover:text-blue-400">Like</button>
                              <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${getGradientColors("You")} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">Y</span>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                          if (input.value.trim()) {
                            handleComment(post.id, input.value);
                            input.value = "";
                          }
                        }}
                        className="flex-1 flex gap-2"
                      >
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          className="flex-1 px-4 py-2 rounded-xl bg-[#0a0a0a] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg shadow-blue-500/30 transition-all"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {posts.length === 0 && (
              <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">No posts yet</h3>
                <p className="text-gray-400 text-base max-w-md mx-auto mb-4">
                  Be the first to share something with your network!
                </p>
                <button
                  onClick={() => setShowPostModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg shadow-blue-500/30 transition-all"
                >
                  Create Your First Post
                </button>
              </div>
            )}
          </div>
        )}

        {/* DISCOVER TAB */}
        {activeTab === 'discover' && (
          <div>
            {/* Search Bar */}
            <div className="mb-6 relative bg-[#1a1a1a] rounded-xl border border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#0a0a0a] border border-gray-700">
                  <Search className="w-5 h-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search professionals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none text-base text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {filteredConnections.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {connections.length === 0 ? "No Professionals Available" : "No Results Found"}
                </h3>
                <p className="text-gray-400 text-base max-w-md mx-auto">
                  {connections.length === 0
                    ? "Be the first to grow your network. Check back soon for new connections!"
                    : "Try adjusting your search terms to discover more professionals"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredConnections.map((conn) => (
                  <ConnectionCard
                    key={conn.id}
                    connection={conn}
                    isDark={isDark}
                    onConnect={handleConnect}
                    onMessage={handleMessage}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div>
            {pendingRequests.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">No Pending Requests</h3>
                <p className="text-gray-400 text-base max-w-md mx-auto">
                  You are all caught up! No connection requests at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request, index) => (
                  <div
                    key={request._id}
                    className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-5 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 bg-gradient-to-br ${getGradientColors(request.sender.name)} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold text-lg">
                            {request.sender.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-lg mb-1 text-white">
                            {request.sender.name}
                          </h4>
                          <p className="text-sm text-gray-400 mb-2">
                            {request.sender.professionalRole || "Professional"} • {request.sender.currentLocation || "Location not specified"}
                          </p>
                          {request.message && (
                            <div className="p-3 rounded-xl mt-3 bg-[#0a0a0a] border border-gray-700">
                              <p className="text-sm text-gray-300 italic">
                                &ldquo;{request.message}&rdquo;
                              </p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(request.createdAt).toLocaleDateString()} at {new Date(request.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleAcceptRequest(request._id)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request._id)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#0a0a0a] border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONNECTIONS TAB */}
        {activeTab === 'connections' && (
          <div>
            {/* Search Bar */}
            <div className="mb-6 relative bg-[#1a1a1a] rounded-xl border border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#0a0a0a] border border-gray-700">
                  <Search className="w-5 h-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search your connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none text-base text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {connectedConnections.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <UserCheck className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">No Connections Yet</h3>
                <p className="text-gray-400 text-base max-w-md mx-auto mb-4">
                  Start building your professional network by sending connection requests!
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg shadow-blue-500/30 transition-all"
                >
                  Discover Professionals
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {connectedConnections
                  .filter((conn) => {
                    if (!searchQuery) return true;
                    return conn.name?.toLowerCase().includes(searchQuery.toLowerCase());
                  })
                  .map((conn) => (
                    <div
                      key={conn.id}
                      className="bg-[#1a1a1a] rounded-2xl border border-gray-700 p-5 hover:border-blue-500/50 hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => handleMessage(conn)}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${getGradientColors(conn.name)} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <span className="text-white font-bold text-lg">
                            {conn.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base mb-1 text-white truncate">
                            {conn.name}
                          </h4>
                          <p className="text-sm text-gray-400 truncate">
                            {conn.title || "Professional"}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMessage(conn);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Send Message
                      </button>
                      
                      {conn.connectedAt && (
                        <p className="text-xs text-gray-500 mt-3 text-center">
                          Connected {new Date(conn.connectedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => {
          setShowPostModal(false);
          setNewPostContent("");
          setNewPostImage(null);
        }}>
          <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Create a post</h3>
              <button
                onClick={() => {
                  setShowPostModal(false);
                  setNewPostContent("");
                  setNewPostImage(null);
                }}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColors("You")} rounded-xl flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">Y</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What do you want to talk about?"
                    className="w-full min-h-[150px] px-4 py-3 rounded-xl bg-[#0a0a0a] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                  {newPostImage && (
                    <div className="mt-4 relative">
                      <img src={newPostImage} alt="Post" className="rounded-xl w-full max-h-64 object-cover" />
                      <button
                        onClick={() => setNewPostImage(null)}
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-sm">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setNewPostImage(e.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                    newPostContent.trim()
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedConnection && (
        <ChatModal
          connection={selectedConnection}
          onClose={() => {
            setShowChatModal(false);
            setSelectedConnection(null);
          }}
          currentChat={currentChat}
          messages={messages}
          sendMessage={sendMessage}
          sendTyping={sendTyping}
          stopTyping={stopTyping}
          isLoading={isLoading}
          getGradientColors={getGradientColors}
        />
      )}
    </div>
  );
}

// Chat Modal Component
interface ChatModalProps {
  connection: Connection;
  onClose: () => void;
  currentChat: { id: string } | null;
  messages: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;
  sendTyping: (chatId: string) => void;
  stopTyping: (chatId: string) => void;
  isLoading: boolean;
  getGradientColors: (name: string) => string;
}

function ChatModal({ 
  connection, 
  onClose, 
  currentChat, 
  messages, 
  sendMessage, 
  sendTyping, 
  stopTyping, 
  isLoading,
  getGradientColors
}: ChatModalProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const getCurrentUserId = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user.id || user._id;
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
    return null;
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (newMessage.trim() && currentChat) {
      await sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleTyping = () => {
    if (currentChat && !isTyping) {
      setIsTyping(true);
      sendTyping(currentChat.id);
    }
  };

  const handleStopTyping = () => {
    if (currentChat && isTyping) {
      setIsTyping(false);
      stopTyping(currentChat.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 w-full max-w-2xl mx-4 h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Chat Header */}
        <div className="p-5 bg-[#0a0a0a] border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 bg-gradient-to-br ${getGradientColors(connection.name)} rounded-xl flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-lg">
                {connection.name ? connection.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {connection.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Active now</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-5 overflow-y-auto bg-[#0a0a0a]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-sm">
                Loading messages...
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400 text-center text-sm">
                No messages yet. <br />Start the conversation! 👋
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => {
                const currentUserId = getCurrentUserId();
                const isOwnMessage = msg.sender.id === currentUserId || msg.sender._id === currentUserId;
                return (
                  <div 
                    key={msg.id} 
                    className={`mb-4 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`px-4 py-3 rounded-2xl shadow-md ${
                        isOwnMessage 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md' 
                          : 'bg-[#1a1a1a] text-white rounded-bl-md border border-gray-700'
                      }`}>
                        <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5 px-1">
                        <p className="text-xs text-gray-500">
                          {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        {isOwnMessage && (
                          <span className="text-xs text-blue-400">✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 bg-[#1a1a1a]">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyUp={handleStopTyping}
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none bg-[#0a0a0a] border-gray-700 focus:border-blue-500 text-white placeholder:text-gray-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${
                newMessage.trim()
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
