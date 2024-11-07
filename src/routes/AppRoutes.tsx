import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ROUTE_PATHS } from "./RoutePaths";
import { CreatePersona } from "../pages";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={ROUTE_PATHS.CREATE_PERSONA} replace />}
        />
        <Route path={ROUTE_PATHS.CREATE_PERSONA} element={<CreatePersona />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
