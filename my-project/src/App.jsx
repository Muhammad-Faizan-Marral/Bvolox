import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Chat Pages
import GlobalChatPage from "./pages/GlobalChatPage";
import RoomsPage from "./pages/RoomsPage";
import RoomChatPage from "./pages/RoomChatPage";
import DMPage from "./pages/DMPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Main Layout routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/chat/global" element={<GlobalChatPage />} />
            <Route path="/chat/rooms" element={<RoomsPage />} />
            <Route path="/chat/rooms/:roomId" element={<RoomChatPage />} />
            <Route path="/chat/dm/:targetUserId" element={<DMPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Default redirect to global chat */}
          <Route path="/" element={<Navigate to="/chat/global" replace />} />

          {/* Handle old dashboard route if exists */}
          <Route
            path="/dashboard"
            element={<Navigate to="/chat/global" replace />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
