'use client';
import React, { useState } from 'react';
import { useTutors, useCreateTutor, useDeleteUser } from '@/hooks/useApi';
import { CreateUserModal } from '@/components/modals/CreateUserModal';

const subjectColors: Record<string, string> = {
  Physics: 'bg-blue-100 text-blue-800',
  Mathematics: 'bg-purple-100 text-purple-800',
  Literature: 'bg-amber-100 text-amber-800',
  Chemistry: 'bg-green-100 text-green-800',
  Biology: 'bg-teal-100 text-teal-800',
  History: 'bg-orange-100 text-orange-800',
};

export default function AdminTutorsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tutors, isLoading, isError } = useTutors();
  const createTutor = useCreateTutor();
  const deleteUser = useDeleteUser();

  const handleCreateTutor = (data: { email: string; full_name: string }) => {
    createTutor.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      }
    });
  };

  const handleDeleteTutor = (id: number) => {
    if (window.confirm('Are you sure you want to delete this tutor?')) {
      deleteUser.mutate(id);
    }
  };

  const mappedTutors = (tutors || []).map((t: any) => ({
    id: t.id,
    name: t.full_name,
    email: t.email,
    subject: 'Unassigned',
    students: 0,
    rating: 0.0,
    status: 'Active',
    joined: 'Unknown'
  }));

  const filtered = mappedTutors.filter((t: any) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading tutors...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load tutors.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Tutors</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage and monitor all registered tutors.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Tutor
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Tutors', value: mappedTutors.length, icon: 'supervisor_account', color: 'bg-primary-container text-on-primary-container' },
          { label: 'Active', value: mappedTutors.filter((t: any) => t.status === 'Active').length, icon: 'check_circle', color: 'bg-surface-container-low text-on-surface' },
          { label: 'On Leave / Inactive', value: mappedTutors.filter((t: any) => t.status !== 'Active').length, icon: 'warning', color: 'bg-error-container text-on-error-container' },
        ].map((s, i) => (
          <div key={i} className={`${s.color} p-5 rounded-2xl flex items-center gap-4`}>
            <span className="material-symbols-outlined text-[32px]">{s.icon}</span>
            <div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-sm opacity-80">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            type="text" placeholder="Search by name or subject..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        {['All', 'Active', 'On Leave', 'Inactive'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Tutor</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Subject</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Students</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Rating</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Status</th>
              <th className="text-left px-6 py-4 font-bold text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((t: any) => (
              <tr key={t.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                      {t.name.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{t.name}</p>
                      <p className="text-xs text-on-surface-variant">{t.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${subjectColors[t.subject] || 'bg-surface-container text-on-surface'}`}>{t.subject}</span>
                </td>
                <td className="px-6 py-4 font-bold text-on-surface">{t.students}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]">star</span>
                    <span className="font-bold text-on-surface">{t.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    t.status === 'Active' ? 'bg-primary-container text-on-primary-container' :
                    t.status === 'On Leave' ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-error-container text-on-error-container'
                  }`}>{t.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition text-on-surface-variant" title="View Profile">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button onClick={() => handleDeleteTutor(t.id)} className="p-2 rounded-lg bg-surface-container hover:bg-error-container hover:text-error transition text-on-surface-variant" title="Delete">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">search_off</span>
            No tutors match your search.
          </div>
        )}
      </div>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role="Tutor"
        onSubmit={handleCreateTutor}
        isLoading={createTutor.isPending}
      />
    </div>
  );
}
