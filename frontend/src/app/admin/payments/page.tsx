'use client';
import React, { useState } from 'react';
import { usePayments } from '@/hooks/useApi';

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState('All');
  const { data: fetchedPayments, isLoading, isError } = usePayments();

  const mappedPayments = (fetchedPayments || []).map((p: any) => ({
    id: `INV-${p.id.toString().padStart(3, '0')}`,
    student: `Student ${p.student_id}`, // Mock for now until API is expanded
    course: `Course ${p.course_id}`, // Mock for now
    amount: p.amount,
    date: p.due_date.split('T')[0],
    status: p.status === 'PAID' ? 'Paid' : p.status === 'OVERDUE' ? 'Overdue' : 'Pending',
  }));

  const filtered = mappedPayments.filter((p: any) => filter === 'All' || p.status === filter);
  const total = mappedPayments.reduce((s: number, p: any) => s + p.amount, 0);
  const paid = mappedPayments.filter((p: any) => p.status === 'Paid').reduce((s: number, p: any) => s + p.amount, 0);
  const overdue = mappedPayments.filter((p: any) => p.status === 'Overdue').reduce((s: number, p: any) => s + p.amount, 0);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading payments...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load payments.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Payments</h1>
        <p className="text-sm text-on-surface-variant mt-1">Track invoices, outstanding balances, and payment history.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary-container p-6 rounded-2xl">
          <p className="text-sm font-bold text-on-primary-container opacity-70 mb-1">Total Invoiced</p>
          <p className="text-3xl font-extrabold text-on-primary-container">${total.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
          <p className="text-sm font-bold text-on-surface-variant mb-1">Collected</p>
          <p className="text-3xl font-extrabold text-primary">${paid.toLocaleString()}</p>
        </div>
        <div className="bg-error-container p-6 rounded-2xl">
          <p className="text-sm font-bold text-on-error-container opacity-70 mb-1">Overdue</p>
          <p className="text-3xl font-extrabold text-on-error-container">${overdue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex gap-3">
        {['All', 'Paid', 'Pending', 'Overdue'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >{f}</button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              {['Invoice', 'Student', 'Course', 'Amount', 'Date', 'Status'].map(h => (
                <th key={h} className="text-left px-6 py-4 font-bold text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-on-surface-variant text-xs">{p.id}</td>
                <td className="px-6 py-4 font-bold text-on-surface">{p.student}</td>
                <td className="px-6 py-4 text-on-surface-variant">{p.course}</td>
                <td className="px-6 py-4 font-extrabold text-on-surface">${p.amount}</td>
                <td className="px-6 py-4 text-on-surface-variant">{p.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    p.status === 'Paid' ? 'bg-primary-container text-on-primary-container' :
                    p.status === 'Pending' ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-error-container text-on-error-container'
                  }`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
