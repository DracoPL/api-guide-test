# Group Patient Presence

Last but not least - there's a new feature available in API v3, called Patient Presence. It's purpose is notifying Docplanner/Doctoralia database if patient attended the visit. It's quite useful for invoicing purposes, doctor isn't charged for the visits that didn't take place. This method is optional and doesn't have to be implemented in Integration process. 

To mark patient presence, you need to call our endpoint:
```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/bookings/{booking_id}/presence/patient
```

Two operations are available: **POST** (to mark patient as present) and **DELETE** (indicating no-show).
