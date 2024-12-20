import { useState } from "react"
import { EyeOffIcon, EyeOnIcon } from "../../components/icons"
import assignTypes from "../../constant/PropTypes"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import backendRoutes from "../../routes/backendROutes"
import Loader from "../../components/Loader"
import { FormDivider } from "../../components"



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
       <FormDivider title="Dont have an Account?"/>
      <button className="reg" onClick={handleRegister}>REGISTER</button>
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

      const {token, id} = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
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
