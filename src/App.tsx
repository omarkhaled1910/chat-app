import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  ChakraProvider,
  CSSReset,
  Flex,
  HStack,
  Heading,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store";
import Login from "./pages/Login";
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";
import theme from "./theme";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return isAuthenticated ? (
    <>
      <Flex justify="space-between" align="center" mb={1} p={4}>
        <Heading size="lg">
          <Link to="/">Chat App</Link>
        </Heading>
        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
          <IconButton
            aria-label="Logout"
            icon={<FiLogOut />}
            onClick={handleLogout}
            variant="ghost"
          />
        </HStack>
      </Flex>
      <div style={{ height: "calc(100vh - 64px)" }}>{children}</div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatList />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:userId"
            element={
              <PrivateRoute>
                <ChatRoom />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </ChakraProvider>
  );
};

export default App;
