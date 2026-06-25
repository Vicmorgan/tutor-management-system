'use client';
import React, { useState } from 'react';
import { useApplications, useTutorRequests, useUpdateApplicationStatus } from '@/hooks/useApi';
import Link from 'next/link';

export default function AdminApplicationsPage() {
  const [filter, setFilter] = useState('All');
  
  const { data: applications, isLoading: isLoadingApps } = useApplications();
  const { data: requests, isLoading: isLoadingReqs } = useTutorRequests();
  const updateStatus = useUpdateApplicationStatus();

  const isLoading = isLoadingApps || isLoadingReqs;

  const enrichedApplications = (applications || []).map((app: any) => {
    const request = requests?.find((r: any) => r.id === app.request_id);
    return { ...app, request };
  });

  const filtered = enrichedApplications.filter((a: any) => filter === 'All' || a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Applications</h1>
          <p className="text-sm text-on-surface-variant mt-1">Review tutor applications across all requests.</p>
        </div>
      </div>

      <div className="flex gap-3">
        {['All', 'PENDING', 'ACCEPTED', 'REJECTED'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{f}</button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Request Subject</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Tutor</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Applied Date</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Status</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant animate-pulse">Loading applications...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-16 text-center text-on-surface-variant">No applications found.</td></tr>
            ) : filtered.map((a: any) => (
              <tr 
                key={a.id} 
                className="hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={() => window.location.href = `/admin/requests/${a.request_id}`}
              >
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface">{a.request?.subject || `Request #${a.request_id}`}</p>
                  {a.request?.title && <p className="text-xs text-on-surface-variant line-clamp-1">{a.request.title}</p>}
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-on-surface">{a.tutor?.user?.full_name || `Tutor #${a.tutor_id}`}</p>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-400 text-[14px]">star</span>
                    {a.tutor?.rating || '0.0'}
                  </p>
                </td>
                <td className="px-6 py-4 text-on-surface-variant">{new Date(a.applied_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    a.status === 'PENDING' ? 'bg-primary-container text-on-primary-container' :
                    a.status === 'ACCEPTED' ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-error-container text-on-error-container'
                  }`}>{a.status}</span>
                </td>
                <td className="px-6 py-4">
                  {a.status === 'PENDING' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateStatus.mutate({ id: a.id, status: 'ACCEPTED' }); }}
                        className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                        title="Accept"
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateStatus.mutate({ id: a.id, status: 'REJECTED' }); }}
                        className="w-8 h-8 rounded-full bg-error/10 text-error hover:bg-error hover:text-white flex items-center justify-center transition-colors"
                        title="Reject"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={(e) => { e.stopPropagation(); window.location.href = `/admin/requests/${a.request_id}`; }}
                      className="px-3 py-1.5 inline-block rounded-lg bg-surface-container font-bold hover:bg-surface-container-high transition text-on-surface-variant"
                    >
                      View Request
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
