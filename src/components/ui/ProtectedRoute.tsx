import { useUser } from "@/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";
interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { email } = useUser();

  if (email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }
  if (!email) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to="/events" replace />;
  // }

  // return <Outlet />;
}