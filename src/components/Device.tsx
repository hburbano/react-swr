import classes from './components.module.css'

type DeviceProps = Device & {
  handleDelete: Function
  handleUpdate: Function
}

const Device = ({
  id,
  system_name,
  type,
  hdd_capacity,
  handleDelete,
  handleUpdate,
}: DeviceProps) => {
  return (
    <li className={classes.device}>
      <div className={classes.deviceInfo}>
        <div>{system_name}</div>
        <div>{type}</div>
        <div>{hdd_capacity}</div>
      </div>
      <div className={classes.devuceControls}>
        <button onClick={() => handleUpdate(id)}>Update</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </li>
  )
}

export { Device }
