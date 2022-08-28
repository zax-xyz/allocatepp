import { calendar_v3 as google } from '@googleapis/calendar';

export type CourseEvent = google.Schema$Event;

export type Course = string;

export type Timetable = Record<Course, CourseEvent[]>;

export type Tab = {id: number, timetable: Timetable};

export type Tabs = Tab[];
