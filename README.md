# api-node-mysql
## API Rest - Node MySQL Sequelize
Project under development.
> Application developed in Node and Express; which uses a database in MySQL (API Rest).
At the moment you can only create users and log in with the created user.\
> Because JWT is used for session control, you must add a JWT token correctly formatted in the headers. Generate the token with the path / loginUser, copy the value of the token property and paste it in the entry with JWT <token string>. The (key) field must have the name "Authorization".

### Default Routes

| Endpoint | Method | Description | Required | Response |
| - | - | - | - | - |
| `/` | `GET` | The main route. | |
| `/registerUser` | `POST` | Create new user. | fullname, email, password | JSON <br> { data, message } |
| `/loginUser` | `POST` | Authenticate user. | email, password | JSON <br> { auth, data, JWT token, message } |
| `/updateUser` | `PUT` | Update user. | JWT token, email, fullname | JSON <br> { data, auth, message } |
| `/updatePassword` | `PUT` | Update password. | JWT token, email, newPassword | JSON <br> { auth, message } |
| `/deleteUser` | `DELETE` | Delete user. | JWT token, email | JSON <br> { message } |


## Tasks / Lista de Tareas
- [x] Repository initialization.
- [x] First changes to GitHub and Gitlab.
- [ ] API tests.
- [ ] Application deployment in heroku.
- [ ] Improve and complete the API.
- [ ] Complete the front-end (and mobile app).

> The API (currently under development) can be accessed from this link: [heroku]()
