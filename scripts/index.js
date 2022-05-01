const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function openedPopup() {
  popup.classList.add('popup__opened');
}
function closedPopup() {
  popup.classList.remove('popup__opened');
}

popupOpenButton.addEventListener('click', openedPopup);
popupCloseButton.addEventListener('click', closedPopup);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-occupation');

function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = document.querySelector('.popup__input-name').value;
  let job = document.querySelector('.popup__input-occupation').value;
  let title = document.querySelector('.profile__title');
  title.textContent = name;
  let occupation = document.querySelector('.profile__occupation');
  occupation.textContent = job;
  closedPopup();
}

formElement.addEventListener('submit', formSubmitHandler);
