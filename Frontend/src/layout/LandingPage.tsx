import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function LandingPage() {
  return (
    <>
      <div className="container">
        <img src="rain-before.jpg" alt="" />
        <Navigation />
      </div>
      <div className="h-screen flex items-center content-center">
        Hello
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
