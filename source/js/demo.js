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

