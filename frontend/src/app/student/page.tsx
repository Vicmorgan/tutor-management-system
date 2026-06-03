'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { PaymentModal } from '../../components/payments/PaymentModal';

export default function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-h2 font-bold text-on-surface">Welcome back, {user?.full_name.split(' ')[0]}</h1>
          <p className="text-body-md text-on-surface-variant">Here is your learning progress for this week.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gamified Progress Tracker */}
        <div className="bg-primary p-8 rounded-3xl text-on-primary flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full border-4 border-on-primary/30 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[48px] text-primary-fixed">military_tech</span>
            </div>
            <h2 className="text-h2 font-bold">Top 5%</h2>
            <p className="text-body-lg opacity-90">Student Rank</p>
            <div className="mt-6 flex items-center justify-center gap-6">
              <div>
                <p className="text-h3 font-bold">24</p>
                <p className="text-label-sm opacity-80">Classes</p>
              </div>
              <div className="w-[1px] h-8 bg-on-primary/30"></div>
              <div>
                <p className="text-h3 font-bold">98%</p>
                <p className="text-label-sm opacity-80">Attendance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">assignment</span>
            </div>
            <p className="text-h2 font-bold text-on-surface">3</p>
            <p className="text-label-sm text-on-surface-variant">Pending Assignments</p>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <p className="text-h2 font-bold text-on-surface">12</p>
            <p className="text-label-sm text-on-surface-variant">Completed Lessons</p>
          </div>

          <div className="col-span-2 bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex items-center justify-between">
            <div>
              <h3 className="font-bold text-on-surface text-h3">Advanced Physics 301</h3>
              <p className="text-label-sm text-on-surface-variant">Next class today at 10:00 AM</p>
            </div>
            <button 
              onClick={() => router.push('/room/class_101')}
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition shadow-lg"
            >
              Join Class
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Progress */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
          <h2 className="text-h3 font-bold text-on-surface mb-6">Course Progress</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-on-surface text-label-md">Advanced Physics 301</h4>
                <span className="text-label-sm font-bold text-primary">75%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-on-surface text-label-md">Calculus I</h4>
                <span className="text-label-sm font-bold text-primary">40%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-on-surface text-label-md">Intro to Literature</h4>
                <span className="text-label-sm font-bold text-primary">90%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items / Homework */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6">
          <h2 className="text-h3 font-bold text-on-surface mb-6">Upcoming Deadlines</h2>
          
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-4 rounded-xl ${isPaid ? 'bg-surface border border-outline-variant' : 'bg-error-container/20 border border-error-container'}`}>
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${isPaid ? 'text-primary' : 'text-error'}`}>
                  {isPaid ? 'check_circle' : 'payments'}
                </span>
                <div>
                  <h4 className="font-bold text-on-surface text-label-md">Overdue Tuition Payment</h4>
                  <p className={`text-label-sm ${isPaid ? 'text-on-surface-variant' : 'text-error'}`}>
                    {isPaid ? 'Paid successfully' : 'Due Yesterday, $150.00'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => !isPaid && setIsPaymentModalOpen(true)}
                disabled={isPaid}
                className={`px-4 py-2 rounded-lg text-label-sm font-bold shadow-sm ${isPaid ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed' : 'bg-primary text-on-primary hover:bg-primary/90'}`}
              >
                {isPaid ? 'Receipt' : 'Pay Now'}
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary-container/10 border border-secondary-container">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">assignment</span>
                <div>
                  <h4 className="font-bold text-on-surface text-label-md">Calculus Worksheet 4</h4>
                  <p className="text-label-sm text-on-surface-variant">Due Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-sm font-bold shadow-sm hover:bg-surface-container-low">View</button>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={150.00}
        description="Overdue Tuition (Calculus 101)"
        onSuccess={() => setIsPaid(true)}
      />
    </div>
  );
}
