import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import PropTypes from "prop-types";
import usePagination from "../hook/usePagination";

const RenderItems = ({products}) => {

 const {currentItems, totalPages, handlePageChange, currentPage} = usePagination(products)

  
    return (
        <div className=" container inventory">
          <div className="productsContainer">
              {currentItems.map((item, index) => (
                  <ItemCard
                      key={index}
                      item={item} 
                  />
              ))}
          </div>
          <Pagination 
          handlePageChange={handlePageChange} 
          totalPages={totalPages} 
          currentPage={currentPage}/>
        </div>
      )
}

RenderItems.propTypes = {
    products: PropTypes.array,
}

export default RenderItems
