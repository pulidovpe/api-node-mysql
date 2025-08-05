// logoutUser.js

export default app => {
   app.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
   });
};