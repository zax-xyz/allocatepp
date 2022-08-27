import { calendar_v3 as google } from '@googleapis/calendar';

export type CourseEvent = google.Schema$Event;

export type Course = string;

export type TimeTable = Record<Course, CourseEvent[]>;
