const noteModel = require('../models/noteModel');
const noteCartModel = require('../models/noteCartModel');

module.exports.getNote = async (req, res) => {
    try {
        const note = await noteModel.find({ user: req.userId }).populate('user').exec();

        res.send(note);
    }
    catch (err) {
        console.log('При получении заметок произошла ошибка: \n', err);
        trs.send(500).json({ message: "При получении заметок произошла ошибка" });
    }
};

module.exports.getOneNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await noteModel.findById({ _id: noteId });

        if (!note) {
            return res.status(404).json({ message: "Заметка не найдена" });
        }

        res.json(note);
    }
    catch (err) {
        console.log('При получении заметки произошла ошибка: \n', err);
        res.send(500).json({ message: "Не удалось получить выбранную заметку" });
    }
};

module.exports.saveNote = async (req, res) => {
    try {
        const note = new noteModel({
            name: req.body.name,
            title: req.body.title,
            smile: req.body.smile,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const saveNote = await note.save();
        res.json({ note: saveNote });
    }
    catch (err) {
        console.log('произошла ошибка при создании note: \n', err);
        res.status(500).json({ message: "Не удалось создать note" });
    }
};

module.exports.updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await noteModel.updateOne({
            _id: noteId,
        }, {
            name: req.body.name,
            title: req.body.title,
            smile: req.body.smile,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            blocks: req.body.blocks,
        });

        if (!note) {
            return res.status(404).json({ message: "Заметка не найдена" });
        }

        res.json({ message: "Обновление заметки" });
    }
    catch (err) {
        console.log('При обновлении заметки произошла ошибка: \n', err);
        res.status(500).json({ message: "Не удалось обновить заметку" });
    }
};

// WILL NEED TO BE REPLACED OR APPLY TO DELETE A NOTE IN THE CART
module.exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await noteModel.findByIdAndDelete(noteId);

        if (!note) {
            return res.status(404).json({ message: "Заметка не найдена" });
        }

        res.json({ message: "Заметка удалена", note: note });

    } catch (err) {
        console.log('При удалении заметки произошла ошибка.: \n', err);
        res.status(500).json({ message: "Не удалось удалить заметку." });
    }
};

// NEW CODE FOR ADDING A NOTE TO THE CART AND REMOVING IT
module.exports.addToCart = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await noteModel.findById({ _id: noteId });
        const delNote = await noteModel.findByIdAndDelete(noteId);

        if (!note) {
            res.status(404).json({ success: false, message: "Не удалось дабавить заметку в корзину" });
        }

        if (!delNote) {
            res.status(404).json({ success: false, message: "Не удалось удалить заметку", note: delNote });
        }

        const noteCart = new noteCartModel({
            notes: note,
        });

        const saveNote = await noteCart.save();

        res.status(200).json({ success: true, message: "Успешное добавление заметки в корзину", note: saveNote, delete: delNote });
    }
    catch (err) {
        res.status(500).json({ message: "Что-то пошло не так!" });
    }
};

module.exports.cartNote = async (req, res) => {
    try {
        const noteCart = await noteCartModel.find({}).populate('notes').exec();

        res.status(200).json({ success: true, message: null, data: noteCart });
    }
    catch (err) {
        res.status(500).json({ message: "Что-то пошло не так!" });
    }
};