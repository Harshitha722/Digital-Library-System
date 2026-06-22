const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digital_library';

const args = process.argv.slice(2);
const [name, email, password] = args;

if (!name || !email || !password) {
  console.error('Usage: node scripts/createAdmin.js <name> <email> <password>');
  process.exit(1);
}

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin created successfully:');
    console.log(`  Name: ${admin.name}`);
    console.log(`  Email: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
