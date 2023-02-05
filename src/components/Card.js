import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card (props){
    const currentUser = React.useContext(CurrentUserContext);  
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `card__like-button ${isLiked && 'card__like-button_toggle'}` 
      );; 
    function handleClick() {
        props.onCardClick(props.card);
      }  
      function handleLikeClick() {
        props.onLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }
     return(    
        <div className="card" id = {props.card._id}>
          {isOwn && <button className="card__delete" onClick ={handleDeleteClick}></button>}
            <img className ="card__image" src ={props.card.link} alt ={props.card.name}  onClick={handleClick} />
            <div className ="card__text-wrapper">
                <p className ="card__title">{props.card.name}</p>
                <div className ="card__like-wrapper">
                    <button className ={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className ="card__like-count">{props.card.likes.length}</p>
                </div>
            </div>
            
        </div>
     )
     }
     export default Card
