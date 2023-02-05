import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
 
    const [userPic, setUserPic] = React.useState('');


    function handleAvatarChange(e) {
        setUserPic(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAvatarEdit(userPic);
        props.onClose
    }

    React.useEffect(() => {
        setUserPic('');
    }, [props.isOpen]);



    return (        
        <PopupWithForm  name="avatar" buttonMsg ={props.isLoading ? "Сохранение...": "Сохранить"} isOpened={props.isOpen} text="Редактировать аватар" onClose={props.onClose} onSubmit={handleSubmit}>
        <input
              type="url"
              id="avatar-input"
              className="popup__textarea popup__textarea_type_avatar"
              minLength="2"
              required
              name="userPic"
              onChange={handleAvatarChange}
              value={userPic}
              placeholder="ссылка на изображение"
            />
            <span id="avatar-input-error" className="popup__error"></span>
            
        </PopupWithForm>
    );
  }
  
export default EditAvatarPopup;