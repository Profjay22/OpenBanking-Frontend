import React from 'react'
import Navbar from './Navbars'
import TopBar from './TopContainer';
import Dashboard from './Dashboard';
const RenderHomePage = () => {
  return (
    <div>
        <Navbar/>
        <TopBar/>
        <Dashboard/>
    </div>
  )
}

export default RenderHomePage