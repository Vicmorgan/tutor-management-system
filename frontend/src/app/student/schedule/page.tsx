'use client';
import React from 'react';
import { useMyAssignments } from '@/hooks/useApi';

export default function StudentSchedulePage() {
  const { data: assignments, isLoading } = useMyAssignments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">My Schedule</h1>
        <p className="text-sm text-on-surface-variant mt-1">Your weekly tutoring schedule.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Day & Time</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Subject</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Tutor</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {isLoading ? (
              <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant animate-pulse">Loading schedule...</td></tr>
            ) : assignments?.length === 0 ? (
              <tr><td colSpan={4} className="p-16 text-center text-on-surface-variant">No scheduled classes.</td></tr>
            ) : assignments?.flatMap((a: any) => 
              (a.schedules || []).map((s: any) => (
                <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-primary">{s.day_of_week}</p>
                    <p className="text-on-surface-variant text-xs">{s.time}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-on-surface">{a.request?.subject || 'Tutoring Session'}</td>
                  <td className="px-6 py-4 text-on-surface">{a.tutor?.user?.full_name || 'Assigned Tutor'}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.duration || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
