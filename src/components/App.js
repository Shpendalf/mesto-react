import React from 'react';
import '../App.css';
import {api} from '../utils/Api.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import EditPlacePopup from './EditPlacePopup';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeletePopup from './PopupDelete';
function App() {
  const[cards, renderCards] = React.useState([]);
  const[isEditProfilePopupOpen, setProfileModalOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setPlaceModalOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setAvatarModalOpen] = React.useState(false);
  const[isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const handleEditProfileClick = ()=>{setProfileModalOpen(true)};
  const handleAddPlaceClick =() =>{setPlaceModalOpen(true)};
  const handleEditAvatarClick = () => {setAvatarModalOpen(true)};
  const [isLoading, setIsLoading] = React.useState(false);
  const [ownerDelCard, setOwnerDelCard] = React.useState({_id:''})
  const [currentUser, setCurrentUser] = React.useState({name:'', about:'', avatar:'', _id:''});
  const [selectedCard, selectCard] =React.useState({name:'', link:''});
  const isOpen = (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen ||isImgPopupOpen || ownerDelCard._id)
  const  closeAllPopups = () =>{
    setProfileModalOpen(false);
    setPlaceModalOpen(false);
    setAvatarModalOpen(false);  
    setOwnerDelCard({_id:''});
    selectCard({name:'',link:''});
  }
  const updateUserInfo =(name,about) =>{
    setIsLoading(true);
    console.log (name, about);
    api.setUserInfo(name,about)
    .then(res =>{
      console.log(res);
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(error => console.log(error))
    .finally((setIsLoading(false)))
  }
  const updateAvatar =(avatar) => {
    setIsLoading(true);
    console.log (avatar);
    api.editAvatar(avatar)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
    })
      .catch(error => console.log(error))
      .finally((setIsLoading(false)))
    
  }
  const handleCardClick = (card) => {
    selectCard(card);
    setImgPopupOpen(true);
  };
  
  const cardDelete = (card) => {
    setOwnerDelCard(card)
  }
  const handleCardDelete = () => {
    setIsLoading(true);
    api.removeCard(ownerDelCard._id)
      .then(() => {
        renderCards((res) => res.filter((i) => i._id != ownerDelCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
} 
  const handleAddPlaceSubmit= (name,link) =>{
    setIsLoading(true);
    console.log (name, link);
     
    api.createCard(name,link)
    .then(res=> { console.log(res); renderCards([res, ...cards])
      closeAllPopups();

    })
    .catch(error => console.log(error))
    .finally((setIsLoading(false)))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.newLike(card._id, isLiked)
        .then(renderedCard => {
          renderCards((res) => res.map((c) => c._id === card._id ? renderedCard : c));  
        })
        .catch(err => console.log(err))
  }


  React.useEffect(()=>{
      api.getData().then(values=>{
        const [userData, initialCards] = values;
       setCurrentUser(userData);
        renderCards(initialCards);
      })
      .catch (error => console.log(error))
    }, []);
  
  return (
    <div className="page">
      <CurrentUserContext.Provider value ={currentUser}>
      <Header/>
     
    <Main onLike={handleCardLike} onProfileEdit = {handleEditProfileClick} onAddPlace = {handleAddPlaceClick} onAvatarEdit = {handleEditAvatarClick} onCardClick = {handleCardClick} onDelete={cardDelete}  cards={cards}/>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onAvatarEdit={updateAvatar}  isLoading={isLoading}/>
    <EditPlacePopup isOpen ={isAddPlacePopupOpen} onClose={closeAllPopups} onEditPlace ={handleAddPlaceSubmit}  isLoading={isLoading}/>
    <EditProfilePopup isOpen ={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser ={updateUserInfo} isLoading={isLoading}/>
    <DeletePopup onClose={closeAllPopups} card ={ownerDelCard} onDeleteCard={handleCardDelete}  isLoading={isLoading}/>
    <PopupWithImage isOpen={isImgPopupOpen} card ={selectedCard} onClose={closeAllPopups}/>
    <Footer/>
    </CurrentUserContext.Provider>
  </div>
  );
}

export default App;
