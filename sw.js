// Service worker do App do Consultor: deixa o app instalável e funcionando sem internet.
// Ao publicar uma versão nova, troque VERSAO para os aparelhos baixarem os arquivos de novo.
const VERSAO = 'v65-2026-10-22';
const CACHE_APP = 'ileva-app-' + VERSAO;
const CACHE_EXTERNO = 'ileva-externo-' + VERSAO;

const ARQUIVOS_APP = [
  './',
  'index.html',
  'proposta.html',
  'vistoria.html',
  'termo.html',
  'manifest.webmanifest',
  'assets/icones/apple-touch-icon.png',
  'assets/icones/icone-192.png',
  'assets/icones/icone-512.png',
  'assets/icones/icone-maskable-512.png',
  'assets/foto-perfil.jpg',
  'assets/logo-ileva.png',
  'assets/peca-bateu.jpg',
  'assets/peca-heroi.jpg',
  'assets/qr-captacao.svg',
  'assets/whatsapp-branco.svg',
  'assets/whatsapp-contorno.svg',
  'assets/whatsapp-verde.svg',
  'assets/vistoria/cnh.jpg',
  'assets/vistoria/comprovante-endereco.jpg',
  'assets/vistoria/crlv.jpg',
  'assets/vistoria/frente.jpg',
  'assets/vistoria/lateral-frente-direita.jpg',
  'assets/vistoria/lateral-frente-esquerda.jpg',
  'assets/vistoria/traseira.jpg',
  'assets/veiculos/carro.png',
  'assets/veiculos/moto.png',
  'assets/veiculos/caminhao.png',
  'assets/veiculos/carro-card.webp',
  'assets/veiculos/moto-card.webp',
  'assets/veiculos/caminhao-card.webp'
];

// React, fontes, bandeiras e logos de marcas vêm de CDNs; ficam guardados depois do primeiro uso.
const HOSTS_EXTERNOS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net', 'www.gstatic.com'];
const ARQUIVOS_EXTERNOS = [
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const app = await caches.open(CACHE_APP);
    await app.addAll(ARQUIVOS_APP);
    const externo = await caches.open(CACHE_EXTERNO);
    await Promise.all(ARQUIVOS_EXTERNOS.map((url) => externo.add(url).catch(() => { })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.filter((n) => n.startsWith('ileva-') && n !== CACHE_APP && n !== CACHE_EXTERNO).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

// Páginas: tenta a rede primeiro (para sempre ver a última versão) e usa a cópia guardada sem internet.
async function pagina(request) {
  const cache = await caches.open(CACHE_APP);
  try {
    const resposta = await fetch(request);
    if (resposta.ok) cache.put(request, resposta.clone());
    return resposta;
  } catch (err) {
    const url = new URL(request.url);
    return (await cache.match(request, { ignoreSearch: true }))
      || (url.pathname.endsWith('proposta.html') ? cache.match('proposta.html') : url.pathname.endsWith('vistoria.html') ? cache.match('vistoria.html') : url.pathname.endsWith('termo.html') ? cache.match('termo.html') : cache.match('index.html'));
  }
}

// Arquivos: entrega a cópia guardada na hora e atualiza em segundo plano.
async function arquivo(request, nomeCache) {
  const cache = await caches.open(nomeCache);
  const guardado = await cache.match(request);
  const rede = fetch(request)
    .then((resposta) => {
      if (resposta.ok || resposta.type === 'opaque') cache.put(request, resposta.clone());
      return resposta;
    })
    .catch(() => guardado);
  return guardado || rede;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (request.mode === 'navigate' || request.destination === 'document') event.respondWith(pagina(request));
    else event.respondWith(arquivo(request, CACHE_APP));
    return;
  }
  if (HOSTS_EXTERNOS.includes(url.hostname)) event.respondWith(arquivo(request, CACHE_EXTERNO));
});
