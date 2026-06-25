'use client';
import React, { useState } from 'react';
import { useCreateRequest, useStudents } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';

export default function NewRequestPage() {
  const router = useRouter();
  const { data: students } = useStudents();
  const createRequest = useCreateRequest();

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    student_id: '',
    student_level: '',
    salary: '',
    mode: 'Online',
    location: '',
    days_of_week: '',
    time: '',
    duration: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRequest.mutate({
      ...formData,
      student_id: parseInt(formData.student_id),
      salary: parseFloat(formData.salary)
    }, {
      onSuccess: () => router.push('/admin/requests')
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Create Tutor Request</h1>
        <p className="text-sm text-on-surface-variant mt-1">Publish a new opportunity for tutors.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-bold text-on-surface mb-2">Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary" placeholder="e.g. Need Math Tutor for Grade 10" />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Subject</label>
            <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary" placeholder="e.g. Mathematics" />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Student</label>
            <select required value={formData.student_id} onChange={e => setFormData({...formData, student_id: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary">
              <option value="">Select a student...</option>
              {students?.map((s: any) => <option key={s.id} value={s.student_profile?.id}>{s.full_name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Student Level</label>
            <input type="text" value={formData.student_level} onChange={e => setFormData({...formData, student_level: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary" placeholder="e.g. Grade 10" />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Salary ($)</label>
            <input required type="number" step="0.01" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary" placeholder="e.g. 50.00" />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Mode</label>
            <select value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary">
              <option>Online</option>
              <option>Physical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Location (if Physical)</label>
            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary" placeholder="e.g. 123 Main St" />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Days of Week</label>
            <input type="text" value={formData.days_of_week} onChange={e => setFormData({...formData, days_of_week: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary" placeholder="e.g. Mon, Wed" />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Time</label>
            <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary" placeholder="e.g. 4:00 PM" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold text-on-surface mb-2">Additional Notes</label>
            <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary h-24" placeholder="Any specific requirements..."></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 font-bold text-on-surface-variant hover:bg-surface-container rounded-xl transition">Cancel</button>
          <button type="submit" disabled={createRequest.isPending} className="px-6 py-3 font-bold bg-primary text-on-primary rounded-xl hover:bg-primary/90 shadow-md transition disabled:opacity-50">
            Publish Request
          </button>
        </div>
      </form>
    </div>
  );
}
