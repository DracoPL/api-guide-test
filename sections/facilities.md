# Group Facilities

Once we'll grant you access to API Client you'll be able to perform several operations on all related objects. The most extensive one is a Facility (or clinic if you prefer).  There's no limit of facilities among one API client - thanks to one set of Client Credentials you can access one facility, few facilities or a facility chain. The distinctive value which allows to identify a facility is facility_id. Each object (as one presented on image below) will have it's unique ID. 

<img src="../../images/facilities1.png" width="100%">

## How to get list of facilities?
No rocket science here - all you need to do is call proper endpoint:
```http request
https://www.{domain}/api/v3/integration/facilities
```

In response you'll get a list of IDs and Names of all the facilities linked to you API Client.