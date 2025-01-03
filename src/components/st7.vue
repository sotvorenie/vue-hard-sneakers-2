<script setup>
import {onBlur} from "@/composables/useFormValidate.js";
import {onSubmit} from "@/composables/useFormValidate.js";
  /*const selectors = {
    form: '[data-js-form-questions]',
    fieldErrors: '[data-js-form-field-errors]'
  }

  const errorsList = {
    valueMissing: () => 'пожалуйста, заполните это поле',
    patternMismatch: ({ title }) => title || 'неверный формат',
    tooShort: ({ minLength }) => `минимум символов — ${minLength}`,
    tooLong: ({ maxLength }) => `максимум символов — ${maxLength}`,
  }

  function manageErrors(fieldControlElement, errorMessages) {
    const fieldErrorsElement = fieldControlElement.parentElement.querySelector(selectors.fieldErrors)

    fieldErrorsElement.innerHTML = errorMessages
        .map((message) => `<span class="field__error">${message}</span>`)
        .join('')
  }

  function validateField(fieldControlElement) {
    const errors = fieldControlElement.validity
    const errorMessages = []

    Object.entries(errorsList).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType]) {
        errorMessages.push(getErrorMessage(fieldControlElement))
      }
    })


    manageErrors(fieldControlElement, errorMessages)

    const isValid = errorMessages.length === 0

    fieldControlElement.ariaInvalid = !isValid

    return isValid
  }

  function onBlur(event) {
    const { target } = event
    const isFormField = target.closest(selectors.form)
    const isRequired = target.required

    if (isFormField && isRequired) {
      validateField(target)
    }
  }

  function onSubmit(event) {
    const isFormElement = event.target.matches(selectors.form)
    if (!isFormElement) {
      return
    }

    const requiredControlElements = [...event.target.elements].filter(({ required }) => required)
    let isFormValid = true
    let firstInvalidFieldControl = null

    requiredControlElements.forEach((element) => {
      const isFieldValid = validateField(element)

      if (!isFieldValid) {
        isFormValid = false

        if (!firstInvalidFieldControl) {
          firstInvalidFieldControl = element
        }
      }
    })

    if (!isFormValid) {
      event.preventDefault()
      firstInvalidFieldControl.focus()
    }
  }*/
</script>

<template>
  <section class="st-7">
    <div class="st-7__inner container">
      <form class="st-7__form"
            method="post"
            novalidate
            data-js-form
            @submit="onSubmit($event)"
      >
        <h2 class="st-7__title h2">Есть вопросы?</h2>
        <p class="st-7__text">Заполните форму и наш менеджер свяжется с вами</p>
        <div class="st-7__inputs">
          <label>
            <input type="text"
                   placeholder="Ваше имя"
                   aria-errormessage="name-errors"
                   minlength="3"
                   maxlength="10"
                   required
                   @blur="onBlur($event)"
            >
            <span class="field__error" id="name-errors" data-js-form-field-errors></span>
          </label>
          <label>
            <input type="tel"
                   placeholder="Номер телефона"
                   aria-errormessage="tel-number-errors"
                   minlength="11"
                   maxlength="11"
                   @blur="onBlur($event)"
                   required
            >
            <span class="field__error" id="tel-number-errors" data-js-form-field-errors></span>
          </label>
          <button class="st-7__btn button" type="submit">Отправить</button>
        </div>
      </form>
      <div class="st-7__gallery">
        <img src="../../public/images/gallery/InstagramText.png" height="56" width="157"/>
        <ul class="st-7__gallery-list">
          <li class="st-7__gallery-item image-container">
            <img src="../../public/images/gallery/1.jpg" loading="lazy"/>
          </li>
          <li class="st-7__gallery-item st-7__gallery-item--big image-container">
            <img src="../../public/images/gallery/2.jpg" loading="lazy"/>
          </li>
          <li class="st-7__gallery-item image-container">
            <img src="../../public/images/gallery/3.jpg" loading="lazy"/>
          </li>
          <li class="st-7__gallery-item image-container">
            <img src="../../public/images/gallery/4.jpg" loading="lazy"/>
          </li>
          <li class="st-7__gallery-item image-container">
            <img src="../../public/images/gallery/5.jpg" loading="lazy"/>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>