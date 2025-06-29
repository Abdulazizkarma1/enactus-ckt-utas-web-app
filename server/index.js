import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notificationRoutes from './routes/notification.js';

dotenv.config();

const app = express(); // <-- Move this line up

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // <-- use MONGO_URI
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(cors());
app.use(express.json());

app.use('/api', notificationRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('ENACTUS API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
