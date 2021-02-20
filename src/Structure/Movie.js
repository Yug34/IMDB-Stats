import React from 'react';
import style from './movie.module.css';

const Movie = ({ id, title, image, description }) => {
    const API_KEY = "k_6nhg5ps6";
    const getDetails = async () => {
        const response = await fetch(`https://imdb-api.com/en/API/Title/${API_KEY}/${id}`)
        const data = await response.json();
        console.log(data);
    }
    const movieDetails = e => {
        e.preventDefault();
        getDetails();

    };
    return (
        <div className = {style.movie} onClick={movieDetails}
        >
            <h1>{title}</h1>
            <div>
                <p>{description}</p>
            </div>
            <img src={image} alt="" className = {style.image} />
        </div>
    );
}

export default Movie;
