import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import baseHTML from './index.html'
import routes from './routes'
import configureStore from './store/configure-store.prod'
import InternalServerError from './views/internal-server-error'

const port = process.env.PORT || 3000

const store = configureStore()
const app = express()

const getStatus = (err, props) => {
  if (err) {
    return 500
  }

  if (props) {
    return 200
  }

  return 404
}

// Ideally, you'd have a proxy server (like nginx) serving /static files
app.use('/static', express.static('dist'))

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (redirect && !err) {
      res.redirect(redirect.pathname + redirect.search)
    } else {
      try {
        const appHtml = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>,
        )
        return res.status(getStatus(err, props)).send(baseHTML(appHtml))
      } catch(e) {
        console.warn('render error:\n', e, '\n\n')
        const appHtml = renderToString(
          <Provider store={store}>
            <InternalServerError />
          </Provider>,
        )
        return res.status(500).send(baseHTML(appHtml))
      }
    }
  })
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.info('[Production] App is running on port', port)
})
