// Popup

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const isEscEvent = (evt) => {
  return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
};

const popup = document.querySelector('.popup');

if (popup) {
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
}


// Number Field

const numberField = document.querySelector('.number-field');

if (numberField) {
  const numberControl = numberField.querySelector('.number-field__control');

  numberField.querySelector('.number-field__button--minus').addEventListener('click', () => {
    numberControl.stepDown();
  });

  numberField.querySelector('.number-field__button--plus').addEventListener('click', () => {
    numberControl.stepUp();
  });
}

// Thumbnails slider

const thumbnailSlider = document.querySelector('.thumbnail-slider');

if (thumbnailSlider) {
  const swiper = new Swiper(".thumbnail-slider__thumbs", {
    direction: "vertical",
    spaceBetween: 5,
    loop: true,
    slidesPerView: 2.5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      1020: {
        spaceBetween: 10,
        slidesPerView: 2.45,
      },
    },
  });

  const swiper2 = new Swiper(".thumbnail-slider__full", {
    loop: true,
    thumbs: {
      swiper: swiper,
    },
  });
}

// Like Button

const likeButton = document.querySelector('.social-button--like');

if (likeButton) {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('social-button--like-active');
  });
}

// Clip Box

const clipbox = document.querySelector('.clipbox');

if (clipbox) {
  clipbox.querySelector('.clipbox__toggler').addEventListener('click', () => {
    clipbox.classList.toggle('clipbox--reduced');
    clipbox.classList.toggle('clipbox--expanded');
  });
}
