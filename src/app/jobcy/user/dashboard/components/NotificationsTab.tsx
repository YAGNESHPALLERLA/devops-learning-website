"use client";

import React, { useState, useEffect } from "react";
import { Bell, Clock, XCircle, Briefcase, Eye, CheckCircle } from "lucide-react";

interface Notification {
  _id: string;
  type: "application_status" | "interview_scheduled" | "job_update";
  title: string;
  message: string;
  relatedJob?: {
    _id: string;
    title: string;
  };
  isRead: boolean;
  createdAt: string;
}

interface NotificationsTabProps {
  isDark?: boolean;
}

export default function NotificationsTab({ isDark: _isDark = false }: NotificationsTabProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view notifications");
        setLoading(false);
        return;
      }

      const response = await fetch(`${"/api/jobcy"}/user/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Normalize to array
        const items = Array.isArray(data) ? data : (data.items || data.notifications || []);
        setNotifications(items);
        setError("");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || `Failed to load notifications (${response.status})`);
        
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/jobcy/user/auth/login";
        }
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Unable to load notifications. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${"/api/jobcy"}/user/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(notif =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application_status":
        return <Briefcase className="w-5 h-5 text-[#0A66C2]" />;
      case "interview_scheduled":
        return <Clock className="w-5 h-5 text-green-600" />;
      case "job_update":
        return <Bell className="w-5 h-5 text-indigo-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#0A66C2]/20 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-[#0A66C2] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Error Loading Notifications</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchNotifications}
          className="px-6 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-colors font-semibold shadow-sm hover:shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Notifications
          </h2>
          <p className="text-gray-600">
            Stay updated with your application status
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-[#0A66C2] rounded-full text-sm font-semibold border border-blue-200">
            <Bell className="w-4 h-4" />
            <span>{unreadCount} unread</span>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gray-100">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-900">
              No notifications yet
            </h3>
            <p className="text-gray-600">
              You will receive notifications when HR updates your applications
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`relative p-6 rounded-xl border transition-all ${
                notification.isRead
                  ? "bg-white border-gray-200"
                  : "bg-blue-50 border-blue-200 ring-2 ring-blue-500/20"
              } hover:shadow-md`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${
                  notification.isRead ? "bg-gray-100" : "bg-blue-100"
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-gray-700">
                        {notification.message}
                      </p>
                      {notification.relatedJob && (
                        <p className="mt-2 text-sm text-gray-600">
                          Related to: <span className="font-medium text-[#0A66C2]">{notification.relatedJob.title}</span>
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="ml-4 p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600"
                        title="Mark as read"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {!notification.isRead && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-[#0A66C2] rounded-full"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
