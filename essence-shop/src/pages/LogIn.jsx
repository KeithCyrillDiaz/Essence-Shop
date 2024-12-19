import { useState } from "react"
import { EyeOffIcon, EyeOnIcon } from "../components/icons"
import assignTypes from "../constant/PropTypes"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import backendRoutes from "../routes/backendROutes"
import Loader from "../components/Loader"



const LoginForm = ({handleUpdateForm, handleSubmit, handleRegister})  => {
  
   const [showPassword, setShowPassword] = useState(false)

  return (
     <div className='form'>
        <form  onSubmit={handleSubmit}>
          <h2>Essence <span>Shop</span></h2>
          <input 
          type="email" 
          placeholder='Email'
          onChange={(e) => handleUpdateForm("email", e.target.value)}
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
          <a href="/forgotPassword">Forgot Password</a>
      </form>
      <div className="divider">
            <svg width="126" height="6" viewBox="0 0 126 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.46255 2.71387C5.46255 1.24111 4.26865 0.0472004 2.79588 0.0472004C1.32313 0.0472004 0.129219 1.24111 0.129219 2.71387C0.129219 4.18663 1.32313 5.38053 2.79588 5.38053C4.26865 5.38053 5.46255 4.18663 5.46255 2.71387ZM125.245 2.21387L2.79588 2.21387V3.21387L125.245 3.21387V2.21387Z" fill="#D4AF37"/>
            </svg>
            <p>Dont have an Account?</p>
            <svg width="126" height="6" viewBox="0 0 126 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M120.517 2.67382C120.517 4.14658 121.711 5.34048 123.184 5.34048C124.656 5.34048 125.85 4.14658 125.85 2.67382C125.85 1.20106 124.656 0.00715062 123.184 0.00715075C121.711 0.00715088 120.517 1.20106 120.517 2.67382ZM0.734619 3.17383L123.184 3.17382L123.184 2.17382L0.734619 2.17383L0.734619 3.17383Z" fill="#D4AF37"/>
            </svg>

      </div>
  
      <button onClick={handleRegister}>REGISTER</button>
     </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: assignTypes.function,
  handleUpdateForm: assignTypes.function,
  handleRegister: assignTypes.function
}


const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleUpdateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log("Handling Log In");
      console.log("form: ", form)
      const response = await axios.post(
        backendRoutes.user.login,
        form
      )

      if(!response.data) {
        console.log("Error Logging In");
        return;
      }

      const {token} = response.data;
      localStorage.setItem('token', token);
      navigate('/');

    } catch (error) {
      console.error("Error Logging In", error);
    } finally {
      setLoading(false);
    }
  }

  if(loading) {
    return <Loader/>
  }

  return (
    <div className="login">
        <div className="container formPosition">
            <LoginForm 
            handleRegister={() => navigate('/register')}
            handleSubmit={handleSubmit}
            handleUpdateForm={handleUpdateForm}
            />
        </div>
    </div>
  )
}

export default LogIn
