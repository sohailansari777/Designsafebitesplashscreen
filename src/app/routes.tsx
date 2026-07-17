import { createBrowserRouter } from "react-router";
import Splash from "./pages/Splash";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import BrandRanking from "./pages/BrandRanking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/onboarding/1",
    Component: Onboarding1,
  },
  {
    path: "/onboarding/2",
    Component: Onboarding2,
  },
  {
    path: "/onboarding/3",
    Component: Onboarding3,
  },
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/scan",
    Component: Scan,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
  },
  {
    path: "/products",
    Component: Products,
  },
  {
    path: "/brands",
    Component: BrandRanking,
  },
]);