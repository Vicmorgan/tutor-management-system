'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9ff',
      padding: '1rem',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 8px 40px rgba(0,108,73,0.12)',
        padding: '48px 40px',
        border: '1px solid #bbcabf',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            backgroundColor: '#006c49', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 16px',
            boxShadow: '0 4px 16px rgba(0,108,73,0.3)',
          }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '32px' }}>school</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#006c49', margin: '0 0 4px' }}>EduTeach</h1>
          <p style={{ fontSize: '14px', color: '#3c4a42', margin: 0 }}>Sign in to your portal</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: '#ffdad6', color: '#93000a',
            borderRadius: '10px', padding: '12px 16px',
            marginBottom: '20px', fontSize: '14px', fontWeight: '500',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#0b1c30' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@eduteach.com"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '12px 16px', borderRadius: '12px',
                border: '1.5px solid #bbcabf', fontSize: '14px',
                backgroundColor: '#eff4ff', color: '#0b1c30', outline: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#0b1c30' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '12px 16px', borderRadius: '12px',
                border: '1.5px solid #bbcabf', fontSize: '14px',
                backgroundColor: '#eff4ff', color: '#0b1c30', outline: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: '12px',
              backgroundColor: loading ? '#6c7a71' : '#006c49',
              color: '#fff', fontSize: '15px', fontWeight: '700',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(0,108,73,0.25)',
              fontFamily: "'Inter', sans-serif",
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo credentials */}
        <div style={{
          marginTop: '24px', padding: '16px', borderRadius: '12px',
          backgroundColor: '#eff4ff', fontSize: '12px', color: '#3c4a42',
          lineHeight: '1.8',
        }}>
          <p style={{ fontWeight: '700', color: '#0b1c30', margin: '0 0 8px' }}>Demo Credentials:</p>
          <p style={{ margin: '2px 0' }}>
            <strong>Admin:</strong> admin@eduteach.com / Admin1234!
          </p>
          <p style={{ margin: '2px 0' }}>
            <strong>Tutor:</strong> tutor@eduteach.com / Tutor1234!
          </p>
          <p style={{ margin: '2px 0' }}>
            <strong>Student:</strong> student@eduteach.com / Student1234!
          </p>
        </div>
      </div>
    </div>
  );
}
