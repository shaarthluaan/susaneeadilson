# Convite Digital — Susane Sales & Adilson Ferreira

Convite de casamento digital premium com identidade visual inspirada no caju.

---

## Estrutura do Projeto

```
proj. casamento/
├── index.html          ← Página principal
├── style.css           ← Design system completo
├── animation.js        ← Lógica de abertura e interações
├── audio.js            ← Controle de áudio
├── config.js           ← ⭐ CONFIGURAÇÕES EDITÁVEIS
└── assets/
    ├── musica.mp3      ← ⭐ INSERIR O ARQUIVO DE MÚSICA AQUI
    └── caju_botanical.jpg
```

---

## ⭐ Configurações a Editar

### 1. E-mail de Confirmação de Presença

Abra o arquivo `config.js` e substitua:

```js
rsvpEmail: "susaneadilson@gmail.com",
```

Pelo e-mail real que receberá as confirmações.

### 2. Música de Fundo

Coloque o arquivo de música na pasta `assets/` com o nome exato:

```
assets/musica.mp3
```

O áudio inicia automaticamente quando o convidado abre o convite.

### 3. Links de Mapa (opcional)

No `config.js`, os links `mapChurch` e `mapReception` podem ser ajustados para URLs exatas do Google Maps.

---

## Como Abrir

### Opção 1 — Servidor local (recomendado)
```bash
npx serve .
# ou
python -m http.server 8080
```

Então abra: `http://localhost:8080`

### Opção 2 — Abrir diretamente no navegador
Clique duas vezes em `index.html`.

> ⚠️ O áudio pode não funcionar ao abrir diretamente como arquivo `file://` em alguns navegadores. Use um servidor local para garantir o funcionamento completo.

---

## Experiência do Convidado

1. **Convite fechado** — o convidado vê o envelope com o lacre dourado "S&A"
2. **Abertura** — ao clicar, o envelope abre com animação 3D, música inicia
3. **Conteúdo revelado** — as seções surgem progressivamente:
   - Bênção e versículo (Rute 1:16–17)
   - Nomes: **Susane Sales & Adilson Ferreira**
   - Data: Sábado, 10 de outubro de 2026, às 11h
   - Local: Igreja Matriz Nossa Senhora da Conceição — Conceição da Feira, BA
   - Frase do caju
   - Recepção: Chácara das Margaridas — São Gonçalo dos Campos, BA
   - Botão de confirmação de presença

---

## Notas Técnicas

- Mobile-first · funciona de 320px a 1440px+
- Sem dependências externas além do Google Fonts
- Áudio respeita as políticas de autoplay dos navegadores
- Acessível: navegável por teclado, contraste adequado, ARIA labels
- Animação de abertura desativada automaticamente quando `prefers-reduced-motion` está ativado
