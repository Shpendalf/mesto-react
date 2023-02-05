import PopupWithForm from './PopupWithForm';
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [userName, setUserName] = React.useState('');
    const [userJob, setUserJob] = React.useState('');

    function handleNameChange(e) {
        setUserName(e.target.value);
    }

    function handleJobChange(e) {
        setUserJob(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(userName, userJob);
    }

    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserJob(currentUser.about);
      }, [currentUser, props.isOpen]);
      return (    
         
        <PopupWithForm name="profile"  buttonMsg ={props.isLoading ? "Сохранение...": "Сохранить"} isOpened={props.isOpen} text="Редактировать профиль" onClose={props.onClose} onSubmit={handleSubmit}>
        <input
              type="text"
              id="name-input"
              className="popup__textarea popup__textarea_type_name"
              minLength="2"
              maxLength="40"
              required
              name="profileName"
              onChange={handleNameChange}
            />
            <span id="name-input-error" className="popup__error"></span>
            <input
              type="text"
              id="job-input"
              className="popup__textarea popup__textarea_type_status"
              minLength="2"
              maxLength="200"
              required
              name="jobName"
              onChange={handleJobChange}
            />
            <span id="job-input-error" className="popup__error"></span>
  
        </PopupWithForm>

        );
    }
    
  export default EditProfilePopup;