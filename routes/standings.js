

import express from 'express';
import { getStandings } from '../controller/standings.js';

const router = express.Router();

router.get('/', getStandings);
export default router;
