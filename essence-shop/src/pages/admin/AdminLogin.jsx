import { useState } from "react"
import { EyeOffIcon, EyeOnIcon } from "../../components/icons"
import axios from "axios";
import backendRoutes from "../../routes/backendROutes";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";

const AdminLogin = () => {

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleUpdateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      console.log("Logging In in Admin");
      setLoading(true);
      const response = await axios.post(
        backendRoutes.admin.login,
        form
      )

      if(!response.data) {
        console.log("Error Loggin In in admin");
        return
      }

      const {token} = response.data;
      localStorage.setItem('adminToken', token);

      navigate('/admin/home')

    } catch (error) {
      console.error("Error logging in Admin ", error)
    } finally {
      setLoading(false)
    }
  }

  if(loading) {
    return <Loader/>
  }
  return (
    <div className="adminLogin">
        <div className='form'>
          <form  onSubmit={handleSubmit}>
            <h2>E<span>S</span> Admin</h2>
            <input 
            type="text" 
            placeholder='username'
            onChange={(e) => handleUpdateForm("username", e.target.value)}
            required
            />
              <div className="passwordContainer">
                  <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder='Password'
                      onChange={(e) => handleUpdateForm("password", e.target.value)}
                      required
                  />
                  <div className="icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                          <EyeOnIcon/>
                      ) : (
                          <EyeOffIcon/>
                      )}
                  </div>
              </div>
            <button type="submit">LOG IN</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
