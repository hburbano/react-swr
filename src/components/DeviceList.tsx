import { Device } from './Device'
import classes from './components.module.css'

interface DeviceListProps {
  devices: Device[]
  onDelete: Function
  onCreate: Function
  onUpdate: Function
}

const DeviceList = ({ devices, onDelete, onCreate, onUpdate }: DeviceListProps) => {
  return (
    <div className={classes.deviceList}>
      <h1>Device Manager</h1>
      <div className={classes.deviceListFilters}>
        <label>
          Device Type <input type="text"></input>
        </label>

        <label>
          Sort By <input type="text"></input>
        </label>
      </div>
      <ul data-testid="device-list">
        {devices.map((device) => (
          <Device
            key={device.system_name}
            {...device}
            handleDelete={onDelete}
            handleUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  )
}

export { DeviceList }
