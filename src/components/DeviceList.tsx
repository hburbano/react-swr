import { Device } from './Device'
import classes from './components.module.css'
import { useDevices } from './hooks'
import { Link } from 'react-router-dom'
import { useState } from 'react'

type SortOptions = 'system_name' | 'type' | 'hdd_capacity'
type FilterOptions = 'ALL' | 'WINDOWS_SERVER' | 'WINDOWS_WORKSTATION' | 'MAC'

const DeviceList = () => {
  const { devices, onDelete } = useDevices()
  const [sortBy, setSortBy] = useState<SortOptions>('system_name')
  const [filterBy, setFilterBy] = useState<FilterOptions>('ALL')

  const sortedDevices = devices.sort((deviceA, deviceB) =>
    deviceA[sortBy].localeCompare(deviceB[sortBy], undefined, {
      numeric: sortBy === 'hdd_capacity',
    })
  )
  const filteredDevices = sortedDevices.filter((device) =>
    filterBy === 'ALL' ? true : device.type === filterBy
  )

  return (
    <div className={classes.deviceList}>
      <h1>Device Manager</h1>

      <div className={classes.deviceListFilters}>
        <label className={classes.deviceFilter}>
          <span>Device Type</span>
          <select
            name="type"
            onChange={(ev) => {
              setFilterBy(ev.currentTarget.value as FilterOptions)
            }}
            value={filterBy}
          >
            <option value="ALL">All</option>
            <option value="WINDOWS_SERVER">Windows Server</option>
            <option value="WINDOWS_WORKSTATION">Windows WorkStation</option>
            <option value="MAC">MAC</option>
          </select>
        </label>

        <label className={classes.deviceFilter}>
          <span>Sort By</span>
          <select
            name="sort"
            onChange={(ev) => {
              setSortBy(ev.currentTarget.value as SortOptions)
            }}
            value={sortBy}
          >
            <option value="system_name">System Name</option>
            <option value="type">Type</option>
            <option value="hdd_capacity">HDD Capacity</option>
          </select>
        </label>
      </div>

      <ul className={classes.deviceList} data-testid="device-list">
        <li className={classes.device}>
          <div className={classes.deviceInfo}>
            <span>System Name</span>
            <span>Type</span>
            <span>HDD Capacity</span>
          </div>
        </li>
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device: Device) => (
            <Device key={device.system_name} {...device} handleDelete={onDelete} />
          ))
        ) : (
          <span className={classes.noDevices}>No Devices Available</span>
        )}
      </ul>

      <div className={classes.deviceNavigate}>
        <Link to={'/devices/create'}>
          <button>Create Device</button>
        </Link>
      </div>
    </div>
  )
}

export { DeviceList }
