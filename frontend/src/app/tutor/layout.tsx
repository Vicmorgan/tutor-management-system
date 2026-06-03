import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { TutorLayout as LayoutShell } from "../../components/layout/TutorLayout";

export default function TutorPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['TUTOR']}>
      <LayoutShell>
        {children}
      </LayoutShell>
    </ProtectedRoute>
  );
}
