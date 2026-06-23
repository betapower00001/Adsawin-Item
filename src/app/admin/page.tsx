import { getCmsData } from "@/lib/cms";
import { hasAdminSession, isAdminConfigured } from "@/lib/adminAuth";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await hasAdminSession();

  if (!authenticated) {
    return <AdminLogin configured={isAdminConfigured()} />;
  }

  const data = await getCmsData();
  return <AdminDashboard initialData={data} />;
}
