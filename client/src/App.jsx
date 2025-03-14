import { ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Avatar from "./pages/Avatar";
import { action as RegisteredAction } from "./pages/Register";
import { action as LoggedInAction } from "./pages/Login";
import { action as ResetAction } from "./pages/ResetPassword";
import { action as NewPasswordAction } from "./pages/NewPassword";
import { action as CreateGroupAction } from "./components/Rooms";
import { loader as joinRoomLoader } from "./components/joinRoom";
import JoinRoom from "./components/joinRoom";
// importing socket.io, then we can connect to ws server
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080/");

const AppContext = createContext();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage isWelcome />,
  },
  {
    path: "/home",
    element: <Home socket={socket} />,
    action: CreateGroupAction,
  },
  {
    path: "/register",
    element: <LandingPage isRegister />,
    action: RegisteredAction,
  },
  {
    path: "/register/avatar",
    element: <Avatar />,
  },
  {
    path: "/login",
    element: <LandingPage isLogin />,
    action: LoggedInAction,
  },
  {
    path: "/reset-password",
    element: <LandingPage resetPassword />,
    action: ResetAction,
  },
  {
    path: "/reset-password/:token",
    element: <LandingPage resetNewPassword />,
    action: NewPasswordAction,
  },
  {
    path: "/join/:roomId",
    element: <JoinRoom />,
    loader: joinRoomLoader,
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
