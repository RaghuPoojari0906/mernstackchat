import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import Register from "../pages/Register.js";
import CheckMail from "../pages/CheckMail.js";
import CheckPassword from "../pages/CheckPassword.js";
import Home from "../pages/Home.js";
import Message from "../components/Message.js";
import AuthLayout from "../layout/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <AuthLayout><Register /></AuthLayout>,
      },
      {
        path: "email",
        element: <AuthLayout><CheckMail /></AuthLayout>,
      },
      {
        path: "password",
        element: <AuthLayout><CheckPassword/></AuthLayout>
      },
      {
        path : "/",
        element : <Home/>,
        children : [{
            path : ":userId",
            element : <Message/>
        }]
        },
    ],
  },
]);

export default router;
