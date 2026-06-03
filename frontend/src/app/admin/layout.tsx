import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { AdminLayout as LayoutShell } from "../../components/layout/AdminLayout";

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <LayoutShell>
        {children}
      </LayoutShell>
    </ProtectedRoute>
  );
}
