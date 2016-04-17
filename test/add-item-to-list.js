'use strict'

const addItem = require('../app/lib/add-item-to-list')
const assert = require('assert')

describe('addItemToList', function () {
  beforeEach(function () {
    this.egg = {
      amount: 1,
      unit: null,
      name: 'egg'
    }

    this.gallonOfMilk = {
      amount: 1,
      unit: 'gal',
      name: 'milk'
    }

    this.quartOfMilk = {
      amount: 1,
      unit: 'qt',
      name: 'milk'
    }
  })

  it('adds an egg to an empty list', function () {
    const result = addItem([], this.egg)
    assert.equal(result.length, 1)
    assert.equal(result[0], this.egg)
  })

  it('adds two eggs to an empty list', function () {
    let result = addItem([], this.egg)
    result = addItem(result, this.egg)

    assert.deepEqual(result, [{
      amount: 2,
      unit: null,
      name: 'egg'
    }])
  })

  it('adds one egg and one gallon of milk to an empty list', function () {
    let result = addItem([], this.egg)
    result = addItem(result, this.gallonOfMilk)

    assert.equal(result.length, 2)
    assert.notEqual(result.indexOf(this.egg), -1)
    assert.notEqual(result.indexOf(this.gallonOfMilk), -1)
  })

  it('adds one gallon and one quart of milk to an empty list', function () {
    let result = addItem([], this.gallonOfMilk)
    result = addItem(result, this.quartOfMilk)

    assert.deepEqual(result, [{
      amount: 1.25,
      unit: 'gal',
      name: 'milk'
    }])
  })
})
