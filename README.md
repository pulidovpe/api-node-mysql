# API Node MySQL
## API Rest - Node, MySQL, and Sequelize
Project under development / Proyecto en desarrollo
> Application developed in Node, Express, and Sequelize; which uses a database in MySQL (API Rest).
At the moment you can only create users and log in with the created user.\
> Because JWT is used for session control, you must add a JWT token correctly formatted in the headers. Generate the token with the path / loginUser, copy the value of the token property and paste it in the entry with JWT <token string>. The (key) field must have the name "Authorization".

## 🚀 Tech-framework used / Tecnologías Usadas

### Core Dependencies / Dependencias Principales
- **Node.js** ^24.5.0 (Actualizado desde ^10.16.3)
- **Express** ^4.21.2 (Actualizado desde ^4.17.1)
- **Sequelize** ^6.37.7 (Actualizado desde ^5.12.3) ⚠️ **Breaking Changes**
- **MySQL2** ^3.14.3 (Actualizado desde ^1.6.5) ⚠️ **Critical Security Update**
- **Passport** ^0.7.0 (Actualizado desde ^0.4.0) ⚠️ **Security Update**

### Authentication & Security / Autenticación y Seguridad
- **bcryptjs** ^2.4.3
- **passport-jwt** ^4.0.1 (Actualizado desde ^4.0.0)
- **passport-local** ^1.0.0
- **dotenv** ^16.4.5 (Actualizado desde ^8.0.0)

### Development Tools / Herramientas de Desarrollo
- **@babel/cli** ^7.28.0 (Actualizado desde ^7.6.0)
- **@babel/core** ^7.28.0 (Actualizado desde ^7.5.5)
- **@babel/node** ^7.28.0 (Actualizado desde ^7.5.5)
- **@babel/preset-env** ^7.28.0 (Actualizado desde ^7.5.5)
- **@babel/plugin-transform-modules-commonjs** ^7.27.1 (Nuevo)
- **nodemon** ^3.1.10 (Actualizado desde ^1.19.1)
- **mocha** ^11.7.1 (Actualizado desde ^6.2.1)
- **supertest** ^7.1.3 (Actualizado desde ^4.0.2)

### Utilities / Utilidades
- **cors** ^2.8.5
- **morgan** ^1.10.0 (Actualizado desde ^1.9.1)
- **http-errors** ^2.0.0 (Actualizado desde ^1.7.3)
- **rimraf** ^5.0.5 (Actualizado desde ^3.0.0)
- **npm-run-all** ^4.1.5

## 🔄 Important Changes / Cambios Importantes

### Security Updates / Actualizaciones de Seguridad
- ✅ **22 vulnerabilidades de seguridad resueltas** (0 vulnerabilidades actuales)
- ✅ Actualización crítica de **MySQL2** para prevenir RCE
- ✅ Actualización de **Sequelize** para prevenir SQL Injection
- ✅ Actualización de **Passport** para mejorar la seguridad de sesiones

### Code Modernization / Modernización del Código
- ✅ **Migración completa a ES6 Modules** (eliminado CommonJS)
- ✅ **Sequelize v6** con nueva sintaxis de importación
- ✅ **Babel 7.28** con configuración optimizada
- ✅ **Node.js 24.5.0** compatible

### Breaking Changes / Cambios Importantes
- ❌ **@babel/polyfill** eliminado (deprecado)
- ⚠️ **Sequelize v5 → v6**: Cambios en sintaxis de modelos
- ⚠️ **MySQL2 v1 → v3**: Mejoras de rendimiento y seguridad
- ⚠️ **Passport v0.4 → v0.7**: Mejoras de seguridad

### Default Routes / Rutas

| Endpoint | Method | Description | Required | Response |
| - | - | - | - | - |
| `/` | `GET` | The main route. | | `{"response":"Express RESTful API"}` |
| `/registerUser` | `POST` | Create new user. | fullname, email, password | JSON <br> { dataUser, message } |
| `/loginUser` | `POST` | Authenticate user. | email, password | JSON <br> { auth, dataUser, message } |
| `/updateUser` | `PUT` | Update user. | accessToken, email, fullname | JSON <br> { dataUser, auth, message } |
| `/updatePassword` | `PUT` | Update password. | accessToken, email, newPassword | JSON <br> { auth, message } |
| `/deleteUser` | `DELETE` | Delete user. | accessToken, email | JSON <br> { message } |
| `/getUsers` | `GET` | Get all users. | | `{"success": true,"message": "Users retrieved successfully","data": [],"count": 0}` |

## 🛠️ Install / Instalación
#### OS X, Linux & Windows
*To install first, open a shell and run:*
```Shell
$ git clone http://github.com/pulidovpe/api-node-mysql.git

$ cd api-node-mysql

$ npm install
```
*Then, rename the file EXAMPLE.env to .env and update it with your credentials.*
<br />
*Finally, run:*
```Shell
$ npm start
```
*To run in development mode:*
```Shell
$ npm run dev
```
*To run unit testing:*
```Shell
$ npm run build

$ npm run test
```

## 🔧 Environment Variables / Variables de Entorno

Create a `.env` file with the following variables:
```env
APP_PORT=3000
APP_SECRET=your-secret-key-here
APP_HOST=localhost
DB_HOST=localhost
DB_CONNECTION=mysql
DB_PORT=3306
DB_DATABASE=api_node_mysql
DB_USERNAME=root
DB_PASSWORD=password
```

## 📋 Tasks / Lista de Tareas
- [x] Repository initialization.
- [x] First changes to GitHub and Gitlab.
- [x] Add features and routes.
- [x] Unit tests.
- [x] **Security updates and dependency modernization** ✅
- [x] **Migration to ES6 Modules** ✅
- [x] **Sequelize v6 upgrade** ✅
- [x] New route (getUsers) ✅
- [ ] Application deployment in ...

> The API (currently under development) can be accessed from this link: [...]()

## 🔍 Testing / Pruebas

The application has been tested and verified to work with the following:
- ✅ Node.js v24.5.0
- ✅ All security vulnerabilities resolved
- ✅ ES6 Modules working correctly
- ✅ API endpoints responding properly
- ⚠️ MySQL connection requires database setup

## 🚨 Important Notes / Notas Importantes

1. **Database Setup**: This project requires MySQL to be running for full functionality
2. **Environment Variables**: Make sure to configure your `.env` file properly
3. **Breaking Changes**: The upgrade to Sequelize v6 may require additional adjustments in production
4. **Security**: All critical security vulnerabilities have been resolved

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
