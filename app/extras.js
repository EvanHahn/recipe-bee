var $ = require('./lib/query-selector')

var forEach = [].forEach

module.exports = function () {
  var $extrasContainer = $('#extras')
  var $extras = $extrasContainer.querySelectorAll('.extras__extra')

  forEach.call($extras, function ($extra) {
    $('a[href="' + $extra.dataset.link + '"]').addEventListener('click', function (event) {
      event.preventDefault()
      var shouldShow = $extra.getAttribute('hidden')
      hideAll()
      if (shouldShow) { show($extra) }
    })
  })

  hideAll()

  function hideAll () {
    show($extrasContainer)
    forEach.call($extras, function ($extra) {
      hide($extra)
    })
  }
}

function show (el) {
  el.removeAttribute('hidden')
}

function hide (el) {
  el.setAttribute('hidden', true)
}
