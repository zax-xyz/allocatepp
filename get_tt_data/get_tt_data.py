import datetime
import json
import pytz
import re
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

uos_table_url = 'https://www.sydney.edu.au/handbooks/engineering/advanced_computing/advanced_computing_table.shtml'
r = requests.get(uos_table_url)
soup = BeautifulSoup(r.text, 'html.parser')

course_name_pattern = re.compile(r'[A-Z]{4}\d{4}')
courses = [
    b.contents[0].split()[0] for b in
    soup.select('.tabledata_blue > tbody:nth-child(2) > tr > td > strong')
    if course_name_pattern.match(b.contents[0]) is not None
]

ss = 'REDACTED'
cookie = 'REDACTED'
cookies = {k: v for k, v in (c.split('=', 1) for c in cookie.split('; '))}

SID = 1  # YOUR SID
BASE_URL = f'https://timetable.sydney.edu.au/even/rest/student/{SID}/electivesearch'

def request(url):
    url = f'{BASE_URL}/{url}/?ss={ss}'
    return requests.get(url, cookies=cookies)

course_codes = set()

for i, course in enumerate(courses):
    r = request(course).json()
    course_codes |= set(r.keys())
    print(f'step 1 progress: {(i+1) / len(courses) * 100:.2f}%')

with open('course_codes.json', 'w') as f:
    json.dump(list(course_codes), f)

# with open('course_codes.json') as f:
#     course_codes = json.load(f)

events = []
for i, course in enumerate(course_codes):
    times = request(f'{course}/activities').json()
    for name, activity in times.items():
        if not activity['locations'][0]['id']:
            activity['locations'][0]['activityDays'] = activity['activitiesDays']

        for location in activity['locations']:
            for date in location['activityDays']:
                day, month, year = map(int, date.split('/'))
                hour, minute = map(int, activity['start_time'].split(':'))
                start_datetime = pytz.timezone('Australia/Sydney').localize(datetime.datetime(year, month, day, hour, minute))

                event = {
                    "kind": "calendar#event",
                    "id": name,
                    "summary": f"{activity['subject_code'].split('-')[0]} {activity['activity_group_code']} {activity['activity_code']}",
                    "description": activity["description"],
                    'location': activity["location"],
                    'start': {
                        'dateTime': start_datetime.isoformat(),
                    },
                    "end": {
                        "dateTime": (start_datetime + datetime.timedelta(minutes=int(activity['duration']))).isoformat(),
                    },
                    "eventType": 'default',
                }
                events.append(event)

    print(f'step 2 progress: {(i+1) / len(course_codes) * 100:.2f}%')

with open('data2.json', 'w') as f:
    json.dump(events, f)

# with open('data2.json') as f:
#     events = json.load(f)

client = MongoClient('mongodb+srv://csesoc:syncs@cluster0.3ih5idr.mongodb.net/?retryWrites=true&w=majority')
db = client.courses
for i, event in enumerate(events):
    db[event['summary'].split()[0]].insert_one(event)
    print(f'inserting progress: {(i+1) / len(events) * 100:.2f}%')

