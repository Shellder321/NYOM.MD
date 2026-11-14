const $ = (selector, root = document) => root.querySelector(selector);
const API_BASE = String(window.NYOM_API_BASE || '').replace(/\/$/, '');
const state = { user: null, guilds: [], guild: null, config: null, captchaConfig: null, premium: null, community: null, ticketDraft: null, ticketResources: {}, gameLeaderboard: [], commandCatalog: [], view: 'servers', pendingGuild: false, ownerAccess: false, ownerStatus: null, ownerVips: [], ownerLookup: null, ownerLoading: false, creators: [], ownerBans: [], ownerAudit: [], language: 'pt-BR' };
const INVITE_URL = '/invite';
const COMMUNITY_URL = 'https://discord.gg/68zNmn5wMF';
const titles = { servers: 'Seus servidores', overview: 'Visão geral', automod: 'AutoMod', security: 'Segurança', captcha: 'CAPTCHA', tickets: 'Tickets', logs: 'Central de logs', commands: 'Comandos', games: 'Jogos', owner: 'Painel Owner', premium: 'Premium', settings: 'Configurações', credits: 'Créditos' };
const content = $('#content');
const ICONS = { sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>', moon: '<svg viewBox="0 0 24 24"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/></svg>', music: '<svg viewBox="0 0 24 24"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>', pause: '<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>', external: '<svg viewBox="0 0 24 24"><path d="M14 5h5v5M19 5l-9 9"/><path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"/></svg>', shield: '<svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/></svg>', info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>', link: '<svg viewBox="0 0 24 24"><path d="M9 15 15 9M8 18H6a4 4 0 0 1 0-8h4M16 6h2a4 4 0 0 1 0 8h-4"/></svg>' };
const translations = {
  en: {
    'Servidores':'Servers','Visão geral':'Overview','Segurança':'Security','Central de logs':'Logs center','Comandos':'Commands','Jogos':'Games','Painel Owner':'Owner panel','Créditos':'Credits','Configurações':'Settings','ESPAÇO DE TRABALHO':'WORKSPACE','SERVIDOR ATIVO':'ACTIVE SERVER','GERENCIAMENTO':'MANAGEMENT','CONTA':'ACCOUNT','Painel conectado':'Dashboard connected','Não conectado':'Not connected','Sua conta Discord':'Your Discord account','Abrir menu':'Open menu','Fechar menu':'Close menu','Idioma':'Language','Sair':'Log out','Entrar com Discord':'Log in with Discord','Proteção inteligente para comunidades':'Smart protection for communities','Proteção do servidor':'SERVER PROTECTION','Proteção avançada':'Advanced protection','ATENDIMENTO':'SUPPORT','Central de tickets':'Ticket center','Selecione um servidor com o NYOM instalado para configurar a verificação.':'Select a server with NYOM installed to configure verification.','Configuração':'Configuration','Tickets ativados':'Tickets enabled','Painel de atendimento':'Support panel','Conteúdo exibido no Discord.':'Content shown on Discord.','Título':'Title','Cor do embed':'Embed color','Descrição':'Description','Rodapé':'Footer','URL da imagem':'Image URL','URL da thumbnail':'Thumbnail URL','Interação':'Interaction','Escolha como os membros iniciam um atendimento.':'Choose how members start a support request.','Tipo de interação':'Interaction type','Botão':'Button','Menu de categorias':'Category menu','Texto do botão':'Button text','Estilo do botão':'Button style','Azul':'Blue','Cinza':'Gray','Verde':'Green','Vermelho':'Red','Texto do menu':'Menu text','Categorias do menu':'Menu categories','＋ Adicionar categoria':'＋ Add category','Adicione categorias para o menu.':'Add categories to the menu.','Até 25 opções.':'Up to 25 options.','Configuração dos tickets':'Ticket settings','Organização e mensagem enviada ao abrir.':'Organization and message sent when opened.','Prefixo do canal':'Channel prefix','Sem categoria':'No category','Limite aberto por usuário':'Open ticket limit per user','Canal de logs':'Logs channel','Não definido':'Not set','Cargos da equipe':'Staff roles','Nenhum cargo disponível.':'No roles available.','Título de boas-vindas':'Welcome title','Rótulo para fechar':'Close label','Rótulo para reabrir':'Reopen label','Mensagem de boas-vindas':'Welcome message','Ativar suporte por IA':'Enable AI support','Gerar transcript ao fechar':'Generate transcript when closed','Pré-visualização':'Preview','Prévia aproximada do painel no Discord.':'Approximate preview of the Discord panel.','Publicar painel':'Publish panel','Selecione o canal em que o painel será enviado.':'Select the channel where the panel will be sent.','Canal de publicação':'Publishing channel','Escolha um canal':'Choose a channel','Publicar no Discord':'Publish to Discord','Salvar configurações':'Save settings','Valor':'Value','Nome exibido':'Display name','Remover':'Remove','Nome da categoria':'Category name','Descrição da categoria':'Category description','Avatar do embed':'Embed avatar','Thumbnail do embed':'Embed thumbnail','Imagem do embed':'Embed image','Nova categoria':'New category','O menu aceita no máximo 25 categorias.':'The menu allows up to 25 categories.','Servidor não identificado.':'Server not identified.','Selecione o canal onde publicar.':'Select the channel to publish to.','Não foi possível salvar as configurações.':'Could not save settings.','Não foi possível publicar o painel.':'Could not publish the panel.','Configurações de tickets salvas com sucesso.':'Ticket settings saved successfully.','Configuração salva e painel publicado com sucesso.':'Settings saved and panel published successfully.','Pesquisar':'Search','Categoria':'Category','Todos':'All','Moderação':'Moderation','Administração':'Administration','Utilidades':'Utilities','Música':'Music','Nome, função ou opção…':'Name, function, or option…','Nenhum cargo':'No role','Selecione um cargo':'Select a role','Ativo':'Active','Desativado':'Disabled','Salvar segurança':'Save security','Salvar configuração':'Save settings','Publicar / atualizar painel':'Publish / update panel','Salvar…':'Saving…','Publicando…':'Publishing…','Criando…':'Creating…','Apagando…':'Deleting…','Geral':'General','Mensagens':'Messages','Entrada':'Join','Saída':'Leave','Registro de auditoria':'Audit log','Castigo':'Timeout','Banimentos':'Bans','Recriar / atualizar':'Recreate / update','Criar canais':'Create channels','Desativar e apagar':'Disable and delete','Canais associados':'Linked channels','Nenhuma categoria':'No category'
  },
  es: {
    'Servidores':'Servidores','Visão geral':'Resumen','Segurança':'Seguridad','Central de logs':'Centro de registros','Comandos':'Comandos','Jogos':'Juegos','Painel Owner':'Panel Owner','Créditos':'Créditos','Configurações':'Configuración','ESPAÇO DE TRABALHO':'ESPACIO DE TRABAJO','SERVIDOR ATIVO':'SERVIDOR ACTIVO','GERENCIAMENTO':'ADMINISTRACIÓN','CONTA':'CUENTA','Painel conectado':'Panel conectado','Não conectado':'No conectado','Sua conta Discord':'Tu cuenta de Discord','Abrir menu':'Abrir menú','Fechar menu':'Cerrar menú','Idioma':'Idioma','Sair':'Salir','Entrar com Discord':'Iniciar sesión con Discord','Proteção inteligente para comunidades':'Protección inteligente para comunidades','PROTEÇÃO DO SERVIDOR':'PROTECCIÓN DEL SERVIDOR','Proteção avançada':'Protección avanzada','ATENDIMENTO':'SOPORTE','Central de tickets':'Centro de tickets','Selecione um servidor com o NYOM instalado para configurar a verificação.':'Selecciona un servidor con NYOM instalado para configurar la verificación.','CONFIGURAÇÃO':'CONFIGURACIÓN','Tickets ativados':'Tickets activados','Painel de atendimento':'Panel de soporte','Conteúdo exibido no Discord.':'Contenido mostrado en Discord.','Título':'Título','Cor do embed':'Color del embed','Descrição':'Descripción','Rodapé':'Pie de página','URL da imagem':'URL de imagen','URL da thumbnail':'URL de miniatura','Interação':'Interacción','Escolha como os membros iniciam um atendimento.':'Elige cómo los miembros inician una solicitud de soporte.','Tipo de interação':'Tipo de interacción','Botão':'Botón','Menu de categorias':'Menú de categorías','Texto do botão':'Texto del botón','Estilo do botão':'Estilo del botón','Azul':'Azul','Cinza':'Gris','Verde':'Verde','Vermelho':'Rojo','Texto do menu':'Texto del menú','Categorias do menu':'Categorías del menú','＋ Adicionar categoria':'＋ Añadir categoría','Adicione categorias para o menu.':'Añade categorías al menú.','Até 25 opções.':'Hasta 25 opciones.','Configuração dos tickets':'Configuración de tickets','Organização e mensagem enviada ao abrir.':'Organización y mensaje enviado al abrir.','Prefixo do canal':'Prefijo del canal','Sem categoria':'Sin categoría','Limite aberto por usuário':'Límite abierto por usuario','Canal de logs':'Canal de registros','Não definido':'No definido','Cargos da equipe':'Roles del equipo','Nenhum cargo disponível.':'No hay roles disponibles.','Título de boas-vindas':'Título de bienvenida','Rótulo para fechar':'Etiqueta para cerrar','Rótulo para reabrir':'Etiqueta para reabrir','Mensagem de boas-vindas':'Mensaje de bienvenida','Ativar suporte por IA':'Activar soporte con IA','Gerar transcript ao fechar':'Generar transcripción al cerrar','Pré-visualização':'Vista previa','Prévia aproximada do painel no Discord.':'Vista aproximada del panel en Discord.','Publicar painel':'Publicar panel','Selecione o canal em que o painel será enviado.':'Selecciona el canal donde se enviará el panel.','Canal de publicação':'Canal de publicación','Escolha um canal':'Elige un canal','Publicar no Discord':'Publicar en Discord','Salvar configurações':'Guardar configuración','Valor':'Valor','Nome exibido':'Nombre mostrado','Remover':'Eliminar','Nome da categoria':'Nombre de categoría','Descrição da categoria':'Descripción de categoría','Nova categoria':'Nueva categoría','O menu aceita no máximo 25 categorias.':'El menú admite un máximo de 25 categorías.','Servidor não identificado.':'Servidor no identificado.','Selecione o canal onde publicar.':'Selecciona el canal donde publicar.','Não foi possível salvar as configurações.':'No se pudo guardar la configuración.','Não foi possível publicar o painel.':'No se pudo publicar el panel.','Configurações de tickets salvas com sucesso.':'Configuración de tickets guardada correctamente.','Configuração salva e painel publicado com sucesso.':'Configuración guardada y panel publicado correctamente.','Pesquisar':'Buscar','Categoria':'Categoría','Todos':'Todos','Moderação':'Moderación','Administração':'Administración','Utilidades':'Utilidades','Música':'Música','Nome, função ou opção…':'Nombre, función u opción…','Selecione um cargo':'Selecciona un rol','Ativo':'Activo','Desativado':'Desactivado','Salvar segurança':'Guardar seguridad','Salvar configuração':'Guardar configuración','Publicar / atualizar painel':'Publicar / actualizar panel','Salvar…':'Guardando…','Publicando…':'Publicando…','Criando…':'Creando…','Apagando…':'Eliminando…','Geral':'General','Mensagens':'Mensajes','Entrada':'Entrada','Saída':'Salida','Registro de auditoria':'Registro de auditoría','Castigo':'Sanción','Banimentos':'Expulsiones','Recriar / atualizar':'Recrear / actualizar','Criar canais':'Crear canales','Desativar e apagar':'Desactivar y eliminar','Canais associados':'Canales asociados'
  }
};
for (const [lang, values] of Object.entries({
  en: {'SORTEIO':'GIVEAWAY','SORTEIOS':'Giveaways','Criar sorteio':'Create giveaway','Sorteios exigem o VIP ativo.':'Giveaways require active VIP owned by the server owner. /painelsujestions also requires owner VIP.','VIP do dono':'OWNER VIP','Recurso disponível para servidores com VIP.':'Available to servers with VIP.','Peça ao dono do servidor para ativar o VIP. Nenhum pagamento pode ser realizado por este painel.':'Ask the server owner to activate VIP. No payment can be made through this dashboard.','Título':'Title','Prêmio':'Prize','Mensagem':'Message','Cargo elegível (opcional)':'Eligible role (optional)','Cargo com chances extras (opcional)':'Bonus-entries role (optional)','Multiplicador (opcional)':'Multiplier (optional)','Prazo em horas':'Duration in hours','Banner (URL, opcional)':'Banner (URL, optional)','Canal do sorteio (opcional)':'Giveaway channel (optional)','Quantidade de ganhadores':'Number of winners','Texto do botão':'Button label','Cor':'Color','Publicar sorteio':'Publish giveaway','Sorteio publicado.':'Giveaway published.','Interesse registrado. Nenhuma compra ou pagamento foi realizado.':'Interest submitted. No purchase or payment was made.','Nenhum':'None','Canal atual':'Current channel','Publicar inicia o sorteio no servidor; revise os dados antes de enviar.':'Publishing starts the giveaway on this server; review details before submitting.','Sorteios exigem VIP ativo do dono.':'Giveaways require active server-owner VIP.','/painelsujestions e sorteios exigem o VIP ativo.':'/painelsujestions and giveaways require active VIP.'},
  es: {'SORTEIO':'SORTEO','SORTEIOS':'Sorteos','Criar sorteio':'Crear sorteo','Sorteios exigem o VIP ativo.':'Los sorteos requieren VIP activo del propietario del servidor. /painelsujestions también requiere VIP del propietario.','VIP do dono':'VIP DEL PROPIETARIO','Recurso disponível para servidores com VIP.':'Disponible para servidores con VIP.','Peça ao dono do servidor para ativar o VIP. Nenhum pagamento pode ser realizado por este painel.':'Pide al propietario del servidor que active el VIP. No se puede realizar ningún pago desde este panel.','Título':'Título','Prêmio':'Premio','Mensagem':'Mensaje','Cargo elegível (opcional)':'Rol elegible (opcional)','Cargo com chances extras (opcional)':'Rol con participaciones extra (opcional)','Multiplicador (opcional)':'Multiplicador (opcional)','Prazo em horas':'Duración en horas','Banner (URL, opcional)':'Banner (URL, opcional)','Canal do sorteio (opcional)':'Canal del sorteo (opcional)','Quantidade de ganhadores':'Cantidad de ganadores','Texto do botão':'Texto del botón','Cor':'Color','Publicar sorteio':'Publicar sorteo','Sorteio publicado.':'Sorteo publicado.','Interesse registrado. Nenhuma compra ou pagamento foi realizado.':'Interés registrado. No se realizó ninguna compra ni pago.','Nenhum':'Ninguno','Canal atual':'Canal actual','Publicar inicia o sorteio no servidor; revise os dados antes de enviar.':'Al publicar se inicia el sorteo en el servidor; revisa los datos antes de enviar.','Sorteios exigem VIP ativo do dono.':'Los sorteos requieren VIP activo del propietario.','/painelsujestions e sorteios exigem VIP ativo do dono do servidor.':'/painelsujestions y los sorteos requieren VIP activo del propietario del servidor.'}
})) Object.assign(translations[lang], values);
const originalText = new WeakMap(), originalAttributes = new WeakMap();
function translateInterface(root = document) {
  const dict = translations[state.language];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) { if (node.parentElement?.closest('.nte-embed,.nte-fake-control,.nte-discord-top,.creator-card,.server-identity,.server-card,.owner-vip-row')) continue; if (!originalText.has(node)) originalText.set(node,node.nodeValue); const original=originalText.get(node), source=original.trim(); node.nodeValue=dict?.[source] ? original.replace(source,dict[source]) : original; }
  root.querySelectorAll?.('[aria-label],[title],[placeholder]').forEach(el => ['aria-label','title','placeholder'].forEach(attr => { if(!originalAttributes.has(el)) originalAttributes.set(el,{}); const saved=originalAttributes.get(el); if(!(attr in saved)) saved[attr]=el.getAttribute(attr); const value=saved[attr]; if(value!=null) el.setAttribute(attr,dict?.[value]||value); }));
}
function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }
function toast(message) { const box = $('#toast'); box.textContent = message; box.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => box.classList.remove('show'), 3300); }
function guildIcon(g) { return g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128` : ''; }
function setGuildHeader() {
  const name = state.guild?.name || 'Selecione um servidor';
  $('#guild-name').textContent = name;
  $('#guild-icon').innerHTML = state.guild?.icon ? `<img src="${guildIcon(state.guild)}" alt="">` : escapeHtml(name.slice(0, 1).toUpperCase() || 'N');
}
function renderAccount() {
  const loggedIn = Boolean(state.user);
  const loginButton = $('#login-button');
  if (loginButton) loginButton.href = `${API_BASE}/auth/discord`;
  $('#login-button').classList.toggle('hidden', loggedIn);
  $('#logout-button').classList.toggle('hidden', !loggedIn);
  $('#header-profile').classList.toggle('hidden', !loggedIn);
  $('#owner-nav')?.classList.toggle('hidden', !loggedIn || !state.ownerAccess);
  if (!loggedIn) {
    $('#account-name').textContent = 'Não conectado';
    $('#account-sub').textContent = 'Sua conta Discord';
    $('#account-avatar').textContent = 'N';
    return;
  }
  const userName = state.user.global_name || state.user.username || 'Discord';
  $('#account-name').textContent = userName;
  $('#account-sub').textContent = `${state.guilds.length} servidor${state.guilds.length === 1 ? '' : 'es'} na sua conta`;
  $('#header-name').textContent = userName;
  const image = state.user.avatar ? `https://cdn.discordapp.com/avatars/${encodeURIComponent(state.user.id)}/${encodeURIComponent(state.user.avatar)}.png?size=80` : '';
  const avatarMarkup = image ? `<img src="${image}" alt="Avatar de ${escapeHtml(userName)}">` : escapeHtml(userName.slice(0, 1).toUpperCase());
  $('#account-avatar').innerHTML = avatarMarkup;
  $('#header-avatar').innerHTML = avatarMarkup;
}
function inviteForGuild(guildId) {
  const invite = new URL(INVITE_URL, window.location.origin);
  invite.searchParams.set('guild_id', guildId);
  return invite.toString();
}
function serverCard(g, index = 0) {
  const installed = g.botPresent === true;
  const canManage = g.canManage === true;
  let action;
  if (installed && canManage) action = `<button class="server-action configure" type="button" data-configure="${escapeHtml(g.id)}"><span>Configurar</span><span aria-hidden="true">→</span></button>`;
  else if (!installed && canManage) action = `<a class="server-action invite" href="${escapeHtml(inviteForGuild(g.id))}" target="_blank" rel="noopener noreferrer"><span>Convidar</span><span aria-hidden="true">↗</span></a>`;
  else action = `<button class="server-action unavailable" type="button" disabled>${installed ? 'Sem acesso' : 'Precisa de admin'}</button>`;
  const icon = g.icon ? `<img src="${guildIcon(g)}" alt="">` : escapeHtml((g.name || 'N').slice(0, 1).toUpperCase());
  const status = installed ? (canManage ? 'Configurar servidor' : 'NYOM instalado · sem permissão de gestão') : (canManage ? 'NYOM ainda não está neste servidor' : 'Gerenciar Servidor necessário');
  return `<article class="server-card ${installed ? 'server-installed' : 'server-missing'}" style="--card-delay:${Math.min(index, 14) * 45}ms"><span class="guild-icon server-card-icon">${icon}</span><span class="server-copy"><strong>${escapeHtml(g.name || 'Servidor Discord')}</strong><small>${escapeHtml(status)}</small></span>${action}</article>`;
}
function bindServerCards() {
  document.querySelectorAll('[data-configure]').forEach(button => button.addEventListener('click', () => selectGuild(button.dataset.configure)));
}
async function selectGuild(id) {
  const found = state.guilds.find(g => g.id === id);
  if (!found || !found.botPresent || !found.canManage) return toast('Só é possível configurar um servidor com o NYOM instalado e permissão de gerenciamento.');
  state.guild = found; state.community = null; state.config = null; state.captchaConfig = null; state.pendingGuild = true; state.view = 'overview';
  closeMobileMenu(); setGuildHeader(); render();
  try {
    const [config, tickets, resources, leaderboard, captcha, community] = await Promise.all([api(`/api/guilds/${encodeURIComponent(id)}`), api(`/api/guilds/${encodeURIComponent(id)}/tickets`), api(`/api/guilds/${encodeURIComponent(id)}/resources`), api(`/api/guilds/${encodeURIComponent(id)}/games/leaderboard`), api(`/api/guilds/${encodeURIComponent(id)}/captcha`), api(`/api/guilds/${encodeURIComponent(id)}/community`).catch(()=>({welcome:{},suggestion:{}}))]);
    state.config = config; state.captchaConfig = captcha.config; state.guildPremiumAccess = config.premiumAccess || null; state.community = community; state.ticketDraft = tickets.config; state.ticketResources = resources; state.gameLeaderboard = leaderboard.entries || []; state.pendingGuild = false;
    render();
  } catch (error) {
    state.guild = null; state.config = null; state.pendingGuild = false; state.view = 'servers'; render(); toast(error.message);
  }
}
function goHome() {
  state.guild = null; state.community = null; state.config = null; state.captchaConfig = null; state.ticketDraft = null; state.ticketResources = {}; state.gameLeaderboard = []; state.pendingGuild = false; state.view = 'servers';
  setGuildHeader(); closeMobileMenu(); render();
}
function closeMobileMenu() {
  $('#sidebar').classList.remove('open'); $('#app-shell').classList.remove('menu-open'); $('#mobile-menu').setAttribute('aria-expanded', 'false'); $('#mobile-menu').setAttribute('aria-label', 'Abrir menu');
}
async function api(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, { credentials: API_BASE ? 'include' : 'same-origin', ...options, headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) } });
  let data = {}; try { data = await response.json(); } catch {}
  if (!response.ok) { const error = new Error(data.error || `Falha na solicitação (${response.status}).`); error.status = response.status; throw error; }
  return data;
}
function header(kicker, title, subtitle, badge = '') { return `<div class="page-header"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${subtitle}</p></div>${badge ? `<span class="server-badge"><span class="status-dot" aria-hidden="true"></span>${badge}</span>` : ''}</div>`; }
function activeToggle(on, label) { return `<button class="toggle ${on ? 'on' : ''}" data-toggle="${label}" aria-label="${label}" aria-pressed="${on}"></button>`; }
function landingView() {
  return `${header('NYOM MD · CONTROL CENTER', 'Seu servidor<span class="period">.</span>', 'Entre com Discord para começar.')}
    <section class="landing-hero"><div class="landing-orbit" aria-hidden="true"></div><span class="eyebrow">MODERAÇÃO · SUPORTE · COMUNIDADE</span><h2>Uma central feita para a sua comunidade.</h2><p>Proteção, tickets, registros e jogos em um só painel.</p><div class="landing-actions"><a class="landing-login" href="/auth/discord"><span class="discord-symbol" aria-hidden="true">${ICONS.discord || ICONS.external}</span> Entrar com Discord <span aria-hidden="true">${ICONS.external}</span></a><a class="community-button" href="/community/join">Entrar na comunidade NYOM <span aria-hidden="true">${ICONS.external}</span></a></div></section>
    <div class="module-grid landing-features"><article class="module-card"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/></svg></span><h4>Moderação integrada</h4><p>AutoMod, antiflood e proteções configuráveis por servidor.</p></article><article class="module-card"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4V5Z"/></svg></span><h4>Atendimento organizado</h4><p>Personalize os painéis de tickets e a experiência da sua equipe.</p></article><article class="module-card"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg></span><h4>Comandos e jogos</h4><p>Consulte as ferramentas do NYOM e acompanhe os placares.</p></article></div>`;
}
function serverListView() {
  if (!state.user) return landingView();
  const byName = (a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR');
  const installed = state.guilds.filter(g => g.botPresent).sort(byName);
  const missing = state.guilds.filter(g => !g.botPresent).sort(byName);
  return `${header('SEUS SERVIDORES', 'Escolha onde configurar<span class="period">.</span>', '', `${state.guilds.length} SERVIDORES`)}
    <section class="server-shelf"><div class="section-heading"><h3>NYOM instalado</h3><span>${installed.length} SERVIDOR${installed.length === 1 ? '' : 'ES'}</span></div><div class="server-list">${installed.map(serverCard).join('') || '<div class="empty-state server-empty">Nenhum servidor com o NYOM instalado ainda.</div>'}</div></section>
    <section class="server-shelf"><div class="section-heading"><h3>Convidar o NYOM</h3><span>${missing.length} SERVIDOR${missing.length === 1 ? '' : 'ES'}</span></div><div class="server-list">${missing.map(serverCard).join('') || '<div class="empty-state server-empty">O NYOM já está presente em todos os servidores listados.</div>'}</div></section>
    <p class="helper-text server-list-note">Selecione um servidor para abrir o painel.</p>`;
}
function overview() {
  if (!state.guild) return serverListView();
  if (state.pendingGuild || !state.config) {
    const icon = state.guild.icon ? `<img src="${guildIcon(state.guild)}" alt="">` : escapeHtml((state.guild.name || 'N').slice(0, 1).toUpperCase());
    return `${header('CONECTANDO SERVIDOR', 'Preparando seu espaço<span class="period">.</span>', 'Carregando as configurações autorizadas para este servidor.') }<div class="server-arrival"><span class="server-arrival-icon">${icon}</span><div><span class="eyebrow">NYOM MD · SERVIDOR</span><h2>${escapeHtml(state.guild.name)}</h2><p>Buscando módulos e permissões…</p></div><span class="loader"></span></div>`;
  }
  const name = state.guild.name || 'sua comunidade';
  const automod = state.config?.automod;
  const tickets = state.config?.tickets;
  const logs = state.config?.logsEnabled === true || Object.keys(state.config?.logs || {}).length > 0;
  const identity = state.guild.icon ? `<img src="${guildIcon(state.guild)}" alt="">` : escapeHtml(name.slice(0, 1).toUpperCase());
  return `${header('PAINEL DO SERVIDOR', 'Controle sua comunidade<span class="period">.</span>', '', 'SERVIDOR SELECIONADO')}
    <div class="server-identity"><span class="server-identity-icon">${identity}</span><div><span class="eyebrow">SERVIDOR SELECIONADO</span><h2>${escapeHtml(name)}</h2></div><span class="identity-check" aria-label="Bot instalado">✓</span></div>
    <div class="welcome-band"><div class="welcome-copy"><span class="eyebrow">NYOM MD · CENTRAL DE CONTROLE</span><h2>Seu servidor. Suas regras.</h2><p>Configure proteção, atendimento e registros. As mudanças ficam vinculadas ao servidor selecionado.</p></div><div class="welcome-stats"><small>STATUS DO BOT</small><strong class="status-word">ATIVO</strong><span>Ativo neste servidor</span></div></div>
    <div class="section-heading"><h3>Módulos do servidor</h3><span>GERENCIE CADA RECURSO</span></div><div class="module-grid">
    <article class="module-card"><div class="module-top"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/></svg></span><span class="module-state">${automod ? 'ATIVO' : 'PAUSADO'}</span></div><h4>AutoMod inteligente</h4><p>Antiflood global, filtros preventivos e proteção contra abuso.</p><button class="card-link" data-go="automod">Configurar AutoMod <span>→</span></button></article>
    <article class="module-card"><div class="module-top"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4V5Z"/></svg></span><span class="module-state">${tickets ? 'ATIVO' : 'PAUSADO'}</span></div><h4>Atendimento por ticket</h4><p>Ative o painel de suporte e receba pedidos em canais privados.</p><button class="card-link" data-go="tickets">Configurar tickets <span>→</span></button></article>
    <article class="module-card"><div class="module-top"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg></span><span class="module-state">${logs ? 'CONFIGURADO' : 'NÃO CONFIGURADO'}</span></div><h4>Central de logs</h4><p>Organize registros de mensagens, tickets, entradas, punições e mais.</p><button class="card-link" data-go="logs">Abrir central de logs <span>→</span></button></article></div>
    <div class="quick-note"><span class="note-icon">${ICONS.info}</span><div><strong>Uma configuração segura por padrão</strong><p>As opções de administração só aparecem para quem tem permissão no Discord. O NYOM precisa das permissões necessárias para aplicar cada recurso.</p></div></div>`;
}
function automodView() {
  const on = state.config?.automod;
  return `${header('PROTEÇÃO DO SERVIDOR', 'AutoMod<span class="period">.</span>', 'Configure as proteções por blocos.', state.guild?.name)}
  <div class="feature-row"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/></svg></span><div class="feature-copy"><h3>AutoMod principal</h3><p>Regras preventivas do NYOM para palavras e menções.</p></div>${activeToggle(on, 'automod')}</div>
  <div class="feature-row"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M4 12h16M7 7h10M7 17h10"/></svg></span><div class="feature-copy"><h3>Anti-Flood</h3><p>Detecta rajadas e mensagens repetidas. Ajustes detalhados ficam em Proteção avançada.</p></div><span class="server-badge"><span>●</span>INTEGRADO</span></div>
  <div class="feature-row"><span class="module-icon"><svg viewBox="0 0 24 24"><path d="M5 5h14v14H5zM8 12h8M12 8v8"/></svg></span><div class="feature-copy"><h3>Anti-link independente</h3><p>Controle convites e cargo permitido em Proteção avançada.</p></div><span class="server-badge">SEPARADO</span></div>
  <section class="nte-card security-settings"><h3>Proteções personalizadas</h3><p>Estas configurações são aplicadas pelo comando <code>/automod</code> e pelo site quando o AutoMod principal está ativo.</p><div class="security-fields">
    <label><input type="checkbox" id="am-caps"> AntiCaps</label><label>Mínimo de letras na mensagem <input id="am-caps-threshold" type="number" min="3" max="100" value="10"></label><label>Ação AntiCaps <select id="am-caps-action"><option value="delete">Apagar</option><option value="kick">Expulsar</option><option value="ban">Banir</option><option value="timeout">Timeout</option><option value="quarantine">Quarentena</option></select></label>
    <label><input type="checkbox" id="am-raid"> AntiRaid</label><label>Entradas limite (3–100) <input id="am-raid-threshold" type="number" min="3" max="100" value="8"></label><label>Janela (3–120 s) <input id="am-raid-window" type="number" min="3" max="120" value="10"></label><label>Ação AntiRaid <select id="am-raid-action"><option value="quarantine">Quarentena</option><option value="kick">Expulsar</option><option value="ban">Banir</option><option value="timeout">Timeout</option></select></label><label>Cargo de quarentena AntiRaid <select id="am-raid-role"></select></label>
    <label><input type="checkbox" id="am-quarantine"> AutoQuarantine</label><label>Idade mínima da conta (1–3650 dias) <input id="am-age" type="number" min="1" max="3650" value="7"></label><label>Cargo AutoQuarantine <select id="am-auto-role"></select></label>
    <label><input type="checkbox" id="am-mass-mention"> Anti-Mass Mention</label><label>Limite de menções (3–50) <input id="am-mass-mention-threshold" type="number" min="3" max="50" value="5"></label><label>Ação Anti-Mass Mention <select id="am-mass-mention-action"><option value="delete">Apagar</option><option value="kick">Expulsar</option><option value="ban">Banir</option><option value="timeout">Timeout</option><option value="quarantine">Quarentena</option></select></label>
    <label><input type="checkbox" id="am-antibot"> Anti-Bot</label><label>Permitir bots verificados <input id="am-antibot-verified" type="checkbox"></label><label>Cargo autorizado a adicionar bots <select id="am-antibot-role"></select></label>
    <label>Exceções de cargos <select id="am-exempt-roles" multiple></select></label><label>Exceções de canais <select id="am-exempt-channels" multiple></select></label>
  </div><button class="action-button" id="save-custom-automod" type="button">Salvar AutoMod</button></section>
  <p class="helper-text">O bot precisa de <strong>Gerenciar Servidor</strong> para sincronizar as regras nativas. O Anti-Bot exige Gerenciar Servidor, Gerenciar Cargos, Expulsar Membros e Moderar Membros.</p>`;
}
function ticketsView() {
  if (!state.guild) return `${header('ATENDIMENTO', 'Central de tickets<span class="period">.</span>', 'Entre e selecione um servidor para configurar o painel.')}`;
  return window.NYOMTicketEditor ? window.NYOMTicketEditor.render(state) : `${header('ATENDIMENTO', 'Central de tickets<span class="period">.</span>', 'Carregando editor de tickets…')}`;
}
function securityView() {
  const security = state.config?.security || {}, roles = state.ticketResources?.roles || [], channels = state.ticketResources?.channels || [];
  const roleOptions = (selected) => '<option value="">Selecione um cargo</option>' + roles.map(role => `<option value="${escapeHtml(role.id)}"${role.id === selected ? ' selected' : ''}>${escapeHtml(role.name)}</option>`).join('');
  const channelOptions = (selected) => '<option value="">Selecione um canal</option>' + channels.map(channel => `<option value="${escapeHtml(channel.id)}"${channel.id === selected ? ' selected' : ''}># ${escapeHtml(channel.name)}</option>`).join('');
  const antlink = security.antlink || {}, antinuke = security.antinuke || {};
  const anteselfbot = security.anteselfbot || {};
  const flood = state.config?.antiflood || { enabled: false, messageLimit: 7, windowSeconds: 5, repeatLimit: 4, repeatWindowSeconds: 8, timeoutSeconds: 15 };
  return `${header('MODERAÇÃO E SEGURANÇA', 'Proteção avançada<span class="period">.</span>', 'Configure flood, convites e ações destrutivas com as regras existentes do NYOM.', state.guild?.name)}
    <div class="feature-row"><span class="module-icon">${ICONS.list || ICONS.info}</span><div class="feature-copy"><h3>Anti-Flood global</h3><p>Aplica-se a todos os canais quando o AutoMod está ativo. Comandos que começam com ponto ou mais, como <code>.p</code>, <code>.p eaeehdhd</code> e <code>+p</code>, são excluídos. O detector local de símbolos só bloqueia mensagens curtas com pouquíssimas letras e excesso claro de pontuação.</p></div><span class="server-badge"><span>●</span>${flood.enabled ? 'ATIVO' : 'PAUSADO COM AUTOMOD'}</span></div>
    <div class="nte-card security-settings"><h3>Limites do Anti-Flood</h3><p>As alterações são salvas por servidor. A punição usa timeout e o registro vai ao canal de AutoMod, se configurado.</p><div class="security-fields">
      <label for="flood-message-limit">Mensagens antes do flood <input id="flood-message-limit" type="number" min="3" max="30" step="1" value="${flood.messageLimit}"></label>
      <label for="flood-window-seconds">Janela (segundos) <input id="flood-window-seconds" type="number" min="3" max="30" step="1" value="${flood.windowSeconds}"></label>
      <label for="flood-repeat-limit">Mensagens repetidas <input id="flood-repeat-limit" type="number" min="3" max="20" step="1" value="${flood.repeatLimit}"></label>
      <label for="flood-repeat-window">Janela de repetição (seg.) <input id="flood-repeat-window" type="number" min="3" max="60" step="1" value="${flood.repeatWindowSeconds}"></label>
      <label for="flood-timeout">Timeout (segundos) <input id="flood-timeout" type="number" min="5" max="300" step="1" value="${flood.timeoutSeconds}"></label>
    </div></div>
    <div class="feature-row"><span class="module-icon">${ICONS.external}</span><div class="feature-copy"><h3>Anti-link</h3><p>Ative ou pause o bloqueio de convites.</p></div><label class="nte-switch"><input id="security-antlink-enabled" type="checkbox"${antlink.enabled ? ' checked' : ''}><span>Ativo</span></label></div>
    <div class="nte-card security-settings"><h3>Configuração do Anti-link</h3><p>Use <code>/ant-link</code> no Discord ou configure aqui. Desligar o sistema mantém o cargo permitido salvo para a próxima ativação.</p><label>Cargo permitido para enviar convites<select id="security-antlink-role">${roleOptions(antlink.roleId)}</select></label></div>
    <div class="feature-row"><span class="module-icon">${ICONS.shield}</span><div class="feature-copy"><h3>Anti-Nuke</h3><p>Protege contra criação/exclusão suspeita de canais; ao bloquear, remove cargos do infrator e tenta restaurar/remover o canal. Requer Administrador e permissões adequadas do bot.</p></div><label class="nte-switch"><input id="security-antinuke-enabled" type="checkbox"${antinuke.enabled ? ' checked' : ''}><span>Ativo</span></label></div>
    <div class="nte-card security-settings"><label>Cargo de confiança do Anti-Nuke<select id="security-antinuke-role">${roleOptions(antinuke.roleId)}</select></label></div>
    <div class="feature-row"><span class="module-icon">${ICONS.shield}</span><div class="feature-copy"><h3>Anti-Selfbot</h3><p>Publica o aviso multilíngue no canal escolhido e mantém a configuração por servidor.</p></div><label class="nte-switch"><input id="security-anteselfbot-enabled" type="checkbox"${anteselfbot.enabled ? ' checked' : ''}><span>Ativo</span></label></div>
    <div class="nte-card security-settings"><label>Canal do Anti-Selfbot<select id="security-anteselfbot-channel">${channelOptions(anteselfbot.channelId)}</select></label><button class="action-button" id="save-security" type="button">Salvar segurança</button></div>
    <div class="quick-note"><span class="note-icon">${ICONS.info}</span><div><strong>Comportamento nativo</strong><p>O Anti-link sincroniza a regra nativa de convites do Discord independentemente das regras principais do AutoMod.</p></div></div>`;
}
function captchaView() {
  if (!state.guild) return `${header('VERIFICAÇÃO DE MEMBROS', 'CAPTCHA<span class="period">.</span>', 'Selecione um servidor com o NYOM instalado para configurar a verificação.')}`;
  const cfg = state.captchaConfig;
  if (!cfg) return `${header('VERIFICAÇÃO DE MEMBROS', 'CAPTCHA<span class="period">.</span>', 'Não foi possível carregar a configuração. Atualize a página ou selecione novamente o servidor.', state.guild.name)}`;
  const roles = state.ticketResources?.roles || [];
  const channels = state.ticketResources?.channels || [];
  const roleOptions = (selected, placeholder) => `<option value="">${placeholder}</option>` + roles.map(role => `<option value="${escapeHtml(role.id)}"${role.id === selected ? ' selected' : ''}>${escapeHtml(role.name)}</option>`).join('');
  const channelOptions = (selected, placeholder) => `<option value="">${placeholder}</option>` + channels.map(channel => `<option value="${escapeHtml(channel.id)}"${channel.id === selected ? ' selected' : ''}># ${escapeHtml(channel.name)}</option>`).join('');
  return `${header('VERIFICAÇÃO DE MEMBROS', 'CAPTCHA<span class="period">.</span>', 'Configure aqui ou use /captcha no Discord. Os dois painéis compartilham as mesmas configurações deste servidor.', state.guild.name)}
    <div class="feature-row captcha-status-row"><span class="module-icon">${ICONS.shield}</span><div class="feature-copy"><h3>Verificação por desafio visual</h3><p>Novos membros podem receber o cargo inicial e precisam resolver uma imagem CAPTCHA antes de receber o cargo verificado.</p></div><label class="nte-switch"><input id="captcha-enabled" type="checkbox"${cfg.enabled ? ' checked' : ''}><span>${cfg.enabled ? 'Ativo' : 'Desativado'}</span></label></div>
    <form class="captcha-config-card" id="captcha-form"><div class="section-heading"><h3>Configuração por servidor</h3><span>${cfg.panelMessageId ? 'PAINEL PUBLICADO' : 'AINDA NÃO PUBLICADO'}</span></div>
      <div class="captcha-fields">
        <label for="captcha-verification-channel">Canal de verificação<select id="captcha-verification-channel">${channelOptions(cfg.verificationChannelId, 'Selecione um canal')}</select></label>
        <label for="captcha-verified-role">Cargo após aprovação<select id="captcha-verified-role">${roleOptions(cfg.verifiedRoleId, 'Selecione um cargo')}</select></label>
        <label for="captcha-unverified-role">Cargo inicial (opcional)<select id="captcha-unverified-role">${roleOptions(cfg.unverifiedRoleId, 'Nenhum cargo inicial')}</select></label>
        <label for="captcha-logs-channel">Canal de registros (opcional)<select id="captcha-logs-channel">${channelOptions(cfg.logsChannelId, 'Sem canal de logs')}</select></label>
        <label for="captcha-attempts">Tentativas máximas<input id="captcha-attempts" type="number" min="1" max="25" step="1" value="${Number(cfg.maxAttempts) || 3}" required></label>
        <label for="captcha-timeout">Tempo limite (segundos)<input id="captcha-timeout" type="number" min="30" max="300" step="1" value="${Number(cfg.timeoutSeconds) || 60}" required></label>
        <label for="captcha-banner">Banner (URL, opcional)<input id="captcha-banner" type="url" value="${escapeHtml(cfg.banner || cfg.bannerUrl || '')}" placeholder="https://…"></label>
        <label for="captcha-embed-color">Cor do embed<input id="captcha-embed-color" type="color" value="${/^#[0-9a-fA-F]{6}$/.test(cfg.embedColor || cfg.color || '') ? (cfg.embedColor || cfg.color) : '#8d7bff'}"></label>
        <label for="captcha-title">Título do painel<input id="captcha-title" maxlength="256" value="${escapeHtml(cfg.title || '')}" required></label>
        <label for="captcha-button-text">Texto do botão<input id="captcha-button-text" maxlength="80" value="${escapeHtml(cfg.buttonText || '')}" required></label>
        <label class="captcha-description-field" for="captcha-description">Descrição<textarea id="captcha-description" maxlength="4000" rows="4" required>${escapeHtml(cfg.description || '')}</textarea></label>
      </div>
      <div class="feature-row"><span class="module-icon">⌑</span><div class="feature-copy"><h3>Bloquear o servidor até a verificação</h3><p>O cargo inicial perde acesso aos canais e categorias, exceto ao canal CAPTCHA. O estado anterior dos overwrites é salvo para restaurar depois; mudanças manuais feitas enquanto ativo são preservadas.</p></div><label class="nte-switch"><input id="captcha-access-lock" type="checkbox"${cfg.accessLockEnabled ? ' checked' : ''}${cfg.enabled ? '' : ' disabled'}><span>${cfg.accessLockEnabled ? 'Restrito' : 'Normal'}</span></label></div>
      <p class="helper-text">Ativar ou liberar a restrição altera a permissão Ver canal do cargo inicial em todos os canais e categorias. Confirme a ação ao salvar. O bot precisa de Gerenciar Cargos e Gerenciar Canais; o cargo inicial não pode ter Administrador. Outros cargos de membro que concedam acesso ainda podem sobrepor o bloqueio, então revise os cargos automáticos do servidor.</p>
      <div class="form-actions"><button class="action-button" id="save-captcha" type="submit">Salvar configuração</button><button class="action-button secondary" id="publish-captcha" type="button"${cfg.enabled ? '' : ' disabled'}>Publicar / atualizar painel</button></div>
    </form>`;
}
function commandCategory(name) {
  const games = ['memoria','minas','forca','velha','quiz','ligue4','jokenpo','placar','batalhanaval','damas','quiz-dupla','memoria-dupla','forca-dupla'];
  if (games.includes(name)) return 'Jogos';
  if (name === 'play') return 'Música';
  if (['automod','ant-link','antnuke','anteselfbot','ban','unban','expulsar','punir','limpar','nuke','lock','unlock'].includes(name)) return 'Moderação';
  if (['ping','gpt'].includes(name)) return 'Utilidades';
  return 'Administração';
}
function commandDetailsLabel(expanded) {
  const labels = { 'pt-BR': expanded ? 'Recolher' : 'Ver descrição', en: expanded ? 'Collapse' : 'Show details', es: expanded ? 'Contraer' : 'Ver descripción' };
  return labels[state.language] || labels['pt-BR'];
}
function commandsView() {
  const commands = state.commandCatalog || [];
  const groups = ['Todos','Moderação','Administração','Utilidades','Música','Jogos'];
  const cards = commands.map(command => `<article class="module-card command-list-card" data-command-card data-name="${escapeHtml(command.name)}" data-category="${escapeHtml(command.category || commandCategory(command.name))}" data-search="${escapeHtml(`${command.name} ${command.description} ${(command.options||[]).map(o=>o.name+' '+o.description).join(' ')}`.toLowerCase())}"><div class="command-summary"><span class="command-name">/${escapeHtml(command.name)}</span><button class="command-description-toggle" type="button" data-command-toggle aria-expanded="false">${commandDetailsLabel(false)}</button></div><div class="command-details" hidden><h4>${escapeHtml(command.description || 'Comando NYOM')}</h4><p><strong>Categoria:</strong> ${escapeHtml(command.category || commandCategory(command.name))}<br><strong>Uso:</strong> <code>/${escapeHtml(command.name)}${command.usage ? ' '+escapeHtml(command.usage) : ''}</code></p>${command.options?.length ? `<div class="command-options"><strong>Opções</strong><ul>${command.options.map(o=>`<li><code>${escapeHtml(o.name)}</code> · ${o.required ? 'obrigatória' : 'opcional'} — ${escapeHtml(o.description || 'sem descrição adicional')}${o.choices?.length ? ` <small>Escolhas: ${o.choices.map(escapeHtml).join(', ')}</small>` : ''}</li>`).join('')}</ul></div>` : ''}<small><strong>Permissões:</strong> ${escapeHtml((command.permissions||[]).join(' · ') || 'Membro do servidor')}</small><p><strong>Exemplo:</strong> <code>${escapeHtml(command.example || '/'+command.name)}</code></p></div></article>`).join('');
  return `${header('GUIA NYOM', 'Comandos<span class="period">.</span>', '', state.guild?.name || 'PÚBLICO')}<div class="nte-card catalog-controls"><label for="command-search">Pesquisar<input id="command-search" type="search" placeholder="Nome, função ou opção…"></label><label for="command-filter">Categoria<select id="command-filter">${groups.map(x=>`<option>${x}</option>`).join('')}</select></label></div><div class="module-grid command-grid" id="command-grid">${cards || '<div class="empty-state">Os comandos estarão disponíveis após o bot registrar sua lista.</div>'}</div>`;
}
function gamesView() {
  const games = (state.commandCatalog || []).filter(command => (command.category || commandCategory(command.name)) === 'Jogos');
  const cards = games.map(command => `<article class="module-card"><div class="module-top"><span class="module-icon">${ICONS.shield}</span><span class="module-state">/${escapeHtml(command.name)}</span></div><h4>${escapeHtml(command.description || command.name)}</h4><p>${escapeHtml(command.summary || 'Minijogo interativo com botões Discord.')}</p><small>Ativo após sincronização do bot. Partidas em andamento são temporárias e reiniciar o processo encerra a sessão.</small></article>`).join('');
  const board = state.guild ? (state.gameLeaderboard || []).map(entry => `<div class="channel-chip"><strong>#${entry.rank} ${escapeHtml(entry.name)}</strong> · ${entry.points} pts · ${entry.wins} vitórias · ${entry.games} partidas</div>`).join('') : '';
  return `${header('JOGOS DE SERVIDOR', 'Arcade NYOM<span class="period">.</span>', 'Minijogos interativos, sessões protegidas e placar por servidor.', state.guild?.name || 'PÚBLICO')}<div class="module-grid">${cards || '<div class="empty-state">Os jogos entram aqui quando estiverem registrados no Discord.</div>'}</div>${state.guild ? `<div class="section-heading"><h3>Placar do servidor</h3><span>PONTOS POR VITÓRIA/EMPATE</span></div><div class="channel-list">${board || '<div class="empty-state">Nenhuma partida foi registrada ainda.</div>'}</div>` : ''}`;
}
function logsView() {
  const channels = state.config?.logs || {};
  const logsEnabled = state.config?.logsEnabled === true || Object.keys(channels).length > 0;
  const labels = { geral: 'Geral', mensagens: 'Mensagens', ticket: 'Tickets', entrada: 'Entrada', saida: 'Saída', automod: 'AutoMod', auditoria: 'Registro de auditoria', webhook: 'Webhook', castigo: 'Castigo', ban: 'Banimentos', antnuke: 'Anti-Nuke' };
  const available = state.ticketResources?.channels || [];
  const bindRows = Object.entries(labels).map(([key, label]) => `<label>${label}<select data-log-channel="${key}"><option value="">Não vincular</option>${available.map(channel => `<option value="${escapeHtml(channel.id)}"${String(channels[key] || '') === String(channel.id) ? ' selected' : ''}># ${escapeHtml(channel.name)}</option>`).join('')}</select></label>`).join('');
  const chips = Object.entries(channels).map(([key, id]) => `<span class="channel-chip"># ${labels[key] || key} · ${escapeHtml(id)}</span>`).join('');
  return `${header('RASTREABILIDADE', 'Central de logs<span class="period">.</span>', 'Escolha canais existentes ou crie uma estrutura automática.', state.guild?.name)}
  <div class="feature-row"><span class="module-icon">${ICONS.list || ICONS.info}</span><div class="feature-copy"><h3>Estrutura automática de logs</h3><p>Cria a categoria NYOM • LOGS e 11 canais: geral, mensagens, tickets, entrada, saída, AutoMod, auditoria, webhook, castigo, ban e Anti-Nuke.</p></div><div class="logs-actions"><button class="action-button" id="create-logs">${logsEnabled ? 'Recriar / atualizar' : 'Criar canais'}</button>${logsEnabled ? '<button class="action-button danger" id="disable-logs" type="button">Desativar e apagar</button>' : ''}</div></div>
  <section class="settings-card logs-bind-card"><div class="section-heading"><h3>Adicionar canais de logs</h3><span>USAR CANAIS EXISTENTES</span></div><div class="nte-grid logs-bind-grid">${bindRows}</div><button class="action-button" id="save-log-bindings" type="button">Salvar canais selecionados</button></section>
  <p class="helper-text">O NYOM precisa de Gerenciar Canais. <strong>Desativar e apagar</strong> solicita confirmação e remove somente canais de log associados/identificados como NYOM; a categoria só é removida se ficar vazia. Canais não mapeados permanecem intactos.</p>
  ${chips ? `<div class="section-heading"><h3>Canais associados</h3><span>${Object.keys(channels).length} CANAIS</span></div><div class="channel-list">${chips}</div>` : logsEnabled ? '<div class="empty-state">A configuração de logs está ativa, mas não há canais mapeados para exibir.</div>' : '<div class="empty-state">Os logs estão desativados neste servidor.</div>'}`;
}
function giveawayView() {
  const access = state.guildPremiumAccess || {};
  if (!state.guild) return `${header('SORTEIOS', 'Sorteios<span class="period">.</span>', 'Selecione um servidor para configurar um sorteio.')}`;
  if (!access.guildOwnerActive) return `${header('RECURSO VIP', 'Sorteios<span class="period">.</span>', 'Sorteios exigem o VIP ativo.') }<div class="premium-banner premium-locked"><span class="plan-tag">VIP</span><h2>Recurso disponível para servidores com VIP.</h2><p>Peça ao dono do servidor para ativar o VIP. Nenhum pagamento pode ser realizado por este painel.</p><button class="action-button" data-go="premium" type="button">Ver planos e demonstrar interesse</button></div>`;
  const roles = state.ticketResources?.roles || [], channels = state.ticketResources?.channels || [];
  const roleOptions = '<option value="">Nenhum</option>' + roles.map(r=>`<option value="${escapeHtml(r.id)}">${escapeHtml(r.name)}</option>`).join('');
  const channelOptions = '<option value="">Selecione um canal</option>' + channels.map(c=>`<option value="${escapeHtml(c.id)}"># ${escapeHtml(c.name)}</option>`).join('');
  return `${header('SORTEIOS VIP', 'Criar sorteio<span class="period">.</span>', 'Preencha os campos desejados. Opções marcadas como opcionais podem ficar vazias.', state.guild.name)}<form class="captcha-config-card" id="giveaway-form"><div class="captcha-fields">
    <label>Título (opcional)<input name="title" maxlength="256" placeholder="Título do sorteio"></label><label>Prêmio (opcional)<input name="prize" maxlength="200" placeholder="Prêmio surpresa"></label>
    <label class="captcha-description-field">Mensagem (opcional)<textarea name="message" maxlength="3000" rows="4" placeholder="Detalhes do sorteio"></textarea></label>
    <label>Cargo elegível (opcional)<select name="eligibleRoleId">${roleOptions}</select></label><label>Cargo com chances extras (opcional)<select name="bonusRoleId">${roleOptions}</select></label>
    <label>Multiplicador (opcional)<input name="bonusEntries" type="number" min="2" max="100" step="1" value="2"></label><label>Prazo em horas (opcional)<input name="durationHours" type="number" min="1" max="720" value="24"></label>
    <label>Banner (URL, opcional)<input name="banner" type="url"></label><label>Canal do sorteio<select name="channelId" required>${channelOptions}</select></label>
    <label>Quantidade de ganhadores (opcional)<input name="winnerCount" type="number" min="1" max="20" value="1"></label><label>Texto do botão (opcional)<input name="buttonLabel" maxlength="80" value="Participar"></label><label>Cor (opcional)<input name="color" type="color" value="#8d7bff"></label>
    </div><div class="form-actions"><span>Publicar inicia o sorteio no servidor; revise os dados antes de enviar.</span><button class="action-button" type="submit">Publicar sorteio</button></div></form>`;
}
async function publishGiveaway(event) {
  event.preventDefault(); const form=event.currentTarget, button=form.querySelector('[type="submit"]');
  if (!state.guild) return toast('Selecione um servidor.');
  button.disabled=true;
  const fd=new FormData(form), value=k=>String(fd.get(k)||'').trim();
  const body={title:value('title'),message:value('message'),eligibleRoleId:value('eligibleRoleId')||null,bonusRoleId:value('bonusRoleId')||null,bonusEntries:Number(value('bonusEntries'))||2,durationHours:value('durationHours')?Number(value('durationHours')):24,banner:value('banner')||null,channelId:value('channelId')||null,prize:value('prize'),winnerCount:Number(value('winnerCount'))||1,buttonLabel:value('buttonLabel')||'Participar',color:value('color')||'#8d7bff'};
  try { const result=await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/giveaway`,{method:'POST',body:JSON.stringify(body)}); toast(`Sorteio publicado no canal selecionado. Encerra em ${new Date(result.endsAt).toLocaleString()}.`); }
  catch(error){toast(error.message || 'Não foi possível publicar o sorteio.');} finally {button.disabled=false;}
}
function communityView() {
  if (!state.guild) return `${header('COMUNIDADE', 'Boas-vindas e sugestões<span class="period">.</span>', 'Selecione um servidor para configurar estes recursos.')}`;
  const welcome=state.community?.welcome||{}, suggestion=state.community?.suggestion||{};
  const channels=state.ticketResources?.channels||[];
  const channelOptions=(selected)=>'<option value="">Selecione um canal</option>'+channels.map(c=>`<option value="${escapeHtml(c.id)}"${c.id===selected?' selected':''}># ${escapeHtml(c.name)}</option>`).join('');
  const ownerVip=Boolean(state.guildPremiumAccess?.guildOwnerActive);
  return `${header('COMUNIDADE VIP', 'Boas-vindas e sugestões<span class="period">.</span>', 'Configure mensagens de entrada e publique o painel de sugestões.', state.guild.name)}
    <form class="captcha-config-card" id="welcome-form"><div class="section-heading"><h3>Boas-vindas · /entrada</h3><span>CONFIGURAÇÃO DO SERVIDOR</span></div><div class="captcha-fields">
    <label>Canal<select name="channelId">${channelOptions(welcome.channelId)}</select></label><label>Título<input name="title" maxlength="256" value="${escapeHtml(welcome.title||'')}"></label>
    <label class="captcha-description-field">Mensagem<textarea name="message" maxlength="4000" rows="4">${escapeHtml(welcome.message||'')}</textarea></label><label>Banner (URL opcional)<input name="banner" type="url" value="${escapeHtml(welcome.banner||'')}"></label>
    <label>Imagem (URL opcional)<input name="image" type="url" value="${escapeHtml(welcome.image||'')}"></label><label>Cor<input name="color" type="color" value="${/^#[0-9a-fA-F]{6}$/.test(welcome.color||'')?welcome.color:'#8d7bff'}"></label>
    </div><div class="form-actions"><span>A mensagem e os campos ficam opcionais quando o backend aceitar vazio.</span><button class="action-button" type="submit">Salvar boas-vindas</button></div></form>
    <section class="captcha-config-card"><div class="section-heading"><h3>Painel de sugestões</h3><span>${ownerVip?'VIP ATIVO':'REQUER O VIP'}</span></div><p class="helper-text">Publicar o painel de sugestões exige o VIP ativo. Nenhuma compra ou pagamento é processado aqui.</p>
    ${ownerVip?`<label class="community-publish-label">Canal para publicar<select id="suggestions-channel">${channelOptions(suggestion.channelId)}</select></label><button class="action-button" id="publish-suggestions" type="button">Publicar painel de sugestões</button>`:'<p class="helper-text">Ative o VIP do dono do servidor para usar sugestões e sorteios.</p>'}</section>`;
}
async function saveWelcome(event){event.preventDefault();if(!state.guild)return;const form=event.currentTarget,fd=new FormData(form),button=form.querySelector('[type="submit"]'),value=k=>String(fd.get(k)||'').trim();button.disabled=true;try{const result=await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/welcome`,{method:'POST',body:JSON.stringify({channelId:value('channelId')||null,title:value('title'),message:value('message'),banner:value('banner')||null,image:value('image')||null,color:value('color')})});state.community={...(state.community||{}),welcome:result.welcome||{channelId:value('channelId'),title:value('title'),message:value('message'),banner:value('banner'),image:value('image'),color:value('color')}};toast(result.message||'Configuração de boas-vindas salva.');}catch(error){toast(error.message);}finally{button.disabled=false;}}
async function publishSuggestions(button){if(!state.guild||!button)return;if(!state.guildPremiumAccess?.guildOwnerActive)return toast('Este recurso exige VIP ativo do dono do servidor.');button.disabled=true;try{const channelId=$('#suggestions-channel')?.value||null;if(!channelId)return toast('Selecione o canal para publicar as sugestões.');const result=await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/suggestions/publish`,{method:'POST',body:JSON.stringify({channelId})});toast(result.message||'Painel de sugestões publicado.');}catch(error){toast(error.message);}finally{button.disabled=false;}}
function premiumView() {
  if (!state.user) return `${header('NYOM PREMIUM', 'Personalização VIP<span class="period">.</span>', 'Ajuste o perfil visual do NYOM MD para cada servidor autorizado.')}
    <div class="premium-banner"><span class="plan-tag">ACESSO POR VIP</span><h2>Entre para verificar seu acesso.</h2><p>Faça login com a conta Discord que possui VIP ativo. O painel usa a mesma lista VIP e validade configuradas no bot.</p><a class="invite-hero" href="/auth/discord">Entrar com Discord <span>↗</span></a></div><section class="premium-plans"><div class="plan-grid">${[['mensal','Mensal','R$ 10,00','yellow'],['trimestral','Trimestral','R$ 20,00','red'],['anual','Anual','R$ 109,99','cyan']].map(([id,name,price,color])=>`<article class="plan-card plan-${color}"><h3>${name}</h3><strong>${price}</strong></article>`).join('')}</div></section>`;
  const plans = [['mensal','Mensal','R$ 10,00','yellow'],['trimestral','Trimestral','R$ 20,00','red'],['anual','Anual','R$ 109,99','cyan']];
  const vip = state.guildPremiumAccess?.active ? state.guildPremiumAccess : (state.premium || {});
  const vipRemaining = vip.expiresAt ? (()=>{const ms=Math.max(0,new Date(vip.expiresAt).getTime()-Date.now()),hours=Math.floor(ms/3600000);return `${Math.floor(hours/24)} dia(s), ${hours%24} hora(s) restantes`;})() : ''; 
  const plansMarkup = `<section class="premium-plans"><div class="section-heading"><h3>Planos VIP</h3><span>INTERESSE PELO PAINEL</span></div><div class="plan-grid">${plans.map(([id,name,price,color])=>`<article class="plan-card plan-${color}"><span class="plan-tag">NYOM VIP</span><h3>${name}</h3><strong>${price}</strong><button class="action-button" data-premium-interest="${id}" type="button">Tenho interesse</button></article>`).join('')}</div></section>${state.guild && state.guildPremiumAccess?.guildOwnerActive ? `<section class="captcha-config-card"><div class="section-heading"><h3>Painel de sugestões</h3><span>VIP ATIVO</span></div><label class="community-publish-label">Canal para publicar<select id="suggestions-channel"><option value="">Selecione um canal</option>${(state.ticketResources?.channels||[]).map(c=>`<option value="${escapeHtml(c.id)}"># ${escapeHtml(c.name)}</option>`).join('')}</select></label><button class="action-button" id="publish-suggestions" type="button">Publicar painel de sugestões</button></section>` : ''}`;
  if (!vip.active) return `${header('NYOM PREMIUM', 'Personalização VIP<span class="period">.</span>', 'Configuração visual do perfil do bot, disponível a contas com VIP ativo.')}
    <div class="premium-banner premium-locked"><span class="plan-tag">RECURSO VIP</span><h2>Seu acesso não está ativo.</h2><p>A elegibilidade é verificada automaticamente pela lista VIP existente e pela data de validade. Se você acredita que seu VIP está ativo, entre em contato com a equipe do NYOM.</p><a class="text-link premium-contact" href="https://discord.com/oauth2/authorize?client_id=1564829746791981207&amp;permissions=8&amp;integration_type=0&amp;scope=bot+applications.commands" target="_blank" rel="noopener noreferrer">Adicionar NYOM ao servidor ↗</a></div>${plansMarkup}`;
  const eligibleServers = state.guilds.filter(g => g.botPresent && g.canManage);
  const serverOptions = eligibleServers.map(g => `<option value="${escapeHtml(g.id)}" ${state.guild?.id === g.id ? 'selected' : ''}>${escapeHtml(g.name)}</option>`).join('');
  if (!eligibleServers.length) return `${header('NYOM PREMIUM', 'Personalização VIP<span class="period">.</span>', 'Adicione o bot e selecione um servidor para continuar.')}
    <div class="premium-banner"><span class="plan-tag">VIP ATIVO</span><h2>O NYOM não está em nenhum servidor elegível.</h2><p>Adicione o bot a um servidor em que você tenha permissão de administrador e volte a entrar no painel.</p><a class="invite-hero" href="${INVITE_URL}" target="_blank" rel="noopener noreferrer">Adicionar NYOM ao servidor <span>↗</span></a></div>`;
  return `${header('NYOM PREMIUM', 'Personalizar o perfil<span class="period">.</span>', `VIP ativo${vipRemaining ? ` · ${vipRemaining}` : ''}${vip.expiresAt ? ` · expira em ${new Date(vip.expiresAt).toLocaleString()}` : ''}. /painelsujestions e sorteios exigem VIP do dono do servidor. Altere o perfil do bot somente neste servidor.`, 'VIP ATIVO')}${plansMarkup}
    <div class="premium-form-card"><div class="premium-form-heading"><div><span class="eyebrow">PERSONALIZAÇÃO POR SERVIDOR</span><h2>Seu estilo. No seu servidor.</h2><p>Estas alterações afetam o perfil do bot neste servidor, não a conta global da aplicação.</p></div><span class="vip-seal">✦ VIP</span></div>
    <form id="serverconfig-form"><label for="profile-guild">Servidor Discord</label><select id="profile-guild" name="guildId" required>${serverOptions}</select>
      <div class="form-two"><div><label for="profile-name">Nome do bot <span>até 32 caracteres</span></label><input id="profile-name" name="name" maxlength="32" minlength="1" placeholder="NYOM MD" value="${escapeHtml(state.guild?.name ? 'NYOM MD' : 'NYOM MD')}" required></div><div><label for="profile-avatar">URL do avatar</label><input id="profile-avatar" name="avatar" type="url" placeholder="https://exemplo.com/avatar.png" data-preview-url="avatar" required></div></div>
      <label for="profile-banner">URL do banner</label><input id="profile-banner" name="banner" type="url" placeholder="https://exemplo.com/banner.png" data-preview-url="banner" required>
      <div class="profile-preview"><div class="preview-cover" id="banner-preview"></div><div class="preview-avatar" id="avatar-preview">N</div><div class="preview-title">Prévia do perfil <small>Perfil do NYOM no servidor</small></div></div>
      <div class="form-actions"><span>Também disponível no Discord pelo comando <code>/serverconfig</code>.</span><button class="action-button" id="save-serverconfig" type="submit">Salvar personalização <span>→</span></button></div>
    </form></div><p class="helper-text">O servidor precisa estar listado na sua conta como servidor administrável e o bot precisa estar instalado. A atualização também depende do suporte a avatar/banner de perfil de servidor fornecido pelo Discord.</p>`;
}
function ownerView() {
  if (!state.ownerAccess) return `${header('ACESSO RESTRITO', 'Painel Owner<span class="period">.</span>', 'Esta área está disponível somente para os proprietários configurados do NYOM.')}`;
  const status = state.ownerStatus || {};
  const dateText = value => value ? new Date(value).toLocaleString('pt-BR') : 'Sem validade ativa';
  const remaining = value => { const ms = new Date(value).getTime() - Date.now(); if (!Number.isFinite(ms) || ms <= 0) return 'expirado'; const hours = Math.floor(ms / 3600000), days = Math.floor(hours / 24); return `${days} dia(s), ${hours % 24} hora(s) restantes`; };
  const rows = (state.ownerVips || []).map(entry => `<div class="owner-vip-row"><div>${entry.avatar ? `<img class="owner-user-avatar" src="${escapeHtml(entry.avatar)}" alt="">` : ''}<strong>${escapeHtml(entry.name || entry.username || entry.userId)}</strong><code>${escapeHtml(entry.userId)}</code><small>Vence em ${escapeHtml(dateText(entry.expiresAt))} · ${escapeHtml(remaining(entry.expiresAt))}</small></div><button class="action-button danger" type="button" data-owner-remove="${escapeHtml(entry.userId)}">Revogar VIP</button></div>`).join('');
  const lookup = state.ownerLookup ? `<div class="owner-lookup-result"><strong>${state.ownerLookup.active ? 'VIP ativo' : 'Sem VIP ativo'}</strong><code>${escapeHtml(state.ownerLookup.userId)}</code><span>${escapeHtml(dateText(state.ownerLookup.expiresAt))} · ${Number(state.ownerLookup.remainingDays) || 0} dia(s)</span></div>` : '';
  const uptime = Number(status.uptimeSeconds) || 0;
  const uptimeLabel = `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`;
  const bans = (state.ownerBans || []).map(entry=>`<div class="owner-vip-row"><div><code>${escapeHtml(entry.userId)}</code><small>${escapeHtml(entry.reason || 'Sem motivo informado')} · ${Number(entry.strikes)||0} strike(s)</small></div><button class="action-button secondary" type="button" data-owner-unban="${escapeHtml(entry.userId)}">Remover ban</button></div>`).join('');
  const audit = (state.ownerAudit || []).map(entry=>`<div class="channel-chip">${escapeHtml(entry.action || 'Ação')} · ${escapeHtml(entry.userName || entry.userId || '')} · ${escapeHtml(dateText(entry.createdAt || entry.at))}</div>`).join('');
  return `${header('OWNER · PRIVADO', 'Painel Owner<span class="period">.</span>', 'Ações protegidas por autorização no servidor. Use os botões abaixo para gerenciar VIPs e consultar o estado do bot.')}
    <div class="owner-music"><strong>Tocou na Ferida — MC Dodo</strong><button class="action-button secondary" id="owner-manual-play" type="button">Tocar</button><div id="owner-video-slot" class="owner-video-slot" aria-live="polite"></div><small>Reprodução manual; nenhum áudio inicia ao carregar.</small></div>
    <div class="owner-status-grid">
      <article class="owner-stat-card"><small>ESTADO DO BOT</small><strong>${status.ready ? 'Online' : 'Iniciando'}</strong></article>
      <article class="owner-stat-card"><small>LATÊNCIA</small><strong>${Number.isFinite(status.latencyMs) ? `${status.latencyMs} ms` : '—'}</strong></article>
      <article class="owner-stat-card"><small>SERVIDORES</small><strong>${Number(status.guildCount) || 0}</strong></article>
      <article class="owner-stat-card"><small>MEMBROS EM CACHE</small><strong>${(Number(status.memberCount) || 0).toLocaleString('pt-BR')}</strong></article>
      <article class="owner-stat-card"><small>UPTIME</small><strong>${uptimeLabel}</strong></article>
      <button class="action-button secondary owner-refresh" id="owner-refresh" type="button">Atualizar painel</button>
    </div>
    <section class="nte-card security-settings"><h3>Status do bot</h3><p class="helper-text">Selecione o servidor e o canal; o painel público atualiza automaticamente a cada 3 segundos enquanto o bot está online. O botão Website usa a URL configurada; no modo local, é localhost.</p><label>Servidor <select id="status-guild"></select></label><label>Canal <select id="status-channel"></select></label><button class="action-button" id="status-publish" type="button">Salvar/Publicar</button> <button class="action-button secondary" id="status-stop" type="button">Parar</button></section>
    <div class="owner-actions-grid">
      <form class="owner-card" id="owner-vip-form"><span class="eyebrow">ACESSO VIP</span><h2>Conceder ou estender</h2><p>Nada é concedido automaticamente. Cada alteração exige uma confirmação explícita do Owner e fica registrada na auditoria.</p><label for="owner-user-id">ID Discord do usuário</label><input id="owner-user-id" name="userId" inputmode="numeric" pattern="[0-9]{15,20}" minlength="15" maxlength="20" placeholder="Ex.: 123456789012345678" required><label for="owner-vip-days">Duração (dias)</label><input id="owner-vip-days" name="days" type="number" min="1" max="3650" step="1" value="30" required><button class="action-button" type="submit">Conceder / estender VIP</button></form>
      <form class="owner-card" id="owner-lookup-form"><span class="eyebrow">CONSULTA</span><h2>Consultar usuário</h2><p>Veja se o acesso está ativo e quando vence.</p><label for="owner-lookup-id">ID Discord do usuário</label><input id="owner-lookup-id" name="userId" inputmode="numeric" pattern="[0-9]{15,20}" minlength="15" maxlength="20" placeholder="123456789012345678" required><button class="action-button secondary" type="submit">Consultar VIP</button>${lookup}</form>
    </div>
      <form class="owner-card" id="owner-ban-form"><span class="eyebrow">MODERAÇÃO OWNER</span><h2>Bans e strikes</h2><label for="owner-ban-id">ID Discord do usuário</label><input id="owner-ban-id" inputmode="numeric" pattern="[0-9]{15,20}" required><label for="owner-ban-reason">Motivo</label><input id="owner-ban-reason" maxlength="500" required><button class="action-button" type="submit">Banir usuário</button></form>
    <section class="owner-card owner-vip-list"><div class="owner-list-heading"><div><span class="eyebrow">VIP ATIVOS</span><h2>Usuários com acesso</h2></div><span>LISTA LIMITADA A 25</span></div>${state.ownerLoading ? '<div class="empty-state">Atualizando…</div>' : rows || '<div class="empty-state">Nenhum VIP ativo foi encontrado.</div>'}</section>
    <section class="owner-card owner-vip-list"><div class="owner-list-heading"><h2>Bans e strikes</h2><span>REGISTROS MANTIDOS</span></div>${bans || '<div class="empty-state">Nenhum ban registrado.</div>'}</section><section class="owner-card owner-vip-list"><div class="owner-list-heading"><h2>Auditoria VIP</h2></div><div class="channel-list">${audit || '<div class="empty-state">Nenhuma auditoria disponível.</div>'}</div></section>`;
}
function creditsView(){
  if(!state.creators.length) return `${header('NYOM MD','Créditos<span class="period">.</span>','Creators e colaboradores autorizados pelo projeto.') }<div class="empty-state">Nenhum perfil de creator disponível no momento.</div>`;
  return `${header('NYOM MD','Créditos<span class="period">.</span>','Conheça os creators e colaboradores autorizados do projeto.') }<section class="creator-carousel">${state.creators.map(c=>`<article class="creator-card"><div class="creator-banner" style="background-image:url('${escapeHtml(c.banner || '')}')"></div><img class="creator-avatar" src="${escapeHtml(c.avatar || '')}" alt="${escapeHtml(c.name)}" onerror="this.hidden=true"><h2>${escapeHtml(c.name)}</h2><p>${escapeHtml(c.description || '')}</p><div class="creator-links">${c.discordUrl ? `<a href="${escapeHtml(c.discordUrl)}" target="_blank" rel="noopener noreferrer"><svg class="inline-icon" viewBox="0 0 24 24"><path d="M7 7.5a8 8 0 0 1 10 0 9.5 9.5 0 0 1 1.8 8.4c-2 1.5-4 2.2-6.8 2.2s-4.8-.7-6.8-2.2A9.5 9.5 0 0 1 7 7.5Z"/></svg> Discord</a>` : ''}${(c.youtubeUrls || []).map((url,i)=>`<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"><span class="inline-icon-label">YT</span> YouTube${(c.youtubeUrls||[]).length>1?' '+(i+1):''}</a>`).join('')}${!c.discordUrl && !(c.youtubeUrls||[]).length ? '<span><span class="inline-icon-label">LINK</span> Links em breve</span>':''}</div></article>`).join('')}</section>`;
}
function render() {
  if (!state.guild && state.view !== 'owner') state.view = 'servers';
  if (state.view === 'owner' && !state.ownerAccess) state.view = 'servers';
  const shell = $('#app-shell');
  shell.classList.toggle('dashboard-mode', Boolean(state.guild || state.view === 'owner'));
  $('#server-home-button').classList.toggle('hidden', !state.guild);
  $('#crumb-title').textContent = titles[state.view] || 'Seus servidores';
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.view === state.view));
  const views = { servers: serverListView, overview, automod: automodView, security: securityView, captcha: captchaView, tickets: ticketsView, logs: logsView, commands: commandsView, games: gamesView, giveaway: giveawayView, community: communityView, owner: ownerView, premium: premiumView, credits: creditsView,
    settings: () => { const u = state.user || {}; const avatar = u.avatar ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=256` : ''; const banner = u.banner ? `https://cdn.discordapp.com/banners/${u.id}/${u.banner}.png?size=1024` : ''; return `${header('PREFERÊNCIAS', 'Configurações<span class="period">.</span>', 'Detalhes da conexão da sua conta com o painel NYOM MD.') }<div class="settings-list profile-settings"><div class="profile-cover" style="${banner ? `background-image:url('${escapeHtml(banner)}')` : ''}"></div><div class="profile-settings-main"><div class="profile-settings-avatar" style="${avatar ? `background-image:url('${escapeHtml(avatar)}')` : ''}">${avatar ? '' : escapeHtml((u.global_name || u.username || 'N').slice(0,1).toUpperCase())}</div><div><strong>${escapeHtml(u.global_name || u.username || 'Não conectado')}</strong><p>@${escapeHtml(u.username || 'discord')} · ${escapeHtml(u.id || '')}</p><small>${u.public_flags ? 'Insígnias públicas disponíveis na conta Discord.' : 'Conta Discord conectada.'}</small></div></div><div class="profile-settings-grid"><div><strong>Servidores na conta</strong><p>${state.guilds.length} servidor${state.guilds.length === 1 ? '' : 'es'} listados · ${state.guilds.filter(g => g.botPresent).length} com NYOM instalado.</p></div><div><strong>Privacidade</strong><p>O painel usa somente os dados necessários para login e configuração. Conversas e áudios não ficam armazenados no site.</p></div></div></div>`; },
  };
  content.innerHTML = (views[state.view] || serverListView)();
  if(state.view==='automod'&&state.guild) initializeCustomAutoMod();
  bindServerCards();
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => { state.view = button.dataset.go; render(); }));
  document.querySelectorAll('[data-command-toggle]').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const details = button.closest('[data-command-card]')?.querySelector('.command-details');
    if (!details) return;
    button.setAttribute('aria-expanded', String(!expanded));
    details.hidden = expanded;
    button.textContent = commandDetailsLabel(!expanded);
  }));
  document.querySelectorAll('[data-toggle]').forEach(button => button.addEventListener('click', () => setFeature(button.dataset.toggle, button.getAttribute('aria-pressed') !== 'true', button)));
  $('#create-logs')?.addEventListener('click', createLogs);
  $('#disable-logs')?.addEventListener('click', disableLogs);
  $('#save-log-bindings')?.addEventListener('click', saveLogBindings);
  $('#serverconfig-form')?.addEventListener('submit', saveServerProfile);
  $('#save-security')?.addEventListener('click', saveSecurity);
  $('#captcha-form')?.addEventListener('submit', saveCaptchaSettings);
  $('#giveaway-form')?.addEventListener('submit', publishGiveaway);
  $('#welcome-form')?.addEventListener('submit', saveWelcome);
  $('#publish-suggestions')?.addEventListener('click', event=>publishSuggestions(event.currentTarget));
  $('#publish-captcha')?.addEventListener('click', event => publishCaptchaPanel(event.currentTarget));
  $('#owner-vip-form')?.addEventListener('submit', grantOwnerVip);
  $('#owner-lookup-form')?.addEventListener('submit', lookupOwnerVip);
  $('#owner-refresh')?.addEventListener('click', refreshOwnerPanel);
  $('#save-custom-automod')?.addEventListener('click', saveCustomAutoMod);
  $('#status-publish')?.addEventListener('click', publishStatusPanel); $('#status-stop')?.addEventListener('click', stopStatusPanel); if(state.view==='owner') loadStatusPanelUI();
  $('#owner-ban-form')?.addEventListener('submit', createOwnerBan);
  document.querySelectorAll('[data-owner-unban]').forEach(button=>button.addEventListener('click',()=>removeOwnerBan(button.dataset.ownerUnban)));
  document.querySelectorAll('[data-premium-interest]').forEach(button=>button.addEventListener('click',()=>sendPremiumInterest(button)));
  $('#owner-manual-play')?.addEventListener('click',()=>{const slot=$('#owner-video-slot'),button=$('#owner-manual-play');const frame=slot.querySelector('iframe');if(frame){frame.remove();button.textContent='Tocar';if(ownerMusicWasPlaying&&youtubeReady&&youtubePlayer){musicRequested=true;storeValue('nyom_music','on');youtubePlayer.setVolume(15);youtubePlayer.playVideo();}ownerMusicWasPlaying=false;return;}ownerMusicWasPlaying=Boolean(youtubeReady&&youtubePlayer&&youtubePlayer.getPlayerState()===YT.PlayerState.PLAYING);if(ownerMusicWasPlaying)youtubePlayer.pauseVideo();slot.innerHTML='<iframe title="Tocou na Ferida — MC Dodo" width="320" height="180" src="https://www.youtube-nocookie.com/embed/VwKtSn-E3GA?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';button.textContent='Pausar';});
  document.querySelectorAll('[data-owner-remove]').forEach(button => button.addEventListener('click', () => removeOwnerVip(button.dataset.ownerRemove, button)));
  if (state.view === 'tickets') window.NYOMTicketEditor?.bind({ state, api, toast, render });
  translateInterface(document);
  $('#command-search')?.addEventListener('input', filterCommands);
  $('#command-filter')?.addEventListener('change', filterCommands);
  document.querySelectorAll('[data-preview-url]').forEach(input => input.addEventListener('input', () => previewImage(input.dataset.previewUrl, input.value)));
}
function filterCommands() {
  const query = ($('#command-search')?.value || '').trim().toLowerCase();
  const category = $('#command-filter')?.value || 'Todos';
  document.querySelectorAll('[data-command-card]').forEach(card => {
    const matchesText = !query || card.dataset.search.includes(query);
    const matchesCategory = category === 'Todos' || card.dataset.category === category;
    card.hidden = !(matchesText && matchesCategory);
  });
}
let autoModLoadedFor = '';
async function initializeCustomAutoMod() {
  const guildId = state.guild.id;
  if (autoModLoadedFor === guildId) return;
  autoModLoadedFor = guildId;
  try {
    const [{ config }, resources] = await Promise.all([
      api(`/api/guilds/${encodeURIComponent(guildId)}/automod/custom`),
      api(`/api/guilds/${encodeURIComponent(guildId)}/resources`),
    ]);
    state.customAutoModConfig = config;
    const roles = resources.roles || [];
    const channels = resources.channels || [];
    const roleHTML = roles.map(role => `<option value="${escapeHtml(role.id)}">${escapeHtml(role.name)}</option>`).join('');
    const channelHTML = channels.map(channel => `<option value="${escapeHtml(channel.id)}"># ${escapeHtml(channel.name)}</option>`).join('');
    $('#am-raid-role').innerHTML = '<option value="">Selecione um cargo</option>' + roleHTML;
    $('#am-auto-role').innerHTML = '<option value="">Selecione um cargo</option>' + roleHTML;
    $('#am-antibot-role').innerHTML = '<option value="">Selecione um cargo</option>' + roleHTML;
    $('#am-exempt-roles').innerHTML = roleHTML;
    $('#am-exempt-channels').innerHTML = channelHTML;
    for (const [id, enabled] of [['am-caps', config.antiCaps.enabled], ['am-raid', config.antiRaid.enabled], ['am-quarantine', config.autoQuarantine.enabled], ['am-mass-mention', config.antiMassMention?.enabled], ['am-antibot', config.antiBot?.enabled]]) $('#' + id).checked = Boolean(enabled);
    $('#am-caps-threshold').value = config.antiCaps.threshold;
    $('#am-caps-action').value = config.antiCaps.action;
    $('#am-raid-threshold').value = config.antiRaid.joinThreshold;
    $('#am-raid-window').value = config.antiRaid.windowSeconds;
    $('#am-raid-action').value = config.antiRaid.action;
    $('#am-raid-role').value = config.antiRaid.quarantineRoleId || '';
    $('#am-age').value = config.autoQuarantine.minAccountAgeDays;
    $('#am-auto-role').value = config.autoQuarantine.roleId || '';
    $('#am-mass-mention-threshold').value = config.antiMassMention?.threshold || 5;
    $('#am-mass-mention-action').value = config.antiMassMention?.action || 'delete';
    $('#am-antibot-verified').checked = config.antiBot?.allowVerified !== false;
    $('#am-antibot-role').value = config.antiBot?.allowedRoleId || '';
    for (const id of config.antiCaps.exemptRoleIds || []) $('#am-exempt-roles').querySelector(`option[value="${CSS.escape(id)}"]`)?.setAttribute('selected', '');
    for (const id of config.antiCaps.exemptChannelIds || []) $('#am-exempt-channels').querySelector(`option[value="${CSS.escape(id)}"]`)?.setAttribute('selected', '');
  } catch (error) {
    autoModLoadedFor = '';
    toast(error.message);
  }
}
async function saveCustomAutoMod() {
  if (!state.guild) return;
  const selected = id => [...$(id).selectedOptions].map(option => option.value);
  const patch = {
    antiCaps: { enabled: $('#am-caps').checked, threshold: Number($('#am-caps-threshold').value), action: $('#am-caps-action').value, exemptRoleIds: selected('#am-exempt-roles'), exemptChannelIds: selected('#am-exempt-channels') },
    antiRaid: { enabled: $('#am-raid').checked, joinThreshold: Number($('#am-raid-threshold').value), windowSeconds: Number($('#am-raid-window').value), action: $('#am-raid-action').value, quarantineRoleId: $('#am-raid-role').value || null, exemptRoleIds: selected('#am-exempt-roles') },
    autoQuarantine: { enabled: $('#am-quarantine').checked, minAccountAgeDays: Number($('#am-age').value), roleId: $('#am-auto-role').value || null },
    antiMassMention: { enabled: $('#am-mass-mention').checked, threshold: Number($('#am-mass-mention-threshold').value), action: $('#am-mass-mention-action').value, exemptRoleIds: selected('#am-exempt-roles'), exemptChannelIds: selected('#am-exempt-channels') },
    antiBot: { enabled: $('#am-antibot').checked, allowVerified: $('#am-antibot-verified').checked, allowedRoleId: $('#am-antibot-role').value || null },
  };
  const previous = state.customAutoModConfig || {};
  if (patch.antiCaps.enabled && patch.antiCaps.action !== 'delete' && !window.confirm('AntiCaps poderá aplicar a ação punitiva selecionada às mensagens detectadas. Confirma?')) return;
  if ((patch.antiRaid.enabled || patch.autoQuarantine.enabled) && !window.confirm('AntiRaid pode aplicar uma ação a todos os membros não isentos da janela quando o limiar for atingido; AutoQuarantine também atua automaticamente. Confirma?')) return;
  if (patch.antiBot.enabled && !window.confirm('Ativar Anti-Bot? Bots não autorizados serão expulsos; o responsável poderá perder cargos e receber timeout de uma semana.')) return;
  const button = $('#save-custom-automod');
  button.disabled = true;
  try {
    const result = await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/automod/custom`, { method: 'POST', body: JSON.stringify(patch) });
    state.customAutoModConfig = result.config;
    toast('Configuração AutoMod salva.');
  } catch (error) {
    toast(error.message);
  } finally {
    button.disabled = false;
  }
}
async function loadStatusPanelUI(){try{const [{guilds},data]=await Promise.all([api('/api/owner/status-panel/guilds'),api('/api/owner/status-panel')]);const g=$('#status-guild');if(!g)return;g.innerHTML=guilds.map(x=>`<option value="${escapeHtml(x.id)}">${escapeHtml(x.name)}</option>`).join('');if(data.config?.guildId)g.value=data.config.guildId;await loadStatusChannels();g.onchange=loadStatusChannels;}catch(e){toast(e.message)}}
async function loadStatusChannels(){const g=$('#status-guild')?.value;if(!g)return;try{const {channels}=await api(`/api/owner/status-panel/guilds/${encodeURIComponent(g)}/channels`);$('#status-channel').innerHTML=channels.map(x=>`<option value="${escapeHtml(x.id)}"># ${escapeHtml(x.name)}</option>`).join('');}catch(e){toast(e.message)}}
async function publishStatusPanel(){try{await api('/api/owner/status-panel',{method:'POST',body:JSON.stringify({guildId:$('#status-guild').value,channelId:$('#status-channel').value})});toast('Painel salvo/publicado.');}catch(e){toast(e.message)}}
async function stopStatusPanel(){try{await api('/api/owner/status-panel',{method:'POST',body:JSON.stringify({action:'stop'})});toast('Atualizações do painel pausadas.');}catch(e){toast(e.message)}}
async function saveSecurity() {
  const button = $('#save-security'); if (!button || !state.guild) return;
  const body = {
    antlinkEnabled: $('#security-antlink-enabled').checked,
    antlinkRoleId: $('#security-antlink-role').value,
    antinukeEnabled: $('#security-antinuke-enabled').checked,
    antinukeRoleId: $('#security-antinuke-role').value,
    anteselfbotEnabled: $('#security-anteselfbot-enabled').checked,
    anteselfbotChannelId: $('#security-anteselfbot-channel').value,
    antiFlood: { messageLimit: Number($('#flood-message-limit').value), windowSeconds: Number($('#flood-window-seconds').value), repeatLimit: Number($('#flood-repeat-limit').value), repeatWindowSeconds: Number($('#flood-repeat-window').value), timeoutSeconds: Number($('#flood-timeout').value) },
  };
  button.disabled = true;
  try {
    const result = await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/security`, { method: 'POST', body: JSON.stringify(body) });
    state.config.security = result.security; state.config.antiflood = result.antiflood; toast('Segurança salva; Anti-link sincronizado e cargo permitido preservado.'); render();
  } catch (error) { toast(error.message); button.disabled = false; }
}
async function saveCaptchaSettings(event) {
  event.preventDefault();
  if (!state.guild) return;
  const enabled = $('#captcha-enabled').checked;
  const current = state.captchaConfig || {};
  const accessLockEnabled = enabled && $('#captcha-access-lock').checked;
  const verificationChannelId = $('#captcha-verification-channel').value || null;
  const unverifiedRoleId = $('#captcha-unverified-role').value || null;
  if (current.enabled && !enabled && !window.confirm('Desativar CAPTCHA e restaurar o acesso do cargo inicial? Overwrites alterados manualmente serão preservados.')) return;
  if (enabled && Boolean(current.accessLockEnabled) !== accessLockEnabled) {
    const message = accessLockEnabled
      ? 'Restringir Ver canal do cargo inicial em todos os canais/categorias, deixando acessível apenas o canal CAPTCHA? O estado anterior será salvo para restauração. Revise cargos automáticos que possam conceder acesso.'
      : 'Desativar a restrição e restaurar os overwrites de Ver canal salvos? Alterações manuais feitas enquanto o bloqueio estava ativo serão preservadas.';
    if (!window.confirm(message)) return;
  }
  const accessTargetChanged = enabled && current.accessLockEnabled && accessLockEnabled && (String(current.verificationChannelId || '') !== String(verificationChannelId || '') || String(current.unverifiedRoleId || '') !== String(unverifiedRoleId || ''));
  if (accessTargetChanged && !window.confirm('Alterar o canal CAPTCHA ou o cargo inicial reaplica a restrição de acesso em todos os canais deste servidor. Deseja continuar?')) return;
  const button = $('#save-captcha');
  const body = {
    enabled,
    accessLockEnabled,
    verificationChannelId,
    verifiedRoleId: $('#captcha-verified-role').value || null,
    unverifiedRoleId,
    logsChannelId: $('#captcha-logs-channel').value || null,
    maxAttempts: Number($('#captcha-attempts').value),
    timeoutSeconds: Number($('#captcha-timeout').value),
    title: $('#captcha-title').value,
    buttonText: $('#captcha-button-text').value,
    description: $('#captcha-description').value,
    banner: $('#captcha-banner').value.trim() || null,
    embedColor: $('#captcha-embed-color').value,
  };
  button.disabled = true; button.textContent = 'Salvando…';
  try {
    const result = await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/captcha`, { method: 'POST', body: JSON.stringify(body) });
    state.captchaConfig = result.config;
    toast(result.accessLock?.skipped ? `Configuração salva. ${result.accessLock.skipped} canal(is) alterado(s) manualmente foi(foram) preservado(s).` : 'Configuração CAPTCHA salva para este servidor.');
    render();
  } catch (error) { toast(error.message); button.disabled = false; button.textContent = 'Salvar configuração'; }
}
async function publishCaptchaPanel(button) {
  if (!state.guild || !button) return;
  button.disabled = true; button.textContent = 'Publicando…';
  try {
    const result = await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/captcha/publish`, { method: 'POST', body: JSON.stringify({}) });
    state.captchaConfig = result.config;
    toast(`Painel CAPTCHA publicado em #${result.channelName || 'verificação'}.`);
    render();
  } catch (error) { toast(error.message); button.disabled = false; button.textContent = 'Publicar / atualizar painel'; }
}
async function saveServerProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = $('#save-serverconfig');
  const data = Object.fromEntries(new FormData(form));
  if (!/^https?:\/\//i.test(data.avatar) || !/^https?:\/\//i.test(data.banner)) return toast('Avatar e banner precisam usar uma URL HTTP ou HTTPS.');
  button.disabled = true; button.textContent = 'Salvando…';
  try {
    await api(`/api/guilds/${encodeURIComponent(data.guildId)}/serverconfig`, { method: 'POST', body: JSON.stringify({ name: data.name, avatar: data.avatar, banner: data.banner }) });
    toast('Perfil do NYOM atualizado neste servidor.');
  } catch (error) { toast(error.message); }
  finally { button.disabled = false; button.innerHTML = 'Salvar personalização <span>→</span>'; }
}
function previewImage(type, url) {
  const target = type === 'avatar' ? $('#avatar-preview') : $('#banner-preview');
  if (!target) return;
  if (!/^https?:\/\//i.test(url)) { if (type === 'avatar') target.textContent = 'N'; target.style.backgroundImage = ''; return; }
  if (type === 'avatar') { target.textContent = ''; target.style.backgroundImage = `url("${url.replace(/["\\]/g, '')}")`; }
  else target.style.backgroundImage = `url("${url.replace(/["\\]/g, '')}")`;
}
async function setFeature(feature, enabled, button) {
  if (!state.guild) return;
  const route = feature === 'automod' ? 'automod' : 'tickets';
  button.disabled = true;
  try {
    await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/${route}`, { method: 'POST', body: JSON.stringify({ enabled }) });
    state.config[feature] = enabled; if (feature === 'automod' && state.config.antiflood) state.config.antiflood.enabled = enabled; if (feature === 'tickets' && state.ticketDraft) state.ticketDraft.enabled = enabled; toast(`${feature === 'automod' ? 'AutoMod' : 'Tickets'} ${enabled ? 'ativado' : 'desativado'} com sucesso.`); render();
  } catch (error) { toast(error.message); button.disabled = false; }
}
async function createLogs() {
  const button = $('#create-logs'); if (!button) return;
  button.disabled = true; button.textContent = 'Criando…';
  try {
    const result = await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/logs-create`, { method: 'POST', body: JSON.stringify({}) });
    state.config.logs = result.channels; state.config.logsEnabled = true; toast('Categoria e canais de logs criados.'); render();
  } catch (error) { toast(error.message); button.disabled = false; button.textContent = state.config?.logsEnabled ? 'Recriar / atualizar' : 'Criar canais'; }
}
async function saveLogBindings() {
  const button = $('#save-log-bindings');
  if (!button || !state.guild) return;
  const channels = {};
  document.querySelectorAll('[data-log-channel]').forEach(select => { if (select.value) channels[select.dataset.logChannel] = select.value; });
  button.disabled = true; button.textContent = 'Salvando…';
  try {
    const result = await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/logs-bind`, { method: 'POST', body: JSON.stringify({ channels }) });
    state.config.logs = result.channels || {}; state.config.logsEnabled = Boolean(result.logsEnabled); toast('Canais de logs salvos.'); render();
  } catch (error) { toast(error.message); button.disabled = false; button.textContent = 'Salvar canais selecionados'; }
}
async function disableLogs() {
  const button = $('#disable-logs');
  if (!button || !state.guild) return;
  const count = Object.keys(state.config?.logs || {}).length;
  const confirmed = window.confirm(`Desativar logs em ${state.guild.name}? Esta ação apagará os canais associados ao NYOM${count ? ` (${count} mapeados)` : ''}. Canais não mapeados não serão removidos. Continuar?`);
  if (!confirmed) return;
  button.disabled = true; button.textContent = 'Apagando…';
  try {
    const result = await api(`/api/guilds/${encodeURIComponent(state.guild.id)}/logs/disable`, { method: 'POST', body: JSON.stringify({}) });
    state.config.logs = result.remaining || {};
    state.config.logsEnabled = Boolean(result.enabled);
    const failed = Array.isArray(result.failures) ? result.failures.length : 0;
    toast(failed ? `${result.deletedCount || 0} canal(is) removido(s); ${failed} não puderam ser apagados. Confira permissões e tente novamente.` : `${result.deletedCount || 0} canal(is) de log apagado(s).`);
    render();
  } catch (error) { toast(error.message); button.disabled = false; button.textContent = 'Desativar e apagar'; }
}
async function refreshOwnerPanel(renderAfter = true) {
  if (!state.ownerAccess) return;
  state.ownerLoading = true;
  const button = $('#owner-refresh'); if (button) button.disabled = true;
  try {
    const [status, vipData, bansData, auditData] = await Promise.all([api('/api/owner/status'), api('/api/owner/vips'), api('/api/owner/bans'), api('/api/owner/vips/audit')]);
    state.ownerStatus = status; state.ownerVips = Array.isArray(vipData.entries) ? vipData.entries : [];
    state.ownerBans = Array.isArray(bansData.entries) ? bansData.entries : [];
    state.ownerAudit = Array.isArray(auditData.entries) ? auditData.entries : [];
  } catch (error) {
    toast(error.message);
    if (error.status === 403) { state.ownerAccess = false; state.ownerStatus = null; state.ownerVips = []; state.ownerLookup = null; state.view = 'servers'; renderAccount(); render(); }
  } finally {
    state.ownerLoading = false;
    if (renderAfter && state.view === 'owner') render();
  }
}
async function createOwnerBan(event){event.preventDefault();const userId=$('#owner-ban-id').value.trim(),reason=$('#owner-ban-reason').value.trim();if(!/^\d{15,20}$/.test(userId))return toast('Informe um ID Discord válido.');try{await api('/api/owner/bans',{method:'POST',body:JSON.stringify({userId,reason})});toast('Ban registrado.');await refreshOwnerPanel();}catch(error){toast(error.message);}}
async function removeOwnerBan(userId){if(!window.confirm(`Remover o ban de ${userId}?`))return;try{await api(`/api/owner/bans/${encodeURIComponent(userId)}`,{method:'DELETE'});toast('Ban removido.');await refreshOwnerPanel();}catch(error){toast(error.message);}}
async function sendPremiumInterest(button){button.disabled=true;try{await api('/api/premium/interest',{method:'POST',body:JSON.stringify({planId:button.dataset.premiumInterest})});toast('Interesse registrado. Nenhuma compra ou pagamento foi realizado.');}catch(error){toast(error.message || 'Não foi possível enviar seu interesse.');}finally{button.disabled=false;}}
async function loadCreators(){try{const result=await api('/api/creators');state.creators=Array.isArray(result.creators)?result.creators:[];}catch{state.creators=[];}}
async function grantOwnerVip(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const userId = $('#owner-user-id', form).value.trim();
  const days = Number($('#owner-vip-days', form).value);
  const button = form.querySelector('button[type="submit"]');
  if (!/^\d{15,20}$/.test(userId)) return toast('Informe um ID Discord válido.');
  if (!Number.isInteger(days) || days < 1 || days > 3650) return toast('Informe de 1 a 3650 dias.');
  if (!window.confirm(`Confirmar VIP para ${userId} por ${days} dia(s)? Esta ação será registrada na auditoria.`)) return;
  button.disabled = true;
  try {
    const result = await api('/api/owner/vips', { method: 'POST', body: JSON.stringify({ userId, days, confirm: true, explicit: 'OWNER_GRANT' }) });
    state.ownerLookup = result.result;
    toast('VIP concedido ou estendido.');
    await refreshOwnerPanel();
  } catch (error) { toast(error.message); button.disabled = false; }
}
async function lookupOwnerVip(event) {
  event.preventDefault();
  const userId = $('#owner-lookup-id', event.currentTarget).value.trim();
  if (!/^\d{15,20}$/.test(userId)) return toast('Informe um ID Discord válido.');
  try { state.ownerLookup = await api(`/api/owner/vips/${encodeURIComponent(userId)}`); render(); }
  catch (error) { toast(error.message); }
}
async function removeOwnerVip(userId, button) {
  if (!/^\d{15,20}$/.test(String(userId || ''))) return toast('ID Discord inválido.');
  if (!window.confirm(`Remover o VIP do usuário ${userId}?`)) return;
  button.disabled = true;
  try {
    const result = await api(`/api/owner/vips/${encodeURIComponent(userId)}`, { method: 'DELETE' });
    state.ownerLookup = null;
    toast(result.removed ? 'VIP removido.' : 'O usuário não tinha um registro VIP.');
    await refreshOwnerPanel();
  } catch (error) { toast(error.message); button.disabled = false; }
}
function setTheme(theme) {
  const selected = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = selected;
  const button = $('#theme-toggle');
  button.innerHTML = selected === 'light' ? ICONS.sun : ICONS.moon;
  button.setAttribute('aria-label', `Tema ${selected === 'light' ? 'claro' : 'escuro'}; alternar tema`);
  button.title = `Tema ${selected === 'light' ? 'claro' : 'escuro'}`;
  document.querySelector('meta[name="theme-color"]').content = selected === 'light' ? '#f5f5f4' : '#111214';
  try { localStorage.setItem('nyom_theme', selected); } catch {}
}
const YOUTUBE_VIDEO_ID = 'TNjRdugYuy8';
const YOUTUBE_URL = 'https://youtu.be/TNjRdugYuy8?is=74xJHNgzS2tVfaYE';
let youtubePlayer = null, youtubeApiLoading = false, youtubeReady = false, youtubeErrorCode = null, musicRequested = storedValue('nyom_music', 'on') !== 'off', ownerMusicWasPlaying = false;
function storedValue(key, fallback = null) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }
function storeValue(key, value) { try { localStorage.setItem(key, value); } catch {} }
function showMusicFallback(show) { const link = $('#music-fallback'); if (link) link.hidden = !show; }
function updateMusicButton(playing = false, unavailable = false, loading = false) {
  const button = $('#music-toggle');
  if (!button) return;
  button.innerHTML = unavailable ? ICONS.external : (loading ? '<span class="icon-loading" aria-hidden="true"></span>' : (playing ? ICONS.pause : ICONS.music));
  button.disabled = loading;
  button.classList.toggle('is-playing', playing);
  button.setAttribute('aria-label', unavailable ? 'Abrir a música no YouTube' : (loading ? 'Carregando música' : (playing ? 'Pausar música ambiente' : 'Ativar música ambiente')));
  button.title = unavailable ? 'O vídeo não pode ser reproduzido aqui; abrir no YouTube' : (loading ? 'Carregando o player do YouTube…' : (playing ? 'Pausar música' : 'Ativar música · volume 15%'));
}
function createYouTubePlayer() {
  if (!window.YT?.Player || youtubePlayer) return;
  youtubePlayer = new YT.Player('youtube-player', {
    height: '200', width: '200', videoId: YOUTUBE_VIDEO_ID,
    playerVars: { autoplay: 0, controls: 1, disablekb: 0, loop: 1, playlist: YOUTUBE_VIDEO_ID, playsinline: 1, rel: 0, enablejsapi: 1, origin: window.location.origin },
    events: {
      onReady: event => {
        youtubeReady = true;
        event.target.setVolume(15);
        updateMusicButton(false);
        if (musicRequested) event.target.playVideo();
      },
      onStateChange: event => {
        if (event.data === YT.PlayerState.PLAYING) updateMusicButton(true);
        else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) updateMusicButton(false);
      },
      onAutoplayBlocked: () => {
        musicRequested = true; storeValue('nyom_music', 'on'); updateMusicButton(false);
        toast('O navegador bloqueou o áudio automático. Toque no controle de música para autorizar a reprodução.');
      },
      onError: event => {
        youtubeErrorCode = Number(event?.data) || 'unknown';
        musicRequested = false; updateMusicButton(false, true); showMusicFallback(true);
        const reason = [101, 150].includes(youtubeErrorCode) ? 'O vídeo não permite reprodução incorporada.' : youtubeErrorCode === 100 ? 'O vídeo está privado ou indisponível.' : youtubeErrorCode === 153 ? 'O YouTube recusou a identificação deste player.' : 'O player do YouTube não conseguiu abrir o vídeo.';
        toast(`${reason} Use o link “Abrir no YouTube”.`);
      },
    },
  });
}
function initializeMusicPlayer() {
  if (window.YT?.Player) return createYouTubePlayer();
  if (youtubeApiLoading) return;
  youtubeApiLoading = true;
  updateMusicButton(false, false, true);
  window.onYouTubeIframeAPIReady = createYouTubePlayer;
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api'; script.async = true;
  script.onerror = () => { youtubeApiLoading = false; youtubeErrorCode = 'api'; updateMusicButton(false, true); showMusicFallback(true); toast('Não foi possível carregar o player. Abra a música diretamente no YouTube.'); };
  document.head.appendChild(script);
}
async function load() {
  setTheme(storedValue('nyom_theme', 'light'));
  initializeMusicPlayer();
  state.language=storedValue('nyom_language','pt-BR'); if (!['pt-BR','en','es'].includes(state.language)) state.language='pt-BR';
  const languageSelect=$('#language-select'); if(languageSelect){languageSelect.value=state.language;document.documentElement.lang=state.language;languageSelect.addEventListener('change',()=>{state.language=languageSelect.value;document.documentElement.lang=state.language;storeValue('nyom_language',state.language);render();});}
  try {
    const [data, catalog] = await Promise.all([api('/api/me'), api('/api/commands').catch(() => [])]);
    state.user = data.user; state.guilds = data.guilds || []; state.commandCatalog = Array.isArray(catalog) ? catalog : (catalog.commands || []); await loadCreators();
    state.ownerAccess = false; state.ownerStatus = null;
    if (state.user) {
      state.premium = await api('/api/premium/status').catch(() => ({ active: false }));
      try { state.ownerStatus = await api('/api/owner/status'); state.ownerAccess = true; } catch { state.ownerAccess = false; }
    }
    renderAccount(); setGuildHeader();
    const params = new URLSearchParams(location.search);
    const authResult = params.get('auth');
    const communityResult = params.get('community');
    if (authResult === 'setup') toast('Login indisponível: preencha DISCORD_CLIENT_SECRET no .env do bot e reinicie o serviço.');
    else if (authResult === 'failed') toast('Login não concluído. Confira o Client Secret e a Redirect URI OAuth deste domínio.');
    if (communityResult === 'joined') toast('Sua conta foi adicionada à comunidade NYOM com sua autorização.');
    else if (communityResult === 'already') toast('Sua conta já estava na comunidade NYOM.');
    else if (communityResult === 'failed') toast('Não foi possível concluir a entrada automática. Use o convite direto da comunidade na tela inicial.');
    if (authResult || communityResult) history.replaceState({}, '', '/');
    state.view = 'servers'; render();
  } catch { content.innerHTML = '<div class="empty-state">Não foi possível carregar o painel. Atualize a página.</div>'; }
}
document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.view === 'servers') goHome();
  else if (button.dataset.view === 'owner') {
    if (!state.ownerAccess) return toast('Acesso restrito aos proprietários do NYOM.');
    state.view = 'owner'; state.ownerLoading = true; closeMobileMenu(); render(); refreshOwnerPanel();
  }
  else if (button.dataset.view === 'credits') { state.view='credits'; closeMobileMenu(); render(); }
  else if (button.dataset.view === 'premium' && !state.guild) { state.view='premium'; closeMobileMenu(); render(); }
  else if (button.dataset.view === 'giveaway' || button.dataset.view === 'community') { state.view=button.dataset.view; closeMobileMenu(); render(); }
  else if (state.guild) { state.view = button.dataset.view; closeMobileMenu(); render(); }
}));
$('#guild-picker').addEventListener('click', goHome);
$('#server-home-button').addEventListener('click', goHome);
$('#mobile-menu').addEventListener('click', () => {
  const open = !$('#sidebar').classList.contains('open');
  $('#sidebar').classList.toggle('open', open); $('#app-shell').classList.toggle('menu-open', open);
  $('#mobile-menu').setAttribute('aria-expanded', String(open)); $('#mobile-menu').setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
$('#sidebar-backdrop').addEventListener('click', closeMobileMenu);
document.addEventListener('pointerdown', event => {
  if (window.matchMedia('(max-width: 760px)').matches && $('#sidebar').classList.contains('open') && !$('#sidebar').contains(event.target) && !$('#mobile-menu').contains(event.target)) closeMobileMenu();
});
$('#theme-toggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
$('#music-toggle').addEventListener('click', () => {
  if (youtubeErrorCode) { window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer'); return; }
  if (!youtubeReady || !youtubePlayer) { initializeMusicPlayer(); toast('O player está carregando. Toque novamente para reproduzir.'); return; }
  const playing = youtubePlayer.getPlayerState() === YT.PlayerState.PLAYING;
  if (playing) { musicRequested = false; storeValue('nyom_music', 'off'); youtubePlayer.pauseVideo(); }
  else { musicRequested = true; storeValue('nyom_music', 'on'); youtubePlayer.setVolume(15); youtubePlayer.playVideo(); }
});
$('#music-fallback').addEventListener('click', event => { event.preventDefault(); window.open(YOUTUBE_URL, '_blank', 'noopener,noreferrer'); });
$('#logout-button').addEventListener('click', async () => {
  await api('/auth/logout', { method: 'POST' }).catch(() => {});
  state.user = null; state.guilds = []; state.guild = null; state.community = null; state.config = null; state.captchaConfig = null; state.premium = null; state.ticketDraft = null; state.ticketResources = {}; state.gameLeaderboard = []; state.ownerAccess = false; state.ownerStatus = null; state.ownerVips = []; state.ownerLookup = null; state.view = 'servers';
  renderAccount(); setGuildHeader(); render(); toast('Sessão encerrada.');
});
$('#account-row').addEventListener('click', () => state.user ? $('#logout-button').click() : location.assign('/auth/discord'));
load();
setInterval(async()=>{if(!state.user)return;try{const data=await api('/api/me');state.guilds=Array.isArray(data.guilds)?data.guilds:state.guilds;if(state.guild){const fresh=state.guilds.find(g=>g.id===state.guild.id);if(fresh){state.guild=fresh;setGuildHeader();}else{state.guild=null;state.config=null;state.view='servers';setGuildHeader();}}renderAccount();if(state.view==='servers')render();}catch{}},60000);

(function initAssistantWidget(){
  const fab = $('#assistant-fab'), panel = $('#assistant-panel'), close = $('#assistant-close'), form = $('#assistant-form'), input = $('#assistant-input'), messages = $('#assistant-messages'), audioButton = $('#assistant-audio'), cookie = $('#cookie-notice'), cookieClose = $('#cookie-close');
  if (!fab || !panel || !form) return;
  const addMessage = (text, role = 'bot', audio = null) => { const item = document.createElement('p'); item.className = `assistant-message assistant-message-${role}`; item.textContent = String(text || ''); if (audio?.base64) { const player = document.createElement('audio'); player.controls = true; player.preload = 'none'; player.src = `data:${audio.mime || 'audio/mpeg'};base64,${audio.base64}`; player.style.cssText = 'display:block;width:100%;margin-top:8px;height:30px'; item.appendChild(player); } messages.appendChild(item); messages.scrollTop = messages.scrollHeight; return item; };
  const typing = () => { const item = document.createElement('p'); item.className = 'assistant-message assistant-message-bot assistant-typing'; item.setAttribute('aria-label', 'Assistente digitando'); item.innerHTML = '<span></span><span></span><span></span>'; messages.appendChild(item); messages.scrollTop = messages.scrollHeight; return item; };
  const setOpen = open => { panel.hidden = !open; fab.setAttribute('aria-expanded', String(open)); fab.setAttribute('aria-label', open ? 'Fechar assistente NYOM' : 'Abrir assistente NYOM'); if (open) input.focus(); };
  fab.addEventListener('click', () => setOpen(panel.hidden)); close?.addEventListener('click', () => setOpen(false));
  form.addEventListener('submit', async event => { event.preventDefault(); const message = input.value.trim(); if (!message) return; addMessage(message, 'user'); input.value = ''; const button = form.querySelector('button[type="submit"]'); button.disabled = true; const pending = typing(); try { const result = await api('/api/assistant', { method: 'POST', body: JSON.stringify({ message, audio: false }) }); pending.remove(); addMessage(result.answer, 'bot'); } catch (error) { pending.remove(); addMessage(error.message || 'Não consegui responder agora.', 'bot'); } finally { button.disabled = false; input.focus(); } });
  let recorder = null, chunks = [];
  audioButton?.addEventListener('click', async () => { if (recorder?.state === 'recording') { recorder.stop(); return; } if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return toast('Seu navegador não permite gravação de áudio.'); try { const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); recorder = new MediaRecorder(stream); chunks = []; recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); }; recorder.onstop = async () => { stream.getTracks().forEach(track => track.stop()); audioButton.classList.remove('is-recording'); audioButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3M8 20h8"/></svg>'; const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }); if (blob.size > 8 * 1024 * 1024) return addMessage('O áudio é maior que o limite de 8 MB.', 'bot'); addMessage('Áudio enviado.', 'user'); const pending = typing(); audioButton.disabled = true; try { const response = await fetch('/api/assistant/audio', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': blob.type || 'audio/webm', 'X-NYOM-AUDIO-REPLY': 'true' }, body: blob }); let result = {}; try { result = await response.json(); } catch {} if (!response.ok) throw new Error(result.error || 'Não foi possível processar o áudio.'); pending.remove(); addMessage(`Transcrição: ${result.transcript}\n\n${result.answer}`, 'bot', result.audio); } catch (error) { pending.remove(); addMessage(error.message || 'Não foi possível processar o áudio.', 'bot'); } finally { audioButton.disabled = false; } }; recorder.start(); audioButton.classList.add('is-recording'); audioButton.innerHTML = '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>'; toast('Gravando. Toque novamente para enviar.'); } catch { toast('Permissão de microfone não concedida.'); } });
  cookieClose?.addEventListener('click', () => cookie.remove());
})();
