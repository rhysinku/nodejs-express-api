import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LandingPage from "./layout/LandingPage";
import RegisterCard from "./Page/RegisterCard";
import LoginCard from "./Page/LoginCard";

function App() {
  const navRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LandingPage />}>
        <Route path="register" element={<RegisterCard />} />
        <Route path="login" element={<LoginCard />} />
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
