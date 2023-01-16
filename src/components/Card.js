import React from 'react';
function Card (props){
    function handleClick() {
        props.onCardClick(props.card);
      }  
     return(    
        <div className="card" id = {props.card._id}>
            <button className="card__delete"></button>
            <img className ="card__image" src ={props.card.link} alt ={props.card.name}  onClick={handleClick} />
            <div className ="card__text-wrapper">
                <p className ="card__title">{props.card.name}</p>
                <div className ="card__like-wrapper">
                    <button className ="card__like-button"></button>
                    <p className ="card__like-count">{props.card.likes.length}</p>
                </div>
            </div>
            
        </div>
     )
     }
     export default Card
