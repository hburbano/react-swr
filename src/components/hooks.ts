import useSWR, { mutate } from 'swr'
import { useLocation } from 'react-router-dom'

//Will use .env on prod
const BASE_URL = 'http://localhost:3000'

const deleteDevice = async (device_id: string) => {
  try {
    fetch(`${BASE_URL}/devices/${device_id}`, {
      method: 'DELETE',
    })
    await mutate(
      `${BASE_URL}/devices`,
      async (devices: Device[]) => {
        const filteredDevices = devices.filter((device) => device.id !== device_id)
        return [...filteredDevices]
      },
      { revalidate: false }
    )
  } catch (err) {
    console.error(err)
  }
}

const createDevice = async (device: Device) => {
  try {
    fetch(`${BASE_URL}/devices`, {
      method: 'POST',
      body: JSON.stringify({ ...device }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await mutate(
      `${BASE_URL}/devices`,
      (devices: Device[]) => {
        return [...(devices || []), device]
      },
      {
        // We do revalidate in order to be able to edit or delete based on the device id
        revalidate: true,
      }
    )
  } catch (err) {
    console.error(err)
  }
}

const updateDevice = async (device: Device) => {
  try {
    const options = { optimisticData: device, rollbackOnError: true, revalidate: false }
    fetch(`${BASE_URL}/devices/${device.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...device }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await mutate(`${BASE_URL}/devices/${device.id}`, options)
    await mutate(
      `${BASE_URL}/devices`,
      (devices: Device[]) => {
        const filteredDevices = devices.filter((dev) => dev.id !== device.id)
        return [...(filteredDevices || []), device]
      },
      { revalidate: false }
    )
  } catch (err) {
    console.error(err)
  }
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const qs = new URLSearchParams(useLocation().search)
  return urlSearchToObject(qs)
}

const urlSearchToObject = (params: Record<string, any>) =>
  [...params.entries()].reduce((acc, tuple) => {
    const [key, val] = tuple
    acc[key] = val
    return acc
  }, {})

const useDevices = () => {
  const { data, error } = useSWR<Device[]>(`${BASE_URL}/devices`, null, { revalidateIfStale: true })
  return { devices: data || [], error, isLoading: !data }
}

const useDevice = (deviceId?: string) => {
  const { data, error } = useSWR<Device>(deviceId ? `${BASE_URL}/devices/${deviceId}` : null)

  return {
    device: data || {},
    error,
    isLoading: !data,
  }
}

export { useDevice, useDevices, useQuery, deleteDevice, createDevice, updateDevice }
