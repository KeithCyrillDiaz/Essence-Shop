import LazyLoad from "react-lazyload"
import { userProfile } from "../../../assets"

import FormDivider from "../../FormDivider"
import assignTypes from "../../../constant/PropTypes"
import PropTypes from "prop-types"
import FormTable from "../../FormTable"
import { useEffect, useState } from "react"
import axios from 'axios';
import backendRoutes from "../../../routes/backendROutes"
import Loader from "../../Loader"
import Slider from "react-slick"
import {useNavigate} from 'react-router-dom'

const MyProfile = ({details, handleChange}) => {
    
    const {name, username, email, mobileNumber, address} = details;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [onEdit, setOnEdit] = useState(false);

    const handleLogOut = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                backendRoutes.user.updateStatus,
                {status: "Offline"},
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )

            if(!response.data) {
                console.log("Failed to update status");
                return;
            }

            localStorage.removeItem('token');

            navigate('/');

        } catch (error) {
            console.log("Error Logging out", error)
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return <Loader/>
    }

  return (
    <div className="myProfile">
        <div className="imgContainer">
            <LazyLoad height={200} offset={100} once>
                <img src={userProfile} alt="" />
            </LazyLoad>
            <FormDivider title="My Profile"/>
        </div>
        <form className={`details-form ${onEdit ? '' : "noBg"}`}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={name}
                disabled 
                />
            </div>

            {username !== "" && (
                <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    disabled = {!onEdit}
                />
                </div>
            )}

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                disabled
                />
            </div>

            <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number:</label>
                <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                disabled = {!onEdit}
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => handleChange("address", e.target.value)}
                disabled = {!onEdit}
                />
            </div>

            {onEdit && (
                <button className="cancel" type="submit">Save</button>
            )}
        </form>
            {!onEdit ? (
                <>
                    <button className="cancel" onClick={() => setOnEdit(true)}>Edit Details</button>
                    {/* <button>Change Profile</button> */}
                    
                    <button  onClick={handleLogOut}>Log Out</button>
                </>
            ) : (
                <button onClick={() => setOnEdit(false)}>Cancel</button>
            ) }
    </div>
  )
}

MyProfile.propTypes = {
    details: PropTypes.shape({
        name: assignTypes.string,
        username: assignTypes.string,
        email: assignTypes.string,
        mobileNumber: assignTypes.string,
        address: assignTypes.string
    }),
    handleChange: assignTypes.function
}


const ProfleContents = () => {


    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        mobileNumber: "",
        address: ""
    });
    const [orderHistory, setOrderHistory] = useState({
        complete: [],
        refund: [],
        cancelled: [],
        pending: []
    });
    const [salesHistory, setSalesHistory] = useState({
        complete: [],
        refund: [],
        cancelled: [],
        pending: []
    });


    const fetchSalesHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            console.log("Fetching Sales History");

            const response = await axios.get(
                backendRoutes.sales.getSalesHistory,
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )

            if(!response.data) {
                console.log("Error Fetching Sales Data");
                return
            }

            const {data} = response.data;

            if (
                typeof data === "object" &&
                ["complete", "refund", "cancelled", "pending"].every((key) =>
                    Array.isArray(data[key])
                )
            ) {
                setSalesHistory(data);
            } else {
                console.log("Invalid data structure from server.");
            }


        } catch (error) {
            console.error("Error Fetching Sales History.", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchOrderHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            setLoading(true);
            console.log("Fetching Order History");

            const response = await axios.get(
                backendRoutes.order.getOrderHistory,
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )

            if(!response.data) {
                console.log("Error Fetching Orders Data");
                return
            }

            const {data} = response.data;
            
            if (
                typeof data === "object" &&
                ["complete", "refund", "cancelled", "pending"].every((key) =>
                    Array.isArray(data[key])
                )
            ) {
                setOrderHistory(data);
            } else {
                console.log("Invalid data structure from server.");
            }


        } catch (error) {
            console.error("Error Fetching Order History.", error)
        } finally {
            setLoading(false);
        }
    }

    
    const fetchData = async () => {
        try {
            console.log("Fethching user details");
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                backendRoutes.user.getUserDetails,
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )

            if(!response.data) {
                console.log("Error Fetching User Data");
                return;
            }

            const {data} = response.data;

            setUserDetails(data);

        } catch (error) {
            console.error("Error Fetching User Data", error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateUserDetails = (field, value) => {
        setUserDetails((prev)=> ({
            ...prev,
            [field]: value
        }))
    }


    useEffect(() => {
        fetchData();
        fetchOrderHistory();
        fetchSalesHistory();
    },[]);

    const settings = {
        dots: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
      };


    if(loading) {
        return (
            <Loader/>
        )
    }
  return (
    <div className="container profileContents">
        <MyProfile 
        details={{
            ...userDetails,
            name: `${userDetails.firstName} ${ userDetails.lastName}`,
        }}
        handleChange={handleUpdateUserDetails}
        /> 
        <div className="sliderContainer">
            <Slider {...settings}>
                <FormTable title="Order History" data={orderHistory}/>
                <FormTable title="Sales History" data={salesHistory}/>
            </Slider>
        </div>
     
    </div>
  )
}

export default ProfleContents
