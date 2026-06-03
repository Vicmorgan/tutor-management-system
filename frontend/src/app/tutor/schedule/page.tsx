'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSessions } from '@/hooks/useApi';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TutorSchedulePage() {
  const [activeDay, setActiveDay] = useState(days[new Date().getDay() - 1] || 'Monday');
  const router = useRouter();
  const { data: sessions, isLoading, isError } = useSessions();

  const schedule = useMemo(() => {
    const grouped: Record<string, any[]> = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
    
    (sessions || []).forEach((session: any) => {
      try {
        const start = new Date(session.start_time);
        const end = new Date(session.end_time);
        const dayName = days[start.getDay() - 1];
        if (dayName && grouped[dayName]) {
          grouped[dayName].push({
            time: `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')} – ${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`,
            course: `Course ${session.course_id}`,
            students: 0, // Mock
            type: 'Group',
            room: session.virtual_link ? 'Virtual' : 'Room A1'
          });
        }
      } catch (e) {}
    });

    Object.keys(grouped).forEach(day => {
      grouped[day].sort((a, b) => a.time.localeCompare(b.time));
    });

    return grouped;
  }, [sessions]);

  const todayClasses = schedule[activeDay] || [];

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading schedule...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load schedule.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">My Schedule</h1>
        <p className="text-sm text-on-surface-variant mt-1">Your weekly teaching timetable.</p>
      </div>

      <div className="flex gap-2">
        {days.map(d => (
          <button key={d} onClick={() => setActiveDay(d)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeDay === d ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{d}</button>
        ))}
      </div>

      <div className="space-y-4">
        {todayClasses.length === 0 && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-16 text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant opacity-40 block mb-2">event_busy</span>
            <p className="text-on-surface-variant font-medium">No classes scheduled for {activeDay}</p>
          </div>
        )}
        {todayClasses.map((cls, i) => (
          <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 flex items-center gap-6">
            <div className="text-center w-28 shrink-0">
              <p className="font-extrabold text-primary text-sm">{cls.time.split(' – ')[0]}</p>
              <p className="text-xs text-on-surface-variant">{cls.time.split(' – ')[1]}</p>
            </div>
            <div className="w-[2px] h-14 bg-primary/30 rounded shrink-0"></div>
            <div className="flex-1">
              <h3 className="font-extrabold text-on-surface text-base">{cls.course}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${cls.type === 'Group' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'}`}>{cls.type}</span>
                <span className="text-xs text-on-surface-variant">{cls.students} {cls.type === 'Group' ? 'Students' : 'Student'}</span>
                <span className="text-xs text-on-surface-variant">· {cls.room}</span>
              </div>
            </div>
            <button onClick={() => router.push('/room/class_101')}
              className="px-5 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition shadow-md shrink-0">
              <span className="material-symbols-outlined text-[18px]">videocam</span>
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
