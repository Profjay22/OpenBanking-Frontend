import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RenderHomePage from './Components/RenderHomePage';
import Profiles from './Components/Profiles';
import Login from './Components/signin/Login';
import { useState} from 'react';
import PrivateRoute from './Components/PrivateRoute';
import SignUp from './Components/signout/SignUp';
import Report from './Components/Report'
import ComplaintForm from './Components/Helpdesk';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [reportData, setReportData] = useState([]);

  const [keyword, setKeyword] = useState();

  let result = 0;
  const saveReportToLocalStorage = (data) => {
    localStorage.setItem('reportData', JSON.stringify(data));
  };

  //console.log(isAuthenticated);
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route element={<RenderHomePage isAuthenticated={isAuthenticated} setIsAuthenticated={ setIsAuthenticated} keyword={keyword} result={result} reportData= {reportData} setReportData= {setReportData} saveReportToLocalStorage={saveReportToLocalStorage}/>} path='/' exact/>
            <Route  element={<Profiles/>} path="/profile" />
            <Route  element={<Report  reportData= {reportData} setReportData= {setReportData} />} path="/report" />
            <Route  element={< ComplaintForm />} path="/helpdesk" />
          </Route>
          <Route
            path="/login"
            element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated = {setIsAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<SignUp setKeyword = {setKeyword} keyword={keyword}  />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
