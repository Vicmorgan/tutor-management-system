'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';

export default function RoomPage() {
  const router = useRouter();

  return (
    <ProtectedRoute allowedRoles={['TUTOR', 'STUDENT']}>
      <div className="h-screen w-screen flex flex-col bg-on-background">
        <div className="h-16 px-6 border-b border-outline/30 flex justify-between items-center bg-inverse-surface shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-[20px]">school</span>
            </div>
            <h1 className="text-inverse-on-surface font-bold text-label-lg">Virtual Classroom (Advanced Physics 301)</h1>
          </div>
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-error text-on-error rounded-lg font-bold text-label-sm hover:bg-error/90 transition shadow-md"
          >
            Leave Room
          </button>
        </div>
        
        {/* Jitsi Meet iframe */}
        <div className="flex-1 w-full relative">
          <iframe 
            src="https://meet.jit.si/EduTeach_AdvancedPhysics301_Room1?config.prejoinPageEnabled=false" 
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            className="w-full h-full border-0 absolute inset-0"
          ></iframe>
        </div>
      </div>
    </ProtectedRoute>
  );
}
