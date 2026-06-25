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
    { label: 'Dashboard', icon: 'dashboard', href: '/tutor', isActive: pathname === '/tutor' },
    { label: 'Opportunities', icon: 'search', href: '/tutor/opportunities', isActive: pathname === '/tutor/opportunities' },
    { label: 'My Applications', icon: 'inbox', href: '/tutor/applications', isActive: pathname === '/tutor/applications' },
    { label: 'My Schedule', icon: 'calendar_today', href: '/tutor/schedule', isActive: pathname === '/tutor/schedule' },
    { label: 'Notifications', icon: 'notifications', href: '/tutor/notifications', isActive: pathname === '/tutor/notifications' },
  ];

  return (
    <div className="min-h-screen flex bg-background text-on-background">
      <Sidebar 
        title="EduTeach" 
        subtitle="Tutor Portal" 
        navItems={tutorNavItems} 
        primaryAction={{
          label: 'View Opportunities',
          icon: 'search',
          onClick: () => window.location.href = '/tutor/opportunities'
        }}
      />
      <div className="ml-[280px] flex-1 flex flex-col min-w-0">
        <TopNavbar userName={user?.full_name || 'Tutor'} userRole="Tutor" />
        <main className="flex-1 p-gutter overflow-y-auto">
          {user?.tutor_profile?.status !== 'ACTIVE' && pathname !== '/tutor/settings' ? (
            <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-4">
              <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant shadow-sm mb-4">
                <span className="material-symbols-outlined text-[40px]">hourglass_empty</span>
              </div>
              <h2 className="text-2xl font-extrabold text-on-surface">Application Under Review</h2>
              <p className="text-on-surface-variant">Your account has been created successfully. An administrator will review your profile shortly before you can start applying for tutoring opportunities.</p>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};
