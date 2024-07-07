import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const PrivateRoute: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
