import { Navigate, Route, Routes } from "react-router-dom"
import { Home, Login, Profile, Settings, SignUp } from "./pages"
import { Navbar } from "./components"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {

  const { checkAuth, authUser, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log("Online users:", onlineUsers);
  

  // Check if the user is authenticated
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if ( isCheckingAuth && !authUser ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            authUser ? <Home /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/signup" 
          element={
            authUser ? <Navigate to="/" /> : <SignUp />
          } 
        />
        <Route 
          path="/login" 
          element={
            authUser ? <Navigate to="/" /> : <Login />
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route 
          path="/profile" 
          element={
            authUser ? <Profile /> : <Navigate to="/login" />
          } 
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App