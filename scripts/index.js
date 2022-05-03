const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup_closed');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
let job = document.querySelector('.popup__input-occupation');
let occupation = document.querySelector('.profile__occupation');
let name = document.querySelector('.popup__input-name');
let title = document.querySelector('.profile__title');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-occupation');

function openedPopup() {
  popup.classList.add('popup_opened');
  name.value=title.textContent
  job.value=occupation.textContent
}
function closedPopup() {
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openedPopup);
popupCloseButton.addEventListener('click', closedPopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = name.value;
  occupation.textContent = job.value;
  closedPopup();
}

formElement.addEventListener('submit', formSubmitHandler);
