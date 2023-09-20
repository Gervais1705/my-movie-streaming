import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { imagesArray } from '../../Commons/images';
import { useAppDispatch, useAppSelector } from '../../States/app/app';
import { getAllShowDetails, gettingShowDetails, removeDetails } from '../../States/showSlice/showSlice';
import './MovieDetails.scss';
import defaultImage from '../../images/defaultImage.jpeg';
const MovieDetails = () => {
    const { id } : any = useParams();
    const dispatch = useAppDispatch();
    const {data} : any = useAppSelector(getAllShowDetails);
    useEffect(() => {
        dispatch(gettingShowDetails(id));
        return () => {
            dispatch(removeDetails());
        }
    }, [dispatch, id]);
    // merging arrays of images and 
    let selectedShow = {...data};
    if(data && imagesArray){
        for(const j of imagesArray){
            const imageid = j.img.split('.')[0].replace('/static/media/', '');
            if(data.id === imageid){
                selectedShow = {...data,"img": j.img };
            }
       }   
    };
  
    const { title, description, duration, genres, img, releaseYear, releaseDate, topCast} = selectedShow;
    return (
        <div className="movie-section">
        {
            Object.keys(selectedShow).length === 0 ?
                <div className='loading'><h1>Loading...</h1></div>
                :
                <>
                    <div className="section-left">
                        <div className="movie-title">{title}</div>
                        <div className="movie-rating">
                            <span>
                            Rating <i className="fa fa-star"></i> : 7.8
                            </span>
                            <span>
                                Votes <i className="fa fa-thumbs-up"></i> :{" "}
                                10023
                            </span>
                            <span>
                                Runtime <i className="fa fa-film"></i> : {duration}
                            </span>
                            <span>
                                Date: <i className="fa fa-calendar"></i> : {releaseDate}
                            </span>
                            <span>
                                Year <i className="fa fa-calendar"></i> : {releaseYear}
                            </span>
                        </div>
                        <div className="movie-plot">{description}</div>
                        <div className="movie-info">
                            <div>
                                <span>Stars</span>
                                <span>{topCast[0].name}</span>
                            </div>
                            <div>
                                <span>Generes</span>
                                <span>{genres[0]}</span>
                            </div>
                            <div>
                                <span>Languages</span>
                                <span>English</span>
                            </div>
                        </div>
                    </div>
                    <div className="section-right">
                        <img src={img ? img : defaultImage} alt={selectedShow.Title} />
                    </div>
                </>
        }
    </div>
    );
};

export default MovieDetails;