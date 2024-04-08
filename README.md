## E-learning Platform built using Node.js and Express.js
This is a collection of REST APIs built using Node.js and Express.js, for managing and accessing an e-learning platform.
The project consists of several API endpoints, let's see them one by one: <br>
To run the project, type ```npm install``` within the same directory as ```package.json``` and then, ```npm run```


### User APIs
<strong>1. Register User</strong> <br>
Endpoint: ```/api/users/register/``` <br>
Method: POST <br>
Request body: ```{ name, email, password }``` <br>
<br>
<strong>2. Login User</strong> <br>
Endpoint: ```/api/users/login/``` <br>
Method: POST <br>
Request body: ``` { email, password } ``` <br>
Response body: ``` { token: 'JWT_TOKEN_HERE', user: { id, name, email, role } }``` <br>
<br>
<strong>3. Get User Profile</strong> <br>
Endpoint: ```/api/users/profile/``` <br>
Method: GET <br>
Request body: Requires JWT authentication token in headers <br>
Response body: ``` { id, name, email, profilePicture, role } ``` <br>
<br>
<strong>4. Update User Profile</strong> <br>
Endpoint: ```/api/users/profile/``` <br>
Method: PUT <br>
Request body: Requires JWT authentication token in headers <br>
Response body: ``` { id, name, email, profilePicture, role } ``` <br>
<br>
### Course Mangement Endpoints
<strong>5. Get all courses</strong> <br>
Endpoint: ```/api/courses/``` <br>
Method: GET <br>
Query Parameters: ```category, level, popularity, page, limit``` <br>
<br>
<strong>6. Create course (Super Admin)</strong> <br>
Endpoint: ```/api/courses/``` <br>
Requires JWT authentication for superadmin role <br>
Request body: ```{ title, description, category, level }``` <br>
Response body: ``` { message: 'Course created successfully' } ``` <br>
<br>
<strong>7. Update course (Super Admin)</strong> <br>
Endpoint: ```/api/courses/:id``` <br>
Requires JWT authentication for superadmin role <br>
Request body: ```{ title, description, category, level }``` <br>
Response body: ``` { message: 'Course updated successfully' } ``` <br>
<br>
<strong>7. DELETE course (Super Admin)</strong> <br>
Endpoint: ```/api/courses/:id``` <br>
Requires JWT authentication for superadmin role <br>
Response body: ``` { message: 'Course deleted successfully' } ``` <br>
