import { motion } from "framer-motion";

export default function NoteList({ note, onEdit, onDelete }) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
      whileHover={{ scale: 1.02 }}
    >
      <h2 className="text-lg font-bold">{note.title}</h2>
      <p className="text-sm mt-2">{note.content}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => onEdit(note)} className="text-blue-500">Edit</button>
        <button onClick={() => onDelete(note._id)} className="text-red-500">Delete</button>
      </div>
    </motion.div>
  );
}
