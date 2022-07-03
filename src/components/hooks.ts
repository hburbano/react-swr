import useSWR from 'swr'

//Will use .env on prod
const BASE_URL = 'http://localhost:3000'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const useDevices = () => {
  const { data, error, mutate } = useSWR(`${BASE_URL}/devices`, fetcher)

  const onCreate = async (device: Device) => {
    try {
      await fetch(`${BASE_URL}/devices`, {
        method: 'POST',
        body: JSON.stringify({ ...device }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await mutate()
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
      await mutate()
    } catch (err) {
      console.error(err)
    }
  }

  const onDelete = async (device_id: string) => {
    try {
      await fetch(`${BASE_URL}/devices/${device_id}`, {
        method: 'DELETE',
      })
      await mutate()
    } catch (err) {
      console.error(err)
    }
  }

  return { devices: data || [], error, isLoading: !data, onCreate, onUpdate, onDelete }
}

export { useDevices }
