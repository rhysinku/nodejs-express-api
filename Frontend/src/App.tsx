import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LandingPage from "./layout/LandingPage";
import RegisterCard from "./Page/RegisterCard";
import LoginCard from "./Page/LoginCard";
import PrivateRoute from "./layout/PrivateRoute";
import Profile from "./Page/Profile";
import HomePage from "./Page/HomePage";

function App() {
  const navRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LandingPage />}>
        <Route index element={<HomePage/>}/>
        <Route path="register" element={<RegisterCard />} />
        <Route path="login" element={<LoginCard />} />

        <Route element={ <PrivateRoute/>}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={navRouter} />
    </>
  );
}

export default App;
