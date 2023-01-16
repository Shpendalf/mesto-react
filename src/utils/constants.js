export const profileButtonOpen = document.querySelector(
  ".profile__edit-button"
);
export const popupClasses = document.querySelectorAll(".popup");
export const popupProfile = document.querySelector(".popup_profile");
export const popupAddImg = document.querySelector(".popup_img");
export const popupUserPic = document.querySelector(".popup_avatar");
export const profileButtonClose = document.querySelector(
  ".popup__close-profile"
);
export const formElementProfile = document.querySelector(
  ".popup__form-profile"
);

export const API_CONFIG = {
  url: "https://mesto.nomoreparties.co/v1/cohort-54",

  header: {
    "Content-Type": "application/json",
    authorization: "6917eef1-c60d-42ac-9940-6a24a3f42d99",
  },
};
//export const readyCards = [{

//title: 'Архыз',
// img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//},
//{
// title: 'Челябинская область',
//img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//},
//{
//title: 'Иваново',
//img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//},
//{
//title: 'Камчатка',
//img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//},
//{
// title: 'Холмогорский район',
//img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//},
//{
//title: 'Байкал',
//img: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//}
//];

export const parameters = {
  formElement: ".popup__form",
  formInput: ".popup__textarea",
  buttonElement: ".popup__button",
  activeButtonClass: "popup__button_valid",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__error",
  inputErrorClassActive: "popup__error_active",
};
