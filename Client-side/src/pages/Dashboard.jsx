import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DashSidebar } from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardCom from '../components/DashboardCom';
//we use uselocation to get params value from url


const Dashboard = () => {
  const [tab,setTab] = useState("");
  const location = useLocation();

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  } ,[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='md:w-56'>
      {/* Sidebar */}
      <DashSidebar />
    </div>
    {/* profile... */}
    {tab === 'profile' && <DashProfile />}
    {/* posts */}
    {tab === 'posts' && <DashPosts/>}
    {/* users */}
    {tab === 'users' && <DashUsers/>}
    {/* comments */}
    {tab === 'comments' && <DashComments/>}
    {/* dashboard component */}
    {tab === 'dash' && <DashboardCom/>}
  </div>
  )
}

export default Dashboard