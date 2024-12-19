

import { useState } from 'react'
import DatePicker from 'react-datepicker';
import assignTypes from '../../constant/PropTypes'
import "react-datepicker/dist/react-datepicker.css"; // CSS for the calendar
import { format } from 'date-fns'; // Optional for custom date formatting
import axios from 'axios';
import backendRoutes from '../../routes/backendROutes';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../components';
import { EyeOffIcon, EyeOnIcon } from '../../components/icons';


const RegisterForm = ({handleUpdateForm, handleSubmit}) => {

    const [genderValue, setGenderValue] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [showPassword, setShowPassword] = useState(false)

    const handleDropDown = (value) => {
        setGenderValue(value);
        handleUpdateForm("gender", value);
    }

    const handleDateChange = (date) => {
        setStartDate(date);
        // Format the date as YYYY-MM-DD before passing it to the parent
        if (date) {
            const formattedDate = format(date, 'yyyy-MM-dd'); // Change this format if needed
            // handleBirthdayChange(formattedDate);
            console.log("birthday: ", formattedDate);
        }
    };

  return (
    <form className='form' onSubmit={handleSubmit}>
        <h2>Essence <span>Shop</span></h2>
        <div className="row width">
        <input 
            type="text" 
            placeholder='First Name'
            onChange={(e) => handleUpdateForm("firstName", e.target.value)}
            required
        />
        <input 
            type="text" 
            placeholder='Last Name'
            onChange={(e) => handleUpdateForm("lastName", e.target.value)}  // Fixed to update "lastName"
            required
        />
        </div>
        <div className="row">
        <select
            id="dropdown"
            value={genderValue}
            onChange={(e) => handleDropDown(e.target.value)}
            required
        >
            <option value="" disabled>
            Select an option
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
    
        <DatePicker
            className='bday-dropdown'
            selected={startDate}
            onChange={handleDateChange}
            placeholderText='Birthday'
            dateFormat="yyyy-MM-dd" 
            maxDate={new Date()} // prevent future dates
            showYearDropdown
            scrollableYearDropdown
            showMonthDropdown
            dropdownMode="select"
            required
        />
        </div>
        <input 
        type="email" 
        placeholder='Email'
        onChange={(e) => handleUpdateForm("email", e.target.value)}
        required
        />
        <div className="row width">
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
            <input 
                type="tel" 
                placeholder='Mobile Number'
                onChange={(e) => handleUpdateForm("mobileNumber", e.target.value)}
                maxLength={11}
                required
            />
        </div>
        <button type="submit">SIGN UP</button>
        <a href="/login">Already have an account?</a>
    </form>
  )
}

RegisterForm.propTypes = {
    handleUpdateForm: assignTypes.function,
    handleSubmit: assignTypes.function
}


const Register = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthday: "",
        email: "",
        password: ""
    })

    const [modalSettings, setModalSettings] = useState({
        visible: false,
        isSuccess: false,
        message: ''
    });

    const handleUpdateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    const handleUpdateModalSettings = (field, value) => {
        setModalSettings((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleOnClose = () => {
        handleUpdateModalSettings("visible", false);
        if(modalSettings.isSuccess) {
            navigate('/login');
            return
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                backendRoutes.user.register,
                form
            );

            if (!response.data || !response.data.data) {
                handleUpdateModalSettings("message", "Registration Failed! Please try again.");
                console.error('No data found', response.status);
                return;
            }
            
            navigate('/login');
            handleUpdateModalSettings("message", 'Registration Successful! Welcome to Essence Shop!');

        } catch (error) {
            handleUpdateModalSettings("message", "Registration Failed! Please try again.");
            console.error("Error Sign In", error);
        }
    }


  return (
    <div className='register'>
      <div className="container formPosition">
        <RegisterForm  handleSubmit={handleSubmit} handleUpdateForm={handleUpdateForm}/>
        
       {modalSettings.visible && (
         <Modal message={modalSettings.message} isSuccess={modalSettings.isSuccess} onClose={handleOnClose}/>
       )}
      </div>
    </div>
  )
}

export default Register
