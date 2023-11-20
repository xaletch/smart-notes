const noteModel = require('../models/noteModel');

module.exports.getNote = async (req, res) => {
    try {
        const note = await noteModel.find({ user: req.userId }).populate('user').exec();

        res.send(note);
    }
    catch (err) {
        console.log('При получении заметок произошла ошибка: \n', err);
        trs.send(502).json({ message: "При получении заметок произошла ошибка" });
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
        res.send(502).json({ message: "Не удалось получить выбранную заметку" });
    }
}

module.exports.saveNote = async (req, res) => {
    try {
        const note = new noteModel({
            name: req.body.name,
            user: req.userId,
        });

        const saveNote = await note.save();
        // const noteId = saveNote._id;
        res.json({ note: saveNote });
    }
    catch (err) {
        console.log('произошла ошибка при создании note: \n', err);
        res.status(501).json({ message: "Не удалось создать note" });
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
        });

        if (!note) {
            return res.status(404).json({ message: "Заметка не найдена" });
        }

        res.json({ message: "Обновление заметки" });
    }
    catch (err) {
        console.log('При обновлении заметки произошла ошибка: \n', err);
        res.status(505).json({ message: "Не удалось обновить заметку" });
    }
};

module.exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await noteModel.findByIdAndDelete(noteId);

        if (!note) {
            return res.status(404).json({ message: "Заметка не найдена" });
        }

        res.json({ message: "Заметка удалена" });

    } catch (err) {
        console.log('При удалении заметки произошла ошибка.: \n', err);
        res.status(500).json({ message: "Не удалось удалить заметку." });
    }
};