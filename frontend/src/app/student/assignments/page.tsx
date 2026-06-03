'use client';
import React, { useState } from 'react';

const studentAssignments = [
  { id: 1, title: 'Kinematics Problem Set', course: 'Advanced Physics 301', due: '2024-06-03', status: 'Due Soon', submitted: false },
  { id: 2, title: 'Calculus Worksheet 4', course: 'Calculus I', due: '2024-06-04', status: 'Not Started', submitted: false },
  { id: 3, title: 'Essay: Gatsby Themes', course: 'Intro to Literature', due: '2024-05-28', status: 'Submitted', submitted: true, grade: 'A' },
  { id: 4, title: 'Periodic Table Quiz', course: 'Chemistry 201', due: '2024-05-25', status: 'Graded', submitted: true, grade: 'B+' },
  { id: 5, title: 'Thermodynamics Lab', course: 'Advanced Physics 301', due: '2024-06-10', status: 'Not Started', submitted: false },
];

const gradeColor: Record<string, string> = {
  'A': 'bg-primary-container text-on-primary-container',
  'B+': 'bg-secondary-container text-on-secondary-container',
  'B': 'bg-surface-container text-on-surface',
};

export default function StudentAssignmentsPage() {
  const [tab, setTab] = useState<'All' | 'Pending' | 'Submitted'>('All');
  const filtered = studentAssignments.filter(a => 
    tab === 'All' || (tab === 'Pending' && !a.submitted) || (tab === 'Submitted' && a.submitted)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Assignments</h1>
        <p className="text-sm text-on-surface-variant mt-1">Track and submit your homework and tasks.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-error-container p-5 rounded-2xl flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-on-error-container">assignment_late</span>
          <div>
            <p className="text-2xl font-extrabold text-on-error-container">{studentAssignments.filter(a => !a.submitted).length}</p>
            <p className="text-xs text-on-error-container opacity-80">Pending</p>
          </div>
        </div>
        <div className="bg-primary-container p-5 rounded-2xl flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-on-primary-container">assignment_turned_in</span>
          <div>
            <p className="text-2xl font-extrabold text-on-primary-container">{studentAssignments.filter(a => a.submitted).length}</p>
            <p className="text-xs text-on-primary-container opacity-80">Submitted</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-secondary">grade</span>
          <div>
            <p className="text-2xl font-extrabold text-on-surface">{studentAssignments.filter(a => a.status === 'Graded').length}</p>
            <p className="text-xs text-on-surface-variant">Graded</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {(['All', 'Pending', 'Submitted'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${tab === t ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{t}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(a => (
          <div key={a.id} className={`bg-surface-container-lowest rounded-2xl border p-5 flex items-center gap-5 ${a.status === 'Due Soon' ? 'border-error' : 'border-outline-variant'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${a.submitted ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
              <span className="material-symbols-outlined">{a.submitted ? 'check_circle' : 'assignment'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-on-surface">{a.title}</p>
              <p className="text-xs text-on-surface-variant mt-0.5">{a.course} · Due {a.due}</p>
            </div>
            {a.grade && (
              <span className={`px-3 py-1 rounded-full text-sm font-extrabold ${gradeColor[a.grade] || 'bg-surface-container text-on-surface'}`}>{a.grade}</span>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
              a.status === 'Graded' ? 'bg-primary-container text-on-primary-container' :
              a.status === 'Submitted' ? 'bg-surface-container text-on-surface' :
              a.status === 'Due Soon' ? 'bg-error-container text-on-error-container' :
              'bg-surface-container-high text-on-surface-variant'
            }`}>{a.status}</span>
            {!a.submitted && (
              <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold shrink-0 hover:opacity-90 transition shadow-sm">
                Submit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
