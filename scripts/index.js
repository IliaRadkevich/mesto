const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popup = document.querySelector('.popup');
const popupAddImage = document.querySelector('.popup__add-image');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const popupCloseAddButton = popupAddImage.querySelector('.popup__close');
const formElement = popup.querySelector('[name="personalinfo"]');
const formdAdd = popupAddImage.querySelector('[name="personalinfo"]');
const imageName = document.querySelector('[name="imagename"]');
const imageLink = document.querySelector('[name="imagelink"]');
const photos = document.querySelector('.photo');
const cardTemplate = document.querySelector('.template-photo').content;
const popupOpenAddButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.image');
const popupImageOpened = popupImage.querySelector('.image__opened');
const popupImageClosed = popupImage.querySelector('.popup__close');
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

function openedPopupAddImage() {
  popupAddImage.classList.add('popup_opened');
}

function closedPopupAddImage() {
  popupAddImage.classList.remove('popup_opened');
}

function openedPopupImage() {
  popupImage.classList.add('popup_opened');
}

function closedPopupImage () {
  popupImage.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openedPopup);
popupCloseButton.addEventListener('click', closedPopup);
popupOpenAddButton.addEventListener('click', openedPopupAddImage);
popupCloseAddButton.addEventListener('click', closedPopupAddImage);
popupImageClosed.addEventListener('click', closedPopupImage);

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = name.value;
  occupation.textContent = job.value;
  closedPopup();
}

formElement.addEventListener('submit', formSubmitHandler);

function deleteHandler (evt) {
  evt.target.closest('.photo__container').remove()
}

function imageCards(cards) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.photo__place');
  const cardName = cardElement.querySelector('.photo__title');
  const deleteButton = cardElement.querySelector('.photo__delete');
  const likeButton = cardElement.querySelector('.photo__like')
  cardName.textContent = cards.name
  cardImage.src = cards.link
  cardImage.alt = cards.name
  photos.append(cardElement)

  cardImage.addEventListener('click', (cardImageOpen) => {
    openedPopupImage(popupImage);
    popupImageOpened.src = cardImageOpen.target.src;
    popupImageOpened.alt = cardImageOpen.target.alt;
    const imageSubtitle = popupImage.querySelector('.image__figcaption');
    imageSubtitle.textContent = cardImageOpen.target.alt;
  })
  likeButton.addEventListener('click', (likeToggle) => {
    likeToggle.target.classList.toggle('photo__like_active');
  })
  deleteButton.addEventListener('click', deleteHandler);
}

function formAddHandler(evt) {
  evt.preventDefault();
  const imageNameValue = imageName.value;
  const imageLinkValue = imageLink.value;
  imageCards({
    name: imageNameValue,
    link: imageLinkValue
  })
  formdAdd.reset();
  closedPopupAddImage();
}
formdAdd.addEventListener('submit', formAddHandler);

initialCards.forEach(imageCards);
