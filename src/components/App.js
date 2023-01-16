import React from 'react';
import '../App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
function App() {
  const[isEditProfilePopupOpen, setProfileModalOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setPlaceModalOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setAvatarModalOpen] = React.useState(false);

  const handleEditProfileClick = ()=>{setProfileModalOpen(true)};
  const handleAddPlaceClick =() =>{setPlaceModalOpen(true)};
  const handleEditAvatarClick = () => {setAvatarModalOpen(true)};
  const [selectedCard, chooseCard] =React.useState({name:'', link:''});
  const closeAllPopups = () =>{
    setProfileModalOpen(false);
    setPlaceModalOpen(false);
    setAvatarModalOpen(false);  
    chooseCard({name:'',link:''});
  }

  const handleCardPress = (card) =>{
    chooseCard(card)
  }
  return (
    <div className="page">
      <Header/>
      <PopupWithForm name="delete" buttonMsg="Да" text="Вы уверены?"/>
      <PopupWithImage card = {selectedCard} onCloseHandler={closeAllPopups}/>
      <PopupWithForm name="profile" buttonMsg="Сохранить" isOpened={isEditProfilePopupOpen} text="Редактировать профиль" onCloseHandler={closeAllPopups}>
      <input
            type="text"
            id="name-input"
            className="popup__textarea popup__textarea_type_name"
            minLength="2"
            maxLength="40"
            required
            name="profileName"
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
          />
          <span id="job-input-error" className="popup__error"></span>

      </PopupWithForm>
      <PopupWithForm  name="avatar" buttonMsg ="Сохранить" isOpened={isEditAvatarPopupOpen} text="Редактировать аватар" onCloseHandler={closeAllPopups}>
      <input
            type="url"
            id="avatar-input"
            className="popup__textarea popup__textarea_type_avatar"
            minLength="2"
            required
            name="userPic"
            placeholder="ссылка на изображение"
          />
          <span id="avatar-input-error" className="popup__error"></span>
          
      </PopupWithForm>
      <PopupWithForm name ="img" buttonMsg="Сохранить" isOpened={isAddPlacePopupOpen} text ="Новое место" onCloseHandler={closeAllPopups}>
      <input
            type="text"
            placeholder="заголовок"
            id="name-card"
            className="popup__textarea popup__textarea_img-title"
            minLength="2"
            maxLength="30"
            required
            name="name"
          />
          <span id="name-card-error" className="popup__error"></span>
          <input
            type="url"
            id="link"
            placeholder="ссылка на картинку"
            className="popup__textarea popup__textarea_link"
            required
            name="link"
          />
          <span id="link-error" className="popup__error"></span>
      </PopupWithForm>



    <Main onProfileEdit = {handleEditProfileClick} onAddPlace = {handleAddPlaceClick} onAvatarEdit = {handleEditAvatarClick} cardPress = {handleCardPress}/>
    
    <Footer/>
  </div>
  );
}

export default App;
