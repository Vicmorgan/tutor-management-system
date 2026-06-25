'use client';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMyAssignments, useMyNotifications } from '@/hooks/useApi';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: assignments } = useMyAssignments();
  const { data: notifications } = useMyNotifications();

  const unreadNotifications = notifications?.filter((n: any) => !n.is_read).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2 font-bold text-on-surface">Welcome back, {user?.full_name.split(' ')[0]}</h1>
        <p className="text-body-md text-on-surface-variant">Here is an overview of your tutoring sessions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-container p-8 rounded-3xl relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="relative z-10">
            <h2 className="text-xl font-extrabold text-on-primary-container mb-1">Your Tutors</h2>
            <p className="text-on-primary-container/80 text-sm mb-6">You have {assignments?.length || 0} active subjects.</p>
            
            <div className="space-y-3">
              {assignments?.slice(0, 2).map((a: any) => (
                <div key={a.id} className="bg-surface/20 p-4 rounded-2xl backdrop-blur-sm border border-surface/30">
                  <p className="font-extrabold text-on-primary-container">{a.request?.subject}</p>
                  <p className="text-sm text-on-primary-container/90 mt-1">with {a.tutor?.user?.full_name}</p>
                </div>
              ))}
              {assignments?.length === 0 && (
                <p className="text-sm font-medium text-on-primary-container/80">You have not been assigned any tutors yet.</p>
              )}
            </div>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[150px] text-primary opacity-10 rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:scale-110 transition-transform duration-500">
            school
          </span>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant flex items-center justify-between shadow-sm">
            <div>
              <h3 className="font-bold text-on-surface text-lg">Notifications</h3>
              <p className="text-sm text-on-surface-variant mt-1">You have {unreadNotifications} unread messages.</p>
            </div>
            <Link href="/student/notifications" className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full animate-pulse"></span>
              )}
            </Link>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-on-surface text-lg">Next Class</h2>
              <Link href="/student/schedule" className="text-sm font-bold text-primary hover:underline">Full Schedule</Link>
            </div>
            
            {assignments?.length === 0 ? (
              <p className="text-sm text-on-surface-variant py-4 text-center">No upcoming classes.</p>
            ) : (
              <div className="space-y-4">
                {assignments?.slice(0, 1).map((a: any) => (
                  <div key={a.id} className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-extrabold text-on-surface">{a.request?.subject}</p>
                        <p className="text-sm text-on-surface-variant mt-1">{a.tutor?.user?.full_name}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary-container text-on-primary-container text-xs font-bold rounded-full">
                        {a.schedules?.[0]?.day_of_week}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant bg-surface-container p-3 rounded-xl mt-4">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      {a.schedules?.[0]?.time} ({a.schedules?.[0]?.duration})
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
