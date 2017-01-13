import ReactDOM from 'react-dom'

import { createApp } from 'tenbyten/app.js'

if (window.location.hash.indexOf('#/') === 0) {
  console.log('Redirecting hash URL to HTML5 URL', window.location, window.location.hash)
  let newLocation = window.location.hash.slice(1)
  const onGithub = window.location.hostname.indexOf('github.io') !== -1
  if (onGithub) {
    newLocation = '/tenbyten' + newLocation
  }
  window.location = newLocation
}

// Initialize the control app and render it.
const app = createApp()

let container = document.querySelector('#container')
ReactDOM.render(app.rootComponent, container)
