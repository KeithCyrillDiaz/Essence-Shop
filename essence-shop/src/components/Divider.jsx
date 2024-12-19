import assignTypes from "../constant/PropTypes"



const Divider = ({title, id}) => {
  return (
        <div className="divider" id={id}>
            <div className="line">
                <svg width="100%" height="100%" viewBox="0 0 358 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.76837e-07 8C4.76837e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 4.76837e-07 8 4.76837e-07C3.58172 4.76837e-07 4.76837e-07 3.58172 4.76837e-07 8ZM8 9.5H357V6.5H8V9.5Z" fill="#D4AF37"/>
                </svg>
            </div>

            <h1>{title}</h1>

            <div className="line">
                <svg
                 width="100%" height="100%" viewBox="0 0 358 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M341.999 8.02075C342.01 12.439 345.601 16.0114 350.02 15.9999C354.438 15.9885 358.01 12.3975 357.999 7.97919C357.987 3.56093 354.396 -0.0114791 349.978 -3.07988e-06C345.56 0.0114729 341.987 3.60249 341.999 8.02075ZM0.00389609 10.4091L350.003 9.49996L349.995 6.49997L-0.00389609 7.40906L0.00389609 10.4091Z" fill="#D4AF37"/>
                </svg>
            </div>
        </div>
   
  )
}

Divider.propTypes = {
    title: assignTypes.title,
    id: assignTypes.string
}

export default Divider
