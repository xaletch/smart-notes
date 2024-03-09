// ИМПОРТИРУЕМ МОДЕЛИ ДЛЯ ЗАПИСИ ДАННЫХ В БД
const noteModel = require("../models/noteModel");
const noteCartModel = require("../models/noteCartModel");

// ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК ПОЛЬЗОВАТЕЛЯ
module.exports.getNote = async (req, res) => {
  try {
    const note = await noteModel
      .find({ user: req.userId })
      .populate("user")
      .exec();

    // res.status(200).send({ success: true, message: null, items: note });
    res.status(200).send(note);
  } catch (err) {
    trs.send(500).json({
      success: false,
      message: "При получении заметок что-то пошло не так",
    });
  }
};

// ПОЛУЧЕНИЕ ОДНОЙ ЗАМЕТКИ ПО ЕЁ ПОЛЮ ID
module.exports.getOneNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await noteModel.findById({ _id: noteId });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Не удалось получить данные о выбранной заметке",
      });
    }

    // res.status(200).json({ success: true, message: null, note });
    res.status(200).send(note);
  } catch (err) {
    res.send(500).json({
      success: false,
      message: "При получении выбранной заметки, что-то пошло не так",
    });
  }
};

// СОЗДАНИЕ ЗАМЕТКИ
module.exports.saveNote = async (req, res) => {
  try {
    const note = new noteModel({
      name: req.body.name,
      smile: req.body.smile,
      imageUrl: req.body.imageUrl,
      blocks: req.body.blocks,
      user: req.userId,
    });

    const saveNote = await note.save();

    res.status(201).json({
      success: true,
      message: "Успешное создание заметки",
      note: saveNote,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Что-то пошло не так!" });
  }
};

// ОБНОВЛЕНИЕ ЗАМЕТКИ (НОВОЕ ИМЯ, СМАЙЛ, КАРТИНКА, ТЕКСТ)
module.exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await noteModel.updateOne(
      {
        _id: noteId,
      },
      {
        name: req.body.name,
        smile: req.body.smile,
        imageUrl: req.body.imageUrl,
        blocks: req.body.blocks,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Не удалось обновить заметку, заметка не найдена",
      });
    }

    res.status(200).json({ success: true, message: "Обновление заметки" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Что-то пошло не так!" });
  }
};

// ДОБАВЛЕНИЕ ЗАМЕТКИ В КОРЗИНУ, ЕЁ НЕ ВИДНО В БОКОВОЙ ПАНЕЛИ С ЗАМЕТКАМИ
module.exports.addToCart = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await noteModel.findById({ _id: noteId });
    // УДАЛЯЕМ ЗАМЕТКУ ИЗ БОКОВОЙ ПАНЕЛИ СО ВСЕМИ ЗАМЕТКАМИ (ТОЛЬКО ПРИ УСПЕШНОМ ЗАПРОСЕ)
    const delNote = await noteModel.findByIdAndDelete(noteId);

    if (!note) {
      res.status(404).json({
        success: false,
        message: "Не удалось дабавить заметку в корзину, заметка не найдена",
      });
    }

    if (!delNote) {
      res.status(404).json({
        success: false,
        message: "Не удалось удалить заметку, заметка не найдена",
      });
    }

    const noteCart = new noteCartModel({
      notes: note,
    });

    const saveNote = await noteCart.save();

    res.status(200).json({
      success: true,
      message: "Заметка успешно добавлена в корзину",
      note: saveNote.notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "При добавлении заметки в корзину, что-то пошло не так!",
    });
  }
};

// ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК КОТОРЫЙ БЫЛИ ПОМЕЩЕНЫ В КОРЗИНУ
module.exports.cartNote = async (req, res) => {
  try {
    const noteCart = await noteCartModel.find({}).populate("_id").exec();

    res.status(200).json({ success: true, message: null, data: noteCart });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "При получении заметок в коризине, что-то пошло не так!",
    });
  }
};
// ВОССТАНОВЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ
module.exports.recoveryNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await noteCartModel.findById(noteId).populate("_id").exec();

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Не удалось восстановить заметку, заметка не найдена",
      });
    }

    const noteRecovery = new noteModel({
      name: note.notes,
    });

    // const saveNote = await noteRecovery.save();

    res.status(200).json({
      success: true,
      message: "Заметка успешно восстановлена",
      // saveNote,
      note: note.notes,
      noteId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "При восстановлении заметки, что-то пошло не так!",
    });
  }
};
// УДАЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ БЕЗ ВОЗМОЖНОСТИ ЕЁ ВОССТАНОВЛЕНИЯ
module.exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await noteCartModel.findByIdAndDelete(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Не удалось удалить заметку, заметка не найдена",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Заметка успешно удалена", note: note });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "При удалении заметки, что-то пошло не так!",
    });
  }
};
