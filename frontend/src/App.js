import Login from "./pages/login/Login";
import SeniorRegister from "./pages/register/SeniorRegister";
import SeniorProfile from "./pages/profile/SeniorProfile";
import ParentProfile from "./pages/profile/ParentProfile";
import {
  createBrowserRouter,
  RouterProvider,
  Route, Outlet, Navigate,
} from "react-router-dom";
import ParentRegister from "./pages/register/ParentRegister";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
function App() {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/login",
      element:<Login/>,
    },
    {
      path: "/parentRegister",
      element:<ParentRegister/>
    },
    {
      path: "/seniorRegister",
      element:<SeniorRegister/>
    },
    {
      path: "/parentProfile",
      element:(
          <QueryClientProvider client={queryClient}>
            <ParentProfile/>
          </QueryClientProvider>
      )
    },
    {
      path: "/seniorProfile",
      element:(
          <QueryClientProvider client={queryClient}>
            <SeniorProfile/>
          </QueryClientProvider>
      )
    },
  ]);

  return (
      <div>
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
