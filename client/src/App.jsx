import { ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
const AppContext = createContext();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage isWelcome />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <LandingPage isRegister />,
  },
  {
    path: "/login",
    element: <LandingPage isLogin />,
  },
]);
function App() {
  const [mode, setMode] = useState("light");

  const darkThemeHandler = () => {
    setMode("dark");
  };
  const lightThemeHandler = () => {
    setMode("light");
  };

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <AppContext.Provider value={{ darkThemeHandler, lightThemeHandler, mode }}>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
export const useAppContext = () => useContext(AppContext);
export default App;
