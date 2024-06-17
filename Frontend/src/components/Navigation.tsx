import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <>
      <header className="py-3">
        <div className="flex justify-between items-center">
          <h1>
            <NavLink to="/">ProfileDB</NavLink>
          </h1>
          <nav className="flex gap-2">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navigation;
