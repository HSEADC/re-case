var questionsMenu = document.querySelector('.questionsMenu')
var questionLinks = document.querySelectorAll('.questionLink')
var questions = document.querySelectorAll('.qa')

function setActive(index) {
  questionLinks.forEach(function (link, i) {
    link.classList.toggle('active', i === index)
  })

  var link = questionLinks[index]
  var menuTop = questionsMenu.scrollTop
  var menuBottom = menuTop + questionsMenu.clientHeight

  if (
    link.offsetTop < menuTop ||
    link.offsetTop + link.offsetHeight > menuBottom
  ) {
    questionsMenu.scrollTo({
      top: link.offsetTop - questionsMenu.clientHeight / 3,
      behavior: 'smooth'
    })
  }
}

function findCurrent() {
  var current = 0
  questions.forEach(function (question, i) {
    if (question.getBoundingClientRect().top < window.innerHeight / 3) {
      current = i
    }
  })
  return current
}

var activeIndex = -1

function update() {
  var current = findCurrent()
  if (current !== activeIndex) {
    activeIndex = current
    setActive(current)
  }
}

window.addEventListener('scroll', update)

update()

questionLinks.forEach(function (link, i) {
  link.addEventListener('click', function (event) {
    event.preventDefault()
    questions[i].scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', link.getAttribute('href'))
  })
})

var toTop = document.querySelector('.toTop')

toTop.addEventListener('click', function (event) {
  event.preventDefault()
  document.querySelector('#interview').scrollIntoView({ behavior: 'smooth' })
})
