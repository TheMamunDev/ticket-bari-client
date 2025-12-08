import useAuth from '@/hooks/useAuth';
import useRole from '@/hooks/useRole';
import { Navigate } from 'react-router';

const DashboardIndex = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return null;

  if (!user) return null;

  const paths = {
    user: '/dashboard/user/profile',
    vendor: '/dashboard/vendor/profile',
    admin: '/dashboard/admin/profile',
  };

  return <Navigate to={paths[role]} replace />;
};

export default DashboardIndex;
