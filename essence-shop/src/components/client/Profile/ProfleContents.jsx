import LazyLoad from "react-lazyload"
import { userProfile } from "../../../assets"

import FormDivider from "../../FormDivider"
import assignTypes from "../../../constant/PropTypes"
import PropTypes from "prop-types"
import FormTable from "../../FormTable"


const MyProfile = ({details}) => {
    
    const {name, username, email, mobileNumber, address} = details;

  return (
    <div className="myProfile">
        <div className="imgContainer">
            <LazyLoad height={200} offset={100} once>
                <img src={userProfile} alt="" />
            </LazyLoad>
            <FormDivider title="My Profile"/>
        </div>
        <div className="details">
            <p><strong>Name: </strong>{name}</p>
            {username && <p><strong>Username:</strong> {username}</p>}
            <p><strong>Email: </strong>{email}</p>
            <p><strong>Mobile Number:</strong> {mobileNumber}</p>
            <p><strong>Address: </strong>{address ?? ''}</p>
        </div>
        <div className="buttons">
            <button>Edit Details</button>
            <button>Change Profile</button>
        </div>
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
    })
}


const ProfleContents = () => {
  return (
    <div className="container profileContents">
        <MyProfile details={{
            name: 'Keith Cyrill A. Diza',
            email: "sample@gmail.com",
            username: null,
            mobileNumber: "1234",
            address: null
            
        }}/> 
        <FormTable title="Order History"/>
    </div>
  )
}

export default ProfleContents
