// index.js
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
   res.setHeader('Content-Type', 'application/json; charset=utf-8');
   res.json({response: 'Express RESTful API'});
});

export default router;