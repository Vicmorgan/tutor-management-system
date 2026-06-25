'use client';
import React from 'react';
import { useTutorRequests, useApplyToRequest, useMyApplications } from '@/hooks/useApi';
import { useRouter, useParams } from 'next/navigation';

export default function OpportunityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = parseInt(params.id as string);

  const { data: requests, isLoading: isLoadingReq } = useTutorRequests();
  const { data: myApps, isLoading: isLoadingApps } = useMyApplications();
  const applyMutation = useApplyToRequest();

  const request = requests?.find((r: any) => r.id === requestId);
  const hasApplied = myApps?.some((a: any) => a.request_id === requestId);

  const handleApply = () => {
    if (window.confirm('Are you sure you want to apply for this tutoring opportunity?')) {
      applyMutation.mutate(requestId, {
        onSuccess: () => {
          alert('Application submitted successfully!');
          router.push('/tutor/applications');
        }
      });
    }
  };

  if (isLoadingReq || isLoadingApps) return <div className="p-8 text-center animate-pulse">Loading details...</div>;
  if (!request) return <div className="p-8 text-center text-error">Opportunity not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => router.back()} className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Opportunities
      </button>

      <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant space-y-8">
        <div className="flex justify-between items-start border-b border-outline-variant pb-6">
          <div>
            <span className="px-3 py-1 bg-primary-container text-on-primary-container text-xs font-bold rounded-full uppercase tracking-wide">
              {request.subject}
            </span>
            <h1 className="text-3xl font-extrabold text-on-surface mt-4">{request.title}</h1>
            <p className="text-on-surface-variant mt-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Posted {new Date(request.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-on-surface-variant font-bold mb-1">Offered Salary</p>
            <p className="text-4xl font-extrabold text-primary">${request.salary}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-on-surface-variant font-bold mb-1">Student Level</p>
            <p className="text-on-surface text-base">{request.student_level || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-on-surface-variant font-bold mb-1">Mode & Location</p>
            <p className="text-on-surface text-base">{request.mode} {request.location ? `- ${request.location}` : ''}</p>
          </div>
          <div>
            <p className="text-on-surface-variant font-bold mb-1">Preferred Schedule</p>
            <p className="text-on-surface text-base">{request.days_of_week}</p>
          </div>
          <div>
            <p className="text-on-surface-variant font-bold mb-1">Time & Duration</p>
            <p className="text-on-surface text-base">{request.time} ({request.duration})</p>
          </div>
        </div>

        {request.notes && (
          <div>
            <p className="text-on-surface-variant font-bold mb-2">Additional Notes</p>
            <div className="bg-surface-container-low p-4 rounded-xl text-on-surface text-sm leading-relaxed">
              {request.notes}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-outline-variant">
          {hasApplied ? (
            <div className="w-full py-4 text-center bg-surface-container-high text-on-surface-variant font-bold rounded-xl flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              You have already applied
            </div>
          ) : (
            <button 
              onClick={handleApply}
              disabled={applyMutation.isPending}
              className="w-full py-4 bg-primary text-on-primary font-bold text-lg rounded-xl shadow-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {applyMutation.isPending ? 'Applying...' : 'Apply Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
