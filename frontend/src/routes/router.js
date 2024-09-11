import LoginPage from "./login";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "./signup";
import HomePage from "./homePage";
import Dashboard from "./dashboard";
import Loans from "./loans";
import CreateLoan from "./createLoan";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  ,
  {
    path: "/loans",
    element: <Loans></Loans>,
  },
  {
    path: "/create-loan",
    element: <CreateLoan></CreateLoan>,
  },
]);
export default router;
