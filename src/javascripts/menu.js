var dropdown = document.querySelector('.dropdown')
var dropdownToggle = document.querySelector('.dropdownToggle')

dropdownToggle.addEventListener('click', function () {
  dropdown.classList.toggle('open')
})

document.addEventListener('click', function (event) {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open')
  }
})

var burger = document.querySelector('.burger')

if (burger) {
  burger.addEventListener('click', function () {
    document.body.classList.toggle('menuOpen')
    window.scrollTo(0, 0)
  })
}
