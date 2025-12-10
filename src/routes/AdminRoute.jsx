import React from 'react';
import useRole from '@/hooks/useRole';
import useAuth from '@/hooks/useAuth';
import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== 'admin') {
    return (
      <div>
        <h2>Forbidden access</h2>{' '}
      </div>
    );
  }

  return children;
};

export default AdminRoute;
