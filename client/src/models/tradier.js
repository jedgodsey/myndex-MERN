import axios from 'axios';

const key = 'ZPl1aY9QugUQqjaw33tpGu5v9iPZ'

class Tradier {
  static populate(chars) {
    console.log('here')
    let tickers = axios.get(`https://sandbox.tradier.com/v1/markets/search?q=${chars}&indexes=false`, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Accept': 'application/json'
        }
    })
    .then(response => response.data.securities.security.slice(0,10))
    .catch(error => console.log(error))
    return tickers;
  }

  static fill(tickers) {
    let test = axios.get(`https://sandbox.tradier.com/v1/markets/quotes?symbols=${tickers}&greeks=false`, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Accept': 'application/json'
        }
    })
    .then(response => response)
    .catch(error => console.log(error))
    return test;
  }

  static tradierHistory(ticker) {
    let history = axios.get(`https://sandbox.tradier.com/v1/markets/history?symbol=${ticker}`, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Accept': 'application/json'
        }
    })
    .then(response => response)
    .catch(error => console.log(error))
    return history;
  }
}

export default Tradier;
