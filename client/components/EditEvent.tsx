import { useNavigate, useParams } from 'react-router-dom'
import { EventData } from '../../models/Event'
import EditEventForm from './EditEventForm'
import LineupNav from './LineupNav'

import { useDeleteEvent, useEditEvent, useEventData } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

export default function EditEvent() {
  const params = useParams()
  const id = Number(params.id)
  const event = useEventData(id)
  const editEvent = useEditEvent(id)
  const deleteEvent = useDeleteEvent(id)
  const navigate = useNavigate()

  const handleSubmit = async (formData: EventData) => {
    try {
      await editEvent.mutateAsync({ id, ...formData })
      navigate('/schedule/friday')
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const handleDelete = async (evt: React.FormEvent) => {
    evt.preventDefault()
    try {
      await deleteEvent.mutateAsync()

      navigate('/')
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  if (event.isPending) {
    return <LoadingIndicator />
  }

  if (event.isError || !event.data) {
    return 'Failed to load event data'
  }

  return (
    <>
      <LineupNav />
      <h2>
        edit event: <span className="data">{event.data.name}</span>
      </h2>
      <EditEventForm
        {...event.data}
        submitLabel="Update event"
        onSubmit={handleSubmit}
        aria-labelledby="edit-event-heading"
      />
      <form onSubmit={handleDelete} className="form">
        <div />
        <button className="delete" aria-label="Delete event">
          Delete event
        </button>
      </form>
    </>
  )
}
