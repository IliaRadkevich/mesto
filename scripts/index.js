const popupEditProfile = document.querySelector('.popup__profile');
const popupOpenAddImage = document.querySelector('.popup__image');
const popupOpenProfileEdit = document.querySelector('.profile__edit-button');
const popupCloseProfileEdit = popupEditProfile.querySelector('.popup__close');
const popupCloseImageAdd = popupOpenAddImage.querySelector('.popup__close');
const formElement =popupEditProfile.querySelector('[name="personalinfo"]');
const formdAdd = popupOpenAddImage.querySelector('[name="imageinfo"]');
const imageName = document.querySelector('[name="imagename"]');
const imageLink = document.querySelector('[name="imagelink"]');
const photos = document.querySelector('.photo');
const cardTemplate = document.querySelector('.template-photo').content;
const popupOpenImageAdd = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_image_zoom');
const popupImageOpened = popupImage.querySelector('.image__opened');
const imageSubtitle = popupImage.querySelector('.image__figcaption');
const popupImageClosed = popupImage.querySelector('.popup__close');
const job = document.querySelector('.popup__input-occupation');
const occupation = document.querySelector('.profile__occupation');
const name = document.querySelector('.popup__input-name');
const title = document.querySelector('.profile__title');
const jobInput = document.querySelector('.popup__input-occupation');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByOverlay);
};

const closePopupByEsc = (event) => {
  if (event.key === "Escape") {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
};

const closePopupByOverlay = (event) => {
  if (event.target === event.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

popupOpenProfileEdit.addEventListener('click', () => {
  name.value=title.textContent
  job.value=occupation.textContent
  openPopup(popupEditProfile);
});

popupCloseProfileEdit.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupOpenImageAdd.addEventListener('click', () => {
  openPopup(popupOpenAddImage);
  deactivateSubmitButton(formdAdd.submit, configs);
});

popupCloseImageAdd.addEventListener('click', () => {
  closePopup(popupOpenAddImage);
});

popupImageClosed.addEventListener('click', () => {
  closePopup(popupImage);
});

function submitFormHandler (evt) {
  evt.preventDefault();
  title.textContent = name.value;
  occupation.textContent = job.value;
  closePopup(popupEditProfile);
};

formElement.addEventListener('submit', submitFormHandler);

function handleDeleteCard (evt) {
  evt.target.closest('.photo__container').remove()
};

function createCard(cards) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.photo__place');
  const cardName = cardElement.querySelector('.photo__title');
  const deleteButton = cardElement.querySelector('.photo__delete');
  const likeButton = cardElement.querySelector('.photo__like')
  cardName.textContent = cards.name
  cardImage.src = cards.link
  cardImage.alt = cards.name
  cardImage.addEventListener('click', (event) => {
    popupImageOpened.src = event.target.src;
    popupImageOpened.alt = event.target.alt;
    imageSubtitle.textContent = event.target.alt;
    openPopup(popupImage);
  })
  likeButton.addEventListener('click', (likeToggle) => {
    likeToggle.target.classList.toggle('photo__like_active');
  })
  deleteButton.addEventListener('click', handleDeleteCard);

  return cardElement;
};

function renderCard(card){
  const cardsElements = createCard(card)
  photos.prepend(cardsElements);
};

function handlerAddCard(evt) {
  evt.preventDefault();
  const imageNameValue = imageName.value;
  const imageLinkValue = imageLink.value;
  renderCard({
    name: imageNameValue,
    link: imageLinkValue
  })
  closePopup(popupOpenAddImage);
  formdAdd.reset();
};
formdAdd.addEventListener('submit', handlerAddCard);

initialCards.forEach(renderCard);

enableValidation(configs);
