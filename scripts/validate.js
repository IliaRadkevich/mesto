function submitForm (event) {
  event.preventDefault();
};

function showError(input, error, {inputErrorClass, errorClass}) {
  input.classList.add(inputErrorClass);
  error.classList.add(errorClass);
  error.textContent = input.validationMessage;
};

function hideError(input, error, {inputErrorClass, errorClass}) {
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
};

function deactivateSubmitButton (button, {inactiveButtonClass}) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', '');
};

function toggleButton(form, {submitButtonSelector, inactiveButtonClass}) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = form.checkValidity();
  if(isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    deactivateSubmitButton(button, {inactiveButtonClass});
  }
};

function vadlidateInput (form, input, classes) {
  const error = form.querySelector(`#error-${input.name}`);
  if (input.validity.valid) {
    hideError(input, error, classes);
  } else {
    showError(input, error, classes);
  }
  toggleButton(form, classes);
};

function enableValidation ({formSelector, inputSelector, ...rest}) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach( form => {
    form.addEventListener('submit', submitForm);
    const inputs = form.querySelectorAll(inputSelector);
    inputs.forEach( input => {
      input.addEventListener('input', () => {
        vadlidateInput(form, input, rest);
      });
    });
    toggleButton(form, rest);
  });
};

const configs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input-invalid',
  errorClass: '.popup__input-error',
  inactiveButtonClass: 'popup__save_disabled',
  submitButtonSelector: '.popup__save'
};

enableValidation(configs);
