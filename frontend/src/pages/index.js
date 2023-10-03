import ProtectedRoute from "@/app/components/protectedRoute";
import Dashboard from "./dashboard";
import "@/app/globals.css";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
