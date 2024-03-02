import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CheckAuth from "./components/auth/CheckAuth";
import CreateAccountPage from "./screens/auth/CreateAccountPage";
import Dashboard from "./screens/Dashboard";
import DashboardContent from "./screens/DashboardContent";
import Events from "./screens/events/Events";
import Login from "./screens/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Settings from "./screens/settings/Settings";
import TournamentTypes from "./screens/tournamentTypes/TournamentTypes";
import Venues from "./screens/venues/Venues";

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
          <Route path="venues" element={<Venues />} />
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
