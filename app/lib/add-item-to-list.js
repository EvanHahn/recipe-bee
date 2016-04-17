var convert = require('convert-units')

module.exports = function (list, newItem) {
  var hasAddedItem = false

  var result = list.concat().map(function (item) {
    if (canCombine(item, newItem)) {
      hasAddedItem = true
      return combine(item, newItem)
    } else {
      return item
    }
  })

  if (!hasAddedItem) {
    result.push(newItem)
  }

  return result
}

function canCombine (a, b) {
  if (a.name !== b.name) { return false }

  if (a.unit === b.unit) {
    return true
  } else if ((a.unit == null) || (b.unit == null)) {
    return false
  } else {
    var unitsCompatibleWithA = convert().from(a.unit).possibilities()
    return unitsCompatibleWithA.indexOf(b.unit) !== -1
  }
}

function combine (a, b) {
  if (a.unit == null) {
    return {
      name: a.name,
      amount: a.amount + b.amount,
      unit: null
    }
  }

  var aAsB = convert(a.amount).from(a.unit).to(b.unit)
  var combinedAmount = convert(aAsB + b.amount).from(b.unit).toBest()

  return {
    name: a.name,
    amount: combinedAmount.val,
    unit: combinedAmount.unit
  }
}
