let textArea = document.querySelector('textarea')
let formBlogs = document.querySelector('.form-blogs')
let titleInput = document.querySelector('.blog-title__input')
let infoTextArea = document.querySelector('.blog-info__textarea')
let blogsList = document.querySelector('.blogs-list')
let sortWord = document.querySelector('.sort-word')
let sortDate = document.querySelector('.sort-date')
let sortSearch = document.querySelector('#sort-search')
let newBlog = blogsList.querySelector('.new-blog')
let searchCLoseBtn = document.querySelector('.clear-search')
let charCounter = document.querySelector('.blog-info__char-counter')
let arrBlogs = []
let currFilter = ''
let symbolSearch = ''


// Добавление массива с элементами в локал сторэдж
if (localStorage.getItem('blogsList')) {
  arrBlogs = JSON.parse(localStorage.getItem('blogsList'))
  displayMessages()
}


  // Увеличение поля текст ареа
textArea.addEventListener('keyup', function () {  
  if (this.scrollTop > 0) {
    this.style.height = this.scrollHeight + 'px'
  }
})

// Счетчик оставшихся символов в textarea
textArea.addEventListener('input', function(){
  charCounter.textContent = textArea.value.length;
})


// функция отслеживания события добавления блогов на страницу
formBlogs.addEventListener('submit', function (e) {
  e.preventDefault()

  let blogsObj = {
    title: titleInput.value,
    info: infoTextArea.value,
    date: new Date().toLocaleString(),
    dateNow: Date.now(),
  }

  arrBlogs.push(blogsObj)

  localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
  titleInput.value = ''
  infoTextArea.value = ''
  displayMessages()
  deleteMessage()
})

  // функция для шаблона добавляемого объекта на страницу
function displayMessages() {
  let displayMessage = ''
  arrBlogs.forEach(function (item, i) {
    displayMessage += `
    <div class="new-blog" data-sort="${item.title}" data-sort-date="${item.dateNow}">
    <div class="new-blog-nav">
      <h5 class="new-blog__title">${item.title}</h5>
      <div class="cl-btn-4" id="${i}"></div>
    </div>
    <p class="new-blog__info">${item.info}</p>
    <p class="new-blog__date">${item.date}</p>
  </div>
    `
    blogsList.innerHTML = displayMessage
  })
}

// функция филтрации по алфавиту
const alphaFilter = (filter = currFilter) => {
  if (filter === 'downAlpha') {
    for (let i = 0; i < blogsList.children.length; i++) {
      for (let k = i; k < blogsList.children.length; k++) {
        if (
          blogsList.children[i].getAttribute('data-sort') >
          blogsList.children[k].getAttribute('data-sort')
        ) {
          replacedNode = blogsList.replaceChild(
            blogsList.children[k],
            blogsList.children[i]
          )
          insertAfter(replacedNode, blogsList.children[i])
        }
      }
    }
    currFilter = 'upAlpha'
  } else {
    for (let i = 0; i < blogsList.children.length; i++) {
      for (let k = i; k < blogsList.children.length; k++) {
        if (
          blogsList.children[i].getAttribute('data-sort') <
          blogsList.children[k].getAttribute('data-sort')
        ) {
          replacedNode = blogsList.replaceChild(
            blogsList.children[k],
            blogsList.children[i]
          )
          insertAfter(replacedNode, blogsList.children[i])
        }
      }
    }
    currFilter = 'downAlpha'
  }
}

// вызов сортировки по алфавиту
sortWord.addEventListener('click', function () {
  alphaFilter()
})

// функция перетасовки нод элементов в доме
function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
}

// функция филтрации по дате
const dateFilter = function (filter = currFilter) {
  if (filter === 'oldDate') {
    for (let i = 0; i < blogsList.children.length; i++) {
      for (let k = i; k < blogsList.children.length; k++) {
        if (
          +blogsList.children[i].getAttribute('data-sort-date') <
          +blogsList.children[k].getAttribute('data-sort-date')
        ) {
          replacedNode = blogsList.replaceChild(
            blogsList.children[k],
            blogsList.children[i]
          )
          insertAfter(replacedNode, blogsList.children[i])
        }
      }
    }
    currFilter = 'newDate'
  } else {
    for (let i = 0; i < blogsList.children.length; i++) {
      for (let k = i; k < blogsList.children.length; k++) {
        if (
          +blogsList.children[i].getAttribute('data-sort-date') >
          +blogsList.children[k].getAttribute('data-sort-date')
        ) {
          replacedNode = blogsList.replaceChild(
            blogsList.children[k],
            blogsList.children[i]
          )
          insertAfter(replacedNode, blogsList.children[i])
        }
      }
    }
    currFilter = 'oldDate'
  }
}

// вызов сортировки по дате по клику
sortDate.addEventListener('click', function () {
  dateFilter()
})

// функция удаления блогов с страницы
function deleteMessage() {
  arrBlogs.forEach.call(document.querySelectorAll('.cl-btn-4'), function (el) {
    el.addEventListener('click', function () {
      let par = this.parentNode.parentNode
      blogsList.removeChild(par)
      arrBlogs.splice(par, 1)
      localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
    })
  })
}

// функция сортировки блогов через строку поиска
const searchBlog = function () {
  let valueSearch = sortSearch.value.trim()
    symbolSearch = valueSearch

  let searchElem = document.querySelectorAll('.new-blog')

  if (symbolSearch != '') {
    symbolSearch = symbolSearch[0].toUpperCase() + symbolSearch.slice('1')
    searchElem.forEach(function (elem) {
      if (elem.innerText.search(symbolSearch) == -1) {
        elem.classList.add('hide')
      } else {
        elem.classList.remove('hide')
      }
    })
  } else {
    searchElem.forEach(function (elem) {
      elem.classList.remove('hide')
    })
  }
}


// вызов функции сортировки  по поиску при изменении поля инпут
sortSearch.addEventListener('input', function () {
  searchBlog()
})


// функция удаления из локал сторэдж сохраненного филтра поиска через инпут
searchCLoseBtn.addEventListener('click', function () {
  symbolSearch = ''
  sortSearch.value = ''
  searchBlog()
})

// функция кеширования результатов поиска и фильтрации перед перезагрузкой страницы
window.onbeforeunload = (e) => {
  localStorage.setItem('symbol', symbolSearch)
  localStorage.setItem('currentArray', JSON.stringify(arrBlogs))
  localStorage.setItem('filter', currFilter)
}

// функция выгрузки из кеша результатов кеширования по фильтрам и поиску
window.onload = () => {
  if (localStorage.getItem('currentArray')) {
    symbolSearch = localStorage.getItem('symbol')
    arrBlogs = JSON.parse(localStorage.getItem('currentArray'))
    currFilter = localStorage.getItem('filter')
    displayMessages()
    deleteMessage()
    if (currFilter.includes('Alpha')) {
      switch (currFilter) {
        case 'upAlpha':
          alphaFilter('upAlpha')
          break
        case 'downAlpha':
          alphaFilter('downAlpha')
        default:
          break
      }
      alphaFilter()
    }

    if (currFilter.includes('Date')) {
      switch (currFilter) {
        case 'newDate':
          dateFilter('newDate')
          break
        case 'oldDate':
          dateFilter('oldDate')
        default:
          break
      }
      dateFilter()
    }
    sortSearch.value = localStorage.getItem('symbol', symbolSearch);
    searchBlog()
  }
}
