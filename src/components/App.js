import React from 'react';
import '../App.css';
import {api} from '../utils/Api.js';
import {auth} from '../utils/Api.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import EditPlacePopup from './EditPlacePopup';
import PopupWithForm from './PopupWithForm';
import {Route, Switch ,Link, Redirect, useHistory} from 'react-router-dom';
import PopupWithImage from './PopupWithImage';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeletePopup from './PopupDelete';
import ProtectedRoute from './ProtectedRoute';
import AuthElem from './AuthElem';
import success from '../images/success.png';
import notsuccess from '../images/notsuccess.png';
function App() {
  const[cards, renderCards] = React.useState([]);
  const[isEditProfilePopupOpen, setProfileModalOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setPlaceModalOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setAvatarModalOpen] = React.useState(false);
  const[currentMail, setCurrentMail]= React.useState("");
  const[isLoggedIn, setIsLoggedIn] = React.useState(false);
  const[isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const handleEditProfileClick = ()=>{setProfileModalOpen(true)};
  const handleAddPlaceClick =() =>{setPlaceModalOpen(true)};
  const handleEditAvatarClick = () => {setAvatarModalOpen(true)};
  const [isLoading, setIsLoading] = React.useState(false);
  const [ownerDelCard, setOwnerDelCard] = React.useState({_id:''})
  const [currentUser, setCurrentUser] = React.useState({name:'Жак-ив-Кусто', about:'Исследователь океана', avatar:'', _id:''});
  const [selectedCard, selectCard] =React.useState({name:'', link:''});
  const isOpen = (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen ||isImgPopupOpen || ownerDelCard._id)
  const  closeAllPopups = () =>{
    setProfileModalOpen(false);
    setPlaceModalOpen(false);
    setAvatarModalOpen(false);  
    setOwnerDelCard({_id:''});
    selectCard({name:'',link:''});
  }
  const history = useHistory();
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
    api.setLike(card._id, isLiked)
        .then(renderedCard => {
          renderCards((res) => res.map((c) => c._id === card._id ? renderedCard : c));  
        })
        .catch(err => console.log(err))
  }
  const handleSignUp = (email, password) =>{
    setIsLoading(true);
    auth.signUp(email, password)
    .then(()=>{
      setImgPopupOpen(true);
      selectCard({name:"", link: success});
    }).catch((error)=>{
      console.log(error);
      setImgPopupOpen(true);
      selectCard({name:"",link: notsuccess})
    })
    .finally(()=>setIsLoading(false))

    
  }
  const handleSignIn =(password, email)=>{
    setIsLoading(true);
    auth.signIn(password,email)
    .then((res)=>{
      
      localStorage.setItem("token", res.token)
      setIsLoggedIn(true);
      setCurrentMail(email);
      history.push("/");
    })
    .catch((error)=>{
      console.log(error);
      selectCard({name:"",link: notsuccess})
    }).finally(()=>setIsLoading(false))
  }

  const handleSignOut = () =>{
    setIsLoggedIn(false);
    setCurrentMail("");
    localStorage.removeItem("token");
    history.pushState("sign-in");
  }
 const handleCheckLogin = () =>{
    auth.checkLogin(localStorage.getItem("token"))
    .then((res)=>{
      setCurrentMail(res.data.email);
      setIsLoggedIn(true);
      history.push("/");
    })
  }
  React.useEffect(() =>{
    localStorage.getItem("token") && 
    handleCheckLogin(localStorage.getItem("token"))
  })


  React.useEffect(()=>{
    isLoggedIn &&
      api.getData().then(values=>{
        const [userData, initialCards] = values;
       setCurrentUser(userData);
        renderCards(initialCards);
      })
      .catch (error => console.log(error))
    }, [isLoggedIn]);
  
  return (
    <div className="page">
    <CurrentUserContext.Provider value ={currentUser}>
      <Switch>
          <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
          <Header loggedIn ={isLoggedIn} signOutClick ={handleSignOut} signOutText="Выйти" email ={currentMail}/>
          <Main onLike={handleCardLike} onProfileEdit = {handleEditProfileClick} onAddPlace = {handleAddPlaceClick} onAvatarEdit = {handleEditAvatarClick} onCardClick = {handleCardClick} onDelete={cardDelete}  cards={cards}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onAvatarEdit={updateAvatar}  isLoading={isLoading}/>
          <EditPlacePopup isOpen ={isAddPlacePopupOpen} onClose={closeAllPopups} onEditPlace ={handleAddPlaceSubmit}  isLoading={isLoading}/>
          <EditProfilePopup isOpen ={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser ={updateUserInfo} isLoading={isLoading}/>
          <DeletePopup onClose={closeAllPopups} card ={ownerDelCard} onDeleteCard={handleCardDelete}  isLoading={isLoading}/>
          <PopupWithImage isOpen={isImgPopupOpen} card ={selectedCard} onClose={closeAllPopups}/>
          
        </ProtectedRoute>
        <Route path ="/sign-in">
          <Header loggedIn ={isLoggedIn}  navTo="sign-up" navtext={"Регистрация"} />
          <AuthElem
            onSubmit ={handleSignIn}
            name ="loginElem"
            btnText = {isLoading ? "Вход" : "Войти"}
            elemttl = "Вход"
         />
          <PopupWithImage isOpen={isImgPopupOpen} card ={selectedCard} onClose={closeAllPopups} checkServiceMessage={true}/>
        </Route>
        <Route path = "/sign-up">
          <Header loggedIn ={isLoggedIn} navTo="sign-in" navtext ={"Войти"}/>
          <AuthElem
          onSubmit ={handleSignUp}
            btnText ={isLoading ? "Регистрирую  (╯ ° □ °) ╯ (┻━┻) ": "Зарегистрироваться" }
            name = "regElem"
            elemttl = "Регистрация"
          />
          <Link to ="sign-in" className={"auth__link"}>
            Уже зарегистрированы? Войти
          </Link>
          <PopupWithImage isOpen={isImgPopupOpen} card ={selectedCard} onClose={closeAllPopups} checkServiceMessage={true}/>

        </Route>
        
        <Route path="*">
                    {isLoggedIn ? (
                        <Redirect to="/" />
                    ) : (
                        <Redirect to="/sign-in" />
                    )}
        </Route>
      </Switch>
      <Footer/>
    </CurrentUserContext.Provider>
  </div>
  );
}

export default App;
