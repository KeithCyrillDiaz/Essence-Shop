import { useState } from 'react'

const usePagination = (products) => {

    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(12); // Maximum items per page (fixed to 12)

    // Pagination Logic
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


  return {
    currentItems,
    handlePageChange,
    totalPages,
    currentPage
  }
}

export default usePagination
