import React, { useState } from 'react';

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  role: 'Tutor' | 'Student';
  onSubmit: (data: { email: string; full_name: string }) => void;
  isLoading: boolean;
};

export const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, role, onSubmit, isLoading }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, full_name: fullName });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-3xl w-full max-w-md shadow-2xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low shrink-0">
          <div>
            <h2 className="text-xl font-extrabold text-on-surface">Add New {role}</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">Enter details to send an invite.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition text-on-surface-variant shrink-0">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <form id="create-user-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
                placeholder={`e.g. ${role === 'Tutor' ? 'Dr. Sarah Mitchell' : 'Alex Johnson'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1.5">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
                placeholder="email@example.com"
              />
              <p className="text-[10px] text-on-surface-variant mt-1.5 opacity-80">
                They will receive an email with their temporary password.
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3 shrink-0">
          <button onClick={onClose} type="button" disabled={isLoading} className="px-5 py-2.5 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container transition">
            Cancel
          </button>
          <button 
            type="submit" 
            form="create-user-form"
            disabled={isLoading || !fullName || !email}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-on-primary hover:opacity-90 transition shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">person_add</span>}
            {isLoading ? 'Creating...' : `Create ${role}`}
          </button>
        </div>
      </div>
    </div>
  );
};
