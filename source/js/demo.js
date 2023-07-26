/* Скрипты, используемые только в вёрстке, чтобы показывать интерактив тестировщику. */
/* Не должны попадать в дев или прод! */


/* Закрытие уведомления*/

const closeNotification = (evt) => {
  const notificationCloseButton = evt.target.closest('.notification__close');

  if (!notificationCloseButton) {
    return;
  }

  notificationCloseButton.closest('.good-order-notification, .notification').remove();
};
document.body.addEventListener('click', closeNotification);

/**/


/* Модификации карточек товаров */

const goodLists = document.querySelectorAll('.good-list');
if (goodLists) {
  const addGoodToCart = (evt) => {
    const goodCartButton = evt.target.closest('.good__add-cart');

    if (!goodCartButton) {
      return;
    }

    const good = goodCartButton.closest('.good');
    good.classList.add('good--in-cart');
  };

  const removeFromCart = (evt) => {
    const goodCartButton = evt.target.closest('.good__remove-cart');

    if (!goodCartButton) {
      return;
    }

    const good = goodCartButton.closest('.good');
    good.classList.remove('good--in-cart');
  }

  const quickOrderGood = (evt) => {
    const goodQuickOrderButton = evt.target.closest('.good__quick-order-button');

    if (!goodQuickOrderButton) {
      return;
    }

    const good = goodQuickOrderButton.closest('.good');
    good.classList.add('good--quick-order');
  };

  const cancelQuickOrder = (evt) => {
    const goodQuickOrderCancelButton = evt.target.closest('.good__cancel-order');

    if (!goodQuickOrderCancelButton) {
      return;
    }

    const good = goodQuickOrderCancelButton.closest('.good');
    good.classList.remove('good--quick-order');
  };

  const showGoodOrderNotification = (status, text) => {
    const notification = `
      <div class="good-order-notification">
        <div class="notification notification--alter notification--${status}">
          <p class="notification__text">${text}</p>
          <button class="notification__close" type="button">
            <span class="visually-hidden">Закрыть уведомление</span>
          </button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', notification);
  }

  const submitQuickOrder = (evt) => {
    const goodQuickOrderSubmitButton = evt.target.closest('.good__submit-order');

    if (!goodQuickOrderSubmitButton) {
      return;
    }

    const good = goodQuickOrderSubmitButton.closest('.good');
    good.classList.remove('good--quick-order');
    showGoodOrderNotification('success', 'С вами свяжется менеджер для подтверждения заказа');
  };

  goodLists.forEach((list) => {
    list.addEventListener('click', submitQuickOrder);
    list.addEventListener('click', addGoodToCart);
    list.addEventListener('click', removeFromCart);
    list.addEventListener('click', quickOrderGood);
    list.addEventListener('click', cancelQuickOrder);
  });
}

/**/


/* Инициализация кнопок +/- возле числового поля ввода */

const initNumberFieldButtons = (numberField) => {
  const numberFieldControl = numberField.querySelector('.number-field__control');

  numberField.querySelector('.number-field__button--minus').addEventListener('click', () => {
    numberFieldControl.stepDown();
  });

  numberField.querySelector('.number-field__button--plus').addEventListener('click', () => {
    numberFieldControl.stepUp();
  });
};
document.querySelectorAll('.number-field').forEach(initNumberFieldButtons);

/**/


/* Имитация отправки формы расчёта */

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

const setCalculationFormSubmit = (form) => {
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

document.querySelectorAll('.custom-form-2--calculation .form__body').forEach(setCalculationFormSubmit);

/**/


/* Инициализация форм расчёта */

const initCalculationForms = (form) => {
  const countField = form.querySelector('[name="count"]');

  if (!countField) {
    return;
  }

  const CENTIMETERS_IN_1_SQUARE_METER = 10000;
  const PRODUCTS_MEASURED_IN_RUNNING_METERS = ['countertops', 'window-sills', 'steps'];

  const lengthField = form.querySelector('[name="length"]');
  const widthField = form.querySelector('[name="width"]');
  const areaField = form.querySelector('[name="area"]');
  const materialField = form.querySelector('[name="material"]');
  const typeField = form.querySelector('[name="type"]');
  const formResult = form.querySelector('.form__result');
  const areaFieldWrapper = areaField.closest('.form__textfield-wrapper');
  const countFieldWrapper = countField.closest('.form__textfield-wrapper');

  let isCalculationInRunningMeters = false;

  const toggleFormResultView = () => {
    if (!PRODUCTS_MEASURED_IN_RUNNING_METERS.includes(typeField.value)) {
      formResult.classList.toggle('form__result--hidden', (!(isAreaFieldFiled() && materialField.value)));
    } else {
      formResult.classList.toggle('form__result--hidden', (!(lengthField.value && countField.value && materialField.value)));
    }
  }

  const isAreaFieldFiled = () => {
    return !!+areaField.value;
  };

  const calcArea = () => {
    return +lengthField.value * +widthField.value / CENTIMETERS_IN_1_SQUARE_METER;
  }

  const setArea = () => {
    areaField.value = calcArea();
    toggleFormResultView();
  }

  const resetField = (field) => {
    field.value = '';
  }

  countField.addEventListener('input', toggleFormResultView);
  lengthField.addEventListener('input', setArea);
  widthField.addEventListener('input', setArea);
  areaField.addEventListener('input', () => {
    resetField(lengthField);
    resetField(widthField);

    toggleFormResultView();
  });

  materialField.addEventListener('change', () => {
    toggleFormResultView();
  });

  const enableCalculationInRunningMeters = () => {
    areaField.disabled = true;
    areaFieldWrapper.classList.add('form__textfield-wrapper--hidden');

    countField.disabled = false;
    countFieldWrapper.classList.remove('form__textfield-wrapper--hidden');

    lengthField.removeEventListener('input', setArea);
    lengthField.addEventListener('input', toggleFormResultView);

    widthField.removeEventListener('input', setArea);
  };

  const disableCalculationInRunningMeters = () => {
    countField.disabled = true;
    countFieldWrapper.classList.add('form__textfield-wrapper--hidden');

    areaField.disabled = false;
    areaFieldWrapper.classList.remove('form__textfield-wrapper--hidden')

    lengthField.removeEventListener('input', toggleFormResultView);
    lengthField.addEventListener('input', setArea);

    widthField.addEventListener('input', setArea);
  };


  typeField.addEventListener('change', () => {
    if (PRODUCTS_MEASURED_IN_RUNNING_METERS.includes(typeField.value)) {
      if (isCalculationInRunningMeters) {
        return;
      }

      enableCalculationInRunningMeters();
      isCalculationInRunningMeters = true;
    } else {
      if (!isCalculationInRunningMeters) {
        return;
      }

      disableCalculationInRunningMeters();
      isCalculationInRunningMeters = false;
    }
  })
};

document.querySelectorAll('.custom-form-2--calculation .form__body').forEach(initCalculationForms);

/**/

/* Данные по ценам мозаики в евро */

const MOSAIC_COST = Object.freeze({
  standardDifficulty: {
    'mix': {
      glass: 119.52,
      metallized: 165.52
    },
    'stretch-mark': {
      glass: 134.19,
      metallized: 180.19
    },
    'matrix-panel': {
      glass: 181.33,
      metallized: 227.33,
      stone: 368.33
    },
    'art-panel': {
      glass: 589.90,
      metallized: 635.90,
      stone: 1085.95,
      smalt: 1085.95
    }
  },
  mediumDifficulty: {
    'mix': {
      glass: 123.71,
      metallized: 169.71
    },
    'stretch-mark': {
      glass: 139.43,
      metallized: 185.43
    },
    'matrix-panel': {
      glass: 212.76,
      metallized: 258.76,
      stone: 446.90
    },
    'art-panel': {
      glass: 663.24,
      metallized: 709.24,
      stone: 1337.38,
      smalt: 1337.38
    }
  },
  highDifficulty: {
    'mix': {
      glass: 128.95,
      metallized: 174.95
    },
    'stretch-mark': {
      glass: 139.43,
      metallized: 185.43
    },
    'matrix-panel': {
      glass: 244.19,
      metallized: 290.19,
      stone: 494.05
    },
    'art-panel': {
      glass: 946.10,
      metallized: 992.10,
      stone: 1819.29,
      smalt: 1819.29
    }
  }
});

/**/

/* Калькулятор мозаики. Смена вариантов материалов, а также их цен,
в селекте и в слайдере в зависимости от типа изделия и сложности.
Дублирующаяся функция для демонстрации. */

const initMosaicCalculationFormForDemo = (block, data) => {
  const calculationFormElement = block.querySelector('.calculation-form');
  const typeSelectElement = calculationFormElement.querySelector('.n-select__control[name="type"]');
  const defaultType = typeSelectElement.querySelector('option').dataset.value;

  const difficultySelectElement = calculationFormElement.querySelector('.n-select__control[name="difficulty"]');

  const materialSelectElement = calculationFormElement.querySelector('.n-select__control[name="material"]');
  const materialSelectOptionElements = materialSelectElement.querySelectorAll('option');
  const materialNSelectOptionElements = materialSelectElement.closest('.n-select').querySelectorAll('.n-select__option');

  const materialPriceElement = calculationFormElement.querySelector('[name="price-select"]');

  const materialsSliderElement = block.querySelector('.materials-slider');

  let materialsSlideElements = null;

  if (materialsSliderElement) {
    materialsSlideElements = materialsSliderElement.querySelectorAll('.materials-slider__item');
  }

  const getSelectedOption = (selectElement) => selectElement.querySelector(`option[value="${selectElement.value}"]`);

  const getDifficulty = () => {
    const difficultySelectedOptionElement = getSelectedOption(difficultySelectElement);
    return difficultySelectedOptionElement ? `${difficultySelectedOptionElement.dataset.value}Difficulty` : 'standardDifficulty';
  };

  const getType = () => {
    const typeSelectedOptionElement = getSelectedOption(typeSelectElement);
    return typeSelectedOptionElement ? typeSelectedOptionElement.dataset.value : defaultType;
  };

  const getMaterial = () => {
    const materialSelectedOptionElement = getSelectedOption(materialSelectElement);
    return materialSelectedOptionElement ? materialSelectedOptionElement.dataset.value : defaultType;
  }

  const getMaterialsData = () => data[getDifficulty()][getType()];
  let materialsData = getMaterialsData();

  const getFirstAvailableValue = (options) => {
    for (let i = 0; i < options.length; i++) {
      if (!options[i].hasAttribute('hidden')) {
        return options[i].value;
      }
    }

    return '';
  };

  const updateSlider = () => {
    const timerId = setInterval(() => {
      if (materialsSlider.update) {
        materialsSlider.update();
        clearTimeout(timerId);
      }
    }, 50);

    setTimeout(() => {
      clearTimeout(timerId);
    }, 5000);
  };

  const setMaterialPriceValue = () => {
    materialPriceElement.value = materialsData[getMaterial()] || '';
  }

  const changeMaterialsPrices = () => {
    materialsData = getMaterialsData();

    materialSelectOptionElements.forEach((option, index) => {
      if (option.dataset.value in materialsData) {
        const cost = materialsData[option.dataset.value];
        materialNSelectOptionElements[index].querySelector('.material-preview__text').textContent = `от ${cost} ₽/м2`;
        option.removeAttribute('hidden');
        materialNSelectOptionElements[index].classList.remove('n-select__option--hidden');

        if (materialsSliderElement) {
          const materialSlidePriceElement = materialsSlideElements[index].querySelector('.materials-slider__price');
          if (materialSlidePriceElement) {
            materialSlidePriceElement.textContent = cost;
          }
          materialsSlideElements[index].classList.remove('materials-slider__item--hidden');
        }
      } else {
        option.setAttribute('hidden', true);
        materialNSelectOptionElements[index].classList.add('n-select__option--hidden');

        if (option.value === materialSelectElement.value) {
          materialSelectElement.value = getFirstAvailableValue(materialSelectOptionElements);
          setTimeout(() => {
            materialSelectElement.dispatchEvent(changeEvent);
          }, 0)
        }

        if (materialsSliderElement) {
          materialsSlideElements[index].classList.add('materials-slider__item--hidden');
        }
      }
    });

    setMaterialPriceValue();

    if (materialsSliderElement) {
      updateSlider();
    }
  };

  const onTypeSelectChange = changeMaterialsPrices;
  const onDifficultySelectChange = changeMaterialsPrices;
  const onMaterialSelectChange = setMaterialPriceValue;

  typeSelectElement.addEventListener('change', onTypeSelectChange);
  difficultySelectElement.addEventListener('change', onDifficultySelectChange);
  materialSelectElement.addEventListener('change', onMaterialSelectChange);

  changeMaterialsPrices();
};

/**/


/* Инициализация калькуляторов мозаики с моковыми данными */

document.querySelectorAll('.calculation--mosaic, .calculation-material--mosaic').forEach((block) => {
  initMosaicCalculationFormForDemo(block, MOSAIC_COST);
});

/**/
