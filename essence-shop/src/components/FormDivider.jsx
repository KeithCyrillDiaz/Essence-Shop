
import assignTypes from '../constant/PropTypes'

const FormDivider = ({title}) => {
  return (
    <div className="divider">
        <svg width="126" height="6" viewBox="0 0 126 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.46255 2.71387C5.46255 1.24111 4.26865 0.0472004 2.79588 0.0472004C1.32313 0.0472004 0.129219 1.24111 0.129219 2.71387C0.129219 4.18663 1.32313 5.38053 2.79588 5.38053C4.26865 5.38053 5.46255 4.18663 5.46255 2.71387ZM125.245 2.21387L2.79588 2.21387V3.21387L125.245 3.21387V2.21387Z" fill="#D4AF37"/>
        </svg>
        <p>{title}</p>
        <svg width="126" height="6" viewBox="0 0 126 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M120.517 2.67382C120.517 4.14658 121.711 5.34048 123.184 5.34048C124.656 5.34048 125.85 4.14658 125.85 2.67382C125.85 1.20106 124.656 0.00715062 123.184 0.00715075C121.711 0.00715088 120.517 1.20106 120.517 2.67382ZM0.734619 3.17383L123.184 3.17382L123.184 2.17382L0.734619 2.17383L0.734619 3.17383Z" fill="#D4AF37"/>
        </svg>
    </div>
  )
}

FormDivider.propTypes = {
    title: assignTypes.title
}

export default FormDivider
