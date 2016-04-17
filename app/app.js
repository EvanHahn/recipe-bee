var parseItem = require('./lib/parse-item')
var addItemToList = require('./lib/add-item-to-list')
var renderItem = require('./render-item')
var nodeIndex = require('./lib/node-index')
var $ = require('./lib/query-selector')

var localStorageItems = localStorage.getItem('items')
var items = localStorageItems ? JSON.parse(localStorageItems) : []

function saveItems () {
  localStorage.setItem('items', JSON.stringify(items))
}

var $addItemInput = $('#add-item-input')
var $addItemError = $('#add-item-error')
var $itemList = $('#item-list')

function render () {
  var $newContent = document.createDocumentFragment()

  items.forEach(function (item) {
    $newContent.appendChild(renderItem(item))
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
    $addItemError.innerText = err.message
    $addItemError.removeAttribute('hidden')
    return
  }

  items = addItemToList(items, item)

  render()
  $addItemError.setAttribute('hidden', true)
  $addItemInput.value = ''

  saveItems()
})

var clickActions = {
  edit: function (event) {
    var $li = event.target.parentNode.parentNode

    items.splice(nodeIndex($li), 1)
    render()

    $addItemInput.value = $li.querySelector('.app__item-list__item__text').innerText
    $addItemInput.focus()
  },
  delete: function (event) {
    items.splice(nodeIndex(event.target.parentNode), 1)
    render()
    saveItems()
  }
}

$('#item-list').addEventListener('click', function (event) {
  var action = event.target.dataset.action
  if (clickActions.hasOwnProperty(action)) {
    event.preventDefault()
    clickActions[action](event)
  }
})

render()
