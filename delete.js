const app = require('express')()

const cors = require('cors')
app,use(cors())

// const jwt = require('jsonwebtoken')
// const jwksClient = require('jwks-rsa')

const { OAuth2Client } = require('google-auth-library')

const CLIENT_ID = ''

const googleClient = new OAuth2Client({ clientId: CLIENT_ID})

app.post('/login', async (req, res) => {
  console.log(req.body)

  const { provider, response } = req.body

  const {idToken } = response

  const res = await verifyGoogleLogin(idToken)
  if (!res) {
    console.error('failed login with google')
  }
  console.log('google signin successful')

  res.json({ status: 'okay'})
})

function verifyGoogleLogin(token) {
  googleClient.verifyIdToken({
    audience: CLIENT_ID,
    idtoken: token
  })

  const payload = ticket.getPayload()

  if (payload) {
    return payload
  }
  return null
}

app.listen(12321, () => {
  console.log('sever ready')
})



// serverAuthCode?
