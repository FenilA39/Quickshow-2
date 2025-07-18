// server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './src/inngest/index.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
try {
  await connectDB();
  console.log("✅ MongoDB Connected");
} catch (error) {
  console.error("❌ Error connecting to MongoDB:", error.message);
  process.exit(1); // Stop server if DB fails to connect
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 Server is Live!');
});

// Inngest event handler route
app.use('/api/inngest', serve({ client: inngest, functions }));

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
