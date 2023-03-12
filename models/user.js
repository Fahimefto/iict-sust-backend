const mongoose = require('mongoose');
const authUserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNum: { type: String, required: true },
        
       
        role: {
            type: String,
            enum: ['admin', 'teacher', 'staff'],
            required: [true, 'Please provide a role'],
            default: 'staff',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('AuthUser', authUserSchema);
