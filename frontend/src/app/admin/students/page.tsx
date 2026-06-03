'use client';
import React, { useState } from 'react';
import { useStudents, useCreateStudent, useDeleteUser } from '@/hooks/useApi';
import { CreateUserModal } from '@/components/modals/CreateUserModal';

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: students, isLoading, isError } = useStudents();
  const createStudent = useCreateStudent();
  const deleteUser = useDeleteUser();

  const handleCreateStudent = (data: { email: string; full_name: string }) => {
    createStudent.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      }
    });
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteUser.mutate(id);
    }
  };

  // Temporary mapping since backend User model doesn't have all UI fields yet
  const mappedStudents = (students || []).map((s: any) => ({
    id: s.id,
    name: s.full_name,
    email: s.email,
    grade: 'N/A', // To be added to backend profile
    tutor: 'Unassigned',
    courses: 0,
    attendance: 100,
    status: 'Active',
    enrolled: 'Unknown'
  }));

  const filtered = mappedStudents.filter((s: any) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading students...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load students.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Students</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage enrolled students and track their progress.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Enroll Student
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: mappedStudents.length, icon: 'school', color: 'bg-surface-container-low' },
          { label: 'Active', value: mappedStudents.filter((s: any) => s.status === 'Active').length, icon: 'check_circle', color: 'bg-primary-container' },
          { label: 'At Risk', value: mappedStudents.filter((s: any) => s.status === 'At Risk').length, icon: 'warning', color: 'bg-secondary-container' },
          { label: 'Suspended', value: mappedStudents.filter((s: any) => s.status === 'Suspended').length, icon: 'block', color: 'bg-error-container' },
        ].map((s, i) => (
          <div key={i} className={`${s.color} p-5 rounded-2xl flex items-center gap-4`}>
            <span className="material-symbols-outlined text-[28px] opacity-80">{s.icon}</span>
            <div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-xs opacity-70 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input type="text" placeholder="Search by name or grade..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        {['All', 'Active', 'At Risk', 'Suspended'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{f}</button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Student</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Grade</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Tutor</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Attendance</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Status</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm shrink-0">
                      {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{s.name}</p>
                      <p className="text-xs text-on-surface-variant">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface font-medium">{s.grade}</td>
                <td className="px-6 py-4 text-on-surface-variant text-xs">{s.tutor}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-outline-variant overflow-hidden w-20">
                      <div className={`h-full rounded-full ${s.attendance >= 90 ? 'bg-primary' : s.attendance >= 75 ? 'bg-secondary' : 'bg-error'}`} style={{ width: `${s.attendance}%` }}></div>
                    </div>
                    <span className="font-bold text-on-surface text-xs">{s.attendance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.status === 'Active' ? 'bg-primary-container text-on-primary-container' :
                    s.status === 'At Risk' ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-error-container text-on-error-container'
                  }`}>{s.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition text-on-surface-variant" title="View"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                    <button onClick={() => handleDeleteStudent(s.id)} className="p-2 rounded-lg bg-surface-container hover:bg-error-container hover:text-error transition text-on-surface-variant" title="Delete"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">search_off</span>
            No students match your search.
          </div>
        )}
      </div>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role="Student"
        onSubmit={handleCreateStudent}
        isLoading={createStudent.isPending}
      />
    </div>
  );
}
