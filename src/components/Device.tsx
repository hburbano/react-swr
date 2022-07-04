import classes from './components.module.css'
import { Link } from 'react-router-dom'

type DeviceProps = Device & {
  handleDelete: Function
}

const Device = ({ id, system_name, type, hdd_capacity, handleDelete }: DeviceProps) => {
  return (
    <li className={classes.device}>
      <div className={classes.deviceInfo}>
        <span>{system_name}</span>
        <span>{type}</span>
        <span>{hdd_capacity}</span>
      </div>
      <div className={classes.deviceControls}>
        <Link to={`/devices/${id}`}>
          <button>Update</button>
        </Link>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </li>
  )
}

export { Device }
