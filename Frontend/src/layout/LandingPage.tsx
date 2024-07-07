import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function LandingPage() {
  return (
    <>
      <div className="container">
        <Navigation />
      </div>
      <div className="flex h-[calc(100vh-120px)] flex-col content-center items-center">
        <div className="container h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
