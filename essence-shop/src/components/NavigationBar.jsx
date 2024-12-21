import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import assignTypes from '../constant/PropTypes';
import { SearchIcon, ShoppingCartIcon } from './icons';
import { SessionExpired } from '.';



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



const TabButton = ({title, path, currentPage}) => {

  const Element = currentPage === "Home" ? "a" : Link;
  const elementProps =
  currentPage === "Home"
    ? { href: path } // Use 'href' for <a>
    : { to: '/' };  // Use 'to' for <Link>

    return (
      <Element {...elementProps}>
        {title}
      </Element>
    );
}

TabButton.propTypes = {
    title: assignTypes.title,
    path: assignTypes.string,
    currentPage: assignTypes.string
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
              <div className="item">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.375 6.125C6.375 9.22625 8.89875 11.75 12 11.75C15.1012 11.75 17.625 9.22625 17.625 6.125C17.625 3.02375 15.1012 0.5 12 0.5C8.89875 0.5 6.375 3.02375 6.375 6.125ZM22 24.25H23.25V23C23.25 18.1763 19.3237 14.25 14.5 14.25H9.5C4.675 14.25 0.75 18.1763 0.75 23V24.25H22Z" fill="#800020"/>
                </svg>

                <button onClick={onClickProfile}>View Profile</button>
              </div>
              <div className="item">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.75 15.8125L15.8125 24.75C15.5625 25 15.2812 25.1875 14.9688 25.3125C14.6562 25.4375 14.3438 25.5 14.0312 25.5C13.7188 25.5 13.4062 25.4375 13.0938 25.3125C12.7812 25.1875 12.5 25 12.25 24.75L1.21875 13.7188C0.989583 13.4896 0.8125 13.2242 0.6875 12.9225C0.5625 12.6208 0.5 12.3029 0.5 11.9688V3C0.5 2.3125 0.745 1.72417 1.235 1.235C1.725 0.745833 2.31333 0.500833 3 0.5H11.9688C12.3021 0.5 12.625 0.567917 12.9375 0.70375C13.25 0.839583 13.5208 1.02167 13.75 1.25L24.75 12.2812C25 12.5312 25.1825 12.8125 25.2975 13.125C25.4125 13.4375 25.4696 13.75 25.4688 14.0625C25.4679 14.375 25.4108 14.6825 25.2975 14.985C25.1842 15.2875 25.0017 15.5633 24.75 15.8125ZM6.125 8C6.64583 8 7.08875 7.81792 7.45375 7.45375C7.81875 7.08958 8.00083 6.64667 8 6.125C7.99917 5.60333 7.81708 5.16083 7.45375 4.7975C7.09042 4.43417 6.6475 4.25167 6.125 4.25C5.6025 4.24833 5.16 4.43083 4.7975 4.7975C4.435 5.16417 4.2525 5.60667 4.25 6.125C4.2475 6.64333 4.43 7.08625 4.7975 7.45375C5.165 7.82125 5.6075 8.00333 6.125 8Z" fill="#800020"/>
                </svg>
                <button onClick={onClickSellNow}>Sell Now</button>
              </div>
            </div>
        )}
    </>
  )
}

NavigationBarPopUp.propTypes = {
  onClickProfile: assignTypes.function,
  onClickSellNow: assignTypes.function,
  visible: assignTypes.boolean
}


const NavigationBar = ({currentPage}) => {

    const isUserLogIn = localStorage.getItem('token');

    const tabButtons = [
        { title: "Home", path: "#home"},
        { title: "Categories", path: "#categories"},
        { title: "Shop", path: "#shop" },
        { title: "About", path: "#about" },
        { title: "Contact", path: "#contact"},
    ]

    const navigation = useNavigate();

    const [showPopUp, setShowPopUp] = useState(false);
    const [showSessionExpired, setShowSessionExpired] = useState(false);

    const handleNavigateProfile = () => {
      const id = localStorage.getItem('id');
      if(!id) {
        setShowSessionExpired(true);
        return;
      }
      navigation(`/profile`);
    }


    const handleNavigateCart = () => {
      const token = localStorage.getItem('token');
      if(!token) {
        navigation('/register');
        return;
      }

      navigation(`/Cart`);
    }
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
                  path={path}
                  currentPage = {currentPage}
                  onClick={() => navigation(path)}
              />
          )
        })}
        </div>
        <ShoppingCartIcon onClick ={() => handleNavigateCart()}/>
       <div className="mainbuttonContainer">
        <NavigationBarMainButton 
          title = {isUserLogIn ? "PROFILE" : "SIGN IN"} 
          onClick={() => {
            if(!isUserLogIn) {
              navigation('/register'); // navigate to sign in
              return
            }
            setShowPopUp(!showPopUp)
          }}
          />
          <NavigationBarPopUp 
          visible={showPopUp}
          onClickProfile={() => handleNavigateProfile()}
          onClickSellNow={() => navigation('/sellNow')}
          />
       </div>
       {showSessionExpired && <SessionExpired/>}
    </div>
  )
}

NavigationBar.propTypes ={ 
  currentPage: assignTypes.string
}

export default NavigationBar
