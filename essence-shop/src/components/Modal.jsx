
import assignTypes from '../constant/PropTypes';

const Modal = ({ message, isSuccess, title, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-container" >
          <div className="header">
            <h2 className={`${isSuccess ? "titleSuccess": "titleError"}`}>{title} {isSuccess ? "Completed" : "Failed"}</h2>
          </div>
          <p className="modal-message">{message}</p>
          <div className="footer">
            <button onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  Modal.propTypes ={
    message: assignTypes.string,
    isSuccess: assignTypes.boolean,
    title: assignTypes.title,
    onClose: assignTypes.function
  }

export default Modal
