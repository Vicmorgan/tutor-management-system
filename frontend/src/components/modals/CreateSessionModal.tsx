import React, { useState } from 'react';

type CreateSessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { course_id: number; start_time: string; end_time: string; virtual_link: string }) => void;
  isLoading: boolean;
};

export const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [virtualLink, setVirtualLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combine date and time
    const startIso = new Date(`${date}T${startTime}:00`).toISOString();
    const endIso = new Date(`${date}T${endTime}:00`).toISOString();

    onSubmit({
      course_id: parseInt(courseId, 10),
      start_time: startIso,
      end_time: endIso,
      virtual_link: virtualLink
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface rounded-3xl w-full max-w-md shadow-2xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low shrink-0">
          <div>
            <h2 className="text-xl font-extrabold text-on-surface">Schedule Class</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">Add a new session to the master calendar.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition text-on-surface-variant shrink-0">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <form id="create-session-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1.5">Course ID</label>
              <input 
                type="number" 
                required
                value={courseId}
                onChange={e => setCourseId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
                placeholder="e.g. 1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-on-surface mb-1.5">Date</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-on-surface mb-1.5">Start Time</label>
                <input 
                  type="time" 
                  required
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-on-surface mb-1.5">End Time</label>
                <input 
                  type="time" 
                  required
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-1.5">Virtual Link (Optional)</label>
              <input 
                type="url" 
                value={virtualLink}
                onChange={e => setVirtualLink(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface"
                placeholder="https://meet.google.com/..."
              />
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
            form="create-session-form"
            disabled={isLoading || !courseId || !date || !startTime || !endTime}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-on-primary hover:opacity-90 transition shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">event</span>}
            {isLoading ? 'Scheduling...' : 'Schedule Class'}
          </button>
        </div>
      </div>
    </div>
  );
};
