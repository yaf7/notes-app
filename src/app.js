import './styles/style.css';

import './components/app-bar.js';
import './components/loading-indicator.js';
import './components/note-form.js';
import './components/note-item.js';
import './components/note-list.js';

import NotesApi from './data/notes-api.js';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const noteListElement = document.querySelector('note-list');
  const loader = document.querySelector('#global-loader');
  
  const showLoading = () => loader.removeAttribute('hidden');
  const hideLoading = () => loader.setAttribute('hidden', '');

  const fetchAndRenderNotes = async () => {
    showLoading();
    const notes = await NotesApi.getNotes();
    noteListElement.notes = notes;
    hideLoading();
  };

  // Initial render
  fetchAndRenderNotes();

  // Listen for newly added notes
  document.addEventListener('note-added', async (event) => {
    const { title, body } = event.detail;
    showLoading();
    const newNote = await NotesApi.createNote(title, body);
    if (newNote) {
      await fetchAndRenderNotes();
    } else {
      hideLoading();
    }
  });

  // Listen for deleted notes
  document.addEventListener('note-deleted', async (event) => {
    const id = event.detail;
    showLoading();
    const result = await NotesApi.deleteNote(id);
    if (result) {
      await fetchAndRenderNotes();
    } else {
      hideLoading();
    }
  });

  // Listen for archived notes
  document.addEventListener('note-archived', async (event) => {
    const id = event.detail;
    showLoading();
    const result = await NotesApi.archiveNote(id);
    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Catatan berhasil diarsipkan!',
      });
      await fetchAndRenderNotes();
    } else {
      hideLoading();
    }
  });
});
