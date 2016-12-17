# Environment Monitoring API Documentation

This is documentation using for Environment Monitoring API.

This API including 4 parts:
</br>
```
* Users
* Devices
* Endpoints
* Values
```

The default trigged URL of this API is: http://address:port/api/v1/</br>
Make sure you enter above address exactly. You can access, modify resource with the API.<br>
###Let's start...
## Users
#### Login
User must login to access all services provided by this API. An users account have username, password, lastname and firstname.</br>
To login, we will use HTTP POST method to send request username and password to API.
</br>
</br>

```
POST /users/login
```

</br>
<br>
You need add 2 parameters to body request: username and password.</br>
If success, you will receive JSON respone:</br></br>
```
{
    Status: 200 OK

    "Result":
    {[
        "FirstName": string,
        "LastnName": string,
        "username": string,
        "Password": string
    ]},
    Status: true
    StatusCode: 200
}
```

#### Invalid Username or Password
Else if error, you will receive JSON respone with HTTP Status: 400.
```
{
    Status: 400 Not Found

    "message": "Invalid Username or Password",
    "StatusCode": 400,
    "Status": false
} 
```
</br>
#### Parameters is null
And if you send request without parameters or parementers is null, the backend will send you response with HTTP 500 Internal Server Error. Look like this:</br><br>
```
{
    Status: 500 Internal Server Error

    "StatusCode": 500,
    "message": "Required fields not null"
}
```
### Register account
To have an account, user must create an account. An account simple required username, password, firstname and lastname. We also use HTTP POST method to send request create an account.
</br>
</br>
```
POST /users/register
```
</br>
</br>
You must add 4 parameters to register for an account: ``username``, ``password``, ``firstname``, ``lastname`` .</br>
### Registration successfully
In this case, an account that provided by user was created successfully. You will received JSON response look like this:
```
{
	"message": "Account was created successfully!",
	"StatusCode": 200
}
```
### Register failed
Register will failed with 3 conditions:</br>
1. ``Username`` is existing in database.
2. Error when connection is lost.
3. Parameters is null or empty.
#### Username is existing
Username that provided by user is existed in database and can't use to register again. In this case, the response will be look like:</br>
```
{
	"message": "Unable create an account. Username could be existed. Please try again with another Username!",
	"StatusCode" 404
}
```
