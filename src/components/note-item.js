class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Observe these attributes
  static get observedAttributes() {
    return ['id', 'title', 'body', 'created-at'];
  }

  // When an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupEventListeners();
    }
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const deleteBtn = this.shadowRoot.querySelector('.btn-delete');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        const id = this.getAttribute('id');
        this.dispatchEvent(new CustomEvent('note-deleted', {
          detail: id,
          bubbles: true,
          composed: true
        }));
      });
    }

    const archiveBtn = this.shadowRoot.querySelector('.btn-archive');
    if (archiveBtn) {
      archiveBtn.addEventListener('click', () => {
        const id = this.getAttribute('id');
        this.dispatchEvent(new CustomEvent('note-archived', {
          detail: id,
          bubbles: true,
          composed: true
        }));
      });
    }
  }

  formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  render() {
    const title = this.getAttribute('title') || 'Untitled';
    const body = this.getAttribute('body') || '';
    const createdAt = this.getAttribute('created-at') || '';
    const formattedDate = this.formatDate(createdAt);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--bg-color-alt, #1e293b);
          border-radius: 12px;
          padding: 1.5rem;
          height: 100%;
          border: 1px solid var(--border-color, #334155);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        :host(:hover) {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
          border-color: var(--accent-color, #3b82f6);
        }

        .note-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .note-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary, #f8fafc);
          line-height: 1.4;
          word-break: break-word;
        }

        .note-date {
          font-size: 0.75rem;
          color: var(--text-secondary, #94a3b8);
          margin-bottom: 1rem;
        }

        .note-body {
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          color: var(--text-primary, #e2e8f0);
          line-height: 1.6;
          white-space: pre-wrap;
          flex-grow: 1;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: auto;
        }

        .btn {
          background-color: transparent;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-delete {
          color: var(--error-color, #ef4444);
          border: 1px solid var(--error-color, #ef4444);
        }

        .btn-delete:hover {
          background-color: var(--error-color, #ef4444);
          color: white;
        }

        .btn-archive {
          color: var(--accent-color, #3b82f6);
          border: 1px solid var(--accent-color, #3b82f6);
        }

        .btn-archive:hover {
          background-color: var(--accent-color, #3b82f6);
          color: white;
        }
      </style>
      
      <div class="note-header">
        <div>
          <h3 class="note-title">${title}</h3>
          <div class="note-date">${formattedDate}</div>
        </div>
      </div>
      <p class="note-body">${body}</p>
      <div class="actions">
        <button class="btn btn-archive" type="button">Arsipkan</button>
        <button class="btn btn-delete" type="button">Hapus</button>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);
