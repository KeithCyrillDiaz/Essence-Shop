import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import assignTypes from '../constant/PropTypes';
import { SearchIcon, ShoppingCartIcon } from './icons';


const SearchField = ({onClick, value, onChangeText}) => {
  return (
    <div className="searchField">
      <input
      placeholder='Search a pefume'
      type='text'
      value={value}
      onChange={onChangeText}
      />
      <SearchIcon onClick={onClick}/>
    </div>
  )
}

SearchField.propTypes ={
  onClick: assignTypes.function,
  value: assignTypes.string,
  onChangeText: assignTypes.function
}



const TabButton = ({title, path}) => {
  return ( 
    <a href={path}> 
    {title}
    </a>
  )
}

TabButton.propTypes = {
    title: assignTypes.title,
    path: assignTypes.string
};


const NavigationBarMainButton = ({title, onClick}) => {
    return(
        <button onClick={onClick} className="navigationBarMainButton">
            {title}
        </button>
    )
}

NavigationBarMainButton.propTypes = {
    title: assignTypes.title,
    onClick: assignTypes.function
}


const NavigationBarPopUp = ({onClickProfile, onClickSellNow, visible}) => {
  return (
    <>
       {visible && (
            <div className="navigationBarPopUp">
              <button onClick={onClickProfile}>View Profile</button>
              <button onClick={onClickSellNow}>Sell Now</button>
            </div>
        )}
    </>
  )
}

NavigationBarPopUp.propTypes = {
  onClickProfile: assignTypes.function,
  onClickSellNow: assignTypes.function,
  visible: assignTypes.bool
}


const NavigationBar = ({MainButton, currentPage}) => {

    const {title, path} = MainButton;

    const tabButtons = [
        { title: "Home", path: "#home"},
        { title: "Categories", path: "#categories" },
        { title: "Shop", path: "#shop" },
        { title: "About", path: "#about" },
        { title: "Contact", path: "#contact"},
    ]

    const navigation = useNavigate();

    const [showPopUp, setShowPopUp] = useState(false)

  return (
    <div className="navigationBarContainer">
       <h2 className="logo">Essence Shop</h2>
       <SearchField/>
        <div className="tabContainer">
          {tabButtons.map((tab, index) => {
          const {title, path} = tab;
          return (
              <TabButton 
                  key={index}
                  title={title}
                  currentPage={currentPage}
                  path={path}
                  onClick={() => navigation(path)}
              />
          )
        })}
        </div>
        <ShoppingCartIcon onClick ={() => navigation('/Cart')}/>
        <NavigationBarMainButton 
        title = {title} 
        onClick={() => {
          if(title.toLowerCase() === "sign in") {
            navigation(path); // navigate to sign in
            return
          }
          if(title === "Profile"){
            setShowPopUp(true)
          }
        }}
        />
        <NavigationBarPopUp 
        visible={showPopUp}
        onClickProfile={() => navigation('/profile')}
        onClickSellNow={() => navigation('/sellNow')}
        />

    </div>
  )
}

NavigationBar.propTypes = {
    MainButton: PropTypes.shape({
        title: assignTypes.title,
        path: assignTypes.string
    }).isRequired,
    currentPage: assignTypes.string.isRequired,
}

export default NavigationBar
