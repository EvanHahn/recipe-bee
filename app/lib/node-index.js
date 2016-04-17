module.exports = function (el) {
  var children = el.parentNode.children

  for (var i = 0; i < children.length; i++) {
    if (children[i] === el) { return i }
  }

  return null
}
