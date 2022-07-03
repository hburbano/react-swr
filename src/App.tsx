import './App.css'
import { DeviceList, useDevices } from './components'

function App() {
  const deviceHooks = useDevices()

  return (
    <div className="App">
      <header className="App-header"></header>
      <DeviceList {...deviceHooks} />
    </div>
  )
}

export default App
