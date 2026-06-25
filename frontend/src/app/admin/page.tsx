'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTutors, useStudents, useTutorRequests, useAssignments, useDashboardStats } from '@/hooks/useApi';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  const { data: tutors } = useTutors();
  const { data: students } = useStudents();
  const { data: requests } = useTutorRequests();
  const { data: assignments } = useAssignments();
  const { data: dashboardStats } = useDashboardStats();

  const totalTutors = tutors?.length || 0;
  const totalStudents = students?.length || 0;
  const openRequests = requests?.filter((r: any) => r.status === 'OPEN').length || 0;
  const activeAssignments = assignments?.length || 0;
  const pendingApplications = dashboardStats?.pendingApplications || 0;

  const kpiCards = [
    { title: 'Total Students', value: totalStudents, icon: 'school', color: 'text-primary' },
    { title: 'Total Tutors', value: totalTutors, icon: 'supervisor_account', color: 'text-secondary' },
    { title: 'Open Requests', value: openRequests, icon: 'assignment', color: 'text-on-primary-container', bg: 'bg-primary-container', valColor: 'text-on-primary-container' },
    { title: 'Active Assignments', value: activeAssignments, icon: 'event_available', color: 'text-tertiary' },
    { title: 'Pending Apps', value: pendingApplications, icon: 'inbox', color: 'text-error' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Welcome back, {user?.full_name.split(' ')[0]}</h1>
          <p className="text-base text-on-surface-variant mt-1">Here is what is happening across the platform today.</p>
        </div>
        <Link href="/admin/requests/new" className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:opacity-90 hover:-translate-y-0.5 transition-all">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create a Request
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((card, idx) => (
          <motion.div 
            key={card.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
            className={`${card.bg || 'bg-surface-container-lowest'} p-6 rounded-3xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className={`flex items-center gap-3 mb-3 ${card.bg ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
              <span className={`material-symbols-outlined ${card.color}`}>{card.icon}</span>
              <h3 className="font-bold text-sm tracking-wide">{card.title}</h3>
            </div>
            <p className={`text-4xl font-extrabold ${card.valColor || 'text-on-surface'}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-surface-container-lowest rounded-3xl border border-outline-variant/50 p-8 shadow-sm"
      >
        <h2 className="text-xl font-extrabold text-on-surface mb-6">Recent Activity</h2>
        <div className="space-y-5">
          {(!dashboardStats?.recentActivity || dashboardStats.recentActivity.length === 0) ? (
            <p className="text-on-surface-variant">No recent activity.</p>
          ) : (
            dashboardStats.recentActivity.map((activity: any) => (
              <div key={activity.id} className="flex gap-4 items-start group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${
                  activity.type === 'request' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">
                    {activity.type === 'request' ? 'assignment' : 'person_add'}
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-on-surface font-medium">{activity.title}</p>
                  <p className="text-xs text-on-surface-variant font-bold mt-1">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
