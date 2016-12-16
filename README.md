# Environment Monitoring API Documentation
This is documentation using for Environment Monitoring.

This API including 4 parts:
</br>
```
* Users
* Devices
* Endpoints
* Values
```
## Users
#### Login
User must login to access all services provided by this API. An users account have ```username```, ```password```, ```lastname``` and ```firstname```.</br>
To login, we will use ``HTTP POST`` method to send request ``username`` and ``password`` to API.</br></br>
``POST /users/login``</br><br>
We need add 2 parameters to body: ``username`` and ``password``.