'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-h2 font-bold text-on-surface">Welcome back, {user?.full_name.split(' ')[0]}</h1>
          <p className="text-body-md text-on-surface-variant">Here is what is happening across the platform today.</p>
        </div>
      </div>

      {/* KPI Cards (Mock Data) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-primary">school</span>
            <h3 className="font-label-md">Total Students</h3>
          </div>
          <p className="text-h2 font-bold text-on-surface">1,248</p>
          <p className="text-label-sm text-primary flex items-center gap-1 mt-2">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            +12% from last month
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary">supervisor_account</span>
            <h3 className="font-label-md">Active Tutors</h3>
          </div>
          <p className="text-h2 font-bold text-on-surface">84</p>
          <p className="text-label-sm text-primary flex items-center gap-1 mt-2">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            +3 new this week
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
          <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary">live_tv</span>
            <h3 className="font-label-md">Live Classes</h3>
          </div>
          <p className="text-h2 font-bold text-on-surface">12</p>
          <p className="text-label-sm text-on-surface-variant mt-2">
            Right now
          </p>
        </div>

        <div className="bg-primary-container p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2 text-on-primary-container">
            <span className="material-symbols-outlined">payments</span>
            <h3 className="font-label-md">Pending Payments</h3>
          </div>
          <p className="text-h2 font-bold text-on-primary-container">$4,250</p>
          <p className="text-label-sm text-on-primary-container opacity-80 mt-2">
            From 28 students
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 h-[400px]">
          <h2 className="text-h3 font-bold text-on-surface mb-4">Revenue Overview</h2>
          <div className="w-full h-full flex items-center justify-center bg-surface-container rounded-xl">
            <p className="text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined">bar_chart</span>
              Chart Placeholder (Recharts)
            </p>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
          <h2 className="text-h3 font-bold text-on-surface mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <div>
                <p className="text-body-sm text-on-surface"><span className="font-bold">John Doe</span> paid for Advanced Physics</p>
                <p className="text-label-sm text-on-surface-variant">2 mins ago</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
              </div>
              <div>
                <p className="text-body-sm text-on-surface">New tutor application from <span className="font-bold">Sarah Smith</span></p>
                <p className="text-label-sm text-on-surface-variant">1 hour ago</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">event_available</span>
              </div>
              <div>
                <p className="text-body-sm text-on-surface"><span className="font-bold">Prof. Mitchell</span> completed Chemistry 101 class</p>
                <p className="text-label-sm text-on-surface-variant">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
