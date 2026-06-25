'use client';

import React from 'react';
import { Sidebar, NavItem } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

type StudentLayoutProps = {
  children: React.ReactNode;
};

export const StudentLayout = ({ children }: StudentLayoutProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const studentNavItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', href: '/student', isActive: pathname === '/student' },
    { label: 'Schedule', icon: 'calendar_today', href: '/student/schedule', isActive: pathname === '/student/schedule' },
    { label: 'Notifications', icon: 'notifications', href: '/student/notifications', isActive: pathname === '/student/notifications' },
  ];

  return (
    <div className="min-h-screen flex bg-background text-on-background">
      <Sidebar 
        title="EduTeach" 
        subtitle="Student Portal" 
        navItems={studentNavItems} 
        primaryAction={{
          label: 'View Schedule',
          icon: 'calendar_today',
          onClick: () => window.location.href = '/student/schedule'
        }}
      />
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <TopNavbar userName={user?.full_name || 'Student'} userRole="Student" />
        <main className="flex-1 p-gutter overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
