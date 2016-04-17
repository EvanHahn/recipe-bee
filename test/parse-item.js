'use strict'

const parse = require('../app/lib/parse-item')
const assert = require('assert')

describe('parseItem', function () {
  it('parses input with no amount or unit', function () {
    assert.deepEqual(parse('guacamole'), {
      name: 'guacamole',
      amount: 1,
      unit: null
    })

    assert.deepEqual(parse('eggs'), {
      name: 'egg',
      amount: 2,
      unit: null
    })

    assert.deepEqual(parse('Cream of Wheat'), {
      name: 'cream of wheat',
      amount: 1,
      unit: null
    })
  })

  it('parses input with an amount but no unit', function () {
    assert.deepEqual(parse('1 egg'), {
      name: 'egg',
      amount: 1,
      unit: null
    })

    assert.deepEqual(parse('1 eggs'), {
      name: 'egg',
      amount: 1,
      unit: null
    })

    assert.deepEqual(parse('6 carrots'), {
      name: 'carrot',
      amount: 6,
      unit: null
    })
  })

  it('parses input with a unit but no amount', function () {
    assert.deepEqual(parse('gal milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('gallon milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('gal of milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('gallon of milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('gallons of milk'), {
      name: 'milk',
      amount: 2,
      unit: 'gal'
    })
  })

  it('parses input with a unit and an amount', function () {
    assert.deepEqual(parse('1 gal milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('1 gal of milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('1 gallon milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('1 gallon of milk'), {
      name: 'milk',
      amount: 1,
      unit: 'gal'
    })

    assert.deepEqual(parse('2 quarts of milk'), {
      name: 'milk',
      amount: 2,
      unit: 'qt'
    })

    assert.deepEqual(parse('1.5 gallons of milk'), {
      name: 'milk',
      amount: 1.5,
      unit: 'gal'
    })

    assert.deepEqual(parse('6 quarts of milk'), {
      name: 'milk',
      amount: 1.5,
      unit: 'gal'
    })
  })

  it('throws errors for weird stuff', function () {
    function p (str) {
      return function () { parse(str) }
    }

    assert.throws(p(''))
    assert.throws(p(' '))
    assert.throws(p('6'))
    assert.throws(p('qt'))
    assert.throws(p('gallon'))
  })
})
