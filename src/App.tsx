import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Customers from './pages/Customers';
import Tasks from './pages/Tasks';
import ProjectDetails from './pages/ProjectDetails';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import Layout from './components/Layout';

function App() {

  return (
    <>
      {/* <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
    </Routes> */}


<Routes>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route
    path="/dashboard"
    element={
      <Layout>
        <Dashboard />
      </Layout>
    }
  />
  <Route
    path="/projects"
    element={
      <Layout>
        <Projects />
      </Layout>
    }
  />
  <Route
    path="/projects/:id"
    element={
      <Layout>
        <ProjectDetails />
      </Layout>
    }
  />
  <Route
    path="/customers"
    element={
      <Layout>
        <Customers />
      </Layout>
    }
  />
  <Route
    path="/tasks"
    element={
      <Layout>
        <Tasks />
      </Layout>
    }
  />
  <Route
    path="/calendar"
    element={
      <Layout>
        <Calendar />
      </Layout>
    }
  />
  <Route
    path="/settings"
    element={
      <Layout>
        <Settings />
      </Layout>
    }
  />
</Routes>

    </>
  )
}

export default App
