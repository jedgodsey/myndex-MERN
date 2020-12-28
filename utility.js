const divideString = (cookieString) => {
  return cookieString.match(/G_AUTHUSER_H=\d*/).toString()
}

module.exports = {
  divideString
}
