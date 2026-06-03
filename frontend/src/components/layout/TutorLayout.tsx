'use client';

import React from 'react';
import { Sidebar, NavItem } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

type TutorLayoutProps = {
  children: React.ReactNode;
};

export const TutorLayout = ({ children }: TutorLayoutProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const tutorNavItems: NavItem[] = [
    { label: 'My Dashboard', icon: 'dashboard', href: '/tutor', isActive: pathname === '/tutor' },
    { label: 'Schedule', icon: 'calendar_today', href: '/tutor/schedule', isActive: pathname === '/tutor/schedule' },
    { label: 'My Students', icon: 'school', href: '/tutor/students', isActive: pathname === '/tutor/students' },
    { label: 'Assignments', icon: 'assignment', href: '/tutor/assignments', isActive: pathname === '/tutor/assignments' },
    { label: 'Earnings', icon: 'payments', href: '/tutor/earnings', isActive: pathname === '/tutor/earnings' },
  ];

  return (
    <div className="min-h-screen flex bg-background text-on-background">
      <Sidebar 
        title="EduTeach" 
        subtitle="Tutor Portal" 
        navItems={tutorNavItems} 
        primaryAction={{
          label: 'Start Next Class',
          icon: 'video_camera_front',
          onClick: () => console.log('Start Next Class clicked')
        }}
      />
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <TopNavbar userName={user?.full_name || 'Tutor'} userRole="Tutor" />
        <main className="flex-1 p-gutter overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
