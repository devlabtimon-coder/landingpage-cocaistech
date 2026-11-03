import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/figtree';
import '@fontsource/saira/600.css';
import '@fontsource/saira/800.css';
import '@fontsource/saira/900.css';
import '../index.css';
import { LegalPage } from './LegalPage';

// Cada HTML (ludus/termos, ludus/privacidade) diz qual documento mostrar em data-doc.
const root = document.getElementById('root')!;
const docId = root.dataset.doc === 'privacidade' ? 'privacidade' : 'termos';

createRoot(root).render(
  <StrictMode>
    <LegalPage docId={docId} />
  </StrictMode>,
);
