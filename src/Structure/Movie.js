import React, { useState } from 'react';
import style from './movie.module.css';
import API_KEY from '../secrets.js';
import Detail from './Detail';

const Movie = ({ id, title, image, description }) => {
    const [details, setDetails] = useState([]);
    const [hovered, setHover] = useState(false)
    const [details_requested, setDetailsRequested] = useState(false)


    const getDetails = async () => {
        if (!details_requested) {
            const response = await fetch(`https://imdb-api.com/en/API/Title/${API_KEY}/${id}`)
            const data = await response.json();
            setDetails(data);
            console.log(data);
        }
    }
    const movieDetails = e => {
        e.preventDefault();
        setHover(true);
        setDetailsRequested(true)
        getDetails();

    };

    const mouseLeave = e => {
        e.preventDefault();
        setHover(false);
    }

    if (!hovered) {
        return (
            <div className={style.movie} onMouseOver={movieDetails}>
                <h1>{title}</h1>
                <div>
                    <p>{description}</p>
                </div>
                <img src={image} alt="" className={style.image} />
            </div>
        );
    }

    else {
        return (
            <div className={style.details} onMouseLeave={mouseLeave}>
                <h1>{title}</h1>
                <div>
                    <ul>
                        <li>Awards: {details.awards}</li>
                        <li>IMDB Rating: {details.imDbRating}</li>
                        {details.boxOffice ?
                        <Detail
                            name="Gross"
                            data={details}
                            indices={["boxOffice", "cumulativeWorldwideGross"]}
                        />
                        :
                        <></>
                        }
                    </ul>
                </div>

            </div>
        );

    }
}

export default Movie;
