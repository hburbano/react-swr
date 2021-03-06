import classes from './components.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useDevice, updateDevice, createDevice } from './hooks'
import { useEffect, useState } from 'react'

const DeviceEditor = () => {
  const initialValues: Device = {
    system_name: '',
    hdd_capacity: '',
    type: 'WINDOWS_SERVER',
  }

  const navigate = useNavigate()
  const { deviceId } = useParams()
  const { device } = useDevice(deviceId)
  const [values, setValues] = useState<Device>({ ...initialValues, ...device })
  const [isValid, setIsValid] = useState(true)

  const handleChange = (name: keyof Device, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  useEffect(() => {
    if (deviceId) {
      setValues({ ...device } as Device)
    }
  }, [device, deviceId])

  const handleSubmit = () => {
    const checkInput = (Object.keys(values) as (keyof Device)[]).reduce((acc, key) => {
      return acc && values[key] !== ''
    }, true)
    setIsValid(checkInput)
    if (checkInput) {
      deviceId ? updateDevice(values) : createDevice(values)
      handleBack()
    }
  }

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/', { replace: true })
    }
  }

  return (
    <div>
      <h1>Device Editor</h1>
      <div className={classes.deviceEditor}>
        <label className={classes.deviceLabel}>
          <span>name</span>
          <input
            type="text"
            required={!isValid}
            value={values.system_name}
            onChange={(evn) => handleChange('system_name', evn.currentTarget.value)}
          />
        </label>

        <label className={classes.deviceLabel}>
          <span>type</span>
          <select
            name="type"
            onChange={(evn) => handleChange('type', evn.currentTarget.value)}
            value={values.type}
          >
            <option value="WINDOWS_SERVER">Windows Server</option>
            <option value="WINDOWS_WORKSTATION">Windows WorkStation</option>
            <option value="MAC">MAC</option>
          </select>
        </label>

        <label className={classes.deviceLabel}>
          <span>capacity</span>
          <input
            type="number"
            required={!isValid}
            value={values.hdd_capacity}
            onChange={(evn) => handleChange('hdd_capacity', evn.currentTarget.value)}
          />
        </label>
        <div className={classes.deviceEditorControls}>
          <span>{isValid ? '' : '* Please provided missing fields'}</span>
          <button onClick={handleBack}>Cancel</button>
          <button onClick={handleSubmit}>{deviceId ? 'Update' : 'Create'}</button>
        </div>
      </div>
    </div>
  )
}

export { DeviceEditor }
