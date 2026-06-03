'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export type NavItem = {
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
};

type SidebarProps = {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  primaryAction?: {
    label: string;
    icon: string;
    onClick: () => void;
  };
};

export const Sidebar = ({ title, subtitle, navItems, primaryAction }: SidebarProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-surface dark:bg-on-background flex flex-col py-md border-r border-outline-variant dark:border-outline z-50">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined">school</span>
        </div>
        <div>
          <h2 className="font-h3 text-h3 font-bold text-primary dark:text-primary-fixed">{title}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              item.isActive 
                ? 'bg-primary-container text-on-primary-container font-bold translate-x-1' 
                : 'text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-outline-variant">
        {primaryAction && (
          <button 
            onClick={primaryAction.onClick}
            className="w-full flex items-center justify-center gap-2 bg-secondary text-white py-3 rounded-xl font-label-md hover:bg-secondary-container transition-colors shadow-lg shadow-secondary/20 active:scale-95 duration-100 mb-4"
          >
            <span className="material-symbols-outlined">{primaryAction.icon}</span>
            {primaryAction.label}
          </button>
        )}
        <div className="space-y-1">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-low transition-all duration-200 rounded-lg">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error-container/10 transition-all duration-200 rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
