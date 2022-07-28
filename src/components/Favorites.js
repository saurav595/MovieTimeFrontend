import FavoriteDataService from "../services/favorites";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
import {DnDCard} from './DnDCard.js';
import {useCallback, useState, useEffect} from 'react';
import update from 'immutability-helper';
import "./favorites.css";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const Favorites = ({ user, favorites}) => {
    const [movieData, setMovieData] = useState([]);
    

    useEffect(() => {
        FavoriteDataService.getMoviesByFavorites(user.googleId).then(
            response => {
                setMovieData(response.data.movies);
            })
    }, [favorites])

    const moveFavorite = useCallback((dragIndex, hoverIndex) => {
        setMovieData((prevFavorites) =>
          update(prevFavorites, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevFavorites[dragIndex]],
            ],
          }),
        )
      }, [])
    const renderFavorites = useCallback((movie, index) => {
        return (
          <DnDCard
            key={movie._id}
            index={index}
            id={movie._id}
            title={movie.title}
            poster={movie.poster+"100px180"}
            moveFavorite={moveFavorite}
          />
        )
      }, [])


    useEffect(() => {
        if (movieData.length > 0) {
            let tempArray = []
        for (let i = 0; i < movieData.length; i++) {
            tempArray.push(movieData[i]._id)
        }
        FavoriteDataService.updateFavorites({
            _id: user.googleId,
            favorites: tempArray
        }).catch(e=>{
            console.log(e)
        })
        console.log('updated db')
        }
        
    }, [movieData, moveFavorite])

    return (
        <Container className="favoritesContainer">
            <div className="favoritesPanel">
                {movieData.length > 0 ? (
                    <div>Drag your favorites to rank them</div>
                ) : (
                    <div>You have not chosen any favorites yet</div>
                )}
            </div>
            <DndProvider backend={HTML5Backend}>
            <div className="favoritesSection">
                {movieData.map((movie, i) => renderFavorites(movie, i))}
            </div>
            </DndProvider>

        </Container>

    )
    
    
    
}

export default Favorites;