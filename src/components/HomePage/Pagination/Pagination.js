import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.scss';
const Pagination = ({ showsPerPage, totalShows, searchResult, filterResult, paginate }) => {
    const pageNumbers = [];

    // page number based on the search and filter result
    if(!searchResult && !filterResult){
        for (let i = 1; i <= Math.ceil(totalShows / showsPerPage); i++) {
            pageNumbers.push(i);
        }
    }
    else{
        if(searchResult){
            for (let i = 1; i <= Math.ceil(searchResult / showsPerPage); i++) {
                pageNumbers.push(i);
            }
        }
        else{
            for (let i = 1; i <= Math.ceil(filterResult / showsPerPage); i++) {
                pageNumbers.push(i);
            }
        }
    }
    
    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <Link to='/' onClick={() => paginate(number)} className='page-link'>
                        <li key={number} className='page-item'>
                            {number}

                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;