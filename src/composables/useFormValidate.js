const selectors = {
    form: '[data-js-form]',
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

    const requiredControlElements = [...event.target.elements].filter(({required}) => required)
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
    } else return true;
}

export {onBlur, onSubmit}