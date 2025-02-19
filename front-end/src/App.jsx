import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Policy from "./components/Policy";
import Renewals from "./components/Renewals";
import Guide from "./components/Guide";
import { createBrowserRouter, RouterProvider } from "react-router-dom"


export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><header>
        <SignedOut>
          <SignInButton />
          <Home />
        </SignedOut>
        <SignedIn>
          <Navbar />
          <Dashboard />
          {/* <UserButton /> */}
        </SignedIn>
      </header></>
    },
    {
      path: "/policies",
      element: <><Policy /></>
    },
    {
      path: "/renewals",
      element: <><Renewals /></>
    },
    {
      path: "/guide",
      element: <><Guide /></>
    }

  ])





  // application routes



  return (

    <div>
      <RouterProvider router={router}>

      </RouterProvider>

    </div>



  );
}