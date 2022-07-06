import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const devices = [
  {
    id: 'e8okoP2l5',
    system_name: 'DESKTOP-SMART',
    type: 'WINDOWS_WORKSTATION',
    hdd_capacity: '10',
  },
  {
    id: 'Th3ngERn9',
    system_name: 'MAC-LEADER',
    type: 'MAC',
    hdd_capacity: '2048',
  },
  {
    id: 'Q1JdBnE12',
    system_name: 'ARMANDO-SERVER',
    type: 'WINDOWS_SERVER',
    hdd_capacity: '256',
  },
]

export const restHandlers = [
  rest.get("http://localhost:3000/devices", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(devices))
  }),
  rest.get("http://localhost:3000/devices/5", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(devices))
  }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

//  Close server after all tests
afterAll(() => server.close())
