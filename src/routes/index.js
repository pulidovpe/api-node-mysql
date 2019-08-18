// index.js
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
   res.setHeader('Content-Type', 'text/plain; charset=utf-8');
   res.end('Express RESTful API');
   // res.render('index.hbs')
});

module.exports = router;