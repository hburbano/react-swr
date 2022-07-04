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
    deviceA[sortBy].localeCompare(deviceB[sortBy])
  )
  const filteredDevices = sortedDevices.filter((device) =>
    filterBy === 'ALL' ? true : device.type === filterBy
  )

  return (
    <div className={classes.deviceList}>
      <h1>Device Manager</h1>
      <div className={classes.deviceListFilters}>
        <label>
          Device Type
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

        <label>
          Sort By
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
      <ul data-testid="device-list">
        {filteredDevices.map((device: Device) => (
          <Device key={device.system_name} {...device} handleDelete={onDelete} />
        ))}
      </ul>

      <div>
        <Link to={'/devices/create'}>Create</Link>
      </div>
    </div>
  )
}

export { DeviceList }
