# Group FAQ

<h2><strong>I don't see all the doctors expected while getting doctor's list - what should I do?</strong></h2>

There are 2 situations where we might not return doctor in the response to GET request. 

**1) Doctor is not commercial**

What does it mean? In order to launch calendar in our platform, doctor's profile needs to be premium (paid). You can quite easily check it -> just go to facility profile on Docplanner/Doctoralia service and check the list of doctors.  Make sure that doctor has **GOLD** badge

<img src="../../images/faq1.png" width="100%">

**2) Doctor is not linked to the clinic**

In order to return doctor object in GET request, doctor needs to be linked to the clinic. There are 2 ways of verifying if that's valid:

Go to facility profile in Docplanner/Doctoralia service and check if doctor appears on the list of professionals:

<img src="../../images/faq2.png" width="100%">

If the desired professional doesn't appear there - just go to his/her address edition section on individual doctor's profile and check if the box "Copy address from facility profile" is checked.

<img src="../../images/faq3.png" width="100%">

<h2>Address_ID I was using is no longer valid - what should I do?</h2>

When doctor has an active calendar, he cannot modify address information, however it's possible from the interface level to shut down calendar and delete address. If that happens, address won't be available from API level anymore. Once it happens and there's no sign of an address in API Client and you're sure that the facility or the doctor still wants to have his/her calendar integrated - you can either:

+ Reach us in order to restore old, deleted address
+ Ask the doctor to add new address linked to desired facility and use new IDs to configure schedule once again (remember that both address_id and address_service_ids will be changed).


<h2>I can't delete address_service because it's connected to calendar configuration. What to do?</h2>

Address services related to active slots in calendar are non-removable. If you're trying to perform such operation you need to delete calendar configuration first (or at least it's part where address_service_ids are used) - then perform DELETE operation. 

<h2>Where can I check if I successfully added slots to calendar?</h2>

Slots added via API appear in calendar configuration of each doctor. You can check if they were added correctly by entering doctor's profile ( you need login credentials or access granted by doctor).  They will appear in calendar section under "Exceptions" label (as on picture below)

Look for exceptions:

<img src="../../images/faq4.png" width="100%">

After expanding you'll be able to see specific dates with schedules:

<img src="../../images/faq5.png" width="100%">

<h2>I want to flush calendar configuration - will it affect already booked visits?</h2>

No. Visits booked by patient via Docplanner/Doctoralia interface can be only removed by cancelling them. Flushing calendar configuration doesn't affect visits.

<h2>Can I use OAuth Protocol to authorize Callbacks from DP API?</h2>

Not yet. Currently we don't support authorization layer in callback communication. All of the requests are send from one IP address which can be restricted on 3rd party endpoint to add security layer. We also require using of endpoints signed with HTTPS certificates. Handling OAuth authorization is currently in progress and should be launched in the first half of 2019.

<h2>The visit was booked although I responded with 4XX or 5XX status code to slot-booked request. Why did it happened?</h2>

By deafult, API Clients are set to asynchronous communication. It means that the booking requests are in fact only notifications, send after successful booking via Docplanner/Doctoralia interface. During booking flow there's no additional layer of check if the slot is still available. If you want to have such check - jump to real-time communication section to find out more.
