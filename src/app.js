import express from 'express';
import loanRoutes from './routes/loanRoutes.js';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Library Loans API is running.',
    endpoints: {
      getAllLoans: 'GET /loans',
      getLoanById: 'GET /loans/:id',
      createLoan: 'POST /loans',
      updateLoan: 'PUT /loans/:id',
      deleteLoan: 'DELETE /loans/:id',
      filterByStatus: 'GET /loans?status=Terlambat',
    },
  });
});
app.use('/loans', loanRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan.',
  });
});
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.',
  });
});

export default app;