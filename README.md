# API Node Mysql
## API Rest - Node, MySQL, and Sequelize
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
- mocha: ^6.2.1,
- supertest: ^4.0.2

### Default Routes / Rutas

| Endpoint | Method | Description | Required | Response |
| - | - | - | - | - |
| `/` | `GET` | The main route. | |
| `/registerUser` | `POST` | Create new user. | fullname, email, password | JSON <br> { dataUser, message } |
| `/loginUser` | `POST` | Authenticate user. | email, password | JSON <br> { auth, dataUser, message } |
| `/updateUser` | `PUT` | Update user. | accessToken, email, fullname | JSON <br> { dataUser, auth, message } |
| `/updatePassword` | `PUT` | Update password. | accessToken, email, newPassword | JSON <br> { auth, message } |
| `/deleteUser` | `DELETE` | Delete user. | accessToken, email | JSON <br> { message } |

## Install / Instalación
#### OS X, Linux & Windows
*To install first, open a shell and run:*
```Shell
$ git clone http://github.com/pulidovpe/api-node-mysql.git

$ cd api-node-mysql

$ npm install
```
*Then, rename the file EXAMPLE.env  to  .env and after update it with your credentials.*
<br />
*Finally, run:*
```Shell
$ npm start
```
*To run unit testing:*
```Shell
$ npm run build

$ npm run test
```

## Tasks / Lista de Tareas
- [x] Repository initialization.
- [x] First changes to GitHub and Gitlab.
- [x] Add features and routes.
- [x] Unit tests.
- [ ] Improve and complete the API.
- [ ] Application deployment in heroku.

> The API (currently under development) can be accessed from this link: [heroku]()

## Contribute / Para contribuir
1. Has un [Fork](https://github.com/pulidovpe/api-node-mysql/fork)
2. Crea tu propia rama (git checkout -b feature/fooBar)
3. Sube tus cambios (git commit -am 'Add some fooBar')
4. Actualiza tu rama (git push origin feature/fooBar)
5. Has un "Pull Request"

## Credits / Créditos
En este proyecto, me he guiado del tutorial publicado en el blog:
[itnext](https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436), propiedad de [@github/paigen11](https://github.com/paigen11)

## License / Licencia
[@github/pulidovpe](https://github.com/pulidovpe) – pulidovpe.dev@gmail.com
Distributed under the MIT license. See [LICENSE](LICENSE) for more information.
