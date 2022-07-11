const popup = document.querySelector('.popup');

if (popup) {
  const Keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
  };

  const isEscEvent = (evt) => {
    return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
  };

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

const likeButton = document.querySelector('.social-button--like');

if (likeButton) {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('social-button--like-active');
  });
}

const clipboxes = document.querySelectorAll('.clipbox');

if (clipboxes) {
  clipboxes.forEach((clipbox) => {
     if (clipbox.offsetHeight > parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.add('clipbox--reduced');
      }

      clipbox.querySelector('.clipbox__toggler').addEventListener('click', () => {
      clipbox.classList.toggle('clipbox--reduced');
      clipbox.classList.toggle('clipbox--expanded');
    });
  });
}

const worksGallerySlider = document.querySelector('.works-gallery__slider');

if (worksGallerySlider) {
  let swiper = new Swiper(".works-gallery__slider", {
    slidesPerView: 'auto',
    spaceBetween: 5,
    freeMode: true,
    navigation: {
      nextEl: ".works-gallery__slider .swiper-button-next",
      prevEl: ".works-gallery__slider .swiper-button-prev",
    },
    breakpoints: {
      1020: {
        spaceBetween: 18,
      },
    },
  });
}

const goodInfoTaber = document.querySelector('.good-info__taber');

if (goodInfoTaber) {
  const swiper = new Swiper(".good-info__tab-buttons-wrapper", {
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
  });

  const swiper2 = new Swiper(".good-info__tabs-wrapper", {
    spaceBetween: 50,
    effect: "fade",
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: swiper,
    },
  });
}

const radioselect = document.querySelector('.select-2');

if (radioselect) {
  const radioselectButton = radioselect.querySelector('.select-2__button');

  radioselectButton.addEventListener('click', () => {
    radioselect.classList.toggle('select-2--open');
  });

  const radioselectOptionsWrapper = radioselect.querySelector('.select-2__options');
  const radioselectButtonValue = radioselectButton.querySelector('.select-2__button-value');

  radioselectOptionsWrapper.addEventListener('click', (evt) => {
    if (evt.target.className === 'select-2__radiobutton-label') {
      radioselectButtonValue.textContent = evt.target.textContent;
      radioselect.classList.remove('select-2--open');
    }
  });
}
