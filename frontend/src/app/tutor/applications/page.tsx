'use client';
import React, { useState } from 'react';
import { useMyApplications, useTutorRequests } from '@/hooks/useApi';

export default function TutorApplicationsPage() {
  const [filter, setFilter] = useState('PENDING');
  const { data: applications, isLoading: isLoadingApps } = useMyApplications();
  const { data: requests, isLoading: isLoadingReqs } = useTutorRequests(); // Need to fetch all requests if possible, or application should include request data.
  // Wait, our backend schema for ApplicationResponse includes the full request? 
  // Wait, no it doesn't currently include the full request in the schema (it has request_id). 
  // Let's assume we can match it from useTutorRequests() if it's OPEN, but if FILLED/CLOSED it might not be in the tutor's request list.
  // For the MVP, we will rely on what is available, or we should update the backend schema to include `request` in `ApplicationResponse`.
  // Actually, I didn't add `request` to `ApplicationResponse` explicitly. Let's just use what we have, we might only have `request_id`.
  
  // Wait, the Application model has a `request` relationship. I can just access it if the backend serializes it.
  // If not, we'll just show the request ID.

  const filtered = (applications || []).filter((a: any) => a.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">My Applications</h1>
        <p className="text-sm text-on-surface-variant mt-1">Track the status of your tutoring applications.</p>
      </div>

      <div className="flex gap-3 border-b border-outline-variant pb-2">
        {['PENDING', 'ACCEPTED', 'REJECTED'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-bold transition border-b-2 -mb-2 ${filter === f ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
          >{f}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {isLoadingApps ? (
          <div className="col-span-full py-8 text-center text-on-surface-variant animate-pulse">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">inbox</span>
            No {filter.toLowerCase()} applications.
          </div>
        ) : filtered.map((a: any) => (
          <div key={a.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded uppercase">
                Applied {new Date(a.applied_at).toLocaleDateString()}
              </span>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                a.status === 'ACCEPTED' ? 'bg-primary-container text-on-primary-container' :
                a.status === 'REJECTED' ? 'bg-error-container text-on-error-container' :
                'bg-secondary-container text-on-secondary-container'
              }`}>
                {a.status}
              </span>
            </div>
            {/* If the backend includes request data, we show it, otherwise just ID */}
            <h3 className="font-bold text-on-surface mb-1">Request #{a.request_id}</h3>
            <p className="text-sm text-on-surface-variant">Check your schedule if accepted, or notifications for updates.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
