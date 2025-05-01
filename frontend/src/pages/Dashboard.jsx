import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api';
import NoteCard from '../components/NoteList';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  const token = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getNotes(token).then(setNotes);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = await updateNote(token, editingId, form);
      setNotes(notes.map(n => (n._id === editingId ? updated : n)));
      setEditingId(null);
    } else {
      const newNote = await createNote(token, form);
      setNotes([...notes, newNote]);
    }
    setForm({ title: '', content: '' });
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    await deleteNote(token, id);
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-400"
          >
            {editingId ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
