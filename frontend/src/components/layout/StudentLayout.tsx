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
    { label: 'My Learning', icon: 'dashboard', href: '/student', isActive: pathname === '/student' },
    { label: 'My Schedule', icon: 'calendar_today', href: '/student/schedule', isActive: pathname === '/student/schedule' },
    { label: 'Courses', icon: 'book', href: '/student/courses', isActive: pathname === '/student/courses' },
    { label: 'Assignments', icon: 'assignment', href: '/student/assignments', isActive: pathname === '/student/assignments' },
    { label: 'Payments', icon: 'payments', href: '/student/payments', isActive: pathname === '/student/payments' },
  ];

  return (
    <div className="min-h-screen flex bg-background text-on-background">
      <Sidebar 
        title="EduTeach" 
        subtitle="Student Portal" 
        navItems={studentNavItems} 
        primaryAction={{
          label: 'Join Next Class',
          icon: 'login',
          onClick: () => console.log('Join Next Class clicked')
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
