import dotenv from 'dotenv';
import express from 'express';

export const fake = () => {
  const app = express();
  dotenv.config();
  const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.send('Bot is running...');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
