const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;
const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
const MONGO_URL = `
  mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@royaltsp.trbef.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority
`

//common middlewares
app.use(cors())

app.get('/', (req, res, next) => {
  return next(new Error('Hello'))
  res.send('Welcome to Express App');
})

app.use((error, req, res, next) => {
  // const statusCode = error.statusCode || 404;
  res.json({
    status: 'error',
    error: error.toString(),
    errorMessage: error.message
  })
})

async function connectToMongoDB(retries = 3) {
  return new Promise((resolve) => {
    if (!retries) {
      resolve(false);
    }

    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, err => {
      if (err) {
        console.log('Error with MongoDB Connection', err)
        console.log('Retrying to connect')
        return connectToMongoDB(--retries);
      }

      resolve(true)
    })
  })
}

// connectToMongoDB(2)
//   .then(res => {
//     if (res) {
//       app.listen(PORT, err => {
//         if (err) return console.log(`Error: `, err);
//         console.log(`App is listening on PORT ${PORT}`);
//       })
//     } else {
//       console.log('Unable to connect to Database... Please restart')
//     }
//   })
//   .catch(err => {
//     console.log('Error with MongoDB Connection', err)
//   })

app.listen(PORT, err => {
  if (err) return console.log(`Error: `, err);
  console.log(`App is listening on PORT ${PORT}`);
})