'use client';
import React from 'react';
import { useStudents } from '@/hooks/useApi';

export default function TutorStudentsPage() {
  const { data: students, isLoading, isError } = useStudents();

  const myStudents = (students || []).map((s: any) => ({
    id: s.id,
    name: s.full_name,
    grade: 'N/A', // Mock metadata
    course: 'Unassigned',
    progress: 50,
    lastSeen: 'Unknown',
    attendance: 100,
    avgScore: 0
  }));

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading students...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load students.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">My Students</h1>
        <p className="text-sm text-on-surface-variant mt-1">Track the progress and performance of your enrolled students.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary-container p-5 rounded-2xl flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-on-primary-container">school</span>
          <div>
            <p className="text-2xl font-extrabold text-on-primary-container">{myStudents.length}</p>
            <p className="text-xs text-on-primary-container opacity-80">Total Students</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-primary">trending_up</span>
          <div>
            <p className="text-2xl font-extrabold text-on-surface">{myStudents.length > 0 ? Math.round(myStudents.reduce((s: number,x: any) => s + x.avgScore, 0) / myStudents.length) : 0}%</p>
            <p className="text-xs text-on-surface-variant">Avg. Test Score</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-secondary">event_available</span>
          <div>
            <p className="text-2xl font-extrabold text-on-surface">{myStudents.length > 0 ? Math.round(myStudents.reduce((s: number,x: any) => s + x.attendance, 0) / myStudents.length) : 0}%</p>
            <p className="text-xs text-on-surface-variant">Avg. Attendance</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {myStudents.map(s => (
          <div key={s.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-extrabold text-sm shrink-0">
              {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="font-bold text-on-surface">{s.name}</p>
                <span className="text-xs text-on-surface-variant">{s.grade}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">{s.course}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 rounded-full bg-outline-variant overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${s.progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-primary">{s.progress}%</span>
              </div>
            </div>
            <div className="flex gap-6 text-center shrink-0">
              <div>
                <p className="text-lg font-extrabold text-on-surface">{s.avgScore}%</p>
                <p className="text-xs text-on-surface-variant">Avg Score</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-on-surface">{s.attendance}%</p>
                <p className="text-xs text-on-surface-variant">Attendance</p>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">{s.lastSeen}</p>
                <p className="text-xs text-on-surface-variant">Last Seen</p>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition text-on-surface-variant shrink-0">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
