import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import CreateAccountPage from "./screens/CreateAccountPage";
import Login from "./screens/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
