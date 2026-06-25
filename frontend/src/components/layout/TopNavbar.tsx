'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TopNavbarProps = {
  userName: string;
  userRole: string;
  avatarUrl?: string;
  onSearch?: (query: string) => void;
};

export const TopNavbar = ({ userName, userRole, avatarUrl, onSearch }: TopNavbarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex justify-between items-center w-full px-gutter sticky top-0 bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30 z-40 transition-colors">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            type="text" 
            placeholder="Search requests, tutors, students..." 
            className="w-full bg-surface-container border border-outline-variant/30 rounded-full pl-10 pr-4 py-2 text-body-sm focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all outline-none"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant relative"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border border-surface-container-lowest"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-72 bg-surface rounded-2xl shadow-xl border border-outline-variant/30 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-outline-variant/30 bg-surface-container-low">
                  <h3 className="font-bold text-on-surface">Notifications</h3>
                </div>
                <div className="p-4 text-center">
                  <span className="material-symbols-outlined text-[40px] text-on-surface-variant/30 mb-2">notifications_paused</span>
                  <p className="text-sm text-on-surface-variant">You're all caught up!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="h-8 w-[1px] bg-outline-variant/40 mx-2"></div>
        
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{userName}</p>
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-primary/70">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-surface-container-high group-hover:border-primary transition-colors">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">person</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
