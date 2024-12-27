// App.js
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminPannel from "./Admin/AdminPannel";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import NotAuthorizedPage from "./NotAuthorizedPage"; // Import the NotAuthorized page

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        
        {/* Protect the admin route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPannel />
            </ProtectedRoute>
          }
        />
        {/* Handle unauthorized access */}
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
      </Routes>
    </div>
  );
}

export default App;
