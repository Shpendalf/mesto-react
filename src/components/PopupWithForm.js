function PopupWithForm(props) {
    return (   
        <div className = {props.isOpened ? "popup popup_open" : "popup"}>
            <div className ="popup__window">
               <button type ="button" className="popup__close" onClick = {props.onClose} ></button> 
                <h2 className="popup__text">{props.text}</h2>
                <form className={`popup__form popup__form-${props.name}`} name ={`${props.name}`}  onSubmit={props.onSubmit}>
                    {props.children}
                <input type ="submit" className={`popup__button`} name ={`name-${props.name}`}value ={`${props.buttonMsg}`}/>
                </form> 
            </div>
        </div>
    );
}
export default PopupWithForm