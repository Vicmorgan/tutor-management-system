import React from 'react';

type TopNavbarProps = {
  userName: string;
  userRole: string;
  avatarUrl?: string;
  onSearch?: (query: string) => void;
};

export const TopNavbar = ({ userName, userRole, avatarUrl, onSearch }: TopNavbarProps) => {
  return (
    <header className="h-16 flex justify-between items-center w-full px-gutter sticky top-0 bg-surface-container-lowest dark:bg-inverse-surface shadow-sm border-b border-outline-variant dark:border-outline z-40">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            type="text" 
            placeholder="Search students, classes, or reports..." 
            className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
          <span className="material-symbols-outlined">help</span>
        </button>
        
        <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-label-md text-label-md text-on-surface">{userName}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-primary">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden bg-surface-container-high">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-on-surface-variant">person</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
