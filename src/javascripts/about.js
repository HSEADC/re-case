var doItems = document.querySelectorAll('.doItem')

doItems.forEach(function (item) {
  item.querySelector('.doTitle').addEventListener('click', function () {
    var isOpen = item.classList.contains('open')

    doItems.forEach(function (other) {
      other.classList.remove('open')
    })

    if (!isOpen) {
      item.classList.add('open')
    }
  })
})
