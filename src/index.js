import ReactDOM from 'react-dom'

import { createApp } from 'thedoc/app.js'

// Initialize the control app and render it.
const app = createApp()

let container = document.querySelector('#container')
if (!container) {
  container = document.createElement('div')
  container.id = 'container'
  container.classList.add('wrapper')
  document.body.appendChild(container)
}

ReactDOM.render(app.rootComponent, container)
