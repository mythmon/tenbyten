import ReactDOM from 'react-dom'

import { createApp } from 'tenbyten/app.js'

if (window.location.hash.indexOf('#/') === 0) {
  console.log('Redirecting hash URL to HTML5 URL', window.location, window.location.hash)
  window.location = window.location.hash.slice(1)
}

// Initialize the control app and render it.
const app = createApp()

document.onload = () => {
  let container = document.querySelector('#container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container)
  }

  ReactDOM.render(app.rootComponent, container)
}
