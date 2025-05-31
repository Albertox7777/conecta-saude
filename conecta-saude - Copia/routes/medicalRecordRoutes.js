// routes/medicalRecordRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MedicalRecord = require('../models/MedicalRecord');

// Criar um novo prontuário
router.post('/', auth, async (req, res) => {
    const { patientName, dateOfBirth, reasonForVisit, diagnosis, treatment, notes } = req.body;
    try {
        const newRecord = new MedicalRecord({
            user: req.user.id, // O ID do usuário logado vem do middleware de autenticação
            patientName,
            dateOfBirth,
            reasonForVisit,
            diagnosis,
            treatment,
            notes
        });
        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor ao criar prontuário.');
    }
});

// Obter todos os prontuários de um usuário
router.get('/', auth, async (req, res) => {
    try {
        const records = await MedicalRecord.find({ user: req.user.id }).sort({ recordDate: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor ao buscar prontuários.');
    }
});

// Obter um prontuário por ID
router.get('/:id', auth, async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Prontuário não encontrado.' });
        }
        // Verificar se o prontuário pertence ao usuário logado
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Não autorizado.' });
        }
        res.json(record);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') { // Erro se o ID não for válido
            return res.status(404).json({ message: 'Prontuário não encontrado.' });
        }
        res.status(500).send('Erro no servidor ao buscar prontuário específico.');
    }
});

// Atualizar um prontuário
router.put('/:id', auth, async (req, res) => {
    const { patientName, dateOfBirth, reasonForVisit, diagnosis, treatment, notes } = req.body;
    const recordFields = {};
    if (patientName) recordFields.patientName = patientName;
    if (dateOfBirth) recordFields.dateOfBirth = dateOfBirth;
    if (reasonForVisit) recordFields.reasonForVisit = reasonForVisit;
    if (diagnosis) recordFields.diagnosis = diagnosis;
    if (treatment) recordFields.treatment = treatment;
    if (notes) recordFields.notes = notes;

    try {
        let record = await MedicalRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Prontuário não encontrado.' });
        }
        // Verificar se o prontuário pertence ao usuário logado
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Não autorizado.' });
        }

        record = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            { $set: recordFields },
            { new: true }
        );
        res.json(record);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Prontuário não encontrado.' });
        }
        res.status(500).send('Erro no servidor ao atualizar prontuário.');
    }
});

// Deletar um prontuário
router.delete('/:id', auth, async (req, res) => {
    try {
        let record = await MedicalRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Prontuário não encontrado.' });
        }
        // Verificar se o prontuário pertence ao usuário logado
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Não autorizado.' });
        }

        await MedicalRecord.deleteOne({ _id: req.params.id }); // Use deleteOne ou findByIdAndDelete
        res.json({ message: 'Prontuário removido com sucesso.' });

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Prontuário não encontrado.' });
        }
        res.status(500).send('Erro no servidor ao remover prontuário.');
    }
});

module.exports = router;