import { connect } from 'react-redux'
import Disks from '../components/Disks'
import * as Actions from '../actions/diskAction'

const mapStateToProps = state => ({
  disks: state.server.disk
})

const mapDispatchProps = dispatch => ({
  getDisks: () => {
    dispatch(Actions.getDisks())
  },
  saveDisk: (data) => {
    return new Promise((resolve, reject) => {
       dispatch(Actions.saveDisk(data, resolve, reject))
    })
  },
  deleteDisk(id) {
    return new Promise((resolve, reject) => {
      dispatch(Actions.deleteDisk(id, resolve, reject))
    })
  },
  getEntity: (id) => {
    return new Promise((resolve, reject) => {
      dispatch(Actions.getEntity(id, resolve, reject))
    })
  },
  updateDisk: (disk) => {
    return new Promise((resolve, reject) => {
      dispatch(Actions.updateDisk(disk, resolve, reject))
    })
  }
})

export default connect(mapStateToProps, mapDispatchProps)(Disks)
