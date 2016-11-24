import React from 'react'
import { IndexRoute, Route } from 'react-router'

import WordsApp from 'thedoc/components/WordsApp'
import WordList from 'thedoc/components/WordList'
import WordEntry from 'thedoc/components/WordEntry'
import NoMatch from 'thedoc/components/NoMatch'

export default (
  <Route path='/' component={WordsApp}>
    <IndexRoute component={WordList} />
    <Route path='word'>
      <Route path=':slug' component={WordEntry} />
    </Route>
    <Route path='*' component={NoMatch} />
  </Route>
)
