import assignTypes from "../../constant/PropTypes"


const Menu = ({currentPage, handledOnClick}) => {

    const menus = [
        {
            title: "Dashboard",
            icon: (color) => ( 
                <svg
                 width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8333 7.5V2.5H17.5V7.5H10.8333ZM2.5 10.8333V2.5H9.16667V10.8333H2.5ZM10.8333 17.5V9.16667H17.5V17.5H10.8333ZM2.5 17.5V12.5H9.16667V17.5H2.5Z" fill={ color}/>
                </svg>
                )
        },
        {
            title: "Users",
            icon: (color) => ( 
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.25 5.41699C6.25 7.48449 7.9325 9.16699 10 9.16699C12.0675 9.16699 13.75 7.48449 13.75 5.41699C13.75 3.34949 12.0675 1.66699 10 1.66699C7.9325 1.66699 6.25 3.34949 6.25 5.41699ZM16.6667 17.5003H17.5V16.667C17.5 13.4512 14.8825 10.8337 11.6667 10.8337H8.33333C5.11667 10.8337 2.5 13.4512 2.5 16.667V17.5003H16.6667Z" fill={ color}/>
                </svg>                
                )
        },
        {
            title: "Products",
            icon: (color) => ( 
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1667 10.2083L10.2083 16.1667C10.0417 16.3333 9.85417 16.4583 9.64583 16.5417C9.4375 16.625 9.22917 16.6667 9.02083 16.6667C8.8125 16.6667 8.60417 16.625 8.39583 16.5417C8.1875 16.4583 8 16.3333 7.83333 16.1667L0.479167 8.8125C0.326389 8.65972 0.208333 8.48278 0.125 8.28167C0.0416667 8.08055 0 7.86861 0 7.64583V1.66667C0 1.20833 0.163333 0.816111 0.49 0.49C0.816667 0.163889 1.20889 0.000555556 1.66667 0H7.64583C7.86806 0 8.08333 0.0452779 8.29167 0.135833C8.5 0.226389 8.68056 0.347778 8.83333 0.5L16.1667 7.85417C16.3333 8.02083 16.455 8.20833 16.5317 8.41667C16.6083 8.625 16.6464 8.83333 16.6458 9.04167C16.6453 9.25 16.6072 9.455 16.5317 9.65667C16.4561 9.85833 16.3344 10.0422 16.1667 10.2083ZM3.75 5C4.09722 5 4.3925 4.87861 4.63583 4.63583C4.87917 4.39306 5.00056 4.09778 5 3.75C4.99944 3.40222 4.87806 3.10722 4.63583 2.865C4.39361 2.62278 4.09833 2.50111 3.75 2.5C3.40167 2.49889 3.10667 2.62056 2.865 2.865C2.62333 3.10944 2.50167 3.40444 2.5 3.75C2.49833 4.09556 2.62 4.39083 2.865 4.63583C3.11 4.88083 3.405 5.00222 3.75 5Z" fill={ color}/>
                </svg>

                )
        },
    ]

  return (
    <div className="menu">
        {menus.map((item, index) => (
            <div className="row" key={index} onClick={() => handledOnClick(item.title)}>
                <div className="icon">
                    {item.icon(currentPage === item.title ? '#D4AF37' : 'white')}
                </div>
                <p className={`${currentPage === item.title ? 'highlight' : ''}`}>{item.title}</p>
            </div>
        ))}
    
    </div>
  )
}

Menu.propTypes = {
    currentPage: assignTypes.string,
    handledOnClick: assignTypes.function
}

export default Menu
