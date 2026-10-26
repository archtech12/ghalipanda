const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Force hardcoded URI for debugging
const MONGODB_URI = 'mongodb://localhost:27017/ghali-panda-dashboard';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const existingUser = await User.findOne({ email: 'admin@ghalipanda.gov.ng' });
            if (existingUser) {
                console.log('Admin user already exists. Deleting and recreating...');
                await User.deleteOne({ email: 'admin@ghalipanda.gov.ng' });
            }

            const adminUser = new User({
                name: 'Admin User',
                email: 'admin@ghalipanda.gov.ng',
                password: 'Admin123!',
                role: 'admin'
            });

            await adminUser.save();
            console.log('Admin user created successfully!');
            console.log('Email: admin@ghalipanda.gov.ng');
            console.log('Password: Admin123!');
            process.exit(0);
        } catch (error) {
            console.error('Error creating admin user:', error);
            process.exit(1);
        }
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
