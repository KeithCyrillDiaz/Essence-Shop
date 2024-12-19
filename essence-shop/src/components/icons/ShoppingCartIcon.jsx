import assignTypes from "../../constant/PropTypes"


const ShoppingCartIcon = ({onClick}) => {
  return (
    <div onClick={onClick} className='icon'>
    <svg width="100%" height="100%" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.4625 15.4813C45.2709 15.2043 45.015 14.978 44.7168 14.8216C44.4185 14.6652 44.0868 14.5835 43.75 14.5834H15.2771L12.8729 8.81252C12.5586 8.05191 12.0251 7.40206 11.3402 6.94572C10.6553 6.48937 9.85009 6.2472 9.0271 6.25002H4.16669V10.4167H9.0271L18.9104 34.1354C19.0687 34.5149 19.3358 34.8391 19.678 35.0671C20.0202 35.2951 20.4222 35.4167 20.8334 35.4167H37.5C38.3688 35.4167 39.1459 34.8771 39.4521 34.0667L45.7021 17.4C45.8202 17.0847 45.8601 16.7453 45.8184 16.4112C45.7767 16.077 45.6546 15.7579 45.4625 15.4813Z" fill="white"/>
    <path d="M21.875 43.75C23.6009 43.75 25 42.3509 25 40.625C25 38.8991 23.6009 37.5 21.875 37.5C20.1491 37.5 18.75 38.8991 18.75 40.625C18.75 42.3509 20.1491 43.75 21.875 43.75Z" fill="white"/>
    <path d="M36.4583 43.75C38.1842 43.75 39.5833 42.3509 39.5833 40.625C39.5833 38.8991 38.1842 37.5 36.4583 37.5C34.7324 37.5 33.3333 38.8991 33.3333 40.625C33.3333 42.3509 34.7324 43.75 36.4583 43.75Z" fill="white"/>
    </svg>
</div>
  )
}

ShoppingCartIcon.propTypes = {
    onClick: assignTypes.function
}


export default ShoppingCartIcon
