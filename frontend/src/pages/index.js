import ProtectedRoute from "../components/protectedRoute";
import Dashboard from "./dashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
