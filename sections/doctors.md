# Group Doctors

With **Facility_ID** parameter, you are able to get further details, needed to move on with the integration. Next step should be getting list of doctors working within the facility. There are 2 restrictions which might limit the number of results - doctor needs to be our client with commercial profile and he needs to be linked to a facility. If you expect to fetch more doctors than our API returned - check FAQ section for troubleshooting.

In order to get the list of doctors you need to call endpoint:

```http
https://www.{domain}/api/v3/integration/facilities/{facility_id}/doctors
```

The only required parameter is **facility_id**.

In the response we'll serve the list of doctors working in a facility with their **doctor_ids**, name and surname. Again - doctor_id is a unique value, each doctor profile has, it will always remain unchanged. There's 1 to 1 relation - so each doctor will have separate, unique ID.

Below you'll find sample response:
```json
{
  "_embedded": {
    "items": [
      {
        "_links": {
          "self": {
            "href": "/api/v3/integration/facilities/1/doctors/123",
            "method": "get"
          }
        },
        "id": "123",
        "name": "Doctor",
        "surname": "House"
      },
      {
        "_links": {
          "self": {
            "href": "/api/v3/integration/facilities/1/doctors/124",
            "method": "get"
          }
        },
        "id": "124",
        "name": "Doctor",
        "surname": "Who"
      }
    ]
  }
}
```

Once you have doctor_ids  you can use them for further calls. There's one more related with doctor object. You can extend information you're getting for additional parameters. To make it happen, you need to add a scope to the request, as follows:

```http request
https://www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}{?with}
```

Using doctor_id you can  get 1 additional param:

+ `address.booking_extra_fields` - allows to check if NIN (any personal identification number used by local authorities) parameter will be required in booking flow - it's an optional parameter, added on request.