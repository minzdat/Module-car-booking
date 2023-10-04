import { Navigate } from "react-router-dom";
import AddRequest from "../Components/AddRequest/AddRequest/addRequest";
import AdminPage from "../Components/AdminPage";
import DetailRequest from "../Components/DetailRequest/DetailRequest/detailRequest";
import EditRequest from "../Components/EditRequest/EditRequest/editRequest";
import ContentStructure from "../Components/OrganizationalStructure/ContentStructure/contentStructure";
import Profile from "../Components/Profile";
import PageNotFound from "../Pages/404";
import Login from "../Pages/Login/Login";
import ManageRequest from "../Pages/ManageRequest/ManageRequest";
import Register from "../Pages/Register/Register";
import SettingPage from "../Pages/Setting/settingPage";
import Home from "../Pages/Home";

const public_routes = [
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const private_routes = [
  {
    path: "/request/carbooking",
    element: <ManageRequest />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Navigate to="/" />,
  },
  {
    path: "/request/carbooking/edit/:requestId",
    element: <EditRequest />,
  },
  {
    path: "/request/carbooking/detail/:requestId",
    element: <DetailRequest />,
  },
  {
    path: "/request/addrequest",
    element: <AddRequest />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/setting",
    element: <SettingPage />,
  },
  {
    path: "/setting/structure",
    element: <ContentStructure />,
  },
  {
    path: "/setting/profile/:userID",
    element: <Profile />,
  },
  {
    path: "/setting/admin",
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/page-not-found",
    element: <PageNotFound />
  }
];

export { public_routes, private_routes };
