
import {api} from '../utils/Api.js'
import React from 'react';
import Card from './Card';
function Main(props) {
  const [cards, renderCards] =React.useState([]);
  const [userName, setName]= React.useState('');
  const [userJob, setJob]= React.useState('');
  const [userPic, setAvatar]= React.useState('');
  React.useEffect(()=>{
    api.getData().then(values=>{
      const [userData, initialCards] = values;
      setAvatar(userData.avatar);
      setName (userData.name);
      setJob (userData.about);
      renderCards(initialCards);
    })
    .catch (error => console.log(error))
  }, []);

    return (
<main className="main">
      <section className="profile">
        <div className="profile__left-side">
          <div className="profile__avatar-wrapper" onClick={props.onAvatarEdit}>
            <img src={userPic} alt="аватар" className="profile__avatar" />
          </div>

          <div className="profile__wrapper">
            <div className="profile__button-block">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick={props.onProfileEdit}></button>
            </div>

            <p className="profile__status">{userJob}</p>
          </div>
        </div>

        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card,i)=>(
          <Card card={card} onCardClick={props.onCardClick} key={card._id}/>
        ))}
      </section>
    </main>
      );
    }
    
    export default Main;