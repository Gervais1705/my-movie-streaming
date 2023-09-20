import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../States/app/app';
import { getAllShows, gettingShows } from '../../../States/showSlice/showSlice';
import Movie from '../Movie/Movie';
import './Movies.scss';
import { imagesArray } from '../../../Commons/images';
import Pagination from '../Pagination/Pagination';
interface Result {
    id: string,
    title: string,
    genres: string[],
    img: string
}
const Movies = () => {
    const [searchText, setSearchText] = useState('');
    const [filterText, setFilterText] = useState('');
    const [searchResult, setSearchResult] = useState<Result[]>([]);
    const [filterResult, setFilterResult] = useState<Result[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage] = useState(12);
    const dispatch = useAppDispatch();
    const { data }: any = useAppSelector(getAllShows);

    //dispatching the action for api data 
    useEffect(() => {
        dispatch(gettingShows());
    }, [dispatch, filterText]);

    // merging arrays of images and the data from server
    let result: Result[] = [];
    if (data && imagesArray) {
        for (const i of data) {
            for (const j of imagesArray) {
                const imageid = j.img.split('.')[0].replace('/static/media/', '');
                if (i.id === imageid) {
                    const objn: Result = { ...i, ...j };
                    result.push(objn);
                }

            }
        }
        // adding default images item
        const getDifference = (array1: Result[], array2: Result[]) => {
            return array1.filter(object1 => {
                return !array2.some(object2 => {
                    return object1.id === object2.id;
                });
            });
        }
        const oddMovies = getDifference(data, result);
        result = [...result, ...oddMovies];
    }


    // Pagination functions
    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = result.slice(indexOfFirstShow, indexOfLastShow);
    const currentfilterShows = filterResult.slice(indexOfFirstShow, indexOfLastShow);
    const currentsearchShows = searchResult.slice(indexOfFirstShow, indexOfLastShow);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // searching with searchbar
    const handleSearch = (event: any) => {
        const search = event.target.value;
        setSearchText(search.toLowerCase());
        if(!filterText && searchText){
            setFilterResult(result);   
        }
        if (searchText !== '') {
            const newShows = filterResult.filter((Show: any) => {
                return Object.values(Show).join("").toLowerCase().includes(searchText);

            });
            setSearchResult(newShows);
        }
        else {
            setSearchResult(result);
        }
    }

    // handle search with filter
    const handleSearchFilter = (event: any) => {
        const search = event.target.value;
        setFilterText(search);
        console.log(search);
        if (search !== 'all') {
            const filterShows = result.filter(Show => {
                return Object.values(Show.genres).join("").toLowerCase().includes(search);

            });
            setFilterResult(filterShows);
        }
        else {
            setFilterResult(result);
        }
    }
    const handleReset = (e: any) => {
        e.preventDefault();
        setSearchText('');
    }
    return (
        <div className="movie-wrapper">
            <div className="back-design">
                <div className="">
                    <h1 className="">Find The Best Movies</h1>
                </div>
                <div className="search-input-box">
                    <select onChange={handleSearchFilter} name="Genres" id="selectList" className='select-menu'>
                        <option value="all">All</option>
                        <option value="drama">Drama</option>
                        <option value="thriller">Thriller</option>
                        <option value="action">Action</option>
                        <option value="mystery">Mystery</option>
                    </select>
                    <form onSubmit={handleReset} className="search-input-box">
                        <input onChange={handleSearch} className='search-input' type="text" placeholder={`Search By Titles and Genres `} value={searchText} id="search-input" />
                        <input type="submit" value="X" className='reset' />
                    </form>
                </div>
            </div>
            <div className='container'>
                <div className="movie-list">
                    <h2>Movies</h2>
                    <div className="movie-container">
                        {/* checking the data filtering and looping over the expected element */}
                        {
                            ((searchText.length < 1) && (filterText === '' || filterText === 'all')) ?
                                currentShows?.map((show, i) => <Movie key={i} show={show} ></Movie>)
                                :
                                <>
                                    {
                                        searchText ?
                                            currentsearchShows?.map((show, i) => <Movie key={i} show={show} ></Movie>)
                                            :
                                            currentfilterShows?.map((show, i) => <Movie key={i} show={show} ></Movie>)
                                    }
                                </>
                        }
                    </div>
                    {(currentsearchShows.length === 0 && searchText.length !== 0) ? <div className='notfound-movies'> <h1>No Movies Found!</h1></div> : ""}
                </div>

                {/*Condition to show pagination buttons  */}
                {!(currentsearchShows.length === 0 && searchText.length !== 0) && <div className='pagination-style'>
                    <Pagination
                        showsPerPage={showsPerPage}
                        totalShows={result.length}
                        searchResult={searchResult.length}
                        filterResult={filterResult.length}
                        paginate={paginate}
                    />
                </div>}

            </div>

        </div>
    );
};

export default Movies;