import PropTypes from 'prop-types';

import assignTypes from '../constant/PropTypes';
import { Perfumes } from '../assets';
import axios from 'axios';
import backendRoutes from '../routes/backendROutes';
import { useState } from 'react';
import Loader from './Loader';

const HistoryItemCard = ({item, selected, formTitle}) => {

    const {productId, price, quantity, receiptId, orderId, _id: salesId} = item;
    const [loading, setLoading] = useState(false);

    const {_id, brand, imageOf} = productId

    const uri = Perfumes?.[brand]?.[imageOf];

    const handleShipItem = async () => {
        try {
            console.log("Shipping Item");
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${backendRoutes.sales.updateSalesStatus}${salesId}`,
                {status: "Completed", orderId: orderId._id},
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )

            if(!response.data) {
                console.log("Failed updating Sales History");
                return;
            }

            // Reload the page
            window.location.reload();  

        } catch (error) {
            console.error("Error updating Sales Status", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancelButton = async (status) => {
        try {
            if(status === 'cancel') {
                console.log("Cancelling Order");
            } else {
                console.log("Shipping Order");
            }
            const token = localStorage.getItem('token');
            setLoading(true);
            const response = await axios.patch(
                `${backendRoutes.order.updateStatus}/${_id}`,
                 {
                    status: status === "cancel" ? "Cancelled" : "Completed",
                    receiptId
                 },
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
                    <img src={uri} alt="" />
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
               {selected === "Completed" && formTitle === 'order' && (
                 <div className="buttons">
                    <button className='rate'>Rate</button>
                    <button className='buyAgain'>Buy Again</button>
                </div>
               )}
               {selected === "Pending" && (
                 <div className="buttons">
                    <button className='rate' onClick={() => handleCancelButton("cancel")}>Cancel</button>
                   {formTitle !== 'order' &&  <button className='buyAgain' onClick={() => handleShipItem()}>Shipped</button>}
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
            brand: assignTypes.string,
            imageOf: assignTypes.string,
        }),
        price: assignTypes.number,
        quantity: assignTypes.number,
        receiptId: assignTypes.string,
        _id: assignTypes.string,
        orderId: PropTypes.shape({
            _id: assignTypes.string,
        })
    }),
    selected: assignTypes.string,
    formTitle: assignTypes.string,
}

export default HistoryItemCard

