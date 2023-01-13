const closeNotification = (evt) => {
  const notificationCloseButton = evt.target.closest('.notification__close');

  if (!notificationCloseButton) {
    return;
  }

  notificationCloseButton.closest('.good-order-notification').remove();
};
document.body.addEventListener('click', closeNotification);

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

    const numberFieldWrapper = numberField.closest('.goods-quantity') ? numberField.closest('.goods-quantity') : numberField.closest('form');

    if (numberFieldWrapper) {
      const radiobuttons = numberFieldWrapper.querySelectorAll('input[type="radio"]');

      radiobuttons.forEach((radio) => {
        radio.addEventListener('change', () => {
          setInputWidth(numberControl);
        })
      })
    }
  });
}

/* -------------- Сокращенный вариант для сайта ----------------- */

// const numberFields = document.querySelectorAll('.number-field');

// if (numberFields) {
//   const setInputWidth = (input) => {
//     const roundedValue = String(Math.ceil(input.value * 1000) / 1000);
//     input.value = roundedValue;
//     input.style.width = roundedValue.length + 1 + 'ch';
//   }

//   numberFields.forEach((numberField) => {
//     const numberControl = numberField.querySelector('.number-field__control');

//     numberField.querySelector('.number-field__button--minus').addEventListener('click', () => {
//       setTimeout(() => {
//         setInputWidth(numberControl)
//       }, 0);
//     });

//     numberField.querySelector('.number-field__button--plus').addEventListener('click', () => {
//       setTimeout(() => {
//         setInputWidth(numberControl)
//       }, 0);
//     });

//     numberControl.addEventListener('input', () => {
//       setInputWidth(numberControl);
//     });

//     const numberFieldWrapper = numberField.closest('.goods-quantity') ? numberField.closest('.goods-quantity') : numberField.closest('form');

//     if (numberFieldWrapper) {
//       const radiobuttons = numberFieldWrapper.querySelectorAll('input[type="radio"]');

//       radiobuttons.forEach((radio) => {
//         radio.addEventListener('change', () => {
//           setInputWidth(numberControl);
//         })
//       })
//     }

//     setInputWidth(numberControl);
//   });
// }

/* ------------------------------------- */
