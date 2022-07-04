import { beforeEach, describe, it, expect } from 'vitest'
import { DeviceList } from './DeviceList'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('DeviceList', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <DeviceList />
      </BrowserRouter>
    )
  })
  it('should render list and filters', () => {
    expect(screen.getByText(/Device Type/i)).toBeDefined()
    expect(screen.getByText(/Sort By/i)).toBeDefined()
    expect(screen.getByTestId('device-list')).toBeDefined()
  })
})
