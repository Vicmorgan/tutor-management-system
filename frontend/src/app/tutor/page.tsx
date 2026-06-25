'use client';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMyAssignments, useMyNotifications, useMyApplications } from '@/hooks/useApi';
import Link from 'next/link';

export default function TutorDashboard() {
  const { user } = useAuth();
  const { data: assignments } = useMyAssignments();
  const { data: notifications } = useMyNotifications();
  const { data: applications } = useMyApplications();

  const activeAssignments = assignments?.length || 0;
  const unreadNotifications = notifications?.filter((n: any) => !n.is_read).length || 0;
  const pendingApps = applications?.filter((a: any) => a.status === 'PENDING').length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 font-bold text-on-surface">Welcome back, {user?.full_name.split(' ')[0]}</h1>
        <p className="text-body-md text-on-surface-variant">Here is a summary of your tutoring activity.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary-container p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-on-primary-container">
            <span className="material-symbols-outlined">event_available</span>
            <h3 className="font-label-md">Active Assignments</h3>
          </div>
          <p className="text-h2 font-bold text-on-primary-container">{activeAssignments}</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary">inbox</span>
            <h3 className="font-label-md">Pending Applications</h3>
          </div>
          <p className="text-h2 font-bold text-on-surface">{pendingApps}</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant relative">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary">notifications</span>
            <h3 className="font-label-md">Unread Notifications</h3>
          </div>
          <p className="text-h2 font-bold text-on-surface">{unreadNotifications}</p>
          {unreadNotifications > 0 && (
            <span className="absolute top-6 right-6 w-3 h-3 bg-error rounded-full animate-pulse"></span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-h3 font-bold text-on-surface">Upcoming Classes</h2>
            <Link href="/tutor/schedule" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {assignments?.length === 0 ? (
              <p className="text-sm text-on-surface-variant py-4 text-center">No active classes.</p>
            ) : assignments?.slice(0, 3).map((a: any) => (
              <div key={a.id} className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-on-surface text-sm">{a.request?.subject}</p>
                  <p className="text-xs text-on-surface-variant">{a.student?.user?.full_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-primary">{a.schedules?.[0]?.day_of_week}</p>
                  <p className="text-xs text-on-surface-variant">{a.schedules?.[0]?.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-h3 font-bold text-on-surface">Recent Notifications</h2>
            <Link href="/tutor/notifications" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {notifications?.length === 0 ? (
              <p className="text-sm text-on-surface-variant py-4 text-center">No recent notifications.</p>
            ) : notifications?.slice(0, 3).map((n: any) => (
              <div key={n.id} className="bg-surface-container-low p-4 rounded-xl flex gap-3">
                <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.is_read ? 'bg-primary' : 'bg-transparent'}`} />
                <div>
                  <p className={`text-sm ${!n.is_read ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>{n.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
