import React, { Component, PropTypes as pt } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form.js'
import 'semantic-ui-css/components/form.css'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

class NavFields extends Component {
  static propTypes = {
    defaultUsername: pt.string,
    defaultListId: pt.number,
    defaultStartDate: pt.instanceOf(moment),
    defaultEndDate: pt.instanceOf(moment),
  }

  constructor (props) {
    super(props)

    const startDate = props.defaultStartDate || moment().startOf('year')
    const endDate = props.defaultEndDate || moment().endOf('year')

    this.state = {
      name: props.defaultUsername || '',
      list: (props.defaultListId || '').toString(),
      startDate: startDate.format(DATE_FORMAT),
      endDate: endDate.format(DATE_FORMAT),
    }

    this.handleChange = this.handleChange.bind(this)
    this.navigate = this.navigate.bind(this)
  }

  handleChange (ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    })
  }

  navigate (ev) {
    ev.preventDefault()
    const {name, list, startDate, endDate} = this.state
    window.location = `/table/${list}/${name}?startDate=${startDate}&endDate=${endDate}`
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
export default connect(
  (state, ownProps) => ownProps,
)(NavFields)
