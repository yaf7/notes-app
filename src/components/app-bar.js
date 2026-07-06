class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: var(--bg-color-alt, #1e293b);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .app-bar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h1 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary, #f8fafc);
          letter-spacing: -0.025em;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        @media (max-width: 768px) {
          .app-bar {
            padding: 1rem;
          }
          h1 {
            font-size: 1.5rem;
          }
        }
      </style>
      
      <header class="app-bar">
        <h1>NotesApp</h1>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);
