import React from 'react'
import pt from 'prop-types'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form.js'
import 'semantic-ui-css/components/form.css'
import moment from 'moment'
import { autobind } from 'core-decorators'

const DATE_FORMAT = 'YYYY-MM-DD'

export default class NavFields extends React.Component {
  static propTypes = {
    defaultUsername: pt.string,
    defaultListId: pt.number,
    defaultStartDate: pt.instanceOf(moment),
    defaultEndDate: pt.instanceOf(moment),
  }

  constructor (props) {
    super(props)

    const startDate = props.defaultStartDate
    const endDate = props.defaultEndDate

    this.state = {
      name: props.defaultUsername || '',
      list: (props.defaultListId || '').toString(),
      startDate: startDate ? startDate.format(DATE_FORMAT) : '',
      endDate: endDate ? endDate.format(DATE_FORMAT) : '',
    }
  }

  @autobind
  handleChange (ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    })
  }

  @autobind
  navigate (ev) {
    ev.preventDefault()
    const {name, list, startDate, endDate} = this.state
    const onGithub = window.location.hostname.indexOf('github.io') !== -1
    let newUrl = `/${list}/${name}/table?startDate=${startDate}&endDate=${endDate}`
    if (onGithub) {
      newUrl = '/tenbyten' + newUrl
    }
    window.location = newUrl
  }

  render () {
    const {name, list, startDate, endDate} = this.state

    return (
      <div>
        <Form size='mini' onSubmit={this.navigate}>
          <Form.Group inline>
            <Form.Input label='Username' name='name' value={name} onChange={this.handleChange} />
            <Form.Input label='Geeklist ID' name='list' value={list} onChange={this.handleChange} />
            <Form.Input label='Start Date' name='startDate' value={startDate} onChange={this.handleChange} />
            <Form.Input label='End Date' name='endDate' value={endDate} onChange={this.handleChange} />
            <Form.Button type='submit' size='mini'>Go</Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
