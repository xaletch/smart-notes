const noteModel = require("../models/noteModel");

module.exports.getNoteData = async (req, res) => {
    try {
        const noteData = await noteModel.findOne({ _id: req.body.noteId }).populate('note');
        res.send(noteData);
    }
    catch (err) {
        console.log('При получении заметок произошла ошибка: \n', err);
        trs.send(502).json({ message: "При получении заметок произошла ошибка" });
    }
};

module.exports.noteDataCreate = async (req, res) => {
    try {
        const noteData = new noteModel({
            title: req.body.title,
            smile: req.body.smile,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const saveData = await noteData.save();

        res.json({ noteData: saveData });
    }
    catch (err) {
        console.log('Не удалось создать контент для заметки \n', err);
        res.status(500).json({ message: "Не удалось создать контент для заметки" });
    }
};