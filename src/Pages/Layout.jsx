import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./Layout.css"

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar />
        <div className="layout-columns">
            <div className="layout-column"><Sidebar/></div>
            <div className="layout-column">
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout