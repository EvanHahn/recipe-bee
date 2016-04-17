'use strict'

const formatItem = require('../app/lib/format-item')
const assert = require('assert')

describe('formatItem', function () {
  it('formats a unitless item', function () {
    assert.equal('1 cake', formatItem({
      name: 'cake',
      amount: 1,
      unit: null
    }))

    assert.equal('1.5 cakes', formatItem({
      name: 'cake',
      amount: 1.5,
      unit: null
    }))

    assert.equal('2 cakes', formatItem({
      name: 'cake',
      amount: 2,
      unit: null
    }))
  })

  it('formats an item with units', function () {
    assert.equal('1 gallon of milk', formatItem({
      name: 'milk',
      amount: 1,
      unit: 'gal'
    }))

    assert.equal('2 gallons of milk', formatItem({
      name: 'milk',
      amount: 2,
      unit: 'gal'
    }))
  })
})
