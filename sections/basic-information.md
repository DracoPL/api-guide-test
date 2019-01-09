# Group Basic Information

## General Assumptions
Integration between Docplanner services and third-party software is meant to enable synchronization between systems in the key areas:

- Availability of free slots presented by doctor or medical facility to online booking,
- Patient's booking flow

Integration is based on calls to REST API endpoints. The only currently supported format is JSON. Each call has to contain header:
```
Content-Type: application/json; charset=utf-8
```

Integration can be handled by PUSH (with events sent to desired 3rd party endpoint) and PULL notification queues. 

The most basic object, which is available via API is API Client. 3rd party can access it, by authorizing using Client Credentials. Exact method of authorization was described in details in API Documentation and in further section.  Access to API client is required to take any further steps towards creating new integration. 

Each call will always be based on basic structure:
```http 
https://www.{domain}/api/v3/integration/{resource}
```

So for example for our polish domain, every call will start with:
```http
https://www.znanylekarz.pl/api/v3/integration/{resource}
```

What is very crucial, while approaching to create a new integration is the order of calls. There are 2 distinctive actions each 3rd party needs to take while configuring new profile:

- Adding services to doctor's profile (described in Services section)
- Adding configuration of schedule - possible only after adding services (described in Calendar Configuration section)

Each call to complete given first two steps needs to be taken is proper order.  But to start any more complicated logically actions, you need to have (and store!) most basic data, required to call Docplanner API - Facility (representing clinic profile), Doctor (list of all doctors in a facility/ facilities) and Addresses.

Below you'll find a simple explanation of particular stages with an illustration describing the logics:
1. Get Facilities - required to get list of available via API Client clinics. The specific IDs will be used to all the other calls - they need to be mapped and stored in 3rd party database 
1. Get Doctors - returns list of all the doctors available via API and connected to facilities from step no 1. The specific IDs will be used to all the other calls - they need to be mapped and stored in 3rd party database
1. Get Addresses - returns list of all the addresses of doctors in specific facilities. The specific IDs will be used to all the other calls - they need to be mapped and stored in 3rd party database.

_Already started to get tricky? Addresses are explained with real-life examples in section Addresses below_

Structure of each further call needs to be based of the 3  IDs mentioned above. If you already have those, below you'll find a step-by-step guide, with our recommended order (it's not the don't treat it as the only source of truth, but once you'll be completing the integration make sure each of elements is covered). Structure of given calls with detailed parameters explained can be found in sections below as well as our API Documentation.

## Recommended order of calls
1. Request for token 
1. GET Facilities
1. GET Doctors
1. GET Addresses
1. GET Item Service List
1. PUT Address Service
1. PUT Slots
1. POST/PUT/DELETE Slots (Booking Actions)
1. (optional) POST/DELETE Patient Presence
