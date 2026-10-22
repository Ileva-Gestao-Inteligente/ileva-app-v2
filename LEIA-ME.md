# App do Consultor ileva — versão para testes

Versão independente do protótipo, pronta para hospedar como site estático.
Não precisa de backend: os dados são fictícios e o que o usuário altera fica salvo só no navegador dele.

## Conteúdo
- `index.html` — o app completo (layout, estilos e lógica).
- `proposta.html` — página que o cliente recebe pelo link da proposta: compara os planos, escolhe um, adiciona benefícios e confirma pelo WhatsApp. Os dados vão no próprio link (`#d=...`), então precisa ser publicada na mesma pasta do `index.html`.
- `vistoria.html` — página que o associado recebe pelo link da vistoria a distância: vê o exemplo de cada foto, tira as fotos pelo celular (câmera ou galeria) e envia. Os dados também vão no próprio link (`#d=...`) e as imagens de exemplo ficam em `assets/vistoria/`; publique na mesma pasta do `index.html`.
- `termo.html` — página em que o associado lê e assina o termo de filiação pelo link enviado pelo consultor. Os dados vão no próprio link (`#d=...`); publique na mesma pasta do `index.html`.
- `assets/` — imagens usadas no app.
- `nginx.conf.exemplo` — exemplo de configuração para servir no Nginx.
- `manifest.webmanifest`, `sw.js` e `assets/icones/` — fazem do app um PWA (veja abaixo).

## App instalável (PWA)
- **Instalar:** no Android/Chrome aparece o convite "Instale o app na sua tela inicial" na tela inicial; no iPhone, use Compartilhar → "Adicionar à Tela de Início". Abre em tela cheia, com ícone próprio.
- **Sem internet:** depois do primeiro acesso, o app, a página da proposta, as imagens, o React e as fontes ficam salvos no aparelho. Sem conexão o app abre normalmente e mostra o aviso "Sem internet · usando a versão salva do app". Logos de marcas e bandeiras ficam salvos conforme vão sendo vistos.
- **Atalhos do ícone:** segurando o ícone instalado aparecem Nova proposta, Propostas e Agenda.
- **Publicar versão nova:** troque `VERSAO` no topo do `sw.js`. Com internet, as páginas sempre buscam a versão mais nova; a troca de `VERSAO` renova também as imagens e os demais arquivos salvos.
- Só funciona em HTTPS (ou em `localhost`). Abrindo o `index.html` direto (file://) o app roda, mas sem instalação nem modo offline.

## Como testar localmente
Na pasta deste arquivo:

    python3 -m http.server 8080

Depois abra http://localhost:8080 no navegador. Abrir o `index.html` direto (file://) também funciona,
mas por um servidor fica mais próximo do uso real.

## Como publicar no servidor (Nginx)
1. Copie a pasta para o servidor, por exemplo `/var/www/app-consultor`.
2. Use o `nginx.conf.exemplo` como base (troque o `server_name`).
3. Recarregue o Nginx: `sudo nginx -t && sudo systemctl reload nginx`.
4. Opcional, para HTTPS: `sudo certbot --nginx -d teste.seudominio.com.br`.

## Celular x computador
- No celular (tela de toque ou largura até 520px) o app ocupa a tela inteira.
- No computador ele aparece dentro de uma moldura de celular, com um texto explicativo ao lado.
- No celular dá para "Adicionar à tela inicial" e abrir como se fosse um app.

## Dependências externas (carregadas da internet)
- React 18.3.1 (cdnjs.cloudflare.com)
- Fontes Plus Jakarta Sans e Material Symbols (fonts.googleapis.com)
- Bandeiras do seletor de país do telefone, flag-icons 7.2.3 (cdn.jsdelivr.net)
