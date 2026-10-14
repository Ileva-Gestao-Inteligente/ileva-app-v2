// Service worker mínimo: permite instalar o app na tela inicial (Android/Chrome).
// Não guarda nada em cache; as requisições seguem direto para a rede.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => { });
