import './styles/App.css'
import { BrowserRouter as Router,Routes,Route, Navigate, useNavigate } from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/jobs/Jobs'
import LogIn from './components/auth/Login'
import ApplicationForm from './components/applications/ApplicationForm'
import JobPostForm from './components/jobs/JobPostForm'
import {  createContext, useEffect, useState} from 'react'

import Header from './components/Header'
import JobDetails from './components/jobs/JobDetails'
import MyJobs from './components/jobs/MyJobs'
import SeekerApplications from './components/applications/SeekerApplications'
import EmployerApplications from './components/applications/EmployerApplications'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

export const Context = createContext({
  isAuthorized: false,
  setIsAuthorized: (value: boolean) => {}, 
  user: {role:""},
  setUser: (user: any) => {}
});


function App() {
  
  const [isAuthorized,setIsAuthorized] = useState(false)
  const [user,setUser] = useState({role:""})

  useEffect(() => {
    (async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/verify`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setIsAuthorized(true)
          setUser({role: res.data.role})
          console.log("User authorized");
        } else {
          console.log("Authorization failed");
        }
      } catch (error) {
        console.log(error)
        setIsAuthorized(false);
      }
      
    })();
    console.log("user authorized?:", isAuthorized)
  }, [])
  

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser}}>
      <Router>
        <Header/>
        <Toaster/>
        <Routes>
          <Route path="/login" element={isAuthorized ? <Navigate to="/" /> : <LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          {isAuthorized ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/application/:id" element={<ApplicationForm />} />
              <Route path="/postjob" element={<JobPostForm />} />
              <Route path="/myjobs" element={<MyJobs />} />
              <Route path="/myapplications" element={<SeekerApplications />} />
              <Route path="/myapplicants" element={<EmployerApplications />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default App
