# Group Real-time communication

By deafult, every API Client is configured to use asynchronous flow. We simply notify 3rd party about events that happened in Docplanner/Doctoralia marketplace. We expect that every request will be accepted (with 2XX status code) - if it fails, we simply retry to send the communicate again.

## What does it mean in practice?
Let's analyze booking. If real-time booking is disabled, when user books we doesn't wait for the response from 3rd party system. If the slot appears as available we don't have additional layer of checking if it's still valid. So if a user books - we'll send booking request (slot-booked) and display success screen to the user. It'll happen even if the response to the request will result with 4XX or 5XX status code. We'll retry sending the communicate 3 times - after minute, 5 minutes and 15 minutes.

In practice - it's not a problem. Usually situations when asynchronous flow causes trouble is when race-condition happens. If the clinic books a slot in the very same moment as Docplanner/Doctoralia user. It's a super-rare edge case and doesn't affect communication at all.

## Risk of race condition
What if there's a higher risk of race condition (huge clinic, lots of bookings)?

Don't worry - we have it covered. In justified cases we have real-time booking flow that is applicable per API Client (so doesn't need to be software-specific setting). In real-time flow we add additional check with one more request sent to 3rd party endpoint at the end of booking flow.

On the image below we're described the flow:

<img src="../../images/real-time1.png" width="100%">

The additional call (`slot-booking`) is meant to double-check the availibility of slot. We'll send it to the external system before displaying success screen (waiting for the response). The request expects 2XX status code to finish the transaction - with any other status code, we won't allow user to complete the transaction by throwing an error. 

We enable real-time booking as a additional configuration on demand. If you want to use the method - contact us at [integrations@docplanner.com](mailto:integrations@docplanner.com).

> **NOTICE!** Please remember that while waiting for the response we'll keep the user on hold. Please make sure that while requesting for enabling real-time communication, your endpoint will be able to respond in maximum of 5 seconds!
