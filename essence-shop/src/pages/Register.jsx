

import { useState } from 'react'
import DatePicker from 'react-datepicker';
import assignTypes from '../constant/PropTypes'
import "react-datepicker/dist/react-datepicker.css"; // CSS for the calendar
import { format } from 'date-fns'; // Optional for custom date formatting

const RegisterForm = ({handleUpdateForm, handleSignUp}) => {

    const [genderValue, setGenderValue] = useState("");
    const [startDate, setStartDate] = useState(null);

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
    <div className='form'>
      <h2>Essence <span>Shop</span></h2>
      <div className="row width">
        <input type="text" 
        placeholder='First Name'
        onChange={(e) => handleUpdateForm("firstName", e.target.value)}
        />
        <input type="text" 
        placeholder='Last Name'
        onChange={(e) => handleUpdateForm("firstName", e.target.value)}
        />
      </div>
      <div className="row">
        <select
            id="dropdown"
            value={genderValue}
            onChange={(e) => handleDropDown(e.target.value)}
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
        />
      </div>
      <input type="email" 
        placeholder='Email'
        onChange={(e) => handleUpdateForm("email", e.target.value)}
      />
      <div className="row width">
        <input type="password" 
            placeholder='Password'
            onChange={(e) => handleUpdateForm("password", e.target.value)}
        />
        <input type="tel" 
            placeholder='Mobile Number'
            onChange={(e) => handleUpdateForm("mobileNumber", e.target.value)}
            maxLength={11}
        />
      </div>
      <button>SIGN UP</button>
      <a href="/login">Already have an account?</a>
    </div>
  )
}

RegisterForm.propTypes = {
    handleUpdateForm: assignTypes.function,
}

const Register = () => {
  return (
    <div className='register'>
      <div className="container registerContainer">
        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register
