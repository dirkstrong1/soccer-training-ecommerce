'use client';

import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { NotificationService } from '@/services/notificationService';

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchUnreadCount();
    fetchNotifications();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const count = await NotificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const notifications = await NotificationService.getNotifications('UNREAD');
      setNotifications(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await NotificationService.markAsRead(notificationId);
      fetchUnreadCount();
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No unread notifications</p>
            ) : (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark as read
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 