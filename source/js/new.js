const popups = document.querySelectorAll('.popup');

const changeEvent = new Event('change', { bubbles: true });

const Key = Object.freeze({
  ESCAPE: 'Escape',
  ESC: 'Esc',
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  SPACE: 'Space',
  ENTER: 'Enter'
});

let isPopupCalculationMaterialWasOpened = false;

if (popups) {

  const isEscEvent = (evt) => {
    return evt.key === Key.ESCAPE || evt.key === Key.ESC;
  };

  let bodyWidth = document.body.clientWidth;
  let currentPopup;

  const openPopup = (popup) => {
    bodyWidth = document.body.clientWidth;

    popup.classList.add('popup--open');
    currentPopup = popup;
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onPopupEscKeydown);

    if (document.body.clientWidth > bodyWidth) {
      document.body.style.paddingRight = document.body.clientWidth - bodyWidth + 'px';
    }
  };

  const openCalculationMaterialPopup = (type, material) => {
    bodyWidth = document.body.clientWidth;

    const popup = document.querySelector('.popup--calculation-material');
    popup.querySelector('form').reset();

    const formResult = popup.querySelector('.calculation-form .form__result');
    const typeSelect = popup.querySelector('.calculation-form select[name="type"]');
    const materialSelect = popup.querySelector('.calculation-form select[name="material"]');

    formResult.classList.add('form__result--hidden');

    typeSelect.value = type ? type : '';
    typeSelect.dispatchEvent(changeEvent);

    materialSelect.value = material ? material : '';

    popup.classList.add('popup--open');
    currentPopup = popup;
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onPopupEscKeydown);

    if (document.body.clientWidth > bodyWidth) {
      document.body.style.paddingRight = document.body.clientWidth - bodyWidth + 'px';
    }


    materialSelect.dispatchEvent(changeEvent);

    if(!isPopupCalculationMaterialWasOpened) {
      setTimeout(() => {
        materialSelect.dispatchEvent(changeEvent);
      }, 50)
    }

    isPopupCalculationMaterialWasOpened = true;
  };

  const closePopup = (popup) => {
    popup.classList.remove('popup--open');
    currentPopup = null;
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onPopupEscKeydown);

    document.body.style.paddingRight = '0';
  };

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(currentPopup);
    }
  };

  const popupRequestOpenButton = document.querySelector('.button--popup--request');
  const popupRequest = document.querySelector('.popup--request');

  if (popupRequestOpenButton && popupRequest) {
    popupRequestOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(popupRequest);
    });
  }

  const popupReportCompetitorOpenButton = document.querySelector('.button--popup--report-competitor');
  const popupReportCompetitor = document.querySelector('.popup--report-competitor');

  if (popupReportCompetitorOpenButton && popupReportCompetitor) {
    popupReportCompetitorOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(popupReportCompetitor);
    });
  }

  const popupOrderVisualizationOpenButton = document.querySelector('.button--popup--order--visualization');
  const popupOrderVisualization = document.querySelector('.popup--order--visualization');

  if (popupOrderVisualizationOpenButton && popupOrderVisualization) {
    popupOrderVisualizationOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(popupOrderVisualization);
    });
  }

  const popupOrderSampleOpenButton = document.querySelector('.button--popup--order-sample');
  const popupOrderSample = document.querySelector('.popup--order-sample');

  if (popupOrderSampleOpenButton && popupOrderSample) {
    popupOrderSampleOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(popupOrderSample);
    });
  }

  const popupQuickOrderOpenButton = document.querySelector('.button--popup--quick-order');
  const pupuQuickpOrder = document.querySelector('.popup--quick-order');

  if (popupQuickOrderOpenButton && pupuQuickpOrder) {
    popupQuickOrderOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(pupuQuickpOrder);
    });
  }

  const materialsSection = document.querySelector('.materials');
  const popupCalculationMaterial = document.querySelector('.popup--calculation-material');
  const popupCalculationMaterialLinks = document.querySelectorAll('[data-modal-opener="calculation-material"]');

  if (materialsSection && popupCalculationMaterial) {
    materialsSection.addEventListener('click', (evt) => {
      evt.preventDefault();
      const materialLink = evt.target.closest('.material__link');

      if (!materialLink) {
        return;
      }

      openCalculationMaterialPopup(materialLink.dataset.type, materialLink.dataset.material);
    });
  }

  if (popupCalculationMaterial) {
    popupCalculationMaterialLinks.forEach((link) => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        openCalculationMaterialPopup(link.dataset.type, link.dataset.material);
      })
    });
  }

  const popupGood = document.querySelector('.popup--good');

  if (popupGood) {
    openPopup(popupGood);
  }

  popups.forEach((popup) => {
    const popupCloseButton = popup.querySelector('.popup__close')
    popupCloseButton.addEventListener('click', closePopup.bind(null, popup));
  });
}

const likeButtons = document.querySelectorAll('.like');

if (likeButtons) {
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('like--active');
    });
  });
}

const clipboxes = document.querySelectorAll('.clipbox');

if (clipboxes) {
  let windowWidth = window.innerWidth;

  const setClipboxMode = (clipbox) => {
    const content = clipbox.querySelector('.clipbox__content');

    if (clipbox.classList.contains('clipbox--expanded')) {
      if (content.offsetHeight <= parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.remove('clipbox--expanded');
      }
    } else if (clipbox.classList.contains('clipbox--reduced')) {
      clipbox.classList.remove('clipbox--reduced');
      if (content.offsetHeight > parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.add('clipbox--reduced');
      }
    } else {
      if (content.offsetHeight > parseInt(getComputedStyle(clipbox).getPropertyValue('--max-height'), 10)) {
        clipbox.classList.add('clipbox--reduced');
      }
    }
  };

  clipboxes.forEach((clipbox) => {
    clipbox.querySelector('.clipbox__toggler').addEventListener('click', () => {
      clipbox.classList.toggle('clipbox--reduced');
      clipbox.classList.toggle('clipbox--expanded');
    });

    setClipboxMode(clipbox);
  });

  window.addEventListener('resize', () => {
    if (windowWidth === window.innerWidth) {
      return;
    }

    windowWidth = window.innerWidth;

    clipboxes.forEach((clipbox) => {
      setClipboxMode(clipbox);
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
      768: {
        spaceBetween: 19,
      },
      1510: {
        spaceBetween: 10,
      },
    },
  });
}

const goodInfoTaber = document.querySelector('.good-info__taber');

if (goodInfoTaber) {
  const swiper = new Swiper(".good-info__tab-buttons-wrapper", {
    slidesPerView: 'auto',
    freeMode: true
  });

  const tabLinks = goodInfoTaber.querySelectorAll('.good-info__tab-buttons-link');
  const tabs = goodInfoTaber.querySelectorAll('.good-info__tabs-item');

  let currentTabLink = tabLinks[0];
  let currentTab = tabs[0];

  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      currentTab.classList.remove('good-info__tabs-item--current');
      currentTab = tabs[i];
      currentTab.classList.add('good-info__tabs-item--current');

      currentTabLink.parentNode.classList.remove('good-info__tab-buttons-item--current');
      currentTabLink = tabLinks[i];
      currentTabLink.parentNode.classList.add('good-info__tab-buttons-item--current');
    });
  }
}

const goodReviews = document.querySelector('.good-reviews');

if (goodReviews) {
  const reviewForm = goodReviews.querySelector('.good-reviews__form');
  const reviewFormShowButtonWrapper = goodReviews.querySelector('.good-reviews__button-wrapper');
  const reviewFormShowButton = goodReviews.querySelector('.good-reviews__button');
  const reviewFormHideButton = goodReviews.querySelector('.good-reviews__cancel');

  if (reviewFormShowButtonWrapper && reviewFormShowButton) {
    reviewFormShowButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      reviewForm.classList.remove('good-reviews__form--hidden');
      reviewFormShowButtonWrapper.classList.add('good-reviews__button-wrapper--hidden');
    });
  }

  if (reviewForm && reviewFormHideButton) {
    reviewFormHideButton.addEventListener('click', () => {
      reviewForm.classList.add('good-reviews__form--hidden');
      reviewFormShowButtonWrapper.classList.remove('good-reviews__button-wrapper--hidden');
    });
  }
}

const radioselects = document.querySelectorAll('.select-2');

if (radioselects) {
  radioselects.forEach((radioselect) => {
    const radioselectButton = radioselect.querySelector('.select-2__button');
    const radiobutton = radioselect.querySelector('.select-2__radiobutton');

    const checkClickOut = (evt) => {
      if (!evt.target.closest('.select-2')) {
        closeRadioSelect();
      }
    };

    const openRadioSelect = () => {
      radioselect.classList.add('select-2--open');
      radiobutton.focus();
      window.addEventListener('click', checkClickOut);
    };

    const closeRadioSelect = () => {
      radioselect.classList.remove('select-2--open');
      window.removeEventListener('click', checkClickOut);
    };

    radioselectButton.addEventListener('click', () => {
      if (!radioselect.classList.contains('select-2--open')) {
        openRadioSelect();
      } else {
        closeRadioSelect();
      }
    });

    const radioselectOptionsWrapper = radioselect.querySelector('.select-2__options');

    const radioselectButtonValue = radioselectButton.querySelector('.select-2__button-value');

    radioselectOptionsWrapper.addEventListener('click', (evt) => {
      if (evt.target.className === 'select-2__radiobutton-label') {
        closeRadioSelect();
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

const goodQuantityAlterNodes = document.querySelectorAll('.goods-quantity--alter, .goods-quantity--alter-2');

if (goodQuantityAlterNodes) {
  goodQuantityAlterNodes.forEach((goodQuantity) => {
    const toggler = goodQuantity.querySelector('.goods-quantity__select-button');
    const radiobuttonsWrapper = goodQuantity.querySelector('.goods-quantity__radiobuttons');
    const radiobutton = radiobuttonsWrapper.querySelector('.radiobutton__control');

    const checkClickOut = (evt) => {
      if (!evt.target.closest('.goods-quantity__radiobuttons')) {
        hideButtons();
      }
    };

    const showButtons = () => {
      radiobuttonsWrapper.classList.add('goods-quantity__radiobuttons--open');
      radiobutton.focus();
      window.addEventListener('click', checkClickOut);
    };

    const hideButtons = () => {
      radiobuttonsWrapper.classList.remove('goods-quantity__radiobuttons--open');
      window.removeEventListener('click', checkClickOut);
    };

    toggler.addEventListener('click', () => {
      if (!radiobuttonsWrapper.classList.contains('goods-quantity__radiobuttons--open')) {
        showButtons();
      } else {
        hideButtons();
      }
    });

    radiobuttonsWrapper.addEventListener('click', (evt) => {
      if (evt.target.className === 'radiobutton__label') {
        hideButtons();
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

const coverCardWrappers = document.querySelectorAll('.s-popular .container');

if (coverCardWrappers) {
  coverCardWrappers.forEach((cardWrapper) => {
    const cards = cardWrapper.querySelectorAll('.card');

    cards.forEach((card) => {
      card.addEventListener('mouseover', () => {
        cardWrapper.style.zIndex = 200;
      });

      card.addEventListener('mouseout', () => {
        cardWrapper.style.zIndex = 'auto';
      });
    });
  });
}

const goodsFilter = document.querySelector('.c-filter');

if (goodsFilter) {
  const WAITING_LIST_DELAY_TIME = 50;

  const checkFallingOut = (block) => {
    return (block.getBoundingClientRect().right - goodsFilter.getBoundingClientRect().right > 0);
  };

  const moveLeft = (block) => {
    block.style.left = 'auto';
  };

  const resetShift = (block) => {
    block.style.left = 0;
  }

  const selectElements = goodsFilter.querySelectorAll('.form-select');

  selectElements.forEach((select) => {
    const button = select.querySelector('.form-select__input');
    const list = select.querySelector('.form-select__list');

    button.addEventListener('click', () => {
      if (!button.classList.contains('open')) {
        setTimeout(() => {
          if (checkFallingOut(list)) {
            moveLeft(list);
          }
        }, WAITING_LIST_DELAY_TIME);
      } else {
        resetShift(list);
      }
    });
  });
}

const smallCustomForms = document.querySelectorAll('.custom-form--compact');

if (smallCustomForms) {
  smallCustomForms.forEach((form) => {
    const submitButton = form.querySelector('.form__button--submit');
    submitButton.style.display = 'none';

    const input = form.querySelector('.form__textfield-control');

    input.addEventListener('input', () => {
      if (input.value) {
        submitButton.style.display = 'grid';
      } else {
        submitButton.style.display = 'none';
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === '#js-modal-message') {
    $('#js-modal-message').fadeIn(500), $("body").append('<div class="overlay" id="js-overlay"></div>');
    $("body").addClass("opened-modal");
  }
});

const fileUploadControl = document.querySelector('.form__file-field-control');

if (fileUploadControl) {
  fileUploadControl.addEventListener('change', () => {
    fileUploadControl.classList.toggle('form__file-field-control--shown', fileUploadControl.files[0]);
  });
}

const customForm2Elements = document.querySelectorAll('.custom-form-2');

if (customForm2Elements) {
  const toggleAccordionView = (evt) => {
    const accordionButton = evt.target.closest('.form__section-heading-button');

    if (!accordionButton) {
      return;
    }

    const accordion = accordionButton.closest('.form__section');
    accordion.classList.toggle('form__section--open');
  };

  customForm2Elements.forEach((form) => {
    form.addEventListener('click', toggleAccordionView);
  });
}

const promocodeElement = document.querySelector('.custom-form-2--order .form__promocode');
const promocodeCancelButton = document.querySelector('.promocode__cancel-button');
const promocodeInput = document.querySelector('.form__textfield-control');
const promocodeShowButton1 = document.querySelector('.custom-form-2--order .form__footer-promo-button');
const promocodeShowButton2 = document.querySelector('.custom-form-2--order .form__promocode-button');

if (promocodeElement && promocodeShowButton1 && promocodeShowButton2) {
  promocodeShowButton1.addEventListener('click', (evt) => {
    evt.preventDefault();
    promocodeShowButton1.classList.add('form__footer-promo-button--hidden');
    promocodeShowButton2.classList.add('form__promocode-button--hidden');
    promocodeElement.classList.add('form__promocode--show');
    promocodeInput.focus();
  });
}

if (promocodeElement && promocodeShowButton1 && promocodeShowButton2) {
  promocodeShowButton2.addEventListener('click', (evt) => {
    evt.preventDefault();
    promocodeShowButton1.classList.add('form__footer-promo-button--hidden');
    promocodeShowButton2.classList.add('form__promocode-button--hidden');
    promocodeElement.classList.add('form__promocode--show');
    promocodeInput.focus();
  });
}

if (promocodeElement && promocodeCancelButton && promocodeShowButton1 && promocodeShowButton2) {
  promocodeCancelButton.addEventListener('click', () => {
    promocodeShowButton1.classList.remove('form__footer-promo-button--hidden');
    promocodeShowButton2.classList.remove('form__promocode-button--hidden');
    promocodeElement.classList.remove('form__promocode--show');
  });
}

const inspirationGallery = document.querySelector('.inspiration');

if (inspirationGallery) {
  let swiper = new Swiper(".artgallery-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 5,
    watchSlidesProgress: true,
    loop: true,
    navigation: {
      nextEl: ".inspiration__arrows .arrows__next",
      prevEl: ".inspiration__arrows .arrows__prev",
    },
  })
};

const productsSection = document.querySelector('.products');

if (productsSection) {
  (function () {
    const breakpoint = window.matchMedia('(min-width: 1280px)');
    const productsSwiper = document.querySelector('.products__slider');
    const productsList = document.querySelector('.products__list');
    const productSlides = document.querySelectorAll('.products__item-group');

    let productSwiper;
    const breakpointChecker = () => {

      if (breakpoint.matches === true) {

        if (productSwiper !== undefined) {
          productSwiper.destroy(true, true);
          productSwiper = undefined;
          productsSwiper.classList.remove('swiper');
          productsList.classList.remove('swiper-wrapper');
          productSlides.forEach((slide) => {
            slide.classList.remove('swiper-slide');
          });
        }

        return;
      } else if (breakpoint.matches === false && productSwiper === undefined) {

        return enableSwiper();

      }

    };

    const enableSwiper = () => {
      productsSwiper.classList.add('swiper');
      productsList.classList.add('swiper-wrapper');
      productSlides.forEach((slide) => {
        slide.classList.add('swiper-slide');
      });

      productSwiper = new Swiper('.products__slider', {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 8,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".products__arrows .arrows__next",
          prevEl: ".products__arrows .arrows__prev",
        },
        breakpoints: {
          420: {
            slidesPerView: 'auto',
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1510: {
            spaceBetween: 10,
          }
        }
      });
    };

    window.addEventListener('resize', breakpointChecker);
    breakpointChecker();
  })();
}

const projectsGallery = document.querySelector('.projects');
if (projectsGallery) {
  let swiper = new Swiper(".projects-swiper", {
    slidesPerView: 'auto',
    spaceBetween: 5,
    watchSlidesProgress: true,
    loop: true,
    navigation: {
      nextEl: ".projects__arrows .arrows__next",
      prevEl: ".projects__arrows .arrows__prev",
    },
  })
};

const serviceSwiper = document.querySelector('.n-service');
if (serviceSwiper) {
  let swiper = new Swiper(".n-service-swiper", {
    slidesPerView: 'auto',
    watchOverflow: true,
    spaceBetween: 5,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 7,
      },
      1510: {
        spaceBetween: 20,
      },
    }
  })
};

const tileSwiper = document.querySelector('.tile-range');
if (tileSwiper) {
  let swiper = new Swiper('.tile-range-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 8,
    loop: true,
    navigation: {
      nextEl: ".tile-range__arrows .arrows__next",
      prevEl: ".tile-range__arrows .arrows__prev",
    },
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
    },
  });
};

const linksElements = document.querySelectorAll('.links');

if (linksElements) {
  linksElements.forEach((links) => {
    links.addEventListener('click', (evt) => {
      const button = evt.target.closest('.links__toggle');

      if (!button) {
        return;
      }

      links.classList.toggle('links--open');
    })
  });
}

const orderForm = document.querySelector('.custom-form-2--order');

if (orderForm) {
  const formSectionBodyAddress = orderForm.querySelector('.form__section-body--address');

  if (formSectionBodyAddress) {
    orderForm.addEventListener('change', (evt) => {
      const deliverySelfCheckbox = evt.target.closest('.form__checkbox-control');
      if (!deliverySelfCheckbox) {
        return;
      }
      formSectionBodyAddress.classList.toggle('form__section-body--address--stock', deliverySelfCheckbox.checked);
    });
  }
}

const anchor = document.querySelector('.n-banner__video-link');

const elementClickHandler = (evt) => {
  const element = evt.target.closest('a');
  if (!element) {
    return;
  }
  evt.preventDefault();
  const blockId = element.getAttribute('href');

  if (blockId && blockId !== '#' && blockId !== '#!') {
    const block = document.querySelector(blockId);

    if (block) {
      block.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
};

if (anchor) {
  anchor.addEventListener('click', elementClickHandler);
}

const nProductsItemSlider = document.querySelector('.n-products__item-slider');

if (nProductsItemSlider) {
  var swiper = new Swiper('.n-products__item-slider', {
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    watchSlidesProgress: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });
}

const materialsSwiper = document.querySelector('.materials__slider.swiper');

if (materialsSwiper) {
  var swiper = new Swiper('.materials__slider', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 25
      },
    },
  });
}

const materialsSwiperAlter = document.querySelector('.materials__slider--alter.swiper');

if (materialsSwiperAlter) {
  var swiper = new Swiper('.materials__slider--alter', {
    slidesPerView: 'auto',
    spaceBetween: 11,
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1280: {
        slidesPerView: 6,
      },
      1510: {
        slidesPerView: 7,
      },
    },
  });
}

const showroomSlider = document.querySelector('.showroom__slider');

if (showroomSlider) {
  const splide = new Splide('.showroom__slider', {
    type: 'loop',
    drag: 'free',
    pagination: false,
    focus: 'center',
    autoWidth: true,
    autoScroll: {
      speed: 0.5,
      pauseOnFocus: false
    }
  });

  splide.mount(window.splide.Extensions);
}

const newsSection = document.querySelector('.n-news');
if (newsSection) {
  let swiper = new Swiper('.news-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 5,
    watchSlidesProgress: true,
    loop: true,
    navigation: {
      nextEl: ".n-news__arrows .arrows__next",
      prevEl: ".n-news__arrows .arrows__prev",
    },
  });
};

const offersSection = document.querySelector('.offers');
if (offersSection) {
  const tabs = new Swiper('.offers .tabs__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    watchSlidesProgress: true,
    pagination: {
      el: '.offers__tabs-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1280: {
        slidesPerView: 6,
        slidesPerGroup: 1,
        loop: false,
      },
    },
  });

  const slides = new Swiper('.offers__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".offers__button-next",
      prevEl: ".offers__button-prev",
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      waitForTransition: true
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: tabs,
    },
  });
};

const goodsSlider1 = document.querySelector('.goods--swiper--1 .goods__slider');
if (goodsSlider1) {
  const swiper = new Swiper(".goods--swiper--1 .goods__slider", {
    slidesPerView: 1,
    spaceBetween: 9,
    navigation: {
      nextEl: ".goods--swiper--1 .goods__slider-button-next",
      prevEl: ".goods--swiper--1 .goods__slider-button-prev",
    },
    breakpoints: {
      420: {
        slidesPerView: 'auto',
      },
      1280: {
        slidesPerView: 4,
      },
    },
    watchSlidesProgress: true
  });
}

const goodsSlider2 = document.querySelector('.goods--swiper--2 .goods__slider');
if (goodsSlider1) {
  const swiper = new Swiper(".goods--swiper--2 .goods__slider", {
    slidesPerView: 1,
    spaceBetween: 9,
    navigation: {
      nextEl: ".goods--swiper--2 .goods__slider-button-next",
      prevEl: ".goods--swiper--2 .goods__slider-button-prev",
    },
    breakpoints: {
      420: {
        slidesPerView: 'auto',
      },
      1280: {
        slidesPerView: 4,
      },
    },
    watchSlidesProgress: true
  });
}

const popularGoodsSection = document.querySelector('.goods--popular');

if (popularGoodsSection) {

  (function () {

    const breakpoint = window.matchMedia('(min-width: 1280px)');
    const popGoodsSwiper = document.querySelector('.goods--popular .goods__slider');
    const popGoodsList = document.querySelector('.goods--popular .goods__list');
    const popGoodsSlides = document.querySelectorAll('.goods--popular .good-list__item');

    let popGoodSwiper;
    const breakpointChecker = () => {
      if (breakpoint.matches === true) {

        if (popGoodSwiper !== undefined) {
          popGoodSwiper.destroy(true, true);
          popGoodSwiper = undefined;
          popularGoodsSection.classList.remove('goods--swiper');
          popGoodsSwiper.classList.remove('swiper');
          popGoodsList.classList.remove('swiper-wrapper');
          popGoodsSlides.forEach((slide) => {
            slide.classList.remove('swiper-slide');
          });
        }

        return;

      } else if (breakpoint.matches === false && popGoodSwiper === undefined) {
        return enableSwiper();
      }
    };

    const enableSwiper = () => {
      popularGoodsSection.classList.add('goods--swiper');
      popGoodsSwiper.classList.add('swiper');
      popGoodsList.classList.add('swiper-wrapper');
      popGoodsSlides.forEach((slide) => {
        slide.classList.add('swiper-slide');
      });

      popGoodSwiper = new Swiper(".goods--popular .goods__slider", {
        slidesPerView: 1,
        spaceBetween: 9,
        allowTouchMove: true,
        navigation: {
          nextEl: ".goods--popular .goods__slider-button-next",
          prevEl: ".goods--popular .goods__slider-button-prev",
        },
        breakpoints: {
          420: {
            slidesPerView: 'auto',
          },
          1280: {
            allowTouchMove: false,
            slidesPerView: 4,
          },
        },
        watchSlidesProgress: true
      });
    };

    window.addEventListener('resize', breakpointChecker);
    breakpointChecker();
  })();
}

/* ------------ n-select ------------ */
const initSelect = (wrapper) => {
  const control = wrapper.querySelector('.n-select__control');
  const select = wrapper.querySelector('.n-select__select');
  const header = select.querySelector('.n-select__header');
  const list = select.querySelector('.n-select__list');
  const options = list.querySelectorAll('.n-select__option');

  control.value = '';

  // let changeEvent = new Event('change', { bubbles: true });

  let listMaxHeight = false;

  const setListMaxHeight = () => {
    if (listMaxHeight) {
      return;
    }

    list.style.maxHeight = `${list.children[0].offsetHeight * list.dataset.maxHeight}px`;
    listMaxHeight = true;
  };

  select.addEventListener('keydown',  setListMaxHeight, {once: true});
  select.addEventListener('click', setListMaxHeight, {once: true});

  let currentOptionIndex = 0;

  const getNextOptionIndex = () => {
    return (currentOptionIndex + 1) % control.children.length;
  };

  const getPrevOptionIndex = () => {
    return (currentOptionIndex - 1 < 0) ? control.children.length - 1 : currentOptionIndex - 1;
  };

  const changeValue = (index) => {
    if (control.value === control.children[index].value) {
      return;
    }

    control.children[index].selected = true;
    control.dispatchEvent(changeEvent);
  };

  const highlightSelectedOption = () => {
    options.forEach((option) => {
      option.classList.remove('n-select__option--selected');
    });

    if (control.value === '') {
      header.textContent = header.dataset.text;
      header.classList.remove('n-select__header--selected');
      list.scrollTop = 0;
      return;
    }

    header.classList.add('n-select__header--selected');

    list.children[currentOptionIndex].classList.add('n-select__option--selected');
    header.textContent = control.children[currentOptionIndex].textContent;

    if (list.children[currentOptionIndex].offsetTop + list.children[currentOptionIndex].offsetHeight > list.offsetHeight + list.scrollTop) {
      list.scrollTop = list.children[currentOptionIndex].offsetTop + list.children[currentOptionIndex].offsetHeight - list.offsetHeight;
    } else if (list.scrollTop > list.children[currentOptionIndex].offsetTop) {
      list.scrollTop = list.children[currentOptionIndex].offsetTop;
    }
  };

  select.addEventListener('keydown', (evt) => {
    switch (evt.code) {
      case Key.RIGHT:
      case Key.DOWN:
        evt.preventDefault();
        changeValue(getNextOptionIndex());
        break;
      case Key.UP:
      case Key.LEFT:
        evt.preventDefault();
        changeValue(getPrevOptionIndex());
        break;
      case Key.SPACE:
      case Key.ENTER:
        evt.preventDefault();
        select.classList.toggle('n-select__select--open');
        break;
    }
  });

  select.addEventListener('click', ({target}) => {
    const option = target.closest('.n-select__option');

    if (option) {
      changeValue(option.dataset.index);
    }

    select.classList.toggle('n-select__select--open');
  });

  select.addEventListener('blur', () => {
    select.classList.remove('n-select__select--open');
  });

  control.addEventListener('change', () => {
    if (control.value) {
      currentOptionIndex = +control.querySelector(`option[value="${control.value}"]`).dataset.index;
    } else {
      currentOptionIndex = 0;
    }
    highlightSelectedOption();
  });
};

document.querySelectorAll('.n-select').forEach(initSelect);

/* ------------ */
// const UPLOAD_URL = 'https://echo.htmlacademy.ru/courses';
let UPLOAD_URL = 'https://echo.htmlacademy.ru/courses';

const sendData = (onSuccess, onFail, body) => {
  fetch(UPLOAD_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

/* ------------ custom-form-2--calculation ------------ */

const initCalculationForms = (form) => {
  const CENTIMETERS_IN_1_SQUARE_METER = 10000;

  const lengthField = form.querySelector('[name="length"]');
  const widthField = form.querySelector('[name="width"]');
  const areaField = form.querySelector('[name="area"]');
  const materialField = form.querySelector('[name="material"]')
  const formResult = form.querySelector('.form__result');

  const isAreaFieldFiled = () => {
    return !!+areaField.value;
  };

  const calcArea = () => {
    return +lengthField.value * +widthField.value / CENTIMETERS_IN_1_SQUARE_METER;
  }

  const setArea = () => {
    areaField.value = calcArea();
    formResult.classList.toggle('form__result--hidden', (!(isAreaFieldFiled() && materialField.value)));
  }

  const resetField = (field) => {
    field.value = '';
  }

  lengthField.addEventListener('input', setArea);
  widthField.addEventListener('input', setArea);
  areaField.addEventListener('input', () => {
    resetField(lengthField);
    resetField(widthField);
    formResult.classList.toggle('form__result--hidden', (!(isAreaFieldFiled() && materialField.value)));
  });

  materialField.addEventListener('change', () => {
    formResult.classList.toggle('form__result--hidden', (!(isAreaFieldFiled() && materialField.value)));
  });

  const formWrapper = form.closest('.custom-form-2--calculation');
  const formSubmit = form.querySelector('.form__submit');

  const onSuccess = () => {
    formWrapper.classList.remove('custom-form-2--notice--error');
    formWrapper.classList.add('custom-form-2--notice--success');
    formSubmit.classList.remove('loader');
  };

  const onFail = () => {
    formWrapper.classList.remove('custom-form-2--notice--success');
    formWrapper.classList.add('custom-form-2--notice--error');
    formSubmit.classList.remove('loader');
  };

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    formSubmit.classList.add('loader');

    // Имитация успешной (или нет) отправки формы
    UPLOAD_URL = Math.random() > 0.5 ? 'https://echo.htmlacademy.ru/courses' : 'error';

    setTimeout(() => {
      sendData(
        () => onSuccess(),
        () => onFail(),
        new FormData(evt.target)
      );
    }, 1000)
  });
};

document.querySelectorAll('.custom-form-2--calculation .form__body').forEach(initCalculationForms);

/* ------------ */



const materialsSlider = new Swiper('.materials-slider', {
  slidesPerView: 1,
  cssMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 0,
  watchSlidesProgress: true
});

/* ------------ Связь селекта и слайдера ------------ */

const initCalculationMaterialSection = (section) => {
  const materialSelect = section.querySelector('select[name="material"]');

  materialSelect.addEventListener('change', () => {
    let currentOptionIndex;

    if (materialSelect.value) {
      currentOptionIndex = materialSelect.querySelector(`[value="${materialSelect.value}"]`).dataset.index;
    }

    materialsSlider.slideTo(currentOptionIndex, 0);
  });

  materialsSlider.on('realIndexChange', () => {
    const value = materialSelect.querySelector(`option[data-index="${materialsSlider.realIndex}"]`).value;

    if (materialSelect.value === value) {
      return;
    }

    materialSelect.value = value;
    materialSelect.dispatchEvent(changeEvent);
  });
};

document.querySelectorAll('.calculation-material').forEach(initCalculationMaterialSection);

/* ------------ */

/* ------------ n-banner img parallax ------------ */

const initBannerParallaxImg = (img) => {
  const imgWrapper = img.parentNode;

  const shiftImg = () => {
    const imgScrollRange = img.offsetHeight - imgWrapper.offsetHeight;

    if (imgScrollRange <= 0) {
      return;
    }

    const distanceFromTheTopOfThePage = imgWrapper.getBoundingClientRect().bottom + window.pageYOffset;
    const imgScrollСoefficient = imgScrollRange / distanceFromTheTopOfThePage;
    let transformY = window.pageYOffset * imgScrollСoefficient;

    if (transformY <= 0) {
      transformY = 0;
    } else if (transformY >= imgScrollRange) {
      transformY = imgScrollRange;
    }

    img.style.transform = `translate(-50%, -${transformY}px)`;
  };

  document.addEventListener('scroll', shiftImg);
};

document.querySelectorAll('.n-banner--parallax-bg .n-banner__img').forEach(initBannerParallaxImg);

/* ------------ */

/* ------------ good__heading elements ------------ */
/* Задать заголовкам карточек товаров, которые расположены
в одном ряду, одинаковую высоту.*/

const goodListNodes = document.querySelectorAll('.good-list');

if (goodListNodes.length > 0) {
  const CARD_MIN_WIDTH = 289;

  const setMinHeight = (headings) => {
    let highest = 0;

    headings.forEach((heading) => {
      heading.style.minHeight = 'auto';

      if (heading.offsetHeight > highest) {
        highest = heading.offsetHeight;
      }
    });

    headings.forEach((heading) => {
      heading.style.minHeight = `${highest}px`;
    });
  };

  const setGoodListCardHeadingsHeight = () => {
    goodListNodes.forEach((list) => {
      const headings = Array.from(list.querySelectorAll('.good__heading'));

      if (list.classList.contains('swiper-wrapper')) {
        setMinHeight(headings);
      } else {
        const columnGap = parseInt(getComputedStyle(list).columnGap, 10);
        const cardsCountInRow = Math.floor((list.clientWidth + columnGap) / (CARD_MIN_WIDTH + columnGap));

        for (let i = 0; i < headings.length; i += cardsCountInRow) {
          const headingsInRow = headings.slice(i, i + cardsCountInRow);

          setMinHeight(headingsInRow);
        }
      }
    })
  };

  window.addEventListener('load', setGoodListCardHeadingsHeight, {once: true});
  window.addEventListener('resize', setGoodListCardHeadingsHeight);
};

const collectionListNodes = document.querySelectorAll('.n-collection-list');

if (collectionListNodes.length > 0) {
  const CARD_MIN_WIDTH = 289;

  const setMinHeight = (headings) => {
    let highest = 0;

    headings.forEach((heading) => {
      heading.style.minHeight = 'auto';

      if (heading.offsetHeight > highest) {
        highest = heading.offsetHeight;
      }
    });

    headings.forEach((heading) => {
      heading.style.minHeight = `${highest}px`;
    });
  };

  const setCollectionListCardHeadingsHeight = () => {
    collectionListNodes.forEach((list) => {
      const headings = Array.from(list.querySelectorAll('.n-collection__heading'));

      if (list.classList.contains('swiper-wrapper')) {
        setMinHeight(headings);
      } else {
        const columnGap = parseInt(getComputedStyle(list).columnGap, 10);
        const cardsCountInRow = Math.floor((list.clientWidth + columnGap) / (CARD_MIN_WIDTH + columnGap));

        for (let i = 0; i < headings.length; i += cardsCountInRow) {
          const headingsInRow = headings.slice(i, i + cardsCountInRow);

          setMinHeight(headingsInRow);
        }
      }
    })
  };

  window.addEventListener('load', setCollectionListCardHeadingsHeight, {once: true});
  window.addEventListener('resize', setCollectionListCardHeadingsHeight);
};

/* ------------ */

const initVideoPlayer = (videoplayer) => {
  const videoElement = videoplayer.querySelector('.n-video__video');
  const buttonPlayElement = videoplayer.querySelector('.n-video__play');

  const playVideo = () => {
    videoElement.setAttribute('controls', true);
    videoElement.play();
    buttonPlayElement.style.display = 'none';
  };

  buttonPlayElement.addEventListener('click', playVideo);
};

document.querySelectorAll('.n-video').forEach(initVideoPlayer);
