import urllib.parse
import urllib.request
import json
import datetime

url = "http://api.peterportal.org/rest/v0/grades/calculated"
header={'Content-Type': 'application/json',"x-api-key" : 'Zotistics-48e7d5db47d3bf0ebfef45fe0aea7b3df77d0c77b243ee4bc9b780df6c9dd91f'}

print("Making request to PPAPI...")
req = urllib.request.Request(url, headers=header)
a = datetime.datetime.now()
response = urllib.request.urlopen(req)
b = datetime.datetime.now()

print(f"Got response, Time Elapsed: {b-a}")
def uniqueInstructors(data):
    return list(set([d["instructor"] for d in data]))

a = datetime.datetime.now()
instructors = {"instructors": uniqueInstructors(json.loads(response.read())["courseList"])}
print(f"Got {len(instructors)} instructors, dumping to file")
with open('instructors.json', 'w') as outfile:
    json.dump(instructors, outfile)
b = datetime.datetime.now()
print(f"Done, Time Elapsed: {b-a}")