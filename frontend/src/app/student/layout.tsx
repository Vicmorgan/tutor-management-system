import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { StudentLayout as LayoutShell } from "../../components/layout/StudentLayout";

export default function StudentPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <LayoutShell>
        {children}
      </LayoutShell>
    </ProtectedRoute>
  );
}
