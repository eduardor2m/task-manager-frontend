import { NextResponse } from 'next/server'
import { tasks } from '../database/tasks'

export async function GET() {
  return NextResponse.json(tasks)
}
