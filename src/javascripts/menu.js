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
