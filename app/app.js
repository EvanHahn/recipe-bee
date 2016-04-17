/* globals localStorage */

var parseItem = require('./lib/parse-item')
var addItemToList = require('./lib/add-item-to-list')
var renderItem = require('./render-item')
var formatItem = require('./lib/format-item')
var nodeIndex = require('./lib/node-index')
var $ = require('./lib/query-selector')

var global = window

module.exports = function () {
  global.items = loadItems()

  var $addItemInput = $('#add-item-input')
  var $addItemError = $('#add-item-error')
  var $itemList = $('#item-list')
  var $export = $('#export')

  function render () {
    var $newContent = document.createDocumentFragment()
    global.items.forEach(function (item) {
      $newContent.appendChild(renderItem(item))
    })
    $itemList.innerHTML = ''
    $itemList.appendChild($newContent)

    $export.value = global.items.map(formatItem).join('\n')
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

    global.items = addItemToList(global.items, item)

    render()
    $addItemError.setAttribute('hidden', true)
    $addItemInput.value = ''

    saveItems()
  })

  var clickActions = {
    edit: function (event) {
      var $li = event.target.parentNode.parentNode
      var text = $li.querySelector('.app__item-list__item__text').innerText

      global.items.splice(nodeIndex($li), 1)
      render()

      $addItemInput.value = text
      $addItemInput.focus()
    },
    delete: function (event) {
      var $li = event.target.parentNode
      var text = $li.querySelector('.app__item-list__item__text').innerText

      if (!global.confirm('Remove ' + text + '?')) { return }

      global.items.splice(nodeIndex(event.target.parentNode), 1)
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
}

function loadItems () {
  var localStorageItems = localStorage.getItem('items')
  return localStorageItems ? JSON.parse(localStorageItems) : []
}

function saveItems () {
  localStorage.setItem('items', JSON.stringify(global.items))
}
