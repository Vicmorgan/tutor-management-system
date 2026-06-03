'use client';
import React, { useState } from 'react';
import { useCourses } from '@/hooks/useApi';

const levelColor: Record<string, string> = {
  Beginner: 'bg-primary-container text-on-primary-container',
  Intermediate: 'bg-secondary-container text-on-secondary-container',
  Advanced: 'bg-tertiary-container text-on-tertiary-container',
};

export default function StudentCoursesPage() {
  const [filter, setFilter] = useState('All');
  const { data: courses, isLoading, isError } = useCourses();

  const mappedCourses = (courses || []).map((c: any) => ({
    id: c.id,
    title: c.title,
    tutor: `Tutor ${c.tutor_id}`, // Mock
    category: c.department || 'General',
    enrolled: false, // Mock
    level: 'Beginner', // Mock
    sessions: 10, // Mock
    rating: 4.5, // Mock
    image: '📚' // Mock
  }));

  const filtered = mappedCourses.filter((c: any) => filter === 'All' || (filter === 'Enrolled' && c.enrolled) || (filter === 'Explore' && !c.enrolled) || c.category === filter);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading courses...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load courses.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Courses</h1>
        <p className="text-sm text-on-surface-variant mt-1">Your enrolled courses and the full course catalog.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['All', 'Enrolled', 'Explore', 'Science', 'Mathematics', 'Humanities'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-28 bg-gradient-to-br from-primary-container to-surface-container flex items-center justify-center text-6xl">
              {c.image}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-extrabold text-on-surface leading-tight">{c.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${levelColor[c.level]}`}>{c.level}</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-3">by {c.tutor}</p>
              <div className="flex items-center justify-between text-xs text-on-surface-variant mb-4">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-400 text-[14px]">star</span>
                  <span className="font-bold">{c.rating}</span>
                </div>
                <span>{c.sessions} sessions</span>
                <span>{c.category}</span>
              </div>
              {c.enrolled ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-outline-variant overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-primary shrink-0">75%</span>
                </div>
              ) : (
                <button className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition shadow-sm">
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
