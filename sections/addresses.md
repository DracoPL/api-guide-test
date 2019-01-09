# Group Addresses

Address is a specific parameter which allows us to identify particular **doctor** in a specific **facility**, one can say that address parameter is a combination of doctor and facility object. One doctor can have multiple addresses but each will have unique **address_id**.  Since we're already using **doctor_id** and **facililty_id** parameter - what's the purpose of additional value used for the requests? Here's the explanation:

Let's investigate a case of Test Hospital - there are 2 branches of the hospital in 2 separate locations (as on image below)

<img src="images/addresses1.png" width="100%">

Both of them have use the same **facility_id**. In order to identify which location you're referring to we need **address_id** parameter. 

So if there's a situation where doctor has 2 addresses in the same facility (showed below), **address_id** becomes unique identifier.

<img src="images/addresses2.png" width="100%">

Address is a doctor-specific attribute, so in order to get list of doctor's addresses you need to call our endpoint:

www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses

Required parameters
- doctor_id
- facility_id

In response, the API will return list of all addresses with their **address_ids** and location details
```json
{
  "_items": [
    {
      "id": "123",
      "name": "Test Hospital",
      "post_code": "02-691",
      "street": "Obrzezna",
      "_links": {
        "doctor": {
          "href": "/api/v3/integration/facilities/139878/doctors/11",
          "method": "get"
        },
        "facility": {
          "href": "/api/v3/integration/facilities/139878",
          "method": "get"
        },
        "self": {
          "href": "/api/v3/integration/facilities/139878/doctors/11/addresses/333",
          "method": "get"
        },
        "services": {
          "href": "/api/v3/integration/facilities/139878/doctors/11/addresses/333/services",
          "method": "get"
        }
      }
    }
  ]
}
```