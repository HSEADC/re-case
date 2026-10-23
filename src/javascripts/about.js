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

var members = document.querySelectorAll('.member')

var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  },
  { threshold: 0.6 }
)

members.forEach(function (member) {
  observer.observe(member)
})
