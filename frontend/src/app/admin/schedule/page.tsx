'use client';
import React, { useState } from 'react';
import { useSessions, useCreateSession, useDeleteSession } from '@/hooks/useApi';
import { CreateSessionModal } from '@/components/modals/CreateSessionModal';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const typeColor: Record<string, string> = {
  Group: 'bg-primary-container text-on-primary-container',
  '1-on-1': 'bg-secondary-container text-on-secondary-container',
};

export default function AdminSchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: sessions, isLoading, isError } = useSessions();
  const createSession = useCreateSession();
  const deleteSession = useDeleteSession();
  
  const today = days[new Date().getDay() - 1] || 'Monday';

  const schedule = React.useMemo(() => {
    const grouped: Record<string, any[]> = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };
    
    (sessions || []).forEach((session: any) => {
      try {
        const date = new Date(session.start_time);
        const dayName = days[date.getDay() - 1]; // 0 is Sunday, 1 is Monday
        if (dayName && grouped[dayName]) {
          grouped[dayName].push({
            id: session.id,
            time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
            course: `Course ${session.course_id}`, // Mock for now until API is expanded
            tutor: 'Tutor Name', // Mock for now
            room: session.virtual_link ? 'Virtual' : 'Room A1',
            type: 'Group'
          });
        }
      } catch (e) {}
    });
    
    // Sort by time within each day
    Object.keys(grouped).forEach(day => {
      grouped[day].sort((a, b) => a.time.localeCompare(b.time));
    });

    return grouped;
  }, [sessions]);

  const handleCreateSession = (data: { course_id: number; start_time: string; end_time: string; virtual_link: string }) => {
    createSession.mutate(data, {
      onSuccess: () => setIsModalOpen(false)
    });
  };

  const handleDeleteSession = (id: number) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      deleteSession.mutate(id);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading schedule...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load schedule.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Weekly Schedule</h1>
          <p className="text-sm text-on-surface-variant mt-1">All active classes for this week across the platform.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Schedule Class
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {days.map(day => (
          <div key={day} className={`rounded-2xl border overflow-hidden ${day === today ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant'}`}>
            <div className={`px-4 py-3 font-bold text-sm flex justify-between items-center ${day === today ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface'}`}>
              <div>
                {day}
                {day === today && <span className="ml-2 text-xs opacity-80">Today</span>}
              </div>
            </div>
            <div className="p-3 space-y-2 bg-surface-container-lowest min-h-[180px]">
              {(schedule[day] || []).map((cls, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface border border-outline-variant text-xs space-y-1 relative group hover:border-error transition-colors">
                  <button onClick={() => handleDeleteSession(cls.id)} className="absolute top-2 right-2 p-1 rounded-md text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-container" title="Delete Session">
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                  </button>
                  <p className="font-bold text-on-surface">{cls.time}</p>
                  <p className="text-on-surface leading-tight pr-6">{cls.course}</p>
                  <p className="text-on-surface-variant">{cls.tutor}</p>
                  <div className="flex items-center gap-1 pt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${typeColor[cls.type]}`}>{cls.type}</span>
                    <span className="text-on-surface-variant">· {cls.room}</span>
                  </div>
                </div>
              ))}
              {(schedule[day] || []).length === 0 && (
                <p className="text-center text-on-surface-variant text-xs pt-6 opacity-60">No classes</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSession}
        isLoading={createSession.isPending}
      />
    </div>
  );
}
