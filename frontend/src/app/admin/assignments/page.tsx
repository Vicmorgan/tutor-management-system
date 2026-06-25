'use client';
import React, { useState } from 'react';
import { useAssignments } from '@/hooks/useApi';

export default function AdminAssignmentsPage() {
  const [search, setSearch] = useState('');
  const { data: assignments, isLoading } = useAssignments();

  const filtered = (assignments || []).filter((a: any) => {
    const studentMatch = a.student?.user?.full_name?.toLowerCase().includes(search.toLowerCase());
    const tutorMatch = a.tutor?.user?.full_name?.toLowerCase().includes(search.toLowerCase());
    const subjectMatch = a.request?.subject?.toLowerCase().includes(search.toLowerCase());
    return studentMatch || tutorMatch || subjectMatch || search === '';
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Active Assignments</h1>
          <p className="text-sm text-on-surface-variant mt-1">Monitor all ongoing tutoring pairs.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            type="text" placeholder="Search by student, tutor, or subject..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Subject</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Student</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Tutor</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Schedule</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Assigned Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant animate-pulse">Loading assignments...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-16 text-center text-on-surface-variant">No active assignments found.</td></tr>
            ) : filtered.map((a: any) => (
              <tr key={a.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-bold text-on-surface">{a.request?.subject || 'Unknown'}</td>
                <td className="px-6 py-4 text-on-surface">{a.student?.user?.full_name || `Student #${a.student_id}`}</td>
                <td className="px-6 py-4 text-on-surface">{a.tutor?.user?.full_name || `Tutor #${a.tutor_id}`}</td>
                <td className="px-6 py-4 text-on-surface-variant text-xs">
                  {a.schedules?.[0] ? `${a.schedules[0].day_of_week} at ${a.schedules[0].time}` : 'TBD'}
                </td>
                <td className="px-6 py-4 text-on-surface-variant text-xs">
                  {new Date(a.assigned_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
