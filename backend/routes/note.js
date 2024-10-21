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
  subNote,
  searchNotesCart,
  PublicNote,
  getPublicNote
} = require("../controllers/noteControllers");
const checkAuth = require("../utils/checkAuth");
const { upload } = require("../controllers/uploadImd");

const router = Router();

// ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК ПОЛЬЗОВАТЕЛЯ
router.get("/api/v1/notes", checkAuth, getNote);
// СОЗДАНИЕ НОВОЙ ЗАМЕТКИ В БАЗЕ ПОЛЬЗОВАТЕЛЯ
router.post("/api/v1/notes/save", checkAuth, saveNote);
// СОЗДАНИЕ ПОДЗАМЕТКИ
router.post("/api/v1/notes/subnote/:id", checkAuth, subNote);
// ПОЛУЧЕНИЕ ОПРЕДЕЛЕННОЙ ЗАМЕТКИ ПО ID
router.get("/api/v1/notes/oneNote/:id", checkAuth, getOneNote);
// ИЗМЕНЕНИЕ ЗАМЕТКИ ПО ID
router.patch("/api/v1/notes/update/:id", checkAuth, updateNote);
// ДОБАВЛЕНИЕ ЗАМЕТКИ В КОРЗИНУ
router.post("/api/v1/notes/add-to-cart/:id", checkAuth, addToCart);
// ПОЛУЧЕНИЕ ЗАМЕТОК КОТОРЫЕ В ДАННЫЙ МОМЕНТ НАХОДЯТСЯ В КОРЗИНЕ
router.get("/api/v1/notes/cart/note", checkAuth, cartNote);
// ВОССТАВНОВЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ ПО ID
router.post("/api/v1/notes/recovery/:id", checkAuth, recoveryNote);
// УДАЛЕНИЕ ЗАМЕТКИ ПО ID
router.delete("/api/v1/notes/delete/:id", checkAuth, deleteNote);
// ЗАГРУЗКА КАРТИНОК
router.post("/api/v1/uploads", checkAuth, upload.single("image"), (req, res) => {
  const imageUrl = req.file
    ? `uploads/${req.file.originalname}`
    : req.body.imageUrl;
  res.json({ url: imageUrl });
});
// ПОИСК ЗАМЕТОК ПО ИМЕНИ
router.get("/api/v1/notes/search/:name", checkAuth, searchNotes);
// ПОИСК ЗАМЕТОК ПО КОРЗИНЕ
router.get("/api/v1/notes/search/cart/:name", checkAuth, searchNotesCart);
// Добавление заметки в публичный доступ
router.post("/api/v1/notes/public/:id", checkAuth, PublicNote);
// ПОЛУЧЕНИЕ ПУБЛИЧНОЙ ЗАМЕТКИ
router.get("/api/v1/notes/public/:id", getPublicNote);

module.exports = router;
