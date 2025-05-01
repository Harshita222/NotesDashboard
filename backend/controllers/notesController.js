const Note = require("../models/Note");
exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json(notes);
};

exports.addNote = async (req, res) => {
  const note = await Note.create({ ...req.body, user: req.user.id });
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Note deleted" });
};
