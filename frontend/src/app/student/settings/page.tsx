'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUpdateMe } from '@/hooks/useApi';

export default function StudentSettingsPage() {
  const { user } = useAuth();
  const updateMe = useUpdateMe();
  
  // Student specific details usually attached if fetched from /me or auth context
  // For MVP, we allow setting them. They won't display if not in user object initially unless re-fetched.
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    password: '',
    parent_name: '',
    parent_phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMe.mutate(formData, {
      onSuccess: () => {
        alert('Settings updated successfully! Please reload if name changed.');
        setFormData({ ...formData, password: '' });
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Account Settings</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manage your student profile and parent details.</p>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-on-surface mb-1">Student Email Address</label>
            <input type="email" value={user?.email || ''} disabled className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface-variant opacity-70" />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-1">Student Full Name</label>
            <input 
              type="text" 
              value={formData.full_name}
              onChange={e => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary/30 outline-none" 
            />
          </div>

          <div className="pt-4 border-t border-outline-variant">
            <h3 className="text-sm font-extrabold mb-3">Parent / Guardian Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Parent Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe"
                  value={formData.parent_name}
                  onChange={e => setFormData({ ...formData, parent_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary/30 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-1">Parent Phone</label>
                <input 
                  type="text" 
                  placeholder="e.g. +1 234 567 890"
                  value={formData.parent_phone}
                  onChange={e => setFormData({ ...formData, parent_phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary/30 outline-none" 
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant">
            <h3 className="text-sm font-extrabold mb-3">Security</h3>
            <label className="block text-sm font-bold text-on-surface mb-1">New Password (leave blank to keep current)</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary/30 outline-none" 
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={updateMe.isPending}
              className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl shadow-md hover:bg-primary/90 transition disabled:opacity-50"
            >
              {updateMe.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
