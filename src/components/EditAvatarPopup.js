import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
   
    // const [userPic, setUserPic] = React.useState('');
    const ref = React.useRef();

    // function handleAvatarChange(e) {
        // setUserPic(e.target.value);
    // }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAvatarEdit({
        avatar:ref.current.value
       })
        
    }

    React.useEffect(() => {
       ref.current.value ='';
    }, [props.isOpen]);



    return (        
        <PopupWithForm  name="avatar" buttonMsg ={props.isLoading ? "Сохранение...": "Сохранить"} isOpened={props.isOpen} text="Редактировать аватар" onClose={props.onClose} onSubmit={handleSubmit}>
        <input
              ref ={ref}
              type="url"
              id="avatar"
              className="popup__textarea popup__textarea_type_avatar"
              minLength="2"
              required
              name="avatar"
            //   onChange={handleAvatarChange}
            //   value={userPic}
              placeholder="ссылка на изображение"
            />
            <span id="avatar-input-error" className="popup__error"></span>
            
        </PopupWithForm>
    );
  }
  
export default EditAvatarPopup;