import { Device } from './Device'
import classes from './components.module.css'
import { useDevices, useQuery, deleteDevice } from './hooks'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

type SortOptions = 'system_name' | 'type' | 'hdd_capacity'
type FilterOptions = 'ALL' | 'WINDOWS_SERVER' | 'WINDOWS_WORKSTATION' | 'MAC'
type PageParams = { sortBy: SortOptions; filterBy: FilterOptions }

const DeviceList = () => {
  const query = useQuery()
  const { devices } = useDevices()
  const navigate = useNavigate()
  const [params, setParams] = useState<PageParams>({
    sortBy: 'system_name',
    filterBy: 'ALL',
    ...query,
  })

  const handleParams = (newParams: PageParams) => {
    setParams(newParams)
    const urlParams = new URLSearchParams(newParams)
    const qs = `?${urlParams.toString()}`
    navigate(`/${qs}`)
  }

  const sortedDevices = devices?.sort((deviceA, deviceB) => {
    return deviceA[params.sortBy].localeCompare(deviceB[params.sortBy], undefined, {
      numeric: params.sortBy === 'hdd_capacity',
    })
  })

  const filteredDevices = sortedDevices.filter((device) =>
    params.filterBy === 'ALL' ? true : device.type === params.filterBy
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
              handleParams({ ...params, filterBy: ev.currentTarget.value as FilterOptions })
            }}
            value={params.filterBy}
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
              handleParams({ ...params, sortBy: ev.currentTarget.value as SortOptions })
            }}
            value={params.sortBy}
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
          filteredDevices.map((device: Device, idx) => (
            <Device key={`${device.system_name}-${idx}`} {...device} handleDelete={deleteDevice} />
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
