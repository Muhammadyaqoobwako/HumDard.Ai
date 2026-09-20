import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import LandingPage from "./pages/LandingPage";
import LiveSession from "./pages/LiveSession";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen flex-col overflow-x-hidden text-gray-900 transition-colors duration-500 dark:bg-slate-900 dark:text-white">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={<LandingPage initialAuthMode="login" />}
            />
            <Route
              path="/signup"
              element={<LandingPage initialAuthMode="signup" />}
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/live-session" element={<LiveSession />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
