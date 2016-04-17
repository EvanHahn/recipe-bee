var formatItem = require('./lib/format-item')
var crel = require('crel')

var CLASS = 'app__item-list__item'

module.exports = function (item) {
  return crel('li', { class: CLASS },
    crel('span', { class: CLASS + '__text' }, formatItem(item)),
    crel('a', { class: CLASS + '__edit', href: '#' },
      crel('img', { src: 'pencil.svg', 'data-action': 'edit' })
    ),
    crel('a', { class: CLASS + '__delete', href: '#', 'data-action': 'delete' }, '×')
  )
}
