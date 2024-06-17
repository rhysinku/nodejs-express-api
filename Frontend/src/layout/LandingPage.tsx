import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function LandingPage() {
  return (
    <>
      <div className="container">
        <Navigation />
      </div>
      <div className="h-screen flex items-center content-center">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
