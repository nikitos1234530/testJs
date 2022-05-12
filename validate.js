let form = document.querySelector('.form-inputs')
let firstName = document.querySelector('#firstname')
let firstNameSpan = document.querySelector('.input-firstname')
let lastName = document.getElementById('lastname')
let lastNameSpan = document.querySelector('.input-lastname')
let inputEmail = form.querySelector('.js-input-email')
let inputEmailSpan = document.querySelector('.input-email')
let inputDate = form.querySelector('.js-input-date')
let inputDateSpan = document.querySelector('.input-date')
let btn = document.querySelector('#btn-submit-form')

//функция проверки валидации форм, опирается на паттерн
let validate = function (inputs, span) {
  form.addEventListener('change', function (e) {
    e.preventDefault()

    if (!inputs.validity.valid) {
      span.style.display = 'block'
      if (!inputDate.validity.valid) {
        inputDateSpan.style.display = 'block'
      }
    }

    inputs.addEventListener('change', function (e) {
      if ('block' === span.style.display) {
        inputs.className = ''
        span.style.display = 'none'
      }
    })
  })
}

//функция отправки формы
form.addEventListener('submit', function (e) {
  // e.preventDefault()
  console.log('suppa')
})

//функция валидации даты
function validateDate(input, span) {
  input.addEventListener('change', function (e) {
    e.preventDefault()
    let nowDate = e.target.value
    const arr = nowDate.split('.')
    arr.splice(0, 2, arr[1] - 1, arr[0])
    let valueDate = new Date(arr[2], arr[0], arr[1])
    let today = new Date()
    if (+valueDate - +today < 0) {
      // Проверяем, корректность введенной даты.
      span.style.display = 'block'
      btn.setAttribute('disabled', true)
    } else if (
      arr[0] > 12 ||
      arr[1] > 31 ||
      +arr[2] > today.getFullYear() + 1
    ) {
      span.style.display = 'block'
      btn.setAttribute('disabled', true)
    } else {
      span.style.display = 'none'
      btn.removeAttribute('disabled', false)
    }
  })
}
validate(firstName, firstNameSpan)
validate(lastName, lastNameSpan)
validate(inputEmail, inputEmailSpan)
validateDate(inputDate, inputDateSpan)
