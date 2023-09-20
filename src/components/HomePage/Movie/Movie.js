import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.scss';
const Movie = ({ show }) => {
    const { id, title, genres, img } = show;
    return (
        <div className="card-item">
            <Link to={`/movie/${id}`}>
                <div className="card-inner">
                    <div className="card-top">
                        <img src={img ? img : `https://i.ibb.co/Lxn5VNV/default-Image.jpg`} alt={title} />
                    </div>
                    <div className="card-bottom">
                        <div className="card-info">
                            <h4>{title}</h4>
                           {genres.length === 3 && <p>{genres[0]} & {genres[1]} & {genres[2]}</p> }
                           {genres.length === 2 && <p>{genres[0]} & {genres[1]}</p> }
                           {genres.length === 1 && <p>{genres[0]}</p>}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Movie;