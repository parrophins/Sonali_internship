import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';

// import AttendancePage from './pages/AttendancePage';

const App = () => {
  const { currentRole } = useSelector(state => state.user);
  console.log("Current Role:", currentRole);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />
          {/* <Route path="/attendance-portal" element={<AttendancePortal userRole="Admin" />} /> */}


          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {currentRole === "Admin" &&
        <>
        <AdminDashboard />
        
          {/* <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/attendance-portal" element={<AttendancePortal userRole="Admin" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes> */}
         
         
          
        </>
      }

      {currentRole === "Student" &&
        <>
           <StudentDashboard /> 
          {/* <Routes>
            <Route path="/dashboard" element={<StudentDashboard />} />
             <Route path="/Student/attendance" element={<AttendancePortal />} /> 
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes> */}
        </>
      }

      {currentRole === "Teacher" &&
        <>
           <TeacherDashboard /> 
          {/* <Routes>
            <Route path="/dashboard" element={<TeacherDashboard />} />
            <Route path="/attendance-portal" element={<AttendancePortal userRole="Teacher" />} /> 
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes> */}
        </>
      }
      
    </Router>
    
  )
  
}

export default App
