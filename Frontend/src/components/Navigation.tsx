import { Link, NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
const Navigation: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <>
      <header className="py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <NavLink to="/">ThisMe App</NavLink>
          </h1>
          {currentUser ? (
            <Link to="/profile">
              <img
                className="aspect-square w-full max-w-20 overflow-hidden rounded-full object-fill"
                src={currentUser.profilePicture}
                alt={currentUser.username}
              ></img>
            </Link>
          ) : (
            <nav className="flex gap-2">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Navigation;
