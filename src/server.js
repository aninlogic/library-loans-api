import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Library Loans API berjalan di http://localhost:${PORT}`);
});

export default app;