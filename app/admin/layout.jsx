import AdminDashboard from './AdminDashboard';

// The dashboard lives in the layout so it stays mounted (data, unsaved edits)
// while the URL changes between /admin/* sections.
export default function AdminLayout() {
  return <AdminDashboard />;
}
