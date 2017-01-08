import ReactDOM from 'react-dom'

import { createApp } from 'tenbyten/app.js'

if (window.location.hash.indexOf('#/') === 0) {
  const pathname = window.location.hash.slice(1)
  window.location = pathname
}

// Initialize the control app and render it.
const app = createApp()

let container = document.querySelector('#container')
if (!container) {
  container = document.createElement('div')
  container.id = 'container'
  document.body.appendChild(container)
}

ReactDOM.render(app.rootComponent, container)
