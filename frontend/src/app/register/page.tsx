'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', confirm_password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirm_password) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Registration failed');

      // Fetch user profile to populate AuthContext
      const userRes = await fetch('http://localhost:8000/api/auth/me', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      if (!userRes.ok) throw new Error('Failed to fetch user profile');
      
      const userData = await userRes.json();
      login(data.access_token, userData);
      
      router.push('/tutor');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[440px] bg-surface rounded-[24px] shadow-xl shadow-primary/5 p-10 border border-outline-variant/30 relative overflow-hidden"
      >
        {/* Decorative background blur */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-on-primary text-[32px]">school</span>
            </div>
            <h1 className="text-3xl font-extrabold text-primary mb-1 tracking-tight">Join EduTeach</h1>
            <p className="text-sm text-on-surface-variant">Apply to become a verified tutor.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-error-container text-on-error-container rounded-xl p-3 mb-6 text-sm font-semibold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block text-[13px] font-bold mb-1.5 text-on-surface">Full Name</label>
              <input
                type="text" required value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="e.g. Jane Doe"
                className="w-full box-border px-4 py-3 rounded-xl border border-outline-variant/50 text-sm bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold mb-1.5 text-on-surface">Email Address</label>
              <input
                type="email" required value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. jane@example.com"
                className="w-full box-border px-4 py-3 rounded-xl border border-outline-variant/50 text-sm bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold mb-1.5 text-on-surface">Password</label>
              <input
                type="password" required value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full box-border px-4 py-3 rounded-xl border border-outline-variant/50 text-sm bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold mb-1.5 text-on-surface">Confirm Password</label>
              <input
                type="password" required value={formData.confirm_password}
                onChange={e => setFormData({ ...formData, confirm_password: e.target.value })}
                placeholder="••••••••"
                className="w-full box-border px-4 py-3 rounded-xl border border-outline-variant/50 text-sm bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className={`w-full mt-2 p-3.5 rounded-xl text-on-primary text-[15px] font-bold shadow-lg shadow-primary/20 transition-all ${
                loading ? 'bg-outline-variant cursor-not-allowed shadow-none' : 'bg-primary hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
              }`}
            >
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-on-surface-variant">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline transition-all">Sign In</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
