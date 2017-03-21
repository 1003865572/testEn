import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class welCome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: 'aa11ss'
    }
    this.click = this.click.bind(this)
  }
  click() {
    browserHistory.push('disk')
  }
  render() {
    const { val } = this.state
    return (
      <div>
        welCome
        <br />
        <input type="text" defaultValue={val} />
        <br />
        <button onClick={(e) => this.click(e)} type="button">
          disk
        </button>
      </div>
    )
  }
}

export default welCome
