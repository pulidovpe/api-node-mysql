// user.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
   const User = sequelize.define('user', {
      // attributes
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      email: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      password: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      remember_token: {
         type: DataTypes.STRING(100),
         // allowNull defaults to true
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.DATE
   }, {
      tableName: 'users',
      timestamps: true
   });

   return User;
};