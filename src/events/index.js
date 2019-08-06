import express from 'express';

import github from './receivers/github';
import azure from './receivers/azure';

const router = express.Router();

router.post('/github', github);
router.post('/azure', azure);


export default router;
