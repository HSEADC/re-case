console.log('index')
var typed = document.querySelector('.typed')
var typedWord = document.querySelector('.typedWord')
var words = typed.dataset.words.split(',').map(function (word) {
  return word.trim()
})

var hold = 1300
var typeSpeed = 80
var eraseSpeed = 45
var index = 0

function nextWord() {
  index = (index + 1) % words.length
  return words[index]
}

function erase() {
  typed.classList.add('typing')
  var text = typedWord.textContent
  if (text.length > 0) {
    typedWord.textContent = text.slice(0, -1)
    setTimeout(erase, eraseSpeed)
  } else {
    type(nextWord(), 0)
  }
}

function type(word, i) {
  typedWord.textContent = word.slice(0, i)
  if (i < word.length) {
    setTimeout(function () {
      type(word, i + 1)
    }, typeSpeed)
  } else {
    typed.classList.remove('typing')
    setTimeout(erase, hold)
  }
}

setTimeout(erase, hold)
