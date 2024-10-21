// ИМПОРТИРУЕМ МОДЕЛИ ДЛЯ ЗАПИСИ ДАННЫХ В БД
const noteModel = require("../models/noteModel");
const noteCartModel = require("../models/noteCartModel");
const subNoteModel = require("../models/subNoteModel");

// ВЛОЖЕННОСТЬ ЗАМЕТОК ДО 30
function generatePopulateQuery(level, path, populate) {
  if (level === 0) {
    return populate;
  }
  return {
    path,
    populate: generatePopulateQuery(level - 1, path, populate),
  };
}

// ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК ПОЛЬЗОВАТЕЛЯ
module.exports.getNote = async (req, res) => {
  try {
    // ВОТ ЭТО Я НАГАВНАКОДИЛ
    const notes = await noteModel
      .find({ user: req.userId })
      .populate({
        path: "subnotes",
        populate: generatePopulateQuery(30, "subnotes", { path: "subnotes" }),
      })
      .exec();

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Возникла ошибка при получении заметок",
    });
  }
};

// ПОЛУЧЕНИЕ ОДНОЙ ЗАМЕТКИ ПО ЕЁ ПОЛЮ ID
module.exports.getOneNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Promise.all([
      noteModel.findById({ _id: noteId }),
      subNoteModel.findById({ _id: noteId }),
    ]);

    const foundNote = note.find((note) => note !== null);

    if (!foundNote) {
      return res.status(404).json({
        success: false,
        message: "Не удалось получить данные о выбранной заметке",
      });
    }

    res.status(200).send(foundNote);
  } catch (err) {
    res.status(500).json({
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
      createNote: new Date().toLocaleString("en-US", {
        timeZone: "Europe/Moscow",
      }),
      subnotes: req.body.subnotes,
      user: req.userId,
      isPublic: false,
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

// СОЗДАНИЕ ПОДЗАМЕТКИ
module.exports.subNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const parentNote = await Promise.all([
      noteModel.findById(noteId).populate("subnotes").exec(),
      subNoteModel.findById(noteId).populate("subnotes").exec(),
    ]);

    const foundNote = parentNote.find((note) => note !== null);

    if (!foundNote) {
      return res
        .status(404)
        .json({ success: false, message: "Заметка не найдена" });
    }

    const newSubNote = new subNoteModel({
      name: req.body.name,
      smile: req.body.smile,
      imageUrl: req.body.imageUrl,
      blocks: req.body.blocks,
      createNote: new Date().toLocaleString("en-US", {
        timeZone: "Europe/Moscow",
      }),
      user: req.userId,
      isPublic: false,
    });

    const savedSubNote = await newSubNote.save();

    foundNote.subnotes.push(savedSubNote._id);
    await foundNote.save();

    res.status(201).json({
      success: true,
      message: "Подзаметка успешно создана",
      note: newSubNote,
      noteId,
    });
  } catch (err) {
    res
      .status(500)
      .json({ require: false, message: "Ошибка при создании подзаметки" });
  }
};

// ОБНОВЛЕНИЕ ЗАМЕТКИ (НОВОЕ ИМЯ, СМАЙЛ, КАРТИНКА, ТЕКСТ)
module.exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Promise.all([
      noteModel.updateOne(
        {
          _id: noteId,
        },
        {
          name: req.body.name,
          smile: req.body.smile,
          imageUrl: req.body.imageUrl,
          blocks: req.body.blocks,
        }
      ),
      subNoteModel.updateOne(
        {
          _id: noteId,
        },
        {
          name: req.body.name,
          smile: req.body.smile,
          imageUrl: req.body.imageUrl,
          blocks: req.body.blocks,
        }
      ),
    ]);

    const foundNote = note.find((note) => note !== null);

    if (!foundNote) {
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

    const note = await Promise.all([
      noteModel.findById(noteId),
      subNoteModel.findById(noteId),
    ]);

    const foundNote = note.find((note) => note !== null);

    if (!foundNote) {
      return res.status(404).json({
        success: false,
        message: "Заметка не найдена",
      });
    }

    const deleteNote = await Promise.all([
      noteModel.findByIdAndDelete(noteId),
      subNoteModel.findByIdAndDelete(noteId),
    ]);

    if (!deleteNote) {
      return res.status(404).json({
        success: false,
        message: "Не удалось удалить заметку",
      });
    }

    const noteCart = new noteCartModel({
      name: foundNote.name,
      smile: foundNote.smile,
      imageUrl: foundNote.imageUrl,
      blocks: foundNote.blocks,
      subnotes: foundNote.subnotes,
      user: req.userId,
    });

    const saveNote = await noteCart.save();

    res.status(200).json({
      success: true,
      message: "Заметка успешно добавлена в корзину",
      note: saveNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "При добавлении заметки в корзину что-то пошло не так",
    });
  }
};

// ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК КОТОРЫЙ БЫЛИ ПОМЕЩЕНЫ В КОРЗИНУ
module.exports.cartNote = async (req, res) => {
  try {
    const noteCart = await noteCartModel
      .find({ user: req.userId })
      .populate()
      .exec();

    res.status(200).json({
      success: true,
      message: null,
      data: noteCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "При получении заметок в корзине, что-то пошло не так!",
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

    const delNote = await noteCartModel.findByIdAndDelete(noteId);

    if (!delNote) {
      return res.status(404).json({
        success: false,
        message: "Не удалось удалить заметку",
      });
    }

    const noteRecovery = new noteModel({
      name: note.name,
      smile: note.smile,
      imageUrl: note.imageUrl,
      blocks: note.blocks,
      subnotes: note.subnotes,
      user: req.userId,
    });

    const saveNote = await noteRecovery.save();

    res.status(200).json({
      success: true,
      message: "Заметка успешно восстановлена",
      saveNote,
      note: note,
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

// ПОИСК ВСЕХ ЗАМЕТОК
module.exports.searchNotes = async (req, res) => {
  try {
    const searchName = req.params.name;
    const note = await noteModel.find({ user: req.userId });

    const searchNote = note.filter((noteName) => {
      return noteName.name.toLowerCase().includes(searchName.toLowerCase());
    });

    res.status(200).send(searchNote);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Не удалось найти заметку, что-то пошло не так!",
    });
  }
};

// ПОИСК ЗАМЕТОК ПО КОРЗИНЕ
module.exports.searchNotesCart = async (req, res) => {
  try {
    const searchName = req.params.name;
    const note = await noteCartModel.find({ user: req.userId });

    const searchNote = note.filter((noteName) => {
      return noteName.name.toLowerCase().includes(searchName.toLowerCase());
    });

    res.status(200).send(searchNote);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Не удалось найти заметку, что-то пошло не так!",
    });
  }
};

module.exports.PublicNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublic } = req.body;

    const note = await noteModel.findById(id);
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Пользователь не авторизован" });
    }

    if (!note) {
      return res.status(404).json({ success: false, message: "Заметка не найдена" }); 
    }

    if (String(note.user) !== String(req.userId)) {
      return res.status(403).json({ success: false, message: "Недостаточно прав" });
    }

    note.isPublic = isPublic;
    await note.save();

    res.status(200).json({ success: true, message: "Заметка открыта для просмотра", data: note });
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Что-то пошло не так" });
    console.error(err);
  }
}

module.exports.getPublicNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);

    if (!note || (!note.isPublic && (!req.user || String(note.userId) !== String(req.user._id)))) {
      return res.status(404).json({ success: false, message: "Заметка не найдена или доступ запрещен" });
    }

    res.status(200).json({ success: true, message: "Заметка для просмотра", data: note });
  }
  catch(err) {
    res.status(500).json({ success: false, message: "Что-то пошло не так" });
    console.error(err);
  }
}