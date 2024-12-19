import { useState } from "react";
import assignTypes from "../constant/PropTypes";
import FormDivider from "./FormDivider";
import HistoryItemCard from "./HistoryItemCard";

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

const FormTable = ({title}) => {

    const [selected, setSelected] = useState("Completed");

    const handleTabButtonClicked = (button) => {
        setSelected(button);
    }

    return (
      <div className="orderHistory">
        <FormDivider title={title}/>
        <FormTab selected={selected} onClick={handleTabButtonClicked}/>
        <HistoryItemCard item={{
            productName: "Sauvage",
            size: "100ml",
            price: 20000,
            quantity: 2
        }}/>
      </div>
    )
  }

FormTable.propTypes = {
    title: assignTypes.title
}

export default FormTable;