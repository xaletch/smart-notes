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
  searchNotes,
} = require("../controllers/noteControllers");
const checkAuth = require("../utils/checkAuth");
const { upload } = require("../controllers/uploadImd");

const router = Router();

// ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК ПОЛЬЗОВАТЕЛЯ
router.get("/api/notes", checkAuth, getNote);
// СОЗДАНИЕ НОВОЙ ЗАМЕТКИ В БАЗЕ ПОЛЬЗОВАТЕЛЯ
router.post("/api/notes/save", checkAuth, saveNote);
// ПОЛУЧЕНИЕ ОПРЕДЕЛЕННОЙ ЗАМЕТКИ ПО ID
router.get("/api/notes/oneNote/:id", checkAuth, getOneNote);
// ИЗМЕНЕНИЕ ЗАМЕТКИ ПО ID
router.patch("/api/notes/update/:id", checkAuth, updateNote);
// ДОБАВЛЕНИЕ ЗАМЕТКИ В КОРЗИНУ
router.post("/api/notes/add-to-cart/:id", checkAuth, addToCart);
// ПОЛУЧЕНИЕ ЗАМЕТОК КОТОРЫЕ В ДАННЫЙ МОМЕНТ НАХОДЯТСЯ В КОРЗИНЕ
router.get("/api/notes/cart/note", checkAuth, cartNote);
// ВОССТАВНОВЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ ПО ID
router.post("/api/notes/recovery/:id", checkAuth, recoveryNote);
// УДАЛЕНИЕ ЗАМЕТКИ ПО ID
router.delete("/api/notes/delete/:id", checkAuth, deleteNote);
// ЗАГРУЗКА КАРТИНОК
router.post("/api/uploads", checkAuth, upload.single("image"), (req, res) => {
  const imageUrl = req.file
    ? `uploads/${req.file.originalname}`
    : req.body.imageUrl;
  res.json({ url: imageUrl });
});
// ПОИСК ЗАМЕТОК ПО ИМЕНИ
router.get("/api/notes/search/:name", checkAuth, searchNotes);

module.exports = router;
