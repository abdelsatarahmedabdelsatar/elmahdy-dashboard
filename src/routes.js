import Dashboard from "layouts/dashboard";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Icon from "@mui/material/Icon";
import ProductsTables from "./layouts/tables/ProductsTables/index";
import CategoriesTables from "./layouts/tables/CategoriesTables/index";
import BrandsTable from "./layouts/tables/BrandsTable/index";
import UsersTables from "./layouts/tables/UsersTables/index";
import Configurator from "./examples/Configurator/index";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "users",
    key: "users",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/users",
    component: <UsersTables />,
  },
  {
    type: "collapse",
    name: "products",
    key: "products",
    icon: <Icon fontSize="small">reorder</Icon>,
    route: "/products",
    component: <ProductsTables />,
  },
  {
    type: "collapse",
    name: "categories",
    key: "categories",
    icon: <Icon fontSize="small">dns</Icon>,
    route: "/categories",
    component: <CategoriesTables />,
  },
  {
    type: "collapse",
    name: "brands",
    key: "brands",
    icon: <Icon fontSize="small">interests</Icon>,
    route: "/brands",
    component: <BrandsTable />,
  },
  {
    type: "collapse",
    name: "settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Configurator />,
  },
  ,
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // }
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
