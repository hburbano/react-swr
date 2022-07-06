import { beforeEach, describe, it, expect } from 'vitest'
import { DeviceList } from './DeviceList'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import fetch from 'cross-fetch'

describe('DeviceList', () => {
  beforeEach(() => {
    render(
      <SWRConfig
        value={{
          provider: () => new Map(),
          fetcher: (url: string) => fetch(url).then((r) => r.json()),
        }}
      >
        <MemoryRouter>
          <DeviceList />
        </MemoryRouter>
      </SWRConfig>
    )
  })
  it('should render list and filters', async () => {
    expect(screen.getByText(/Device Type/i)).toBeDefined()
    expect(screen.getByText(/Sort By/i)).toBeDefined()
    expect(screen.getByText(/No Devices Available/i)).toBeDefined()
    expect(screen.getByTestId('device-list')).toBeDefined()
  })

  it('should render devices ', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('No Devices Available'))
    expect(screen.getByText(/WINDOWS_WORKSTATION/i)).toBeDefined()
  })
})
