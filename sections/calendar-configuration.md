# Group Calendar Configuration
To add available time slots to calendar you need to complete all the steps up to this point. Adding them is a matter of calling endpoint with PUT method. It works to both add or replace slots for a specific date range. 

> **NOTICE!** You can only add slots up to 12 weeks ahead. You your request won't fit in, you'll receive an error.

Here's the endpoint you need to call:
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/slots
```

Request body should contain following parameters:
- start 
- end
- address_service_id
- duration

and should be structured as follows:
```json
{
    "slots": [
        {
            "address_services": [
                {
                    "address_service_id": 12345,
                    "duration": 30
                }
            ],
            "end": "2018-11-10T15:00:00+0200",
            "start": "2018-11-10T07:00:00+0200"
        },
        {
            "address_services": [
                {
                    "address_service_id": 67890,
                    "duration": 20
                },
                {
                    "address_service_id": 45678,
                    "duration": 60
                }
            ],
            "end": "2018-11-14T19:00:00+0200",
            "start": "2018-11-14T16:00:00+0200"
        }
    ]
}
```

Let's analyse given sample. By setting `start` and `end` parameters you specify the time range when the slots should appear as available for bookings - in given example, we're notifying the application that on November 10th doctor is available for online booking between 7:00 and 15:00 and he accepts patients only for address_service_id = 12345. The daily schedule will be divided into 30 mins slots (thanks to `duration` parameter).

On November 14th however, the doctor is up to bookings between 16:00 and 19:00 and he is able to service both address_service_id = 67890 - he needs 20 minutes for each patient (again -  duration) and address_service_id = 45678 - he needs 60 minutes for each patient.  Docplanner/Doctoralia application will divide the whole schedule into 20 minutes slots (using greatest common divisor to calculate most optimal schedule). If patient will book 60-mins service, we'll simply hide 3 such time slots. 

It's important to understand, that specific `address_service_id` attached to slots accordingly determines what services will be available for booking. In Docplanner/Doctoralia interface, on the first step of booking, we allow user to choose service from dropdown.  Below you'll find an example of time slot with 6 address_services attached. 

<img src="../../images/calendar-configuration1.png" width="100%">

## Break during the day?

What if there's need of creating a break during the day?

There's a method such usecase. We call it calendar_breaks. You can use it for any purpose. Adding calendar break results with hiding any available slots in specific address. It can be achieved by calling our endpoint using POST method.

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/breaks
```

Body needs to contain following parameters:
- since - start of the break
- till - end of the break

```json
{
  "since": "2018-11-10T13:00:00+0200",
  "till": "2018-11-10T14:00:00+0200"
}
```

Once break is created, several operations can be performed:

- **GET** list of calendar breaks - narrowed down by `since` and `till` parameters
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/breaks{?since,till}
```
- **GET** specific calendar break
- **DELETE** specific calendar break

both to the same endpoint:
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/breaks/{break_id}
```
