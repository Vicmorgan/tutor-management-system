import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// --- Users ---

export function useUpdateMe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await api.patch('/api/users/me', userData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] }); // or however auth is checked
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data } = await api.get('/api/users/dashboard-stats');
      return data;
    },
  });
}

export function useTutors() {
  return useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const { data } = await api.get('/api/users/tutors');
      return data;
    },
  });
}

export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await api.get('/api/users/students');
      return data;
    },
  });
}

export function useCreateTutor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: { email: string; full_name: string }) => {
      const payload = { ...userData, password: 'TemporaryPassword123!', role: 'TUTOR' };
      const { data } = await api.post('/api/users/tutors', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
    },
  });
}

export function useUpdateTutor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const { data } = await api.patch(`/api/users/tutors/${id}`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
    },
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: { email: string; full_name: string; parent_name?: string; parent_phone?: string }) => {
      const payload = { ...userData, password: 'TemporaryPassword123!', role: 'STUDENT' };
      const { data } = await api.post('/api/users/students', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: number) => {
      await api.delete(`/api/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
}

// --- Tutor Requests ---

export function useTutorRequests() {
  return useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const { data } = await api.get('/api/requests');
      return data;
    },
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestData: any) => {
      const { data } = await api.post('/api/requests', requestData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}

export function useUpdateRequestStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: int, status: string }) => {
      const { data } = await api.patch(`/api/requests/${id}`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}

// --- Applications ---

export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await api.get('/api/applications');
      return data;
    },
  });
}

export function useMyApplications() {
  return useQuery({
    queryKey: ['applications', 'my'],
    queryFn: async () => {
      const { data } = await api.get('/api/applications/my');
      return data;
    },
  });
}

export function useRequestApplicants(requestId: number) {
  return useQuery({
    queryKey: ['applications', 'request', requestId],
    queryFn: async () => {
      const { data } = await api.get(`/api/applications/request/${requestId}`);
      return data;
    },
    enabled: !!requestId,
  });
}

export function useApplyToRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: number) => {
      const { data } = await api.post('/api/applications', { request_id: requestId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', 'my'] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const { data } = await api.patch(`/api/applications/${id}`, { status });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}

// --- Assignments ---

export function useAssignments() {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      const { data } = await api.get('/api/assignments');
      return data;
    },
  });
}

export function useMyAssignments() {
  return useQuery({
    queryKey: ['assignments', 'my'],
    queryFn: async () => {
      const { data } = await api.get('/api/assignments/my');
      return data;
    },
  });
}

export function useCreateAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (assignData: { request_id: number, tutor_id: number, student_id: number }) => {
      const { data } = await api.post('/api/assignments', assignData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
}

// --- Notifications ---

export function useMyNotifications() {
  return useQuery({
    queryKey: ['notifications', 'my'],
    queryFn: async () => {
      const { data } = await api.get('/api/notifications/my');
      return data;
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notifId: number) => {
      const { data } = await api.patch(`/api/notifications/${notifId}/read`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'my'] });
    },
  });
}
