# Group Services

The principals of this section are quite obvious. The goal is to add services to specific address and enable booking on a specific service in specific time slot. 

_Already getting blurry? Here's where the party starts :)_

There are 2 types of services described in API Documentation - Item Services and Address Services. What do they stand for? Let's start with most basic distinction:

+ **Item Services** - they are our dictionary services - IDs are re-usable. In fact they are used for mapping second type of services:
+ **Address Services** - they are unique objects which are related only with one, specific address - once you'll try to use address_service_id in any other address, than the one they're related to, we'll throw an error. After creating Address Service, you can use it for configuring slots in calendar and in booking flow

## How to do it right?

We strongly recommend using **only dictionary services** for any purpose (however it's possible to use unique ones as well - more about it in the further paragraphs).  If you choose to follow recommended path, the process should be divided into 2 steps:

1. **Get Item Service List** - in order to get full dictionary of available services you need to call our endpoint

```http
www.{domain}/api/v3/integration/services
```

Below you'll find sample of response:
```json
{
  "_items": [
    {
      "id": "1",
      "name": "ablacja"
    },
    {
      "id": "3",
      "name": "ablacja serca"
    },
    {
      "id": "5",
      "name": "akupresura"
    },
    {
      "id": "7",
      "name": "akupunktura"
    }
  ]
}
```

IDs returned by Docplanner API (we call them **item_service_ids**) are unique and **can be mapped** to ones in 3rd party software, however they cannot be directly used to add a service or slot to doctor profile. 

## How to add them?

To add a service to doctor profile (or to be more specific - to desired address) you need to use POST method. The request should be sent to the endpoint:
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/services
```
 
Required parameters are:
- Facility_id
- Doctor_id
- Address_id

Request body should be structured as follows:
```json
{
  "service_id": "3",
  "is_price_from": true,
  "price": 500
}
```

Used in the request parameters represents:
- service_id - which stands for already described item_service_id 
- is_price_from 
- price

In response to successful request, we'll return it's ID - we call it **address_service_id**. Below an example:

```
Content-Type: application/vnd.docplanner+json; charset=UTF-8
Location: https://www.znanylekarz.pl/api/v3/integration/facilities/111/doctors/222/addresses/333/services/444
```

address_service_id, returned in response is unique and related to the specific address. It needs to be stored by 3rd party, since it'll be needed to further operations - adding and modifying slots, as well as handling bookings. **It cannot be re-used to any other doctor or address!**

Once you successfully get address_service, you can conduct few more operations:

- **GET** address_services list - displaying current state of address services related with specific address
- **DELETE** address_service
- **PATCH** address_service - in order to modify `price` and `is_price_from` parameter
```json
{
  "price": 400,
  "is_price_from": false
}
```

All of the calls should be requested on endpoint:
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/services/{address_service_id}
```
