import classes from './components.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useDevice } from './hooks'
import { useEffect, useState } from 'react'

interface DeviceEditorProps {
  update?: boolean
}

const DeviceEditor = ({ update }: DeviceEditorProps) => {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const { device, onUpdate, onCreate } = useDevice(deviceId)
  const [values, setValues] = useState<Device>({ ...device })

  const handleChange = (name: keyof Device, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  useEffect(() => {
    if (deviceId) {
      setValues({ ...device })
    }
  }, [device, deviceId])

  return (
    <div className={classes.deviceList}>
      <h1>Device Editor</h1>
      <div className={classes.deviceListFilters}>
        <label>
          name
          <input
            type="text"
            value={values.system_name || ''}
            onChange={(evn) => handleChange('system_name', evn.currentTarget.value)}
          />
        </label>

        <label>
          type
          <input
            type="text"
            value={values.type || ''}
            onChange={(evn) => handleChange('type', evn.currentTarget.value)}
          />
        </label>

        <label>
          capacity
          <input
            type="number"
            value={values.hdd_capacity || ''}
            onChange={(evn) => handleChange('hdd_capacity', evn.currentTarget.value)}
          />
        </label>
        <button
          onClick={() => {
            navigate('/')
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            deviceId ? onUpdate(values) : onCreate(values)
            navigate('/')
          }}
        >
          {deviceId ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  )
}

export { DeviceEditor }
