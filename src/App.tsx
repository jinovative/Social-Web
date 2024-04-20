import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import ChangePassword from "./routes/change-password";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import Information from "./routes/info";
import Benchs from "./routes/benchs";
import Search from "./routes/search";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "benchs",
        element: <Benchs />,
      },
      {
        path: "info",
        element: <Information />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);

const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color: black;
  color: white;
  font-family: 'system-ui', 
  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
   Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 
   sans-serif;

}
::-webkit-scrollbar{
  display: none;
}`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
