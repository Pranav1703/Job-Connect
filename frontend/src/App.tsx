import './styles/App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Jobs from './components/jobs/Jobs'
import LogIn from './components/auth/Login'
import ApplicationForm from './components/applications/ApplicationForm'
import JobPostForm from './components/jobs/JobPostForm'
import {  createContext, useState} from 'react'

import Header from './components/Header'
import JobDetails from './components/jobs/JobDetails'
import MyJobs from './components/jobs/MyJobs'
import MyApplications from './components/applications/MyApplications'

export const Context = createContext({
  isAuthorized: false,
  setIsAuthorized: (value: boolean) => {}, 
  user: {role:""},
  setUser: (user: any) => {}
});


function App() {
  
  const [isAuthorized,setIsAuthorized] = useState(false)
  const [user,setUser] = useState({role:""})

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser}}>
      <Router>
        <Header/>
        <Routes>
          <Route path={'/signup'} element={<SignUp/>} />
          <Route path={'/login'} element={<LogIn/>} />
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/jobs"} element={<Jobs/>} /> 
          <Route path={"/job/:id"} element={<JobDetails/>} />
          <Route path={'/application/:id'} element={<ApplicationForm/>} />
          <Route path={'/postjob'} element={<JobPostForm/>} />
          <Route path={'/myjobs'} element={<MyJobs/>} />
          <Route path={'/applications'} element={<MyApplications/>}/>
        </Routes>
      </Router>
    </Context.Provider>
  )
}

export default App
