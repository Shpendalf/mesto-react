import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    function handleSubmit(e){
        e.preventDefault();
        props.onEditPlace(name, link);
        console.log(name, link)
        
    }
    function placeNameChange(e) {
        setName(e.target.value);
    }
    function placePicChange(e){
        setLink(e.target.value);
    }
    React.useEffect(()=>{
        setName('');
        setLink('');
    },[props.isOpen]);

return (
    <PopupWithForm name ="img" buttonMsg ={props.isLoading ? "Сохранение...": "Сохранить"} isOpened={props.isOpen} text ="Новое место" onClose={props.onClose} onSubmit={handleSubmit}>
      <input
            type="text"
            placeholder="заголовок"
            id="name-card"
            className="popup__textarea popup__textarea_img-title"
            minLength="2"
            maxLength="30"
            onChange={placeNameChange}
            required
            name="name"
            value={name}
          />
          <span id="name-card-error" className="popup__error"></span>
          <input
            type="url"
            id="link"
            placeholder="ссылка на картинку"
            className="popup__textarea popup__textarea_link"
            required
            name="link"
            onChange ={placePicChange}
            value={link}
          />
          <span id="link-error" className="popup__error"></span>
      </PopupWithForm>

)
}
export default EditPlacePopup;