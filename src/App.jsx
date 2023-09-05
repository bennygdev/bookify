import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RegisterAdmin from "./components/RegisterAdmin/RegisterAdmin";
import ControlPanelPage from "./pages/ControlPanelPage/ControlPanelPage";
import Methods from "./pages/Methods/Methods";
import AboutPage from "./pages/AboutPage/AboutPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registeradmin" element={<RegisterAdmin />} />
      <Route path="/controlpanel" element={<ControlPanelPage />} />
      <Route path="/controlpanel/*" element={<Methods />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
