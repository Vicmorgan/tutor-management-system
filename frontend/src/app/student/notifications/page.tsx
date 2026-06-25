'use client';
import React from 'react';
import { useMyNotifications, useMarkNotificationRead } from '@/hooks/useApi';

export default function StudentNotificationsPage() {
  const { data: notifications, isLoading } = useMyNotifications();
  const markRead = useMarkNotificationRead();

  const handleMarkRead = (id: number) => {
    markRead.mutate(id);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Notifications</h1>
        <p className="text-sm text-on-surface-variant mt-1">Updates on your tutor assignments.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading notifications...</div>
        ) : notifications?.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">notifications_off</span>
            You are all caught up!
          </div>
        ) : notifications?.map((n: any) => (
          <div key={n.id} className={`p-5 rounded-2xl border transition-colors flex gap-4 ${n.is_read ? 'bg-surface-container-lowest border-outline-variant' : 'bg-surface border-primary shadow-sm'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${n.is_read ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary-container text-primary'}`}>
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-bold ${!n.is_read ? 'text-on-surface text-base' : 'text-on-surface-variant text-sm'}`}>{n.title}</h3>
                <span className="text-xs text-on-surface-variant">{new Date(n.created_at).toLocaleString()}</span>
              </div>
              <p className={`mt-1 ${!n.is_read ? 'text-on-surface text-sm' : 'text-on-surface-variant text-xs'}`}>{n.message}</p>
              
              {!n.is_read && (
                <button 
                  onClick={() => handleMarkRead(n.id)}
                  disabled={markRead.isPending}
                  className="mt-3 text-xs font-bold text-primary hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
