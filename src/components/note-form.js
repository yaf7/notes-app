class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector('#add-note-form');
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const titleError = this.shadowRoot.querySelector('#title-error');
    const bodyError = this.shadowRoot.querySelector('#body-error');

    // Realtime Validation for Title
    titleInput.addEventListener('input', () => {
      if (titleInput.validity.valueMissing) {
        titleError.textContent = 'Judul tidak boleh kosong.';
        titleError.style.display = 'block';
      } else if (titleInput.validity.tooShort) {
        titleError.textContent = 'Judul minimal 3 karakter.';
        titleError.style.display = 'block';
      } else {
        titleError.style.display = 'none';
      }
    });

    // Realtime Validation for Body
    bodyInput.addEventListener('input', () => {
      if (bodyInput.validity.valueMissing) {
        bodyError.textContent = 'Isi catatan tidak boleh kosong.';
        bodyError.style.display = 'block';
      } else if (bodyInput.validity.tooShort) {
        bodyError.textContent = 'Isi catatan minimal 5 karakter.';
        bodyError.style.display = 'block';
      } else {
        bodyError.style.display = 'none';
      }
    });

    // Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (form.checkValidity()) {
        const newNote = {
          id: `notes-${Math.random().toString(36).substring(2, 9)}`,
          title: titleInput.value,
          body: bodyInput.value,
          createdAt: new Date().toISOString(),
          archived: false,
        };

        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('note-added', {
          detail: newNote,
          bubbles: true,
          composed: true
        }));

        // Reset form
        form.reset();
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--bg-color-alt, #1e293b);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border-color, #334155);
        }

        h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--text-primary, #f8fafc);
          font-size: 1.5rem;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary, #94a3b8);
          font-weight: 500;
          font-size: 0.875rem;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color, #334155);
          background-color: rgba(15, 23, 42, 0.6);
          color: var(--text-primary, #f8fafc);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        input[type="text"]:focus,
        textarea:focus {
          outline: none;
          border-color: var(--accent-color, #3b82f6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }

        .error-message {
          color: var(--error-color, #ef4444);
          font-size: 0.875rem;
          margin-top: 0.5rem;
          display: none;
        }

        button {
          background-color: var(--accent-color, #3b82f6);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          width: 100%;
        }

        button:hover {
          background-color: var(--accent-hover, #2563eb);
        }

        button:active {
          transform: translateY(1px);
        }
      </style>
      
      <h2>Buat Catatan Baru</h2>
      <form id="add-note-form">
        <div class="form-group">
          <label for="title">Judul Catatan</label>
          <input type="text" id="title" name="title" required minlength="3" autocomplete="off" placeholder="Masukkan judul...">
          <div class="error-message" id="title-error"></div>
        </div>
        
        <div class="form-group">
          <label for="body">Isi Catatan</label>
          <textarea id="body" name="body" required minlength="5" placeholder="Tulis catatan Anda di sini..."></textarea>
          <div class="error-message" id="body-error"></div>
        </div>
        
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define('note-form', NoteForm);
