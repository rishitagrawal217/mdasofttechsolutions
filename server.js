import app from './api/index.js';
const port = process.env.PORT || 5000;
app.listen(port, '127.0.0.1', () => console.log(`MDA API listening on ${port}`));
