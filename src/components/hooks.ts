import useSWR, { mutate } from 'swr'
import { useLocation } from 'react-router-dom'

//Will use .env on prod
const BASE_URL = 'http://localhost:3000'

const useDevices = () => {
  const { data, error } = useSWR<Device[]>(`${BASE_URL}/devices`)

  const onDelete = async (device_id: string) => {
    try {
      await fetch(`${BASE_URL}/devices/${device_id}`, {
        method: 'DELETE',
      })
      await mutate(`${BASE_URL}/devices`)
    } catch (err) {
      console.error(err)
    }
  }

  return { devices: data || [], error, isLoading: !data, onDelete }
}

const useDevice = (deviceId?: string) => {
  const { data, error } = useSWR<Device>(deviceId ? `${BASE_URL}/devices/${deviceId}` : null)

  const onCreate = async (device: Device) => {
    try {
      await fetch(`${BASE_URL}/devices`, {
        method: 'POST',
        body: JSON.stringify({ ...device }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await mutate(`${BASE_URL}/devices`)
    } catch (err) {
      console.error(err)
    }
  }

  const onUpdate = async (device: Device) => {
    try {
      await fetch(`${BASE_URL}/devices/${device.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...device }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await mutate([`${BASE_URL}/devices/`, device.id])
      await mutate(`${BASE_URL}/devices`)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    device: data || {},
    error,
    isLoading: !data,
    onUpdate,
    onCreate,
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

export { useDevice, useDevices, useQuery }
