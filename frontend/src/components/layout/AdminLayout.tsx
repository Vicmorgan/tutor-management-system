'use client';

import React from 'react';
import { Sidebar, NavItem } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', href: '/admin', isActive: pathname === '/admin' },
    { label: 'Tutors', icon: 'supervisor_account', href: '/admin/tutors', isActive: pathname === '/admin/tutors' },
    { label: 'Students', icon: 'school', href: '/admin/students', isActive: pathname === '/admin/students' },
    { label: 'Schedule', icon: 'calendar_today', href: '/admin/schedule', isActive: pathname === '/admin/schedule' },
    { label: 'Payments', icon: 'payments', href: '/admin/payments', isActive: pathname === '/admin/payments' },
    { label: 'Reports', icon: 'assessment', href: '/admin/reports', isActive: pathname === '/admin/reports' },
  ];

  return (
    <div className="min-h-screen flex bg-background text-on-background">
      <Sidebar 
        title="EduTeach" 
        subtitle="Management Portal" 
        navItems={adminNavItems} 
        primaryAction={{
          label: 'New Schedule',
          icon: 'add',
          onClick: () => console.log('New Schedule clicked')
        }}
      />
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <TopNavbar userName={user?.full_name || 'Admin'} userRole="Administrator" />
        <main className="flex-1 p-gutter overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};;
