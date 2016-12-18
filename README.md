# Environment Monitoring API Documentation

This is documentation using for Environment Monitoring API version 1.0.</br>
Official website [here](http://hueic.edu.vn) </br>
This API including 4 parts:
</br>
```
* Users
* Devices
* Endpoints
* Values
```

The default trigged URL of this API is:</br>
```
http://address:port/core/api/v1/
```
Make sure you enter above address exactly. You can access, modify resource with the API.<br>
## Testing
For testing and check for API available/running, simply enter following URI on your browser or any REST client:
```
GET http://address:port/core/api/v1

or

GET http://address:port/core/api/v1/welcome
```
The home URI will response with JSON string:
```
{
     message: "Your test is OK! The API is running!"
}
```
and then the Welcome URI:
```
{
    "message": "Welcome to Environment Monitoring API",
    "version": "1.0",
    "StatusCode": 200
}
```
If your test is success, means is the API is running and you can start working on it!
###Let's start...
## Users
#### Login
User must login to access all services provided by this API. An users account have username, password, lastname and firstname.</br>
To login, we will use ``HTTP POST`` method to send request username and password to API.
```
POST /users/login
```
You need add 2 parameters ``x-www-form-urlencoded`` format to body request: username and password.</br>
If success, you will receive ``JSON`` respone:</br></br>
```
Status: 200 OK

{
    "Result":
    [{
        "FirstName": string,
        "LastnName": string,
        "Username": string,
        "Password": string,
        "Role": string
    }],
    Status: boolean
    StatusCode: 200
}
```

#### Invalid Username or Password
Else if error, you will receive JSON respone with HTTP Status: 400.
```
Status: 400 Bad Request

{
    "message": "Invalid Username or Password",
    "StatusCode": 400,
    "Status": boolean
} 
```
</br>
#### Parameters is null
And if you send request without parameters or parementers is null, the backend will send you response with HTTP 500 Internal Server Error. Look like this:</br><br>
```
Status: 500 Internal Server Error

{
    
    "StatusCode": 500,
    "message": "Required fields not null"
}
```
### Register account
To have an account, user must create an account. An account simple required username, password, firstname and lastname. We also use HTTP POST method to send request create an account.
```
POST /users/register
```
You must add 4 parameters to register for an account: ``username``, ``password``, ``firstname``, ``lastname`` .</br>
### Registration successfully
In this case, an account that provided by user was created successfully. You will received JSON response look like this:
```
Status: 200 OK

{
	"message": "Account was created successfully!",
	"StatusCode": 200
}
```
### Register failed
Register will failed with 3 conditions:</br>
```
* ``Username`` is existing in database.
* Error when connection is lost.
* Parameters is null or empty.
```

#### Username is existing
Username that provided by user is existed in database and can't use to register again. In this case, the response will be look like:</br>
```
Status 409 Conflict

{
	"message": "Unable create an account. Username could be existed. Please try again with another Username!",
	"StatusCode" 409
}
```
#### Error when connection is lost
This error will occurred when API couldn't establishing connection to database to get data. And then you will receiving JSON response look like:
```
Status: 503 Service Unavailable

{
    
    "message": "Service Unavailable",
    "StatusCode": 503
}
```
#### Parameters is null or empty
If you don't provide parameters or parementers is null or empty string, you will get an error `HTTP 400 Bad Request` and response will be look like this:
```
Status: 400 Bad Request

{
    "StatusCode": 400,
    "message": "Required fields not null"
}
```
### Users Managerment
This API provided a basic user management features example: Add user, edit/update information, delete user, find user by ID, fetch all users.
### Fetch all users
To get/fetch all information each user, we provided this URI ``/users/`` with ``HTTP GET`` to retrieving all information of all users. Look like this:
```
GET /users/
```
#### Success
If your operation is success, the API will be sent to a response with `HTTP 200` status code and JSON response:</br>
```
Status: 200 OK

{
    "Result": 
    [{
        "ID": integer,
        "FirstName": string,
        "LastnName": string,
        "Username": string,
        "Password": string,
        "Role": string
    }], 
    "StatusCode": 200
}
```
#### Failed
If operation is failed, means is data is null or empty. You will get `HTTP 404` status code and JSON response look like this:</br>
```
Status: 404 Not Found

{
    "message": "Unable to find any user!",
    "StatusCode": 404
}
```
### Find specific user by ID
To get information specific user, you can use ID of them. Here is URI for find user information by ID:</br>
```
GET /users/:id
```
You need provide an ID for request parameters and ID not empty or null.
#### Success
If your operation is success, you will get this JSON response:
```
Status: 200 OK

{
    "Result":
    {
        "ID": integer,
        "FirstName": string,
        "LastnName": string,
        "Username": string,
        "Password": string,
        "Role": string
    },
    "StatusCode": 200
}
```
#### Failed
Else if failed, you will get JSON response with ``HTTP 404`` code. This means is API couldn't find user with ID specific. A JSON respone will be look like this:
```
Status: 404 Not Found

{
    "Error": "Unable to get user information! Data is null!",
    "StatusCode": 404
}
```
##### Parameters is null
An ID of user is required parameters to get specific user. If you leave blank, you'll get error. An JSON error with ``HTTP 400`` in respone look like this:
```
Status: 400 Bad Request

{
    "message": "Required User ID is not null",
    "StatusCode": 400
}
```
## Devices
This API supported 5 features to manage devices. Included:
```
* Get all devices
* Get specific device by ID
* Delete device
* Update device information
* Delete device
```
### Get all devices
To get all devices, you need use following URI:
```
GET /devices/fetch
```
This operation will return a response including list of available devices.
#### Success
If this done and success, a response with ``HTTP 200`` code will be look like:
```
Status: 200 OK

{
    Result:
    [{
        "IdDevice": integer,
        "DeviceName": string,
        "Description": string,
        "Unit": string,
        "IDEndPoint": integer,
        "Min": double,
        "Max": double,
        "EndPointName": string,
        "CurrentValue": double
    }],
    StatusCode: 200
}
```
You need parse an array named ``Result`` to get a list of devices.
#### Failed
If operation failed, you will get response:
```
StatusCode: 404 Not Found

{
    "message": "Not Found Any Devices",
    "StatusCode": 404
}
```