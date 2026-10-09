# App do Consultor ileva — versão para testes

Versão independente do protótipo, pronta para hospedar como site estático.
Não precisa de backend: os dados são fictícios e o que o usuário altera fica salvo só no navegador dele.

## Conteúdo
- `index.html` — o app completo (layout, estilos e lógica).
- `assets/` — imagens usadas no app.
- `nginx.conf.exemplo` — exemplo de configuração para servir no Nginx.

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
