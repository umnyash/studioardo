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
    const popupWrapper = popup?.closest('[id^="js-modal-"]');
    if (popupWrapper) {
      popupWrapper.style.display = '';
    }
    currentPopup = null;
    document.body.classList.remove('no-scroll');
    document.body.classList.remove('opened-modal');
    const overlay = document.querySelector('#js-overlay');
    if (overlay) {
      overlay.remove()
    }
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
    freeMode: true,
    watchSlidesProgress: true,
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

const initFileUploadControl = (control) => {
  control.addEventListener('change', () => {
    control.classList.toggle('form__file-field-control--shown', control.files[0]);
  });
};

document.querySelectorAll('.form__file-field-control').forEach(initFileUploadControl);

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
      nextEl: ".inspiration__button-next",
      prevEl: ".inspiration__button-prev",
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
          nextEl: ".products__button-next",
          prevEl: ".products__button-prev",
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
      nextEl: ".projects__button-next",
      prevEl: ".projects__button-prev",
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
      nextEl: ".tile-range__button-next",
      prevEl: ".tile-range__button-prev",
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
      1510: {
        spaceBetween: 10,
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
      nextEl: ".n-news__button-next",
      prevEl: ".n-news__button-prev",
    },
    breakpoints: {
      1510: {
        spaceBetween: 10,
      },
    },
  });
};

const initOffersSection = (offersSection) => {
  const tabsSliderElement = offersSection.querySelector('.tabs__slider');
  const mainSliderElement = offersSection.querySelector('.offers__slider');
  const tabsItemsCount = tabsSliderElement.querySelectorAll('.tabs__item').length;
  let isEdgeTabsItemClick = false;
  const mainSliderPrevButton = offersSection.querySelector('.offers__button-prev-2');
  const mainSliderNextButton = offersSection.querySelector('.offers__button-next-2');

  const tabsSlider = new Swiper(tabsSliderElement, {
    loop: true,
    allowTouchMove: false,
    watchSlidesProgress: true,
    threshold: 10,
    pagination: {
      el: '.offers__tabs-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: Math.min(3, tabsItemsCount),
      },
      1280: {
        slidesPerView: Math.min(6, tabsItemsCount),
      },
    },
  });

  const mainSlider = new Swiper(mainSliderElement , {
    loop: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".offers__button-next",
      prevEl: ".offers__button-prev",
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      waitForTransition: true
    },
  });

  mainSlider.on('slideChangeTransitionStart', () => mainSlider.allowTouchMove = false);
  mainSlider.on('slideChangeTransitionEnd', () => mainSlider.allowTouchMove = true);

  tabsSlider.on('slideNextTransitionEnd', () => {
    if (isEdgeTabsItemClick && tabsSlider.params.slidesPerView >= 4) {
      tabsSlider.slideNext(tabsSlider.params.speed / 2);
      isEdgeTabsItemClick = false;
    }
  });

  tabsSlider.on('slidePrevTransitionEnd', () => {
    if (isEdgeTabsItemClick && tabsSlider.params.slidesPerView >= 5) {
      tabsSlider.slidePrev(tabsSlider.params.speed / 2);
      isEdgeTabsItemClick = false;
    }
  });

  const highlightCurrentTab = (index) => {
    tabsSlider.slides.forEach((slide) => slide.classList.remove('tabs__item--current'));
    if (tabsSlider.params.slidesPerView < 2) {
      return;
    }
    const tabs = tabsSliderElement.querySelectorAll(`.tabs__item[data-swiper-slide-index="${index}"]`);
    tabs.forEach((slide) => slide.classList.add('tabs__item--current'));
  };
  highlightCurrentTab(mainSlider.realIndex);

  const scrollTabsSlider = (index) => {
    if (tabsSlider.params.slidesPerView === 3) {
      switch (index) {
        case tabsSlider.realIndex:
          tabsSlider.slidePrev();
          break;
        case (tabsSlider.realIndex + tabsSlider.params.slidesPerView - 1) % tabsItemsCount:
          tabsSlider.slideNext();
          break;
      }
    } else if (tabsSlider.params.slidesPerView === 4) {
      switch (index) {
        case tabsSlider.realIndex:
          tabsSlider.slidePrev();
          break;
        case (tabsSlider.realIndex + tabsSlider.params.slidesPerView - 2) % tabsItemsCount:
          tabsSlider.slideNext();
          break;
        case (tabsSlider.realIndex + tabsSlider.params.slidesPerView - 1) % tabsItemsCount:
          isEdgeTabsItemClick = true;
          tabsSlider.slideNext(tabsSlider.params.speed / 2);
          break;
      }
    } else if (tabsSlider.params.slidesPerView >= 5) {
      switch (index) {
        case tabsSlider.realIndex:
          isEdgeTabsItemClick = true;
          tabsSlider.slidePrev(tabsSlider.params.speed / 2);
          break;
        case (tabsSlider.realIndex + 1) % tabsItemsCount:
          tabsSlider.slidePrev(tabsSlider.params.speed);
          break;
        case (tabsSlider.realIndex + tabsSlider.params.slidesPerView - 2) % tabsItemsCount:
          tabsSlider.slideNext();
          break;
        case (tabsSlider.realIndex + tabsSlider.params.slidesPerView - 1) % tabsItemsCount:
          isEdgeTabsItemClick = true;
          tabsSlider.slideNext(tabsSlider.params.speed / 2);
          break;
      }
    }
  };
  scrollTabsSlider(mainSlider.realIndex);


  tabsSliderElement.addEventListener('click', (evt) => {
    const tabsItem = evt.target.closest('.tabs__item');

    if (!tabsItem) {
      return;
    }

    tabsItemIndex = +tabsItem.dataset.swiperSlideIndex;
    mainSlider.slideToLoop(tabsItemIndex);
  });

  mainSliderPrevButton.addEventListener('click', () => mainSlider.slidePrev());
  mainSliderNextButton.addEventListener('click', () => mainSlider.slideNext());

  mainSlider.on('slideNextTransitionStart', () => {
    if (tabsSlider.params.slidesPerView < 3) {
      tabsSlider.slideNext();
    }
  });

  mainSlider.on('slidePrevTransitionStart', () => {
    if (tabsSlider.params.slidesPerView < 3) {
      tabsSlider.slidePrev();
    }
  });

  mainSlider.on('slideChange', () => {
    highlightCurrentTab(mainSlider.realIndex);

    if (tabsSlider.params.slidesPerView >= 3) {
      scrollTabsSlider(mainSlider.realIndex);
    }
  });

  mainSlider.on('resize', () => mainSlider.slideToLoop(tabsSlider.realIndex));
}
document.querySelectorAll('.offers').forEach(initOffersSection);

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


/* Инициализация кастомного селекта */

const initSelect = (wrapper) => {
  const control = wrapper.querySelector('.n-select__control');
  const select = wrapper.querySelector('.n-select__select');
  const header = select.querySelector('.n-select__header');
  const list = select.querySelector('.n-select__list');
  const options = list.querySelectorAll('.n-select__option');

  control.value = '';

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

/**/


/* Инициализация слайдера материалов */

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

/* */

/* Связь селекта материалов и слайдера */

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

/**/


/* Эффект параллакса в баннерах */

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

/**/


/* Установка одинаковой высоты заголовков карточкам товаров и коллекций в одном ряду */

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

/**/


/* Удаление попапа в шоу-руме */

const initShowroomTooltip = (tooltip) => {
  const closeButton = tooltip.querySelector('.showroom__tooltip-close');
  closeButton.addEventListener('click', () => {
    tooltip.remove();
  });
};
document.querySelectorAll('.showroom__tooltip').forEach(initShowroomTooltip);

/**/


/* Установка высоты для карточке товаров и коллекций */

const goodCards = document.querySelectorAll('.good-list__item');
const collectionCards = document.querySelectorAll('.n-collection-list__item');

window.addEventListener('load', () => {
  goodCards.forEach((card) => {
    card.style.height = 'auto';
    setTimeout(() => {
      card.style.height = `${card.offsetHeight}px`;
    }, 0)
  });

  collectionCards.forEach((card) => {
    card.style.height = 'auto';
    setTimeout(() => {
      card.style.height = `${card.offsetHeight}px`;
    }, 0)
  });
});

window.addEventListener('resize', () => {
  goodCards.forEach((card) => {
    card.style.height = 'auto';
    setTimeout(() => {
      card.style.height = `${card.offsetHeight}px`;
    }, 0)
  });

  collectionCards.forEach((card) => {
    card.style.height = 'auto';
    setTimeout(() => {
      card.style.height = `${card.offsetHeight}px`;
    }, 0)
  });
})

/**/


/* Изменение ширины числового инпута при вводе */

const setNumberFieldControlWidth = (control) => {
  control.style.width = `${control.value.length + 1}ch`;
}

const initGoodsQuantity = (goodsQuantity) => {
  const field = goodsQuantity.querySelector('.number-field__control');

  const onFieldInput = (evt) => setNumberFieldControlWidth(evt.target);

  const onButtonClick = () => {
    setTimeout(() => { setNumberFieldControlWidth(field) }, 5);
  };

  field.addEventListener('input', onFieldInput);

  goodsQuantity.querySelectorAll('.number-field__button').forEach((button) => {
    button.addEventListener('click', onButtonClick);
  })

  goodsQuantity.querySelectorAll('.radiobutton__control').forEach((radiobutton) => {
    radiobutton.addEventListener('click', onButtonClick);
  })
};
document.querySelectorAll('.goods-quantity').forEach(initGoodsQuantity);
document.querySelectorAll('.good').forEach(initGoodsQuantity);

const initModalsButton = (button) => {
  button.addEventListener('click', () => {
    setTimeout(() => {
      const modal = document.querySelector('#js-modal-click');
      if (!modal) {
        return;
      }
      modal.querySelectorAll('.goods-quantity').forEach(initGoodsQuantity);
    }, 1000);
  });
};
document.querySelectorAll('.js-modal-show[href="#js-modal-click"').forEach(initModalsButton);

/**/


/* Кнопка включения видео в iframe */

const initIframeVideoStarter = (button, iframe) => {
  button.addEventListener('click', () => {
    console.log('play')
    iframe.src += '?autoplay=1&mute=1';
  })
};

const iframeVideoStarter = document.querySelector('.n-banner__video-link');
const iframeVideo = document.querySelector('.n-video__frame');

if (iframeVideoStarter && iframeVideo) {
  initIframeVideoStarter(iframeVideoStarter, iframeVideo);
}

/**/


/* Инициализация плашек преимуществ */

const initAdvantagesSection = (section) => {
  const cards = section.querySelectorAll('.n-advantages__name');

  const onDocumentClick = (evt) => {
    const card = evt.target.closest('.n-advantages__name');
    if (!card) {
      cards.forEach((card) => card.classList.remove('n-advantages__name--hover'));
      document.removeEventListener('click', onDocumentClick);
    }
  };

  section.addEventListener('click', (evt) => {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const card = evt.target.closest('.n-advantages__name');
    if (!card) {
      return;
    }

    if (card.classList.contains('n-advantages__name--hover')) {
      cards.forEach((card) => card.classList.remove('n-advantages__name--hover'));
    } else {
      cards.forEach((card) => card.classList.remove('n-advantages__name--hover'));
      card.classList.add('n-advantages__name--hover');
      document.addEventListener('click', onDocumentClick);
    }
  });
}

document.querySelectorAll('.n-advantages').forEach(initAdvantagesSection);

/**/

