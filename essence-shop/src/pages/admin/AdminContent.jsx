import { useState } from "react"
import { Menu } from "../../components"
import AdminHeroSection from "../../components/admin/AdminHeroSection"
import Dashboard from "../../components/admin/Dashboard"
import Products from "../../components/admin/Products"
import Users from "../../components/admin/Users"

const AdminContent = () => {

    const [currentPage, setCurrentPage] = useState("Dashboard")

    const handledOnClick = (title) => {
        setCurrentPage(title);
    }

    const Element = 
    currentPage === "Dashboard" ? Dashboard :
    currentPage === "Products" ? Products :
    Users

  return (
    <div className="adminContent">
     <Menu currentPage={currentPage} handledOnClick={handledOnClick}/>
     <div className="mainContent">
        <h2>{currentPage}</h2>
        <AdminHeroSection/>
        <Element/>
     </div>
    </div>
  )
}

export default AdminContent
