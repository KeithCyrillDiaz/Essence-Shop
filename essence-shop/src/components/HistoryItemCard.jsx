import PropTypes from 'prop-types';

import assignTypes from '../constant/PropTypes';
import { Perfumes } from '../assets';

const HistoryItemCard = ({item}) => {
    const {productName, size, price, quantity} = item;
    return(
        <div className="historItemContainer">
           <div className="left">
                <div className="imgContainer">
                    <img src={Perfumes.Dior.Sauvage} alt="" />
                </div>
                <div className="fragDetails">
                    <h3>{productName}</h3>
                    <p>{size}</p>
                </div>
            </div>
            <div className="right">
                <div>
                    <p>Amount: ₱ <strong>{price}</strong></p>
                    <p>Quantity: <strong>{quantity}</strong></p>
                </div>
                <div className="buttons">
                    <button className='rate'>Rate</button>
                    <button className='buyAgain'>Buy Again</button>
                </div>
            </div>
         </div>
    )
}

HistoryItemCard.propTypes = {
    item: PropTypes.shape({
        productName: assignTypes.string,
        size: assignTypes.string,
        price: assignTypes.number,
        quantity: assignTypes.number
    })
}

export default HistoryItemCard

