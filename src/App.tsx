import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Customers from './pages/Customers';
import Tasks from './pages/Tasks';

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
    </>
  )
}

export default App
