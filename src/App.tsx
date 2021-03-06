import './App.css'
import { SWRConfig } from 'swr'
import { Routes, Route } from 'react-router-dom'
import { DeviceList, DeviceEditor, useDevices } from './components'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function App() {
  return (
    <div className="App">
      <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
        <Routes>
          <Route index element={<DeviceList />} />
          <Route path="/devices/:deviceId" element={<DeviceEditor />} />
          <Route path="/devices/create" element={<DeviceEditor />} />
          <Route path="*" element={<DeviceList />} />
        </Routes>
      </SWRConfig>
    </div>
  )
}

export default App
