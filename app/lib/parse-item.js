var convert = require('convert-units')
var pluralize = require('pluralize')

module.exports = function (str) {
  var result = {}

  var words = str.trim().toLowerCase().split(/\s+/g)

  if (!words.length || words[0] === '') {
    throw new Error('Please type something!')
  }

  if (isNumber(words[0])) {
    result.amount = parseFloat(words[0])
    words.shift()

    if (!words.length) {
      throw new Error('Please type more than just a number!')
    }
  } else {
    result.amount = isPlural(words[0]) ? 2 : 1
  }

  if (result.amount <= 0) {
    throw new Error('You must have a positive quantity.')
  }

  result.unit = parseUnit(words[0])
  if (result.unit) {
    var bestAmount = convert(result.amount).from(result.unit).toBest()
    result.amount = bestAmount.val
    result.unit = bestAmount.unit

    words.shift()
    if (words[0] === 'of') { words.shift() }
  }

  result.name = pluralize(words.join(' '), 1)

  if (!result.name) {
    throw new Error('Please add an item type.')
  }

  return result
}

function isNumber (str) {
  return !isNaN(parseFloat(str))
}

function isPlural (str) {
  return pluralize(str, 1) !== str
}

function parseUnit (str) {
  var result = null

  convert().list().forEach(function (unit) {
    var candidates = [unit.abbr.toLowerCase(), unit.singular.toLowerCase(), unit.plural.toLowerCase()]
    var isMatch = candidates.indexOf(str) !== -1
    if (isMatch) {
      result = unit.abbr
    }
  })

  return result
}
