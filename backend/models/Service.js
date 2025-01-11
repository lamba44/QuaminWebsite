// models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);
