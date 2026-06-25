'use client';
import React, { useState } from 'react';
import { useTutorRequests, useRequestApplicants, useUpdateApplicationStatus, useCreateAssignment, useUpdateRequestStatus } from '@/hooks/useApi';
import { useRouter, useParams } from 'next/navigation';

export default function RequestDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const requestId = parseInt(params.id as string);

  const { data: requests, isLoading: isLoadingReq } = useTutorRequests();
  const { data: applicants, isLoading: isLoadingApp } = useRequestApplicants(requestId);
  
  const updateApplication = useUpdateApplicationStatus();
  const createAssignment = useCreateAssignment();
  const updateRequest = useUpdateRequestStatus();

  const request = requests?.find((r: any) => r.id === requestId);

  const handleAssign = (tutorId: number, applicationId: number) => {
    if (!window.confirm('Are you sure you want to assign this tutor? This will close the request and notify the tutor and student.')) return;

    // 1. Accept this application
    updateApplication.mutate({ id: applicationId, status: 'ACCEPTED' });
    
    // 2. Reject others (optional, but good UX)
    applicants?.forEach((app: any) => {
      if (app.id !== applicationId) {
        updateApplication.mutate({ id: app.id, status: 'REJECTED' });
      }
    });

    // 3. Create assignment
    createAssignment.mutate({
      request_id: requestId,
      tutor_id: tutorId,
      student_id: request.student_id
    }, {
      onSuccess: () => {
        router.push('/admin/assignments');
      }
    });
  };

  const handleClose = () => {
    if (!window.confirm('Are you sure you want to close this request without assigning a tutor?')) return;
    updateRequest.mutate({ id: requestId, status: 'CLOSED' }, {
      onSuccess: () => router.push('/admin/requests')
    });
  };

  if (isLoadingReq || isLoadingApp) return <div className="p-8 text-center animate-pulse">Loading details...</div>;
  if (!request) return <div className="p-8 text-center text-error">Request not found.</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <button onClick={() => router.back()} className="text-primary font-bold text-sm mb-4 flex items-center gap-1 hover:underline">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
          </button>
          <h1 className="text-3xl font-extrabold text-on-surface">{request.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              request.status === 'OPEN' ? 'bg-primary-container text-on-primary-container' :
              request.status === 'FILLED' ? 'bg-secondary-container text-on-secondary-container' :
              'bg-surface-container-high text-on-surface-variant'
            }`}>{request.status}</span>
            <span className="text-sm text-on-surface-variant">Posted {new Date(request.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        {request.status === 'OPEN' && (
          <button onClick={handleClose} className="px-5 py-2.5 bg-error-container text-on-error-container rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition">
            Close Request
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant space-y-4">
            <h2 className="font-extrabold text-lg text-on-surface border-b border-outline-variant pb-2">Request Details</h2>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div><p className="text-on-surface-variant font-bold mb-1">Subject</p><p>{request.subject}</p></div>
              <div><p className="text-on-surface-variant font-bold mb-1">Student</p><p>{request.student?.parent_name || 'N/A'}</p></div>
              <div><p className="text-on-surface-variant font-bold mb-1">Level</p><p>{request.student_level || 'N/A'}</p></div>
              <div><p className="text-on-surface-variant font-bold mb-1">Salary</p><p className="font-extrabold text-primary">${request.salary}</p></div>
              <div><p className="text-on-surface-variant font-bold mb-1">Mode & Location</p><p>{request.mode} {request.location ? `- ${request.location}` : ''}</p></div>
              <div><p className="text-on-surface-variant font-bold mb-1">Schedule</p><p>{request.days_of_week} at {request.time} ({request.duration})</p></div>
            </div>
            {request.notes && (
              <div className="pt-2">
                <p className="text-on-surface-variant font-bold mb-1 text-sm">Notes</p>
                <p className="text-sm bg-surface-container-low p-3 rounded-lg">{request.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <h2 className="font-extrabold text-lg text-on-surface">Applicants ({applicants?.length || 0})</h2>
          
          {applicants?.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant text-center">
              <p className="text-on-surface-variant text-sm">No tutors have applied yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applicants?.map((app: any) => (
                <div key={app.id} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-on-surface text-base">{app.tutor?.user?.full_name || `Tutor #${app.tutor_id}`}</p>
                      <div className="flex items-center gap-1 mt-1 text-sm">
                        <span className="material-symbols-outlined text-amber-400 text-[16px]">star</span>
                        <span className="font-bold">{app.tutor?.rating || '0.0'}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {request.status === 'OPEN' && app.status === 'PENDING' && (
                    <button 
                      onClick={() => handleAssign(app.tutor_id, app.id)}
                      className="w-full mt-2 py-2 bg-primary text-on-primary font-bold text-sm rounded-lg hover:bg-primary/90 transition shadow-md"
                    >
                      Assign Tutor
                    </button>
                  )}
                  {app.status === 'ACCEPTED' && (
                    <div className="w-full mt-2 py-2 bg-secondary-container text-on-secondary-container text-center font-bold text-sm rounded-lg">
                      Assigned
                    </div>
                  )}
                  {app.status === 'REJECTED' && (
                    <div className="w-full mt-2 py-2 bg-surface-container-high text-on-surface-variant text-center font-bold text-sm rounded-lg">
                      Not Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
