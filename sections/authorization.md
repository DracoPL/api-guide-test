# Group Authorization

For authorization purposes we're using industry standard - **OAuth2 Protocol**. To authorize you need set of **Client Credentials** (it's the only grant type we're currently supporting). 

The mechanism is quite simple - you need to call our authorization endpoint (example below), requesting for the token.

```http 
https://www.{domain}/oauth/v2/token
```

The request needs to contain  set of Client Credentials - ClientID and Secret as well as proper grant_type and scope.

> You can get API credentials by requesting us - [integrations@docplanner.com](mailto:integrations@docplanner.com) Applies to both to test and production environment.

Here's a sample request to authorize (point 1 from the Recommended order of calls list) 

```http
curl -u {client_id}:{client_secret} https://www.{domain}/oauth/v2/token -d 'grant_type=client_credentials&scope=integration'
```