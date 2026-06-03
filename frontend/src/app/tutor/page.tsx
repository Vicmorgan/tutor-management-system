'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function TutorDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-h2 font-bold text-on-surface">Hello, {user?.full_name.split(' ')[0]}</h1>
          <p className="text-body-md text-on-surface-variant">Your teaching overview for this week.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Class Focus Card */}
        <div className="lg:col-span-2 bg-primary-container p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="inline-block px-3 py-1 bg-primary text-on-primary rounded-full text-label-sm font-bold mb-4">
              Starting in 15 mins
            </div>
            <h2 className="text-h1 font-bold text-on-primary-container">Advanced Physics 301</h2>
            <p className="text-body-lg text-on-primary-container opacity-90 mt-2">Group Session • 12 Students</p>
          </div>
          
          <div className="flex items-center gap-4 mt-8">
            <button 
              onClick={() => router.push('/room/class_101')}
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition shadow-lg"
            >
              <span className="material-symbols-outlined">videocam</span>
              Join Virtual Room
            </button>
            <button className="px-6 py-3 bg-surface/50 text-on-primary-container rounded-xl font-bold flex items-center gap-2 hover:bg-surface/70 transition">
              <span className="material-symbols-outlined">description</span>
              Lesson Plan
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant">Hours Taught (This Week)</p>
              <p className="text-h3 font-bold text-on-surface">18.5 hrs</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant">Active Students</p>
              <p className="text-h3 font-bold text-on-surface">42</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">star</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant">Average Rating</p>
              <p className="text-h3 font-bold text-on-surface">4.9/5.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-h3 font-bold text-on-surface">Today's Schedule</h2>
            <button className="text-primary font-bold text-label-sm hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-xl border border-primary bg-primary/5">
              <div className="w-16 text-center shrink-0">
                <p className="text-label-sm font-bold text-primary">10:00 AM</p>
                <p className="text-[10px] text-on-surface-variant">45 mins</p>
              </div>
              <div className="w-[1px] bg-primary"></div>
              <div>
                <h4 className="font-bold text-on-surface">Advanced Physics 301</h4>
                <p className="text-label-sm text-on-surface-variant mt-1">Group Session (12 Students)</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 rounded-xl border border-outline-variant bg-surface">
              <div className="w-16 text-center shrink-0">
                <p className="text-label-sm font-bold text-on-surface">01:30 PM</p>
                <p className="text-[10px] text-on-surface-variant">60 mins</p>
              </div>
              <div className="w-[1px] bg-outline-variant"></div>
              <div>
                <h4 className="font-bold text-on-surface">Calculus I</h4>
                <p className="text-label-sm text-on-surface-variant mt-1">1-on-1 with Alex Johnson</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
          <h2 className="text-h3 font-bold text-on-surface mb-6">Needs Attention</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-error-container/20 border border-error-container">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error">assignment_turned_in</span>
                <div>
                  <h4 className="font-bold text-on-surface text-label-md">Grade Calculus Homework</h4>
                  <p className="text-label-sm text-on-surface-variant">5 submissions pending</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-sm font-bold shadow-sm hover:bg-surface-container-low">Review</button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary-container/10 border border-secondary-container">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">forum</span>
                <div>
                  <h4 className="font-bold text-on-surface text-label-md">Messages from Students</h4>
                  <p className="text-label-sm text-on-surface-variant">2 unread questions</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-sm font-bold shadow-sm hover:bg-surface-container-low">Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
