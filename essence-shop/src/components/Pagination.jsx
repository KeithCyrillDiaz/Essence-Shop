import assignTypes from "../constant/PropTypes"

const Pagination = ({currentPage, handlePageChange, totalPages}) => {
  return (
    <div className="pagination container">
            <button 
                disabled={currentPage === 1} 
                onClick={() => handlePageChange(currentPage - 1)}>
                <div className="icon">
                    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.2333 21.7667C12.7652 21.298 12.5022 20.6626 12.5022 20.0001C12.5022 19.3376 12.7652 18.7022 13.2333 18.2334L22.66 8.80341C23.129 8.33464 23.765 8.07138 24.4281 8.07153C24.7564 8.07161 25.0815 8.13636 25.3848 8.26208C25.6881 8.38779 25.9637 8.57202 26.1958 8.80424C26.4279 9.03647 26.612 9.31213 26.7376 9.6155C26.8632 9.91887 26.9278 10.244 26.9277 10.5723C26.9276 10.9007 26.8629 11.2258 26.7372 11.5291C26.6114 11.8324 26.4272 12.108 26.195 12.3401L18.5367 20.0001L26.1967 27.6601C26.4355 27.8906 26.6261 28.1664 26.7573 28.4713C26.8885 28.7763 26.9576 29.1043 26.9606 29.4362C26.9637 29.7682 26.9006 30.0974 26.775 30.4047C26.6494 30.712 26.4639 30.9912 26.2293 31.226C25.9947 31.4609 25.7157 31.6466 25.4085 31.7725C25.1013 31.8983 24.7721 31.9617 24.4402 31.959C24.1082 31.9563 23.7802 31.8875 23.4751 31.7566C23.17 31.6257 22.8941 31.4354 22.6633 31.1967L13.23 21.7667H13.2333Z" fill="black"/>
                    </svg>
                </div>

            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button 
                    key={index} 
                    className={currentPage === index + 1 ? 'active' : ''} 
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(currentPage + 1)}>
                <div className="icon">
                    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M26.7667 18.2333C27.2348 18.702 27.4978 19.3374 27.4978 19.9999C27.4978 20.6624 27.2348 21.2978 26.7667 21.7666L17.34 31.1966C16.871 31.6654 16.235 31.9286 15.5719 31.9285C14.9088 31.9283 14.2729 31.6648 13.8042 31.1958C13.3354 30.7268 13.0721 30.0908 13.0723 29.4277C13.0724 28.7646 13.336 28.1287 13.805 27.6599L21.465 19.9999L13.805 12.3399C13.3494 11.8686 13.0971 11.2373 13.1025 10.5818C13.1079 9.92626 13.3705 9.2991 13.8338 8.83536C14.2971 8.37162 14.924 8.1084 15.5795 8.1024C16.235 8.0964 16.8666 8.34809 17.3383 8.80327L26.7683 18.2316L26.7667 18.2333Z" fill="black"/>
                    </svg>
                </div>

            </button>
        </div>
  )
}

Pagination.propTypes = {
    currentPage: assignTypes.number,
    handlePageChange: assignTypes.function,
    totalPages: assignTypes.number
}

export default Pagination
