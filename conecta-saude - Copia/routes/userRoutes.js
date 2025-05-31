// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor ao buscar perfil.');
    }
});

router.put('/profile', auth, async (req, res) => {
    const { name, email } = req.body;
    const userFields = {};
    if (name) userFields.name = name;
    if (email) userFields.email = email;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && String(existingUser._id) !== req.user.id) {
                return res.status(400).json({ message: 'Email já está em uso por outro usuário.' });
            }
        }

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: userFields },
            { new: true }
        ).select('-password');

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor ao atualizar perfil.');
    }
});

module.exports = router;