// models/MedicalRecord.js

const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    reasonForVisit: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String
    },
    treatment: {
        type: String
    },
    notes: {
        type: String
    },
    recordDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);