import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function LandingPage() {
  return (
    <>
      <div className="container">
        <img src="rain-before.jpg" alt="" />
        <Navigation />
      </div>
      <div className="h-[calc(100vh-120px)] flex items-center content-center flex-col">
        <div className="container h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
