import express from 'express';

import github from './github';
import azure from './azure';

const router = express.Router();

router.post('/github', github);
router.post('/azure', azure);


export default router;
