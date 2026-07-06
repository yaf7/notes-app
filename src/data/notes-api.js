import Swal from 'sweetalert2';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mengambil data catatan!',
      });
      return [];
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mengambil data arsip catatan!',
      });
      return [];
    }
  }

  static async createNote(title, body) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menambahkan catatan baru!',
      });
      return null;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.message;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal menghapus catatan!',
      });
      return null;
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
      });
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.message;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal mengarsipkan catatan!',
      });
      return null;
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
      });
      const responseJson = await response.json();
      
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      
      return responseJson.message;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gagal memulihkan catatan dari arsip!',
      });
      return null;
    }
  }
}

export default NotesApi;
