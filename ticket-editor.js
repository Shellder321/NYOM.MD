(function () {
  'use strict';

  const defaults = () => ({
    version: 1, enabled: true,
    panel: { title: 'Abra seu ticket', description: 'Precisa de ajuda? Clique no botão abaixo e nossa equipe atenderá você.', color: '#5865F2', footer: 'NYOM • Suporte', imageUrl: '', thumbnailUrl: '', interaction: { type: 'button', buttonLabel: 'Criar ticket', buttonStyle: 'primary', placeholder: 'Selecione uma categoria', options: [{ value: 'suporte', label: 'Suporte', description: 'Fale com nossa equipe' }] } },
    ticket: { namePrefix: 'ticket', nameEmoji: '', aiEnabled: false, categoryId: '', staffRoleIds: [], logChannelId: '', maxOpenPerUser: 1, welcomeTitle: 'Atendimento iniciado', welcomeDescription: 'Olá! Descreva sua solicitação e nossa equipe responderá em breve.', closeLabel: 'Fechar ticket', reopenLabel: 'Reabrir ticket', transcriptEnabled: true }
  });
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const val = (obj, key, fallback = '') => obj && obj[key] != null ? obj[key] : fallback;
  const checked = value => value ? ' checked' : '';
  const selectOptions = (items, selected, emptyLabel) => `<option value="">${esc(emptyLabel)}</option>` + (items || []).map(item => `<option value="${esc(item.id)}"${String(item.id) === String(selected) ? ' selected' : ''}>${esc(item.name)}</option>`).join('');
  function normalize(input) {
    const d = defaults(), s = input && typeof input === 'object' ? input : {};
    const panel = Object.assign({}, d.panel, s.panel || {}), ticket = Object.assign({}, d.ticket, s.ticket || {});
    panel.interaction = Object.assign({}, d.panel.interaction, panel.interaction || {});
    panel.interaction.options = Array.isArray(panel.interaction.options) ? panel.interaction.options.slice(0, 25) : d.panel.interaction.options;
    ticket.staffRoleIds = Array.isArray(ticket.staffRoleIds) ? ticket.staffRoleIds : [];
    return Object.assign({}, d, s, { version: 1, enabled: s.enabled !== false, panel, ticket });
  }
  function render(state) {
    const s = normalize(state && state.ticketDraft), g = state && state.guild || {}, resources = state && state.ticketResources || {};
    const roles = Array.isArray(resources.roles) ? resources.roles : [], categories = Array.isArray(resources.categories) ? resources.categories : [], channels = Array.isArray(resources.channels) ? resources.channels : [];
    const p = s.panel, i = p.interaction, t = s.ticket, guildId = val(g, 'id', '');
    const roleChecks = roles.map(r => `<label class="nte-check"><input type="checkbox" data-ticket-path="ticket.staffRoleIds" value="${esc(r.id)}"${t.staffRoleIds.map(String).includes(String(r.id)) ? ' checked' : ''}><span>${esc(r.name)}</span></label>`).join('') || '<p class="nte-muted">Nenhum cargo disponível.</p>';
    const optionRows = i.options.map((o, n) => `<div class="nte-option-row" data-option-row><label>Valor<input data-ticket-option="value" value="${esc(o.value)}" aria-label="Valor da categoria ${n + 1}"></label><label>Nome exibido<input data-ticket-option="label" value="${esc(o.label)}" aria-label="Nome da categoria ${n + 1}"></label><label>Descrição<input data-ticket-option="description" value="${esc(o.description)}" aria-label="Descrição da categoria ${n + 1}"></label><button type="button" class="nte-icon-button" data-remove-option aria-label="Remover categoria ${n + 1}">Remover</button></div>`).join('');
    return `<section class="nyom-ticket-editor" data-guild-id="${esc(guildId)}"><header class="nte-header"><div><span class="nte-eyebrow">CONFIGURAÇÃO</span><h1>Central de tickets</h1><p>Configure o painel, o fluxo de atendimento e os destinos do servidor.</p></div><label class="nte-switch"><input type="checkbox" data-ticket-path="enabled"${checked(s.enabled)}><span>Tickets ativados</span></label></header>
      <div class="nte-layout"><main class="nte-main">
      <section class="nte-card"><div class="nte-card-title"><div><h2>Painel de atendimento</h2><p>Conteúdo exibido no Discord.</p></div></div><div class="nte-grid"><label>Título<input data-ticket-path="panel.title" value="${esc(p.title)}" maxlength="256"></label><label>Cor do embed<div class="nte-color-field"><input type="color" data-ticket-path="panel.color" value="${esc(/^#[0-9a-f]{6}$/i.test(p.color) ? p.color : '#5865f2')}"><input data-ticket-path="panel.color" value="${esc(p.color)}" aria-label="Código hexadecimal da cor"></div></label><label class="nte-span">Descrição<textarea data-ticket-path="panel.description" rows="4">${esc(p.description)}</textarea></label><label>Rodapé<input data-ticket-path="panel.footer" value="${esc(p.footer)}"></label><label>URL da imagem<input type="url" data-ticket-path="panel.imageUrl" value="${esc(p.imageUrl)}" placeholder="https://..."></label><label class="nte-span">URL da thumbnail<input type="url" data-ticket-path="panel.thumbnailUrl" value="${esc(p.thumbnailUrl)}" placeholder="https://..."></label></div></section>
      <section class="nte-card"><div class="nte-card-title"><div><h2>Interação</h2><p>Escolha como os membros iniciam um atendimento.</p></div></div><div class="nte-grid"><label>Tipo de interação<select data-ticket-path="panel.interaction.type"><option value="button"${i.type === 'button' ? ' selected' : ''}>Botão</option><option value="select"${i.type === 'select' ? ' selected' : ''}>Menu de categorias</option></select></label><label>Texto do botão<input data-ticket-path="panel.interaction.buttonLabel" value="${esc(i.buttonLabel)}"></label><label>Estilo do botão<select data-ticket-path="panel.interaction.buttonStyle">${[['primary','Azul'],['secondary','Cinza'],['success','Verde'],['danger','Vermelho']].map(x=>`<option value="${x[0]}"${i.buttonStyle===x[0]?' selected':''}>${x[1]}</option>`).join('')}</select></label><label>Texto do menu<input data-ticket-path="panel.interaction.placeholder" value="${esc(i.placeholder)}"></label></div><div class="nte-options-head"><h3>Categorias do menu</h3><button type="button" data-add-option class="nte-secondary">＋ Adicionar categoria</button></div><div data-options-list>${optionRows || '<p class="nte-muted">Adicione categorias para o menu.</p>'}</div><p class="nte-help">Até 25 opções.</p></section>
      <section class="nte-card"><div class="nte-card-title"><div><h2>Configuração dos tickets</h2><p>Organização e mensagem enviada ao abrir.</p></div></div><div class="nte-grid"><label>Prefixo do canal<input data-ticket-path="ticket.namePrefix" value="${esc(t.namePrefix)}" maxlength="8" placeholder="Opcional"><small class="nte-help">Use uma letra, um número, um emoji ou deixe vazio.</small></label><label>Categoria Discord<select data-ticket-path="ticket.categoryId">${selectOptions(categories,t.categoryId,'Sem categoria')}</select></label><label>Limite aberto por usuário<input type="number" min="1" max="5" data-ticket-path="ticket.maxOpenPerUser" value="${esc(t.maxOpenPerUser)}"></label><label>Canal de logs<select data-ticket-path="ticket.logChannelId">${selectOptions(channels,t.logChannelId,'Não definido')}</select></label><label class="nte-span">Cargos da equipe</label><div class="nte-role-list nte-span" aria-label="Cargos da equipe">${roleChecks}</div><label>Título de boas-vindas<input data-ticket-path="ticket.welcomeTitle" value="${esc(t.welcomeTitle)}"></label><label>Rótulo para fechar<input data-ticket-path="ticket.closeLabel" value="${esc(t.closeLabel)}"></label><label>Rótulo para reabrir<input data-ticket-path="ticket.reopenLabel" value="${esc(t.reopenLabel)}"></label><label class="nte-span">Mensagem de boas-vindas<textarea data-ticket-path="ticket.welcomeDescription" rows="3">${esc(t.welcomeDescription)}</textarea></label><label class="nte-check nte-span"><input type="checkbox" data-ticket-path="ticket.aiEnabled"${checked(t.aiEnabled)}><span>ATIVAR SUPORTE POR IA</span></label><label class="nte-check nte-span"><input type="checkbox" data-ticket-path="ticket.transcriptEnabled"${checked(t.transcriptEnabled)}><span>Gerar transcript ao fechar</span></label></div></section>
      </main><aside class="nte-aside"><section class="nte-preview-card"><h2>Pré-visualização</h2><p>Prévia aproximada do painel no Discord.</p><div class="nte-discord"><div class="nte-discord-top"><span class="nte-discord-avatar">N</span><strong>${esc(val(g,'name','Servidor'))}</strong><span class="nte-bot-tag">APP</span></div><div class="nte-embed" data-preview-embed style="border-left-color:${esc(p.color)}"><div class="nte-embed-title">${esc(p.title)}</div><div class="nte-embed-desc">${esc(p.description)}</div>${p.thumbnailUrl ? `<img class="nte-thumbnail" src="${esc(p.thumbnailUrl)}" alt="Thumbnail do embed" onerror="this.style.display='none'">` : ''}${p.imageUrl ? `<img class="nte-image" src="${esc(p.imageUrl)}" alt="Imagem do embed" onerror="this.style.display='none'">` : ''}<div class="nte-embed-footer">${esc(p.footer)}</div></div><div class="nte-fake-control">${i.type === 'select' ? `<button type="button" class="nte-fake-select" disabled>${esc(i.placeholder)} <span>⌄</span></button>` : `<button type="button" class="nte-fake-button" disabled>${esc(i.buttonLabel)}</button>`}</div></div></section><section class="nte-card nte-publish"><h2>Publicar painel</h2><p>Selecione o canal em que o painel será enviado.</p><label>Canal de publicação<select data-publish-channel>${selectOptions(channels,'','Escolha um canal')}</select></label><button type="button" data-ticket-publish class="nte-primary">Publicar no Discord</button></section><button type="button" data-ticket-save class="nte-primary nte-save">Salvar configurações</button></aside></div></section>`;
  }

  function bind({ state, api, toast, render: rerender }) {
    const host = document.querySelector('.nyom-ticket-editor');
    if (!host) return;
    if (!state.ticketDraft) state.ticketDraft = normalize(null);
    let draft = normalize(state.ticketDraft);
    const update = (path, value) => {
      const keys = path.split('.'); let obj = draft;
      for (let n = 0; n < keys.length - 1; n++) obj = obj[keys[n]];
      obj[keys[keys.length - 1]] = value;
      state.ticketDraft = draft;
    };
    const refresh = () => {
      state.ticketDraft = draft;
      const setText = (selector, text) => { const node = host.querySelector(selector); if (node) node.textContent = text; };
      const preview = host.querySelector('[data-preview-embed]');
      if (preview) {
        preview.style.borderLeftColor = draft.panel.color;
        setText('.nte-embed-title', draft.panel.title);
        setText('.nte-embed-desc', draft.panel.description);
        setText('.nte-embed-footer', draft.panel.footer);
        const updateImage = (selector, url, className, alt) => {
          let image = host.querySelector(selector);
          if (url && !image) { image = document.createElement('img'); image.className = className; image.alt = alt; image.onerror = () => { image.style.display = 'none'; }; preview.appendChild(image); }
          if (!url && image) image.remove();
          else if (image) { image.src = url; image.style.display = ''; }
        };
        updateImage('.nte-thumbnail', draft.panel.thumbnailUrl, 'nte-thumbnail', 'Thumbnail do embed');
        updateImage('.nte-image', draft.panel.imageUrl, 'nte-image', 'Imagem do embed');
      }
      const button = host.querySelector('.nte-fake-button'), menu = host.querySelector('.nte-fake-select');
      if (draft.panel.interaction.type === 'select') {
        if (button) button.outerHTML = `<button type="button" class="nte-fake-select" disabled>${esc(draft.panel.interaction.placeholder)} <span>⌄</span></button>`;
        else if (menu) menu.innerHTML = `${esc(draft.panel.interaction.placeholder)} <span>⌄</span>`;
      } else {
        if (menu) menu.outerHTML = `<button type="button" class="nte-fake-button" disabled>${esc(draft.panel.interaction.buttonLabel)}</button>`;
        else if (button) button.textContent = draft.panel.interaction.buttonLabel;
      }
    };
    host.addEventListener('input', event => {
      const el = event.target, path = el.getAttribute('data-ticket-path');
      if (path) { update(path, el.type === 'checkbox' ? el.checked : el.value); if (path.startsWith('panel.')) refresh(); }
      else if (el.hasAttribute('data-ticket-option')) {
        const row = el.closest('[data-option-row]'), rows = host.querySelectorAll('[data-option-row]');
        const index = Array.prototype.indexOf.call(rows, row), key = el.getAttribute('data-ticket-option');
        if (draft.panel.interaction.options[index]) draft.panel.interaction.options[index][key] = el.value;
        state.ticketDraft = draft;
        const embed = host.querySelector('[data-preview-embed]');
        if (embed && draft.panel.interaction.type === 'select') { const fake = host.querySelector('.nte-fake-select'); if(fake) fake.textContent = draft.panel.interaction.placeholder; }
      }
      if (el.type === 'color') { const pair = host.querySelectorAll('[data-ticket-path="panel.color"]'); pair.forEach(x => { if(x !== el) x.value = el.value; }); }
    });
    host.addEventListener('change', event => {
      const el = event.target, path = el.getAttribute('data-ticket-path');
      if (path === 'ticket.staffRoleIds') {
        draft.ticket.staffRoleIds = Array.from(host.querySelectorAll('[data-ticket-path="ticket.staffRoleIds"]:checked')).map(x => x.value); state.ticketDraft = draft;
      } else if (path) {
        let value = el.type === 'checkbox' ? el.checked : el.value;
        if (path === 'ticket.maxOpenPerUser') value = Math.max(1, Math.min(5, Number(value) || 1));
        update(path, value); refresh();
      }
    });
    const rerenderEditor = () => {
      state.ticketDraft = draft;
      if (typeof rerender === 'function') rerender();
      else refresh();
    };
    host.addEventListener('click', async event => {
      const add = event.target.closest('[data-add-option]'), remove = event.target.closest('[data-remove-option]');
      if (add) { if (draft.panel.interaction.options.length >= 25) { toast('O menu aceita no máximo 25 categorias.', 'error'); return; } draft.panel.interaction.options.push({value:'categoria-'+(draft.panel.interaction.options.length+1),label:'Nova categoria',description:''}); rerenderEditor(); return; }
      if (remove) { const row = remove.closest('[data-option-row]'), rows = Array.from(host.querySelectorAll('[data-option-row]')), index = rows.indexOf(row); if (index < 0) return; draft.panel.interaction.options.splice(index,1); rerenderEditor(); return; }
      if (event.target.closest('[data-ticket-save]')) {
        try { const gid = state.guild && state.guild.id; if (!gid) throw new Error('Servidor não identificado.'); await api(`/api/guilds/${encodeURIComponent(gid)}/tickets/config`, {method:'POST', body:JSON.stringify(draft)}); state.ticketDraft = draft; state.config = Object.assign({},state.config||{},{tickets:!!draft.enabled}); toast('Configurações de tickets salvas com sucesso.','success'); }
        catch (error) { toast(error && error.message || 'Não foi possível salvar as configurações.','error'); }
      }
      if (event.target.closest('[data-ticket-publish]')) {
        try { const gid = state.guild && state.guild.id, channelId = host.querySelector('[data-publish-channel]').value; if (!gid) throw new Error('Servidor não identificado.'); if (!channelId) throw new Error('Selecione o canal onde publicar.'); await api(`/api/guilds/${encodeURIComponent(gid)}/tickets/config`, {method:'POST', body:JSON.stringify(draft)}); state.ticketDraft = draft; state.config = Object.assign({},state.config||{},{tickets:!!draft.enabled}); await api(`/api/guilds/${encodeURIComponent(gid)}/tickets/publish`, {method:'POST', body:JSON.stringify({channelId})}); toast('Configuração salva e painel publicado com sucesso.','success'); }
        catch (error) { toast(error && error.message || 'Não foi possível publicar o painel.','error'); }
      }
    });
  }
  window.NYOMTicketEditor = { render, bind };
})();
