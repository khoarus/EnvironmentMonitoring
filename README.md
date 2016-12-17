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

The default trigged URL of this API is: ``http://address:port/api/v1/``</br>
Make sure you enter above address exactly. You can access, modify resource with the API.<br>
###Let's start...
## Users
#### Login
User must login to access all services provided by this API. An users account have ```username```, ```password```, ```lastname``` and ```firstname```.</br>
To login, we will use ``HTTP POST`` method to send request ``username`` and ``password`` to API.
</br>
</br>
``POST /users/login``
</br>
</br>
You need add 2 parameters to body request: ``username`` and ``password``.
### Register account
To have an account, user must create an account. An account simple required ``username``, ``password``, ``firstname`` and ``lastname``. We also use ``HTTP POST`` method to send request create an account.
</br>
</br>
``POST /users/register``
</br>
</br>
You must add 4 parameters to register for an account: ``username``, ``password``, ``firstname``, ``lastname``.</br>