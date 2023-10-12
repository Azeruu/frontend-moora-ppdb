import {React, useState} from 'react'
import Navbar from './NavSide/Navbar';
import Sidebar from './NavSide/Sidebar';
import "./Layout.css"

const Layout = ({children}) => {
  const [sidebar, setSidebar] = useState(true);

  const toggleSidebar = () =>{
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className={`layout-container ${sidebar ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="kanan-container">
        <div className='navbar'>
          <Navbar toggleSidebar={toggleSidebar}/>
        </div>
          <main className='layout-content'>{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout