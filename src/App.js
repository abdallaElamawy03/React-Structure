import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import Admin from "./components/Admin/Admin"
import Landing from './components/Landing';
import Logincompany from './components/Logincompany';
import Userprofile from './components/Usercomponent/Userprofile';
import GetAllEmployee from './components/Management/GetAllEmployees';
import AllAttendance from './components/Management/AllAttendance';
import AllCompanyTasks from './components/Management/AllCompanyTasks';
import MyAttendance from './components/Usercomponent/MyAttendance';
import MyTasks from './components/Usercomponent/MyTasks';
const roles = {
  Admin : 'Admin',
  hr : 'hr',
  Employee :'Employee',
  Manager:'manager',
  Company:'company'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Landing/>}/>
        {/* public routes */}
        <Route path='companylogin' element={<Logincompany/>}/>       
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        

        {/* we want to protect these routes */}
        {/* alluser allowed public files  */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[roles.hr,roles.Admin,roles.Employee,roles.Manager,roles.Company]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user/profile" element={<Userprofile />} />
          <Route path="/user/attend" element={<MyAttendance />} />
          <Route path="/user/tasks" element={<MyTasks />} />
          
          </Route>

          {/* only manager */}
          <Route element={<RequireAuth allowedRoles={[roles.Admin,roles.Manager,roles.hr]} />}>
            <Route path="/all/employees" element={<GetAllEmployee />} />
            <Route path="/all/attendance" element={<AllAttendance />} />
            <Route path="/all/companytasks" element={<AllCompanyTasks />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[roles.Admin,roles.Manager]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[roles.Editor, roles.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;