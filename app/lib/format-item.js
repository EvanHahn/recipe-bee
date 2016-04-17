var convert = require('convert-units')
var pluralize = require('pluralize')

module.exports = function (item) {
  if (item.unit) {
    var unitInfo = convert().describe(item.unit)
    var unit
    if (item.amount === 1) {
      unit = unitInfo.singular
    } else {
      unit = unitInfo.plural
    }

    return [
      item.amount,
      unit.toLowerCase(),
      'of',
      item.name
    ].join(' ')
  } else {
    return pluralize(item.name, item.amount, true)
  }
}
