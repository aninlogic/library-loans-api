import { Router } from 'express';

import {
  getLoans,
  getLoan,
  createLoan,
  updateLoan,
  deleteLoan,
} from '../controllers/loanController.js';

const router = Router();
router.get('/', getLoans);
router.get('/:id', getLoan);
router.post('/', createLoan);
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);

export default router;