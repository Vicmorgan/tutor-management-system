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

  const handleCreateStudent = (data: { email: string; full_name: string; parent_name?: string; parent_phone?: string }) => {
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

  const filtered = (students || []).filter((s: any) => {
    const matchesSearch = s.full_name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || s.student_profile?.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading students...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load students.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Students</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage enrolled students and their parent contacts.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        {['All', 'ACTIVE', 'SUSPENDED'].map(f => (
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
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Parent Name</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Parent Phone</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Status</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((s: any) => (
              <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm shrink-0">
                      {s.full_name.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{s.full_name}</p>
                      <p className="text-xs text-on-surface-variant">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface font-medium">{s.student_profile?.parent_name || '-'}</td>
                <td className="px-6 py-4 text-on-surface-variant">{s.student_profile?.parent_phone || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.student_profile?.status === 'ACTIVE' ? 'bg-primary-container text-on-primary-container' :
                    'bg-error-container text-on-error-container'
                  }`}>{s.student_profile?.status || 'UNKNOWN'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
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
