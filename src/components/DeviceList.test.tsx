import { beforeEach, describe, it, expect } from 'vitest'
import { DeviceList } from './DeviceList'
import { render, screen } from '@testing-library/react'

describe('DeviceList', () => {
  beforeEach(() => {
    render(
      <DeviceList
        devices={[
          { id: '1', system_name: 'dev-1', type: 'mac', hdd_capacity: 15 },
          { id: '2', system_name: 'dev-2', type: 'mac', hdd_capacity: 15 },
        ]}
        onDelete={() => {}}
        onUpdate={() => {}}
        onCreate={() => {}}
      />
    )
  })
  it('should render list and filters', () => {
    expect(screen.getByText(/Device Type/i)).toBeDefined()
    expect(screen.getByText(/Sort By/i)).toBeDefined()
    expect(screen.getByTestId('device-list')).toBeDefined()
  })
})
