import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json({ limit: '20kb' }));

let connection;
async function connectDb() {
  if (mongoose.connection.readyState === 1) return;
  if (!process.env.MONGODB_URI) throw new Error('Database is not configured');
  connection ||= mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  await connection;
}

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, maxlength: 160 },
  phone: { type: String, trim: true, maxlength: 30 },
  service: { type: String, trim: true, maxlength: 100 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
}, { timestamps: true });
const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'MDA Softech Solutions' }));
app.post('*', async (req, res) => {
  const { name, email, phone = '', service = '', message } = req.body || {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Please provide your name, email and message.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  try {
    await connectDb();
    await Enquiry.create({ name, email, phone, service, message });
    return res.status(201).json({ message: 'Thanks for reaching out. Our team will be in touch.' });
  } catch (error) {
    console.error('Contact enquiry could not be saved:', error.message);
    return res.status(503).json({ error: 'The enquiry form is temporarily unavailable. Please email admin@mdasoftechsolusion.com.' });
  }
});

export default app;
