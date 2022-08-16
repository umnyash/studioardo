const popups = document.querySelectorAll('.popup');

if (popups) {
  const Keys = {
    ESCAPE: 'Escape',
    ESC: 'Esc',
  };

  const isEscEvent = (evt) => {
    return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
  };

  let bodyWidth = document.body.clientWidth;

  popups.forEach((popup) => {
    const popupCloseButton = popup.querySelector('.popup__close')

    const openPopup = () => {
      bodyWidth = document.body.clientWidth;

      popup.classList.add('popup--open');
      document.body.classList.add('no-scroll');
      document.addEventListener('keydown', onPopupEscKeydown);

      if (document.body.clientWidth > bodyWidth) {
        document.body.style.paddingRight = document.body.clientWidth - bodyWidth + 'px';
      }
    };

    const closePopup = () => {
      popup.classList.remove('popup--open');
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onPopupEscKeydown);

      document.body.style.paddingRight = '0';
    };

    const onPopupEscKeydown = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closePopup();
      }
    };

    popupCloseButton.addEventListener('click', closePopup);

    openPopup();
  });
}

const numberFields = document.querySelectorAll('.number-field');

if (numberFields) {
  const setInputWidth = (input) => {
    input.style.width = input.value.length + 1 + 'ch';
  }

  numberFields.forEach((numberField) => {
    const numberControl = numberField.querySelector('.number-field__control');

    numberField.querySelector('.number-field__button--minus').addEventListener('click', () => {
      numberControl.stepDown();
      setInputWidth(numberControl);
    });

    numberField.querySelector('.number-field__button--plus').addEventListener('click', () => {
      numberControl.stepUp();
      setInputWidth(numberControl);
    });

    numberControl.addEventListener('input', () => {
      setInputWidth(numberControl);
    });
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

const likeButtons = document.querySelectorAll('.social-button--like');

if (likeButtons) {
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('social-button--like-active');
    });
  });
}

const clipboxes = document.querySelectorAll('.clipbox');

if (clipboxes) {
  const setClipboxes = () => {
    clipboxes.forEach((clipbox) => {
      clipbox.classList.remove('clipbox--reduced');
      clipbox.classList.remove('clipbox--expanded');

      if (clipbox.offsetHeight > parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.add('clipbox--reduced');
      }

      clipbox.querySelector('.clipbox__toggler').addEventListener('click', () => {
        clipbox.classList.toggle('clipbox--reduced');
        clipbox.classList.toggle('clipbox--expanded');
      });
    });
  };

  window.addEventListener('resize', setClipboxes);

  setClipboxes();
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

const radioselects = document.querySelectorAll('.select-2');

if (radioselects) {
  radioselects.forEach((radioselect) => {
    const radioselectButton = radioselect.querySelector('.select-2__button');
    const radiobutton = radioselect.querySelector('.select-2__radiobutton');

    radioselectButton.addEventListener('click', () => {
      if (!radioselect.classList.contains('select-2--open')) {
        radioselect.classList.add('select-2--open');
        radiobutton.focus();
      } else {
        radioselect.classList.remove('select-2--open');
      }
    });

    const radioselectOptionsWrapper = radioselect.querySelector('.select-2__options');

    let focused = false;

    radioselectOptionsWrapper.addEventListener('focusin', () => {
      focused = true;
    });

    radioselectOptionsWrapper.addEventListener('focusout', () => {
      focused = false;
      setTimeout(() => {
        if (!focused) {
          radioselect.classList.remove('select-2--open');
        }
      }, 100);
    });

    const radioselectButtonValue = radioselectButton.querySelector('.select-2__button-value');

    radioselectOptionsWrapper.addEventListener('click', (evt) => {
      if (evt.target.className === 'select-2__radiobutton-label') {
        radioselect.classList.remove('select-2--open');
      }
    });

    const radiobuttons = radioselect.querySelectorAll('.select-2__radiobutton');

    radiobuttons.forEach((radiobutton) => {
      radiobutton.addEventListener('change', () => {
        radioselectButtonValue.textContent = radiobutton.parentNode.querySelector('.select-2__radiobutton-label').textContent;
      });
    });
  });
}

const goodQuantityAlterNodes = document.querySelectorAll('.goods-quantity--alter');

if (goodQuantityAlterNodes) {
  goodQuantityAlterNodes.forEach((goodQuantity) => {
    const toggler = goodQuantity.querySelector('.goods-quantity__select-button');
    const radiobuttonsWrapper = goodQuantity.querySelector('.goods-quantity__radiobuttons');
    const radiobutton = radiobuttonsWrapper.querySelector('.radiobutton__control');

    toggler.addEventListener('click', () => {
      if (!radiobuttonsWrapper.classList.contains('goods-quantity__radiobuttons--open')) {
        radiobuttonsWrapper.classList.add('goods-quantity__radiobuttons--open');
        radiobutton.focus();
      } else {
        radiobuttonsWrapper.classList.remove('goods-quantity__radiobuttons--open');
      }
    });

    let focused = false;

    radiobuttonsWrapper.addEventListener('focusin', () => {
      focused = true;
    });

    radiobuttonsWrapper.addEventListener('focusout', () => {
      focused = false;
      setTimeout(() => {
        if (!focused) {
          radiobuttonsWrapper.classList.remove('goods-quantity__radiobuttons--open');
        }
      }, 100);
    });

    radiobuttonsWrapper.addEventListener('click', (evt) => {
      if (evt.target.className === 'radiobutton__label') {
        radiobuttonsWrapper.classList.remove('goods-quantity__radiobuttons--open');
      }
    });

    const radiobuttons = radiobuttonsWrapper.querySelectorAll('.radiobutton__control');

    radiobuttons.forEach((radiobutton) => {
      radiobutton.addEventListener('change', () => {
        toggler.textContent = radiobutton.parentNode.querySelector('.radiobutton__label').textContent.slice(0, 2);
      });
    });
  });
}
