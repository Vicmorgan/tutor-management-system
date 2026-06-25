'use client';
import React, { useState } from 'react';
import { useTutorRequests } from '@/hooks/useApi';
import Link from 'next/link';

export default function AdminRequestsPage() {
  const [filter, setFilter] = useState('All');
  const { data: requests, isLoading } = useTutorRequests();

  const filtered = (requests || []).filter((r: any) => filter === 'All' || r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Tutor Requests</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage tutoring opportunities and applicants.</p>
        </div>
        <Link href="/admin/requests/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Request
        </Link>
      </div>

      <div className="flex gap-3">
        {['All', 'OPEN', 'FILLED', 'CLOSED'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{f}</button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Subject</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Student</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Salary</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Created</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Status</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {isLoading ? (
              <tr><td colSpan={6} className="p-8 text-center text-on-surface-variant animate-pulse">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="p-16 text-center text-on-surface-variant">No requests found.</td></tr>
            ) : filtered.map((r: any) => (
              <tr key={r.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface">{r.subject}</p>
                  <p className="text-xs text-on-surface-variant">{r.title}</p>
                </td>
                <td className="px-6 py-4 text-on-surface font-medium">{r.student?.parent_name || `Student #${r.student_id}`}</td>
                <td className="px-6 py-4 font-extrabold text-on-surface">${r.salary}</td>
                <td className="px-6 py-4 text-on-surface-variant">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    r.status === 'OPEN' ? 'bg-primary-container text-on-primary-container' :
                    r.status === 'FILLED' ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-surface-container-high text-on-surface-variant'
                  }`}>{r.status}</span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/requests/${r.id}`} className="p-2 inline-block rounded-lg bg-surface-container hover:bg-surface-container-high transition text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
