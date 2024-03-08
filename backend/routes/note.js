const { Router } = require("express");

const noteModel = require("../models/noteModel");

const {
  getNote,
  saveNote,
  updateNote,
  deleteNote,
  getOneNote,
  addToCart,
  cartNote,
  recoveryNote,
} = require("../controllers/noteControllers");
const checkAuth = require("../utils/checkAuth");
const { upload } = require("../controllers/uploadImd");

const router = Router();

// ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК ПОЛЬЗОВАТЕЛЯ
router.get("/notes", checkAuth, getNote, async (req, res) => {
  try {
    const { search } = req.query;
    const searchNote = await noteModel.find({ user: req.userId });
    res.send(searchNote);
  } catch (err) {
    console.log(err);
    res.send({ message: "ошибка", err });
  }
});
// СОЗДАНИЕ НОВОЙ ЗАМЕТКИ В БАЗЕ ПОЛЬЗОВАТЕЛЯ
router.post("/notes/save", checkAuth, saveNote);
// ВЫБОР ОПРЕДЕЛЕННОЙ ЗАМЕТКИ ПО ID
router.get("/notes/oneNote/:id", checkAuth, getOneNote);
// ИЗМЕНЕНИЕ ЗАМЕТКИ ПО ID
router.patch("/notes/update/:id", checkAuth, updateNote);
// ДОБАВЛЕНИЕ ЗАМЕТКИ В КОРЗИНУ
router.post("/notes/add-to-cart/:id", checkAuth, addToCart);
// ПОЛУЧЕНИЕ ЗАМЕТОК КОТОРЫЕ В ДАННЫЙ МОМЕНТ НАХОДЯТСЯ В КОРЗИНЕ
router.get("/notes/cart/note", checkAuth, cartNote);
// ВОССТАВНОВЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ ПО ID
router.post("/notes/recovery/:id", checkAuth, recoveryNote);
// УДАЛЕНИЕ ЗАМЕТКИ ПО ID
router.delete("/notes/delete/:id", checkAuth, deleteNote);
// ЗАГРУЗКА КАРТИНОК
router.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  const imageUrl = req.file
    ? `uploads/${req.file.originalname}`
    : req.body.imageUrl;
  res.json({ url: imageUrl });
});

module.exports = router;
