// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import nock from 'nock'
import { setupApp } from './setup.tsx'

beforeAll(() => {
  nock.disableNetConnect() // Prevents real network requests during the tests
})

const fakeEvent = {
  id: 1,
  day: 'friday',
  time: '2pm - 3pm',
  name: 'Slushie Apocalypse I',
  description:
    'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
  locationId: 1,
}

const fakeLocations = {
  locations: [
    {
      id: 1,
      name: 'Kayak Room',
      description: 'This is the room we keep kayaks in',
    },
  ],
}

describe('Event Edit Page', () => {
  describe('When the event is loaded', () => {
    it('shows current data on the form', async () => {
      const eventScope = nock('http://localhost')
        .get('/api/v1/events/1')
        .reply(200, fakeEvent)

      const locationScope = nock('http://localhost')
        .get('/api/v1/locations')
        .reply(200, fakeLocations)

      const { ...screen } = setupApp(`/events/1/edit`)

      const nameInput = await screen.findByLabelText('Event name')
      const descriptionInput = await screen.findByLabelText('Description')

      expect(nameInput).toBeVisible()
      expect(nameInput).toHaveValue('Slushie Apocalypse I')
      expect(descriptionInput).toBeInTheDocument()
      expect(descriptionInput).toHaveValue(
        'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
      )

      expect(eventScope.isDone()).toBe(true)
      expect(locationScope.isDone()).toBe(true)
    })
  })

  describe('When the delete button is clicked', () => {
    it('sends a delete request to remove the event', async () => {
      const getScope = nock('http://localhost')
        .get('/api/v1/events/1')
        .reply(200, fakeEvent)
      console.log('getScopelog:', getScope)

      const deleteScope = nock('http://localhost')
        .delete('/api/v1/events/1')
        .reply(204)
      console.log('deleteScope log:', deleteScope)

      const { user, ...screen } = setupApp(`/events/1/edit`)

      const deleteButton = await screen.findByLabelText('Delete event')
      expect(deleteButton).toBeVisible()

      await user.click(deleteButton)

      expect(deleteScope.isDone()).toBe(true)
    })
  })
})
