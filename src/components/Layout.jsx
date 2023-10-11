import React from 'react'
import Navbar from './NavSide/Navbar';
import Sidebar from './NavSide/Sidebar';
import "./Layout.css"

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar />
        <div className="layout-container">
          <Sidebar/>
          <main className='layout-content'>{children}</main>
        </div>
    </React.Fragment>
  )
}

export default Layout