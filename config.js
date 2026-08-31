/**
 * ============================================================
 * CONVITE DIGITAL — SUSANE SALES & ADILSON FERREIRA
 * Arquivo de Configuração Central
 * ============================================================
 *
 * Edite os valores abaixo para personalizar o convite.
 * Não altere a estrutura do arquivo, apenas os valores.
 * ============================================================
 */

const CONFIG = {

  // ─────────────────────────────────────────────
  // CONFIRMAÇÃO DE PRESENÇA (RSVP)
  // ─────────────────────────────────────────────

  /** E-mail que receberá as confirmações de presença */
  rsvpEmail: "susaneadilson@gmail.com",

  /** Assunto do e-mail de confirmação */
  rsvpSubject: "Confirmação de Presença — Casamento Susane & Adilson",

  /** Corpo da mensagem pré-preenchida (o convidado poderá editar) */
  rsvpBody: `Olá, Susane e Adilson!

Confirmo minha presença na celebração do casamento de vocês no dia 10 de outubro de 2026.

Nome(s): 
Número de acompanhantes: 

Com carinho,`,

  // ─────────────────────────────────────────────
  // MÚSICA DE FUNDO
  // ─────────────────────────────────────────────

  /** Caminho para o arquivo de música (coloque musica.mp3 na pasta assets/) */
  musicPath: "./assets/musica.mp3", // ← garantir que o arquivo existe

  /** Volume inicial da música (0.0 a 1.0) */
  musicVolume: 0.35,

  // ─────────────────────────────────────────────
  // LOCALIZAÇÃO — LINKS DE MAPA
  // ─────────────────────────────────────────────

  /** Link do Google Maps para a Igreja */
  mapChurch: "https://maps.google.com/?q=Igreja+Matriz+Nossa+Senhora+da+Conceicao+Conceicao+da+Feira+BA", // ← ajustar se necessário

  /** Link do Google Maps para a Chácara */
  mapReception: "https://maps.google.com/?q=Rodovia+BA-502+82+Sao+Goncalo+dos+Campos+BA", // ← ajustar se necessário

};

// Torna CONFIG disponível globalmente
window.CONFIG = CONFIG;
