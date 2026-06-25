'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (!res.ok) throw new Error('Invalid email or password');

      const data = await res.json();
      const userRes = await fetch('http://localhost:8000/api/auth/me', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      if (!userRes.ok) throw new Error('Failed to fetch user profile');
      const userData = await userRes.json();

      login(data.access_token, userData);
      if (userData.role === 'ADMIN') router.push('/admin');
      else if (userData.role === 'TUTOR') router.push('/tutor');
      else router.push('/student');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-on-primary text-[32px]">school</span>
            </div>
            <h1 className="text-3xl font-extrabold text-primary mb-1 tracking-tight">EduTeach</h1>
            <p className="text-sm text-on-surface-variant">Sign in to your portal</p>
          </div>

          {/* Error */}
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

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-[13px] font-bold mb-1.5 text-on-surface">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@eduteach.com"
                className="w-full box-border px-4 py-3 rounded-xl border border-outline-variant/50 text-sm bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold mb-1.5 text-on-surface">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full box-border px-4 py-3 rounded-xl border border-outline-variant/50 text-sm bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3.5 rounded-xl text-on-primary text-[15px] font-bold shadow-lg shadow-primary/20 transition-all ${
                loading ? 'bg-outline-variant cursor-not-allowed shadow-none' : 'bg-primary hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed">
            <p className="font-extrabold text-on-surface mb-2">Demo Credentials:</p>
            <p><strong>Admin:</strong> admin@eduteach.com / Admin1234!</p>
            <p><strong>Tutor:</strong> tutor@eduteach.com / Tutor1234!</p>
            <p><strong>Student:</strong> student@eduteach.com / Student1234!</p>
          </div>
          
          <div className="mt-6 text-center text-sm text-on-surface-variant">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline transition-all">Join as a Tutor</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
