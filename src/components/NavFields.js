import React, { Component, PropTypes as pt } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class NavFields extends Component {
  static propTypes = {
    defaultUsername: pt.string,
    defaultListId: pt.number,
    push: pt.func.isRequired,
  }

  static defaultProps = {
    defaultUsername: null,
    defaultListId: null,
  }

  constructor (props) {
    super(props)
    this.state = {
      name: props.defaultUsername || '',
      list: (props.defaultListId || '').toString(),
    }

    this.handleChange = this.handleChange.bind(this)
    this.navigate = this.navigate.bind(this)
  }

  handleChange (ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    })
  }

  navigate () {
    const {name, list} = this.state
    console.log('nav to', `/table/${list}/${name}`)
    this.props.push(`/table/${list}/${name}`)
  }

  render () {
    const {name, list} = this.state

    return (
      <div>
        <label>Username</label>
        <input name='name' value={name} onChange={this.handleChange} />
        <label>Geeklist ID</label>
        <input name='list' value={list} onChange={this.handleChange} />
        <button onClick={this.navigate}>Go</button>
      </div>
    )
  }
}
export default connect(
  (state, ownProps) => ownProps,
  dispatch => bindActionCreators({push}, dispatch),
)(NavFields)