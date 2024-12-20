import PropTypes from 'prop-types';

import assignTypes from '../constant/PropTypes';
import { Perfumes } from '../assets';
import axios from 'axios';
import backendRoutes from '../routes/backendROutes';
import { useState } from 'react';
import Loader from './Loader';

const HistoryItemCard = ({item, selected}) => {

    const {productId, price, quantity, receiptId} = item;
    const [loading, setLoading] = useState(false);

    const {_id} = productId;

    const handleCancelButton = async () => {
        try {
            console.log("Cancelling Order");
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.patch(
                `${backendRoutes.order.updateStatus}/${_id}`,
                {status: "Cancelled", receiptId},
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            );

            if(!response.data) {
                console.log("Error Updating Order Status");
                return
            }

              // Reload the page
            window.location.reload();  

        } catch (error) {
            console.error("Error Cancelling Order", error);

        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return <Loader/>
    }

    return(
        <div className="historItemContainer">
           <div className="left">
                <div className="imgContainer">
                    <img src={Perfumes.Dior.Sauvage} alt="" />
                </div>
                <div className="fragDetails">
                    <p><strong>{productId.productName}</strong></p>
                    <p>{productId.size}</p>
                </div>
            </div>
            <div className="right">
                <div>
                    <p>Amount: ₱ <strong>{price}</strong></p>
                    <p>Quantity: <strong>{quantity}</strong></p>
                </div>
               {selected === "Completed" && (
                 <div className="buttons">
                    <button className='rate'>Rate</button>
                    <button className='buyAgain'>Buy Again</button>
                </div>
               )}
               {selected === "Pending" && (
                 <div className="buttons">
                    <button className='buyAgain' onClick={handleCancelButton}>Cancel</button>
                </div>
               )}
            </div>
         </div>
    )
}

HistoryItemCard.propTypes = {
    item: PropTypes.shape({
        productId : PropTypes.shape({
            _id: assignTypes.string,
            productName: assignTypes.string,
            size: assignTypes.string,
        }),
        price: assignTypes.number,
        quantity: assignTypes.number,
        receiptId: assignTypes.string
    }),
    selected: assignTypes.string
}

export default HistoryItemCard

