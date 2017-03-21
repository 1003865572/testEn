import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class Disks extends Component {
  constructor(props) {
    super(props)
    this.state={
      aa: 123,
      firstName: '11',
      lastName: '22',
      updateId: null,
      updateFirstName: '',
      updateLastName: ''
    }
    this.getDisks = this.getDisks.bind(this)
    this.saveDisk = this.saveDisk.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.deleteDisk = this.deleteDisk.bind(this)
    this.update = this.update.bind(this)
  }

  getDisks() {
    const { getDisks } = this.props
    getDisks()
  }
  componentDidMount() {
    const { getDisks } = this.props
    getDisks()
  }
  saveDisk() {
    const { firstName, lastName } = this.state
    const { saveDisk, getDisks } = this.props
    saveDisk({
      firstName, lastName
    }).then(() => {
      console.info('执行完毕')
      getDisks()
      console.info('查询完毕')
    })
  }

  deleteDisk(id) {
    const { deleteDisk, getDisks } = this.props
    deleteDisk(id).then(() => {
      getDisks()
    })
  }

  inputChange(e, key) {
    let o = {}
    o[key] = e.target.value
    this.setState(o)
  }

  update(id) {
    const { updateId, updateFirstName, updateLastName } = this.state
    const { getEntity, updateDisk, getDisks } = this.props
    /**
      1、改变状态
      2、getDisk
      3、写入
      4、updateDisk
      5、成功后状态改回
    */
    // 修改
    if (updateId !== id) {
      this.setState({ updateId: id })
      getEntity(id).then((data) => {
        this.setState({
          updateFirstName: data.firstName,
          updateLastName: data.lastName
        })
      })
    } else {
      //保存
      let result = {
        id,
        firstName: updateFirstName,
        lastName: updateLastName
      }
      updateDisk(result).then(() => {
        getDisks()
      })
      this.setState({ updateId: null })
    }
  }

  render() {
    const { disks } = this.props
    const { aa, firstName, lastName, updateId, updateFirstName, updateLastName } = this.state
    return (
      <div>
        <Table striped bordered condensed hover  >
          <thead>
            <tr>
              <th>{aa}</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  value={firstName}
                  onChange={ e => this.inputChange(e, 'firstName') }
                  placeholder="输入..."
                />
              </td>
              <td>
                <input
                  type="text"
                  value={lastName}
                  onChange={ e => this.inputChange(e, 'lastName') }
                  placeholder="输入..."
                />
              </td>
              <td>
                <button type="button" onClick={() => this.saveDisk()} >添加</button>&emsp;
                <button type="button" onClick={() => this.getDisks()} > 查询 </button>
              </td>
            </tr>
            {
              disks.ids.map((item, i) => {
                return (
                  <tr key={i} >
                    <td>{disks.entities[item].id}</td>

                    <td>
                      {
                        updateId === disks.entities[item].id ? (
                          <input
                            type="text"
                            value={updateFirstName}
                            onChange={ e => this.inputChange(e, 'updateFirstName') }
                            placeholder="输入..."
                          />
                        ) : (
                          disks.entities[item].firstName
                        )
                      }
                    </td>
                    <td>
                    {
                      updateId === disks.entities[item].id ? (
                        <input
                          type="text"
                          value={updateLastName}
                          onChange={ e => this.inputChange(e, 'updateLastName') }
                          placeholder="输入..."
                        />
                      ) : (
                        disks.entities[item].lastName
                      )
                    }
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => this.deleteDisk(disks.entities[item].id) }
                      >
                        删除
                      </button>&emsp;
                      <button
                        type="button"
                        onClick={() => this.update(disks.entities[item].id)}
                      >
                        {updateId === disks.entities[item].id ? '保存' : '修改'}
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Disks
