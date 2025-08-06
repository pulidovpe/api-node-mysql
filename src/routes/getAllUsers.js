// getAllUsers.js
import User from '../middlewares/sequelize.js';

export default app => {
   app.get('/getUsers', (req, res) => {
      User.findAll({
         attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
         order: [['createdAt', 'DESC']]
      })
      .then(users => {
         res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users,
            count: users.length
         });
      })
      .catch(error => {
         console.error('Error getting users:', error);
         res.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
         });
      });
   });
}; 