'use client';
import React, { useState, useMemo } from 'react';
import { PaymentModal } from '@/components/payments/PaymentModal';
import { usePayments } from '@/hooks/useApi';

export default function StudentPaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paidIds, setPaidIds] = useState<string[]>([]);
  const { data: payments, isLoading, isError } = usePayments();

  const invoices = useMemo(() => {
    return (payments || []).map((p: any) => ({
      id: `INV-${p.id.toString().padStart(3, '0')}`,
      course: `Course ${p.course_id}`, // Mock
      tutor: 'Tutor Name', // Mock
      amount: p.amount,
      date: p.due_date.split('T')[0],
      status: p.status === 'PAID' ? 'Paid' : p.status === 'OVERDUE' ? 'Overdue' : 'Upcoming',
      rawId: p.id
    }));
  }, [payments]);

  const totalPaid = invoices.filter((i: any) => i.status === 'Paid').reduce((s: number, i: any) => s + i.amount, 0);
  const totalOverdue = invoices.filter((i: any) => i.status === 'Overdue' && !paidIds.includes(i.id)).reduce((s: number, i: any) => s + i.amount, 0);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading payments...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load payments.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Payments</h1>
        <p className="text-sm text-on-surface-variant mt-1">Your invoice history and outstanding balances.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary-container p-6 rounded-2xl">
          <p className="text-sm font-bold text-on-primary-container opacity-70 mb-1">Total Paid</p>
          <p className="text-3xl font-extrabold text-on-primary-container">${totalPaid}</p>
        </div>
        <div className={`p-6 rounded-2xl ${totalOverdue > 0 ? 'bg-error-container' : 'bg-surface-container-low border border-outline-variant'}`}>
          <p className={`text-sm font-bold mb-1 ${totalOverdue > 0 ? 'text-on-error-container opacity-70' : 'text-on-surface-variant'}`}>Outstanding</p>
          <p className={`text-3xl font-extrabold ${totalOverdue > 0 ? 'text-on-error-container' : 'text-on-surface'}`}>${totalOverdue}</p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
          <p className="text-sm font-bold text-on-surface-variant mb-1">Upcoming</p>
          <p className="text-3xl font-extrabold text-on-surface">${invoices.filter(i => i.status === 'Upcoming').reduce((s, i) => s + i.amount, 0)}</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              {['Invoice', 'Course', 'Tutor', 'Amount', 'Date', 'Status', ''].map((h, i) => (
                <th key={i} className="text-left px-6 py-4 font-bold text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {invoices.map(inv => {
              const isPaid = inv.status === 'Paid' || paidIds.includes(inv.id);
              return (
                <tr key={inv.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-on-surface-variant text-xs">{inv.id}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">{inv.course}</td>
                  <td className="px-6 py-4 text-on-surface-variant text-xs">{inv.tutor}</td>
                  <td className="px-6 py-4 font-extrabold text-on-surface">${inv.amount}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{inv.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isPaid ? 'bg-primary-container text-on-primary-container' :
                      inv.status === 'Overdue' ? 'bg-error-container text-on-error-container' :
                      'bg-surface-container text-on-surface-variant'
                    }`}>{isPaid && inv.status !== 'Paid' ? 'Paid' : inv.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    {inv.status === 'Overdue' && !paidIds.includes(inv.id) && (
                      <button onClick={() => setIsModalOpen(true)}
                        className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition shadow-sm">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={100}
        description="Intro to Literature (Overdue Balance)"
        onSuccess={() => setPaidIds(prev => [...prev, 'INV-003'])}
      />
    </div>
  );
}
