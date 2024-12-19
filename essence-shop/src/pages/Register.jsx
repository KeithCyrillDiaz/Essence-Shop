

import { useState } from 'react'
import DatePicker from 'react-datepicker';
import assignTypes from '../constant/PropTypes'
import "react-datepicker/dist/react-datepicker.css"; // CSS for the calendar
import { format } from 'date-fns'; // Optional for custom date formatting


const EyeOffIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.7167 15L25 20.2667V20C25 18.6739 24.4732 17.4021 23.5356 16.4645C22.5979 15.5268 21.3261 15 20 15H19.7167ZM12.55 16.3333L15.1334 18.9167C15.05 19.2667 15 19.6167 15 20C15 21.3261 15.5268 22.5979 16.4645 23.5355C17.4022 24.4732 18.6739 25 20 25C20.3667 25 20.7334 24.95 21.0834 24.8667L23.6667 27.45C22.55 28 21.3167 28.3333 20 28.3333C17.7899 28.3333 15.6703 27.4554 14.1075 25.8926C12.5447 24.3298 11.6667 22.2101 11.6667 20C11.6667 18.6833 12 17.45 12.55 16.3333ZM3.33335 7.11667L7.13335 10.9167L7.88335 11.6667C5.13335 13.8333 2.96669 16.6667 1.66669 20C4.55002 27.3167 11.6667 32.5 20 32.5C22.5834 32.5 25.05 32 27.3 31.1L28.0167 31.8L32.8833 36.6667L35 34.55L5.45002 5M20 11.6667C22.2102 11.6667 24.3298 12.5446 25.8926 14.1074C27.4554 15.6702 28.3334 17.7899 28.3334 20C28.3334 21.0667 28.1167 22.1 27.7334 23.0333L32.6167 27.9167C35.1167 25.8333 37.1167 23.1 38.3334 20C35.45 12.6833 28.3334 7.5 20 7.5C17.6667 7.5 15.4334 7.91667 13.3334 8.66667L16.95 12.25C17.9 11.8833 18.9167 11.6667 20 11.6667Z" fill="black"/>
    </svg>
)

const EyeOnIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 15C18.6739 15 17.4022 15.5268 16.4645 16.4645C15.5268 17.4021 15 18.6739 15 20C15 21.3261 15.5268 22.5979 16.4645 23.5355C17.4022 24.4732 18.6739 25 20 25C21.3261 25 22.5979 24.4732 23.5356 23.5355C24.4732 22.5979 25 21.3261 25 20C25 18.6739 24.4732 17.4021 23.5356 16.4645C22.5979 15.5268 21.3261 15 20 15ZM20 28.3333C17.7899 28.3333 15.6703 27.4554 14.1075 25.8926C12.5447 24.3298 11.6667 22.2101 11.6667 20C11.6667 17.7899 12.5447 15.6702 14.1075 14.1074C15.6703 12.5446 17.7899 11.6667 20 11.6667C22.2102 11.6667 24.3298 12.5446 25.8926 14.1074C27.4554 15.6702 28.3334 17.7899 28.3334 20C28.3334 22.2101 27.4554 24.3298 25.8926 25.8926C24.3298 27.4554 22.2102 28.3333 20 28.3333ZM20 7.5C11.6667 7.5 4.55002 12.6833 1.66669 20C4.55002 27.3167 11.6667 32.5 20 32.5C28.3334 32.5 35.45 27.3167 38.3334 20C35.45 12.6833 28.3334 7.5 20 7.5Z" fill="black"/>
    </svg>

)


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


    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthday: "",
        email: "",
        password: ""
    })


  return (
    <div className='register'>
      <div className="container registerContainer">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register
