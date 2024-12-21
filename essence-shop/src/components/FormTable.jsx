import { useState } from "react";
import assignTypes from "../constant/PropTypes";
import FormDivider from "./FormDivider";
import HistoryItemCard from "./HistoryItemCard";
import PropTypes from "prop-types";

const FormTab = ({selected, onClick}) => {

    const buttons = [
        "Pending",
        "Cancelled",
        "Completed",
        "Return/Refund",
    ]

    return (
        <div className="formTab">
            {buttons.map((button, index) => (
                <button onClick={() => onClick(button)}className={`${button === selected ? 'highlight': ''}`} key={index}>{button}</button>
            ))}
        </div>
    )
}

FormTab.propTypes = {
    selected: assignTypes.string,
    onClick: assignTypes.function
}

const FormTable = ({ title, data }) => {
    
    const [selected, setSelected] = useState("Completed");
   const [selectedData, setSelectedData] = useState(data.complete);
  
    const handleTabButtonClicked = (button) => {
      setSelected(button);
      const data = getSelectedData(button);
      setSelectedData(data);
    };

    const getSelectedData = (label) => {
        switch (label) {
          case "Return/Refund":
            return data.refund;
          case "Completed":
            return data.complete;
          case "Pending":
            return data.pending;
          case "Cancelled":
            return data.cancelled;
          default:
            return [];
        }
      };

    return (
      <div className="orderHistory">
        <FormDivider title={title} />
        <FormTab selected={selected} onClick={handleTabButtonClicked} />
        {selectedData.length === 0 ? (
            <p className="noData">No data for <strong>{selected}</strong> at the moment</p>
        ): (
           <div className="itemListContainer">
             {selectedData.map((item, index) =>(
                 <HistoryItemCard key={index} item={item} selected={selected} formTitle={title === "Order History" ? 'order': 'sales'}/>
             ))}
           </div>
        )}
      </div>
    );
  };

  const dataObjectTypes =  PropTypes.shape({
    userId: assignTypes.string,
    productId: assignTypes.string,
    receiptId: assignTypes.string,
    status: assignTypes.string,
    quantity: assignTypes.number,
    price: assignTypes.number,
    month: assignTypes.string,
    day: assignTypes.number,
    year: assignTypes.number,
  })
  
  FormTable.propTypes = {
    title: assignTypes.title,
    data: PropTypes.arrayOf({
        completed: PropTypes.arrayOf(dataObjectTypes).isRequired,
        refunded: PropTypes.arrayOf(dataObjectTypes).isRequired,
        cancelled: PropTypes.arrayOf(dataObjectTypes).isRequired,
        pending: PropTypes.arrayOf(dataObjectTypes).isRequired,
    }).isRequired,
  };

export default FormTable;