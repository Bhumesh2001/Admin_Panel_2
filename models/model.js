const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Define the Admin schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [4, 'Username must be at least 4 characters long'],
        maxlength: [20, 'Username must not exceed 20 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'moderator'], // Role options
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Hash the password before saving
adminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Update the updatedAt field on every save
adminSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Method to compare input password with the hashed password in the database
adminSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
