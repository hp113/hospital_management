import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signin from './components/Signin'
import { jwtDecode } from 'jwt-decode'
import ManagerDashboard from './pages/manager/ManagerDashboard';
import AddPatientForm from './pages/manager/AddPatientForm';
// import AddPatientForm from './pages/manager/AddPatientForm';

function App() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken ? decodedToken.role : null;

  // if (!token) {
  //   return <Navigate to="/signin" />;
  // }

  return (
    <BrowserRouter>
      <div className="app-container">
        <h1 className="text-2xl font-bold text-center py-4">Hospital Food Management System</h1>
        <Routes>
          {!token && <Route path="*" element={<Navigate to="/signin" />} />}
          {role === 'MANAGER' && <Route path="/" element={<Navigate to="/manager-dashboard" />} />}
          {role === 'MANAGER' && <Route path="/manager-dashboard" element={<ManagerDashboard />} />}
          {role === 'MANAGER' && <Route path="/manager-dashboard/add-patient" element={<AddPatientForm />} />}
            {/* Nested route for adding a patient */}
           
          {/* Uncomment and add routes for other components when needed */}
          <Route path="/signin" element={<Signin />} />
          {/* <Route path="/create-food-plan" element={<FoodPlanForm />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;