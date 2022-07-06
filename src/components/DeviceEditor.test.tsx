import { beforeEach, describe, it, expect } from 'vitest'
import { DeviceEditor } from './DeviceEditor'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import { SWRConfig } from 'swr'
import fetch from 'cross-fetch'
import { createMemoryHistory } from 'history'

describe('DeviceEditor', () => {
  beforeEach(() => {
    const history = createMemoryHistory()
    const route = '/whatever-the-route-is'
    history.push(route)

    render(
      <SWRConfig
        value={{
          provider: () => new Map(),
          fetcher: (url: string) => fetch(url).then((r) => r.json()),
        }}
      >
        <MemoryRouter>
          <DeviceEditor />
        </MemoryRouter>
      </SWRConfig>
    )
  })

  it('should render list and filters', async () => {
    expect(screen.getByText(/Device Editor/i)).toBeDefined()
    expect(screen.getByText(/Name/i)).toBeDefined()
    expect(screen.getByText(/Capacity/i)).toBeDefined()
  })
})
