'use client';
import React, { useState } from 'react';

const assignments = [
  { id: 1, title: 'Kinematics Problem Set', course: 'Advanced Physics 301', due: '2024-06-03', submissions: 10, graded: 5, total: 12, status: 'Pending' },
  { id: 2, title: 'Calculus Worksheet 4', course: 'Calculus I', due: '2024-06-04', submissions: 8, graded: 8, total: 8, status: 'Graded' },
  { id: 3, title: 'Thermodynamics Lab Report', course: 'Advanced Physics 301', due: '2024-06-10', submissions: 3, graded: 0, total: 12, status: 'Open' },
  { id: 4, title: 'Integration Methods Quiz', course: 'Calculus I', due: '2024-06-12', submissions: 0, graded: 0, total: 8, status: 'Open' },
];

export default function TutorAssignmentsPage() {
  const [tab, setTab] = useState<'All' | 'Open' | 'Pending' | 'Graded'>('All');
  const filtered = assignments.filter(a => tab === 'All' || a.status === tab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Assignments</h1>
          <p className="text-sm text-on-surface-variant mt-1">Create and grade student assignments.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Assignment
        </button>
      </div>

      <div className="flex gap-2">
        {(['All', 'Open', 'Pending', 'Graded'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition relative ${tab === t ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >
            {t}
            {t === 'Pending' && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-error text-on-error rounded-full text-[9px] font-bold flex items-center justify-center">
              {assignments.filter(a => a.status === 'Pending').length}
            </span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-extrabold text-on-surface">{a.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    a.status === 'Graded' ? 'bg-primary-container text-on-primary-container' :
                    a.status === 'Pending' ? 'bg-error-container text-on-error-container' :
                    'bg-surface-container text-on-surface-variant'
                  }`}>{a.status}</span>
                </div>
                <p className="text-sm text-on-surface-variant">{a.course} · Due {a.due}</p>
              </div>
              <button className="px-4 py-2 bg-surface-container border border-outline-variant rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container-high transition">
                {a.status === 'Pending' ? 'Grade Now' : a.status === 'Open' ? 'View' : 'Results'}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-surface-container rounded-xl">
                <p className="text-lg font-extrabold text-on-surface">{a.submissions}/{a.total}</p>
                <p className="text-xs text-on-surface-variant">Submissions</p>
              </div>
              <div className="text-center p-3 bg-surface-container rounded-xl">
                <p className="text-lg font-extrabold text-primary">{a.graded}</p>
                <p className="text-xs text-on-surface-variant">Graded</p>
              </div>
              <div className="text-center p-3 bg-surface-container rounded-xl">
                <p className="text-lg font-extrabold text-on-surface">{a.total - a.submissions}</p>
                <p className="text-xs text-on-surface-variant">Pending</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
