'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onSuccess: () => void;
};

export const PaymentModal = ({ isOpen, onClose, amount, description, onSuccess }: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
      onClose();
    }, 1500);
  };

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(11,28,48,0.6)', backdropFilter: 'blur(6px)',
      padding: '1rem',
    }}>
      <div style={{
        background: '#ffffff', width: '100%', maxWidth: '460px',
        borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,108,73,0.15)',
        overflow: 'hidden', fontFamily: "'Inter', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid #bbcabf',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0b1c30' }}>Secure Payment</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#6c7a71', padding: '4px',
          }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Summary */}
        <div style={{ padding: '20px 24px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#eff4ff', padding: '16px', borderRadius: '12px',
            border: '1.5px solid #bbcabf', marginBottom: '20px',
          }}>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#6c7a71' }}>Paying for</p>
              <p style={{ margin: 0, fontWeight: 700, color: '#0b1c30', fontSize: '15px' }}>{description}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#6c7a71' }}>Amount</p>
              <p style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#006c49' }}>${amount.toFixed(2)}</p>
            </div>
          </div>

          {/* Card Number */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#0b1c30' }}>
              Card Number
            </label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                color: '#6c7a71', fontSize: '20px',
              }}>credit_card</span>
              <input
                type="text" placeholder="•••• •••• •••• ••••"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  paddingLeft: '40px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px',
                  borderRadius: '12px', border: '1.5px solid #bbcabf',
                  fontSize: '14px', background: '#f8f9ff', color: '#0b1c30',
                  outline: 'none', fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Expiry + CVC */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#0b1c30' }}>
                Expiry
              </label>
              <input
                type="text" placeholder="MM/YY"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #bbcabf',
                  fontSize: '14px', background: '#f8f9ff', color: '#0b1c30',
                  outline: 'none', fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#0b1c30' }}>
                CVC
              </label>
              <input
                type="text" placeholder="123"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #bbcabf',
                  fontSize: '14px', background: '#f8f9ff', color: '#0b1c30',
                  outline: 'none', fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px', background: '#f8f9ff', borderTop: '1px solid #bbcabf',
          display: 'flex', gap: '12px',
        }}>
          <button
            onClick={onClose} disabled={loading}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              border: '1.5px solid #6c7a71', background: 'transparent',
              color: '#0b1c30', fontSize: '15px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handlePay} disabled={loading}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              background: loading ? '#6c7a71' : '#006c49', border: 'none',
              color: '#ffffff', fontSize: '15px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(0,108,73,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              fontFamily: "'Inter', sans-serif",
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', animation: 'spin 1s linear infinite' }}>progress_activity</span>
                Processing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock</span>
                Pay ${amount.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
