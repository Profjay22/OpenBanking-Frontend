import React from 'react'
import Navbar from './Navbars'
import TopBar from './TopContainer';
import Dashboard from './Dashboard';
const RenderHomePage = ({keyword, isAuthenticated, setIsAuthenticated, setReportData , saveReportToLocalStorage, reportData, result}) => {
  setIsAuthenticated(true);
  localStorage.setItem('isAuthenticated', isAuthenticated);
  console.log(isAuthenticated);
  return (
    <div>
        <Navbar/>
        <TopBar/>
        <Dashboard keyword={keyword} result = {result} reportData= {reportData} setReportData= {setReportData} saveReportToLocalStorage={saveReportToLocalStorage}/>
    </div>
  )
}

export default RenderHomePage