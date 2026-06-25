'use client';
import React, { useState } from 'react';
import { useTutorRequests } from '@/hooks/useApi';
import Link from 'next/link';

export default function TutorOpportunitiesPage() {
  const [filterMode, setFilterMode] = useState('All');
  const { data: requests, isLoading } = useTutorRequests(); // For tutor, this only returns OPEN requests

  const filtered = (requests || []).filter((r: any) => filterMode === 'All' || r.mode === filterMode);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Opportunity Board</h1>
        <p className="text-sm text-on-surface-variant mt-1">Browse and apply for open tutoring requests.</p>
      </div>

      <div className="flex gap-3">
        {['All', 'Online', 'Physical'].map(f => (
          <button key={f} onClick={() => setFilterMode(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filterMode === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-8 text-center text-on-surface-variant animate-pulse">Loading opportunities...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">inbox</span>
            No open opportunities available right now.
          </div>
        ) : filtered.map((r: any) => (
          <div key={r.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 flex flex-col hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-2 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded uppercase tracking-wide">
                  {r.subject}
                </span>
                <h3 className="font-extrabold text-on-surface mt-2 text-lg line-clamp-2">{r.title}</h3>
              </div>
              <span className="font-extrabold text-primary text-xl">${r.salary}</span>
            </div>

            <div className="space-y-2 mb-6 flex-1 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">school</span> {r.student_level}</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">location_on</span> {r.mode} {r.location ? `· ${r.location}` : ''}</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">schedule</span> {r.days_of_week} at {r.time}</div>
            </div>

            <Link href={`/tutor/opportunities/${r.id}`} className="w-full text-center py-2.5 bg-surface-container text-on-surface font-bold rounded-xl hover:bg-surface-container-high transition">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
