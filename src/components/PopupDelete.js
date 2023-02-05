import PopupWithForm from './PopupWithForm';
import React from 'react';

function DeletePopup(props){
function handleSubmit(e){
    e.preventDefault();
    props.onDeleteCard();
}
return(
    <PopupWithForm title ="Вы уверены?" name= "delete" onClose ={props.onClose} buttonMsg ={"Да"} isOpened ={props.card._id ? true : false} onSubmit ={handleSubmit}/> 
)
}
export default DeletePopup;