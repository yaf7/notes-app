import { gsap } from 'gsap';

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._notes = [];
  }

  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  get notes() {
    return this._notes;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .note-list-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }
        
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary, #94a3b8);
          background-color: var(--bg-color-alt, #1e293b);
          border-radius: 12px;
          border: 1px dashed var(--border-color, #334155);
        }
      </style>
      
      <div class="note-list-container">
        ${this._notes.length > 0 ? '' : '<div class="empty-state">Tidak ada catatan saat ini.</div>'}
      </div>
    `;

    const container = this.shadowRoot.querySelector('.note-list-container');
    
    if (this._notes.length > 0) {
      this._notes.forEach((note, index) => {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('id', note.id);
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('created-at', note.createdAt);
        noteItem.style.opacity = '0';
        noteItem.style.transform = 'translateY(20px)';
        container.appendChild(noteItem);
      });

      // Animate with GSAP
      const noteElements = container.querySelectorAll('note-item');
      gsap.to(noteElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }
}

customElements.define('note-list', NoteList);
