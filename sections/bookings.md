# Group Bookings
## Facility Perspective

There are few ways of booking a slot (or notifying Docplanner application about slot occupancy).  

**1**. First one, described in API Documentation as <a href="http://docplanner.github.io/integrations-api-docs/master/#slots-book-a-slot-post" target="_blank">Book a slot</a> allows to use endpoint:
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/slots/{start}/book
```

with patient data in request body:
```json
{
  "address_service_id": 123,
  "is_returning": false,
  "patient": {
    "name": "Docplanner",
    "surname": "Patient",
    "email": "example@example.com",
    "phone": "+48123123123",
    "birth_date": "1985-01-01",
    "nin": "894237492",
    "gender": "m"
  }
}
```

however due to privacy reasons, it's recommended to use standard, fake patient data for each booking added.

**2**. Another **recommended** method of removing slot from doctor's schedule is regenerating the calendar configuration, without the occupied slot. Let's analyse the usecase:

Polish doctor (doctor_id = 9876) working in facility (facility_id = 456) with address (address_id = 789) is available for online bookings on November 16th between 10:00 and 11:00. He has only one address_service with id = 123. A patient in a clinic books a 10 minutes slot between 10:30 and 10:40. Only required operation is replacing configuration for specific day. So the operation should be proceeded as follows:

- **PUT** slots operation to endpoint:
```http
www.znanylekarz.pl/api/v3/integration/facilities/456/doctors/9876/addresses/789/slots
```

with body:
```json
{
"slots": [
	{
		"address_services": [
			{
				"address_service_id": 123,
				"duration": 10
			}
		],
		"end": "2018-11-16T10:30:00+0200",
		"start": "2018-11-16T10:00:00+0200"
	},
	{
		"address_services": [
			{
				"address_service_id": 123,
				"duration": 10
			}
		],
		"end": "2018-11-16T11:00:00+0200",
		"start": "2018-11-16T10:40:00+0200"
	}
]}

```

The call will result with replacing calendar configuration for the specific date without already taken slot. 

**3**) Last option to handle bookings is using already described method - Calendar Breaks. Instead of regenerating the schedule, 3rd Party can PUT new calendar break instead.

## User perspective

The flow from Docplanner/Doctoralia perspective is rather simple. In the booking flow thanks to the form user is submitting all information required to complete the process in 2 simple steps. At the end asynchronously slot-booked notification is dispatched either to PULL notifications queue or is being PUSHed to given endpoint. 

> **NOTICE!** Notification informing about booking is being sent only once. If the attempt to call 3rd party endpoint fails (didn't get 2XX status code in response) - booking is automatically cancelled.

In `slot-booked` request, we're provided very broad range of information. Below you'll find a sample of the body:
```json
{
"name": "slot-booked",
"data": {
"facility": {
    "id": "226402",
    "name": "Test Hospital",
    "_links": {
        "self": {
            "href": "/api/v3/integration/facilities/226402",
            "method": "get"
        },
        "doctors": {
            "href": "/api/v3/integration/facilities/226402/doctors",
            "method": "get"
        }
    }
},
"doctor": {
    "id": "161262",
    "name": "John",
    "surname": "Average",
    "_links": {
        "self": {
            "href": "/api/v3/integration/facilities/226402/doctors/161262",
            "method": "get"
        },
        "addresses": {
            "href": "/api/v3/integration/facilities/226402/doctors/161262/addresses",
            "method": "get"
        }
    }
},
"address": {
    "id": "410150",
    "name": "Test Hospital",
    "street": "Obrzezna",
    "_links": {
        "self": {
            "href": "/api/v3/integration/facilities/226402/doctors/161262/addresses/410150",
            "method": "get"
        },
        "facility": {
            "href": "/api/v3/integration/facilities/226402",
            "method": "get"
        },
        "doctor": {
            "href": "/api/v3/integration/facilities/226402/doctors/161262",
            "method": "get"
        }
    }
},
"visit_booking": {
    "id": "6263715",
    "status": "booked",
    "start_at": "2018-11-18T16:00:00+01:00",
    "end_at": "2018-11-18T16:30:00+01:00",
    "duration": "30",
    "booked_by": "user", // or "doctor" or "integration"
    "canceled_by": "",
    "booked_at": "2018-11-14T14:38:19+02:00",
    "address_service": {
        "id": "243665",
        "name": "USG",
        "price": 50,
        "is_price_from": false
    },
    "patient": {
        "name": "Abraham",
        "surname": "Lincoln",
        "email": "example@example.com",
        "phone": "+48123123123",
        "birth_date": "1985-01-01",
        "nin": "894237492",
        "gender": "m" // or "f"
    },
    "comment": "Additional information about the visit"
}
},
"created_at": "2018-11-14T14:38:32+02:00"
}
```

Apart from the obvious data, already analysed in previous paragraphs (Facility, Doctor, Address), you'll receive:
+ Detailed booking data - especially visit_booking_id is crucial, since it's needed to modify the booking in case of such need
+ Detailed patient data

Once you have `visit_booking_id` there are two operations possible - using endpoint:
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/bookings/{booking_id}
```

You can either perform **DELETE** operation which end up with cancellation or **POST** in order to update (or move) visit. Body should contain start parameter indicating new time of visit start and address_service_id
```json
{
  "address_service_id": 12345,
  "start": "2018-11-26T16:00:00+01:00"
}
```

> **NOTICE!** All the callbacks are described in details in our API documentation. The section can be found <a href="http://docplanner.github.io/integrations-api-docs/master/#api-notification-callbacks" target="_blank">here</a>
