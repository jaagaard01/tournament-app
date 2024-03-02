import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Arenas from "./screens/arenas/Arenas";
import ArenasList from "./screens/arenas/ArenasList";
import CheckAuth from "./components/auth/CheckAuth";
import CreateAccountPage from "./screens/auth/CreateAccountPage";
import CreateArena from "./screens/arenas/CreateArena";
import Dashboard from "./screens/dashboard/Dashboard";
import DashboardContent from "./screens/dashboard/DashboardContent";
import Events from "./screens/events/Events";
import Login from "./screens/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Settings from "./screens/settings/Settings";
import TournamentTypes from "./screens/tournamentTypes/TournamentTypes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardContent />} />
          <Route path="arenas" element={<Arenas />}>
            <Route index element={<ArenasList />} />
            <Route path="create" element={<CreateArena />} />
          </Route>
          <Route path="events" element={<Events />} />
          <Route path="tournament-types" element={<TournamentTypes />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
