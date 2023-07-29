import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Signin from "../pages/signin";
import AccountLayout from "../layout/account";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import LiveMatch from "../pages/matches";
import NewsDetails from "../pages/News/NewsDetails";
import NewsContainer from "../pages/News";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountLayout />,
    children: [
      { index: true, element: [<LiveMatch />, <NewsContainer /> ] },
      {
        path : "/articles/:articleID",
        element : <NewsDetails />
      }
    ]
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  // Protected Routes
  // {
  //   path: "account",
  //   element: (
  //     <ProtectedRoute>
  //       <AccountLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { index: true, element: <Navigate to="/account/projects" replace /> },
  //     {
  //       path: "projects",
  //       element: <ProjectContainer />,
  //       children: [
  //         { index: true, element: <Projects /> },
  //         {
  //           path: ":projectID",
  //           element: <ProjectDetails />,
  //           children: [
  //             { index: true, element: <></> },
  //             {
  //               path: "tasks",
  //               children: [
  //                 { index: true, element: <Navigate to="../" replace /> },
  //                 { path: "new", element: <NewTask />, },
  //                 {
  //                   path: ":taskID",
  //                   children: [{ index: true, element: <TaskDetailsContainer /> }],
  //                 },
  //               ],
  //             },
  //           ],
  //         }
  //       ]
  //     },
  //     {
  //       path: "members",
  //       element: (<Members />)
  //     },
  //   ],
  // },
]);

export default router;
