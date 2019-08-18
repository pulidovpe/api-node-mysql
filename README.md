# api-node-mysql
## API Rest - Node MySQL Sequelize
Project under development / Proyecto en desarrollo
> Application developed in Node, Express, and Sequelize; which uses a database in MySQL (API Rest).
At the moment you can only create users and log in with the created user.\
> Because JWT is used for session control, you must add a JWT token correctly formatted in the headers. Generate the token with the path / loginUser, copy the value of the token property and paste it in the entry with JWT <token string>. The (key) field must have the name "Authorization".

## Tech-framework used / Tecnologías Usadas

- Node ^10.16.3
- @babel ^7.5.5
- dotenv ^8.0.0
- bcryptjs ^2.4.3
- mysql ^2.17.1
- mysql2 ^1.6.5
- passport ^0.4.0
- passport-jwt ^4.0.0
- sequelize ^5.12.3

### Default Routes / Rutas

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
- [x] API tests.
- [ ] Application deployment in heroku.
- [ ] Improve and complete the API.
- [ ] Complete the front-end (and mobile app).

> The API (currently under development) can be accessed from this link: [heroku]()

## Contribute / Para contribuir
1. Has un [Fork](https://github.com/pulidovpe/api-node-mysql/fork)
2. Crea tu propia rama (git checkout -b feature/fooBar)
3. Sube tus cambios (git commit -am 'Add some fooBar')
4. Actualiza tu rama (git push origin feature/fooBar)
5. Has un "Pull Request"

## Credits / Créditos
En este proyecto, me he guiado del tutorial publicado en el blog:
[itnext](https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436), propiedad de @github/paigen11

## License / Licencia
Pulido V.P.E. – @github/pulidovpe – pulidovpe.dev@gmail.com
Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
