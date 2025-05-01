const API_URL = 'http://localhost:5000/api/notes';
export async function getNotes(token) {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function createNote(token, noteData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(noteData)
  });
  return res.json();
}

export async function updateNote(token, noteId, noteData) {
  const res = await fetch(`${API_URL}/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(noteData)
  });
  return res.json();
}

export async function deleteNote(token, noteId) {
  await fetch(`${API_URL}/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
