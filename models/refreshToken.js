const mongoose = require('mongoose');
const tokenScema = new mongoose.Schema({
    token: { type: String, required: true },
});
module.exports = mongoose.model('RefreshToken', tokenScema);
