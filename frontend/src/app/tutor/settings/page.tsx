'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUpdateMe } from '@/hooks/useApi';

export default function TutorSettingsPage() {
  const { user } = useAuth();
  const updateMe = useUpdateMe();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    password: '',
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
        <h1 className="text-2xl font-extrabold text-on-surface">Profile Settings</h1>
        <p className="text-sm text-on-surface-variant mt-1">Update your personal details and credentials.</p>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-on-surface mb-1">Email Address</label>
            <input type="email" value={user?.email || ''} disabled className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface-variant opacity-70" />
            <p className="text-xs text-on-surface-variant mt-1">Contact administration to change your email.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-1">Full Name</label>
            <input 
              type="text" 
              value={formData.full_name}
              onChange={e => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary/30 outline-none" 
            />
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
