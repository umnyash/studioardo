const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const isEscEvent = (evt) => {
  return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
};

const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close')

const openPopup = () => {
  popup.classList.add('popup--open');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePopup = () => {
  popup.classList.remove('popup--open');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

popupCloseButton.addEventListener('click', closePopup);

openPopup();

const numberField = document.querySelector('.number-field');
const numberControl = numberField.querySelector('.number-field__control');

numberField.querySelector('.number-field__button--minus').addEventListener('click', () => {
  numberControl.stepDown();
});

numberField.querySelector('.number-field__button--plus').addEventListener('click', () => {
  numberControl.stepUp();
});
