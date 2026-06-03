'use client';
import React, { useMemo } from 'react';
import { usePayments } from '@/hooks/useApi';

const monthlyEarnings = [
  { month: 'Jan', amount: 1200 }, { month: 'Feb', amount: 1450 }, { month: 'Mar', amount: 1380 },
  { month: 'Apr', amount: 1600 }, { month: 'May', amount: 1750 }, { month: 'Jun', amount: 980 },
];
const maxEarning = Math.max(...monthlyEarnings.map(m => m.amount));

export default function TutorEarningsPage() {
  const { data: payments, isLoading, isError } = usePayments();

  const recentPayouts = useMemo(() => {
    return (payments || []).map((p: any) => ({
      date: p.due_date.split('T')[0],
      description: `Course ${p.course_id} payout`, // Mock
      amount: p.amount,
      status: p.status === 'PAID' ? 'Paid' : 'Pending'
    }));
  }, [payments]);
  const totalEarned = recentPayouts.filter((p: any) => p.status === 'Paid').reduce((s: number, p: any) => s + p.amount, 0);
  const pending = recentPayouts.filter((p: any) => p.status === 'Pending').reduce((s: number, p: any) => s + p.amount, 0);

  if (isLoading) return <div className="p-8 text-center text-on-surface-variant animate-pulse">Loading earnings...</div>;
  if (isError) return <div className="p-8 text-center text-error">Failed to load earnings.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Earnings</h1>
        <p className="text-sm text-on-surface-variant mt-1">Your income summary and payout history.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary p-6 rounded-2xl text-on-primary shadow-lg">
          <p className="text-sm font-bold opacity-80 mb-1">Total Earned (2024)</p>
          <p className="text-3xl font-extrabold">${monthlyEarnings.reduce((s, m) => s + m.amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
          <p className="text-sm font-bold text-on-surface-variant mb-1">Collected</p>
          <p className="text-3xl font-extrabold text-primary">${totalEarned.toLocaleString()}</p>
        </div>
        <div className="bg-secondary-container p-6 rounded-2xl">
          <p className="text-sm font-bold text-on-secondary-container opacity-70 mb-1">Pending Payout</p>
          <p className="text-3xl font-extrabold text-on-secondary-container">${pending.toLocaleString()}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
        <h2 className="font-extrabold text-on-surface mb-6">Monthly Earnings</h2>
        <div className="flex items-end gap-3 h-40">
          {monthlyEarnings.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-primary">${m.amount}</span>
              <div
                className="w-full rounded-t-lg bg-primary transition-all duration-500"
                style={{ height: `${(m.amount / maxEarning) * 100}%`, minHeight: '8px' }}
              ></div>
              <span className="text-xs text-on-surface-variant font-medium">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant">
          <h2 className="font-extrabold text-on-surface">Payout History</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              {['Date', 'Description', 'Amount', 'Status'].map(h => (
                <th key={h} className="text-left px-6 py-3 font-bold text-on-surface-variant">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {recentPayouts.map((p, i) => (
              <tr key={i} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 text-on-surface-variant text-xs">{p.date}</td>
                <td className="px-6 py-4 font-medium text-on-surface">{p.description}</td>
                <td className="px-6 py-4 font-extrabold text-on-surface">${p.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    p.status === 'Paid' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'
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
