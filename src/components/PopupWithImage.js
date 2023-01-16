function PopupWithImage(props){
    return(
        <div className ={props.card.link ? "popup popup_open" : "popup"}>
            <div className ="popup__image-window">
                <div className ="popup__close popup__close-bigimg" onClick={props.onClose}>
                </div> 
                <img src ={props.card.link} alt ={props.card.name} className = "popup__image"/>
                <p className="popup__title">{props.card.name}</p>
            </div>
        </div>
    );
}
export default PopupWithImage;