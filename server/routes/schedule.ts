import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/schedule/:day
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const events = await db.getEventsByDay(day)

    res.json({ day, events })
  } catch (error) {
    console.error('Error fetching locations by day:', error)
    next(error)
  }
})

export default router
