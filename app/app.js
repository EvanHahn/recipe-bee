var parseItem = require('./lib/parse-item')
var addItemToList = require('./lib/add-item-to-list')
var $ = require('./lib/query-selector')

var items = []

var $addItemInput = $('#add-item-input')
var $itemList = $('#item-list')

function render () {
  var $newContent = document.createDocumentFragment()

  items.forEach(function (item) {
    var $li = document.createElement('li')
    $li.innerHTML = [item.amount, item.unit, item.name].join(' ')
    $newContent.appendChild($li)
  })

  $itemList.innerHTML = ''
  $itemList.appendChild($newContent)
}

$('#add-item').addEventListener('submit', function (event) {
  event.preventDefault()

  var item
  try {
    item = parseItem($addItemInput.value)
  } catch (err) {
    // TODO: show this on screen
    console.error(err)
    return
  }

  items = addItemToList(items, item)

  render()

  $addItemInput.value = ''
})
