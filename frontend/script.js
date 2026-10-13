
/* ============================================================
   MEU BAIRRO — Front-end HTML/CSS/JS integrado à API.
   ============================================================ */

/* ---------- Ícones (SVG inline) ---------- */
const ICONS = {
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/>',
  buraco: '<circle cx="12" cy="12" r="9"/><path d="M12 3v5M7 8l2.5 2.5M17 8l-2.5 2.5M5 12h4"/>',
  lixo: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z"/><path d="M10 11v6M14 11v6"/>',
  iluminacao: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2Z"/>',
  alagamento: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"/>',
  outro: '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7M19 12H5"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z"/><path d="M10 11v6M14 11v6"/>',
  undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>',
  'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'
};

function icon(name, size = 18){
  const body = ICONS[name] || ICONS.outro;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
         '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
}

/* ---------- Categorias ---------- */
const CATEGORIES = {
  'Buraco':      { slug:'buraco',      icon:'buraco',      grad:'linear-gradient(135deg,#8a919c,#4b5058)' },
  'Lixo':        { slug:'lixo',        icon:'lixo',        grad:'linear-gradient(135deg,#5f9e6e,#2f6b45)' },
  'Iluminação':  { slug:'iluminacao',  icon:'iluminacao',  grad:'linear-gradient(135deg,#f2b544,#d97706)' },
  'Alagamento':  { slug:'alagamento',  icon:'alagamento',  grad:'linear-gradient(135deg,#5aa7d6,#1e5f8a)' },
  'Outro':       { slug:'outro',       icon:'outro',       grad:'linear-gradient(135deg,#9a7bb8,#6d4f8f)' }
};

/* ---------- Estado da interface ---------- */
let state = {
  currentUser: null,
  filters: { q:'', bairro:'', categoria:'', status:'' },
  pendingPhoto: null,
  pendingConfirmId: null
};


/* ---------- Dados vindos do Spring Boot ---------- */
let occurrences = [];
let myOccurrences = [];
let confirmationState = {};

const API_BASE = 'https://projeto-meu-bairro.onrender.com/api';

function formatarData(data) {
  if (!data) return '';
  const valor = String(data).split('T')[0];
  const partes = valor.split('-');

  return partes.length === 3
    ? `${partes[2]}/${partes[1]}/${partes[0]}`
    : valor;
}

function adaptarOcorrencia(o) {
  const categoria = o.category || o.categoria || {};
  const usuario = o.user || o.usuario || {};
  const statusBackend = String(o.status || '').toUpperCase();

  return {
    id: Number(o.id),
    title: o.titulo || '',
    description: o.descricao || '',
    bairro: o.bairro || '',
    rua: o.rua || '',
    endereco: o.endereco || '',
    categoria: categoria.nome || 'Outro',
    categoryId: categoria.id != null ? Number(categoria.id) : Number(o.categoryId || 0),
    data: formatarData(o.dataRegistro || o.data),
    status: statusBackend === 'RESOLVIDO' ? 'Resolvido' : 'Aberto',
    statusBackend: statusBackend || 'PENDENTE',
    confirmations: Number(o.confirmations ?? o.confirmacoes ?? 0),
    author: usuario.nome || o.author || 'Morador',
    authorId: usuario.id != null
      ? String(usuario.id)
      : String(o.userId ?? o.usuarioId ?? ''),
    foto: o.foto || o.imagemUrl || null
  };
}

function listaDaResposta(dados) {
  if (Array.isArray(dados)) return dados;
  if (Array.isArray(dados?.content)) return dados.content;
  return [];
}

async function jsonOpcional(resposta) {
  const texto = await resposta.text();
  return texto ? JSON.parse(texto) : null;
}

async function carregarOcorrencias(render = true) {
  try {
    const resposta = await fetch(`${API_BASE}/occurrences`);

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      throw new Error(`HTTP ${resposta.status}: ${detalhe}`);
    }

    const dados = await jsonOpcional(resposta);
    occurrences = listaDaResposta(dados).map(adaptarOcorrencia);

    if (render) renderView(...parseRoute());
    return true;
  } catch (erro) {
    console.error('Erro ao carregar ocorrências:', erro);
    toast('Não foi possível carregar as ocorrências da API.', 'info');
    return false;
  }
}

async function carregarMinhasOcorrencias(render = true) {
  const token = localStorage.getItem('token');

  if (!token || !state.currentUser) {
    if (parseRoute()[0] === 'minhas' || parseRoute()[0] === 'editar') {
      toast('Faça login para ver suas ocorrências.', 'info');
      go('/login');
    }
    return false;
  }

  try {
    const resposta = await fetch(`${API_BASE}/occurrences/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error('Erro ao carregar minhas ocorrências:', resposta.status, detalhe);
      if (resposta.status === 401) {
  logout();
} else if (resposta.status === 403) {
  toast('Você não tem permissão para acessar esta lista.', 'info');
} else {
  toast('Não foi possível carregar suas ocorrências.', 'info');
}
      return false;
    }

    myOccurrences = listaDaResposta(await jsonOpcional(resposta)).map(adaptarOcorrencia);
    if (render && parseRoute()[0] === 'minhas') renderView('minhas');
    return true;
  } catch (erro) {
    console.error('Erro ao carregar minhas ocorrências:', erro);
    toast('Falha ao conectar com o servidor.', 'info');
    return false;
  }
}

async function restaurarSessao() {
  const token = localStorage.getItem('token');
  const usuarioSalvo = localStorage.getItem('currentUser');

  if (!token || !usuarioSalvo) return;

  try {
    const usuario = JSON.parse(usuarioSalvo);
    if (!usuario || !usuario.name) throw new Error('Perfil local inválido.');

    const resposta = await fetch(`${API_BASE}/occurrences/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!resposta.ok) {
      if (resposta.status === 401) {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  state.currentUser = null;
}
      return;
    }

    myOccurrences = listaDaResposta(await jsonOpcional(resposta)).map(adaptarOcorrencia);
    state.currentUser = {
      ...usuario,
      id: usuario.id == null ? '' : String(usuario.id),
      name: String(usuario.name || usuario.nome || usuario.email || 'Morador')
    };
  } catch (erro) {
    console.error('Não foi possível restaurar a sessão:', erro);
  }
}


let categoriasAPI = [];

async function carregarCategorias() {
  try {
    const resposta = await fetch(`${API_BASE}/categories`);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    const dados = await jsonOpcional(resposta);

    categoriasAPI = (Array.isArray(dados) ? dados : dados?.content || [])
      .map(c => ({
        id: c.id,
        nome: c.nome
      }));

    return categoriasAPI;
  } catch (erro) {
    console.error('Erro ao carregar categorias:', erro);
    toast('Não foi possível carregar as categorias.', 'info');
    return [];
  }
}


async function carregarConfirmacoes(id) {
  const occurrenceId = Number(id);
  if (!Number.isInteger(occurrenceId) || occurrenceId <= 0) return null;

  try {
    const resposta = await fetch(
      `${API_BASE}/occurrences/${occurrenceId}/confirmations/count`
    );

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }

    const dados = await jsonOpcional(resposta);

    confirmationState[occurrenceId] = {
      ...confirmationState[occurrenceId],
      total: Number(dados?.totalConfirmations ?? 0)
    };

    return confirmationState[occurrenceId];
  } catch (erro) {
    console.error('Erro ao carregar confirmações:', erro);
    return null;
  }
}

async function confirmar(id) {
  const occurrenceId = Number(id);
  const token = localStorage.getItem('token');

  if (!state.currentUser || !token) {
    return solicitarLoginParaConfirmar(occurrenceId);
  }

  try {
    const resposta = await fetch(
      `${API_BASE}/occurrences/${occurrenceId}/confirmations`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (resposta.status === 401) {
  toast('Sua sessão expirou. Entre novamente.', 'info');
  logout();
  return false;
}

if (resposta.status === 403) {
  toast('Você já confirmou esta ocorrência.', 'info');
  return false;
}

    if (resposta.status === 409) {
      toast('Você já confirmou esta ocorrência.', 'info');
      await carregarConfirmacoes(occurrenceId);
      renderView('ocorrencia', occurrenceId);
      return false;
    }

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error('Erro ao confirmar ocorrência:', resposta.status, detalhe);
      toast('Não foi possível confirmar a ocorrência.', 'info');
      return false;
    }

    await carregarConfirmacoes(occurrenceId);
    toast('Ocorrência confirmada com sucesso!');
    renderView('ocorrencia', occurrenceId);
    return true;
  } catch (erro) {
    console.error('Falha ao confirmar ocorrência:', erro);
    toast('Não foi possível conectar ao servidor.', 'info');
    return false;
  }
}

const BAIRROS = ['Cidade Nova','Flores','Parque 10','Adrianópolis'];

/* ---------- Helpers ---------- */
function esc(s){ return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function today(){ return new Date().toLocaleDateString('pt-BR'); }
function confirmText(n){ return n + ' ' + (n === 1 ? 'confirmação' : 'confirmações'); }
function pluralMoradores(n){ return n + ' ' + (n === 1 ? 'morador confirmou' : 'moradores confirmaram') + ' esta ocorrência.'; }
function truncate(s, n=120){ return s.length > n ? s.slice(0, n).trim() + '…' : s; }
function slug(s){ return String(s).toLowerCase().normalize('NFD').replace(/[^\w]/g,''); }

function go(path){ location.hash = path; }

function savePostAuthRoute(path){
  // Só preserva uma rota interna de detalhes; não aceita URLs externas.
  const match = String(path || '').match(/^#?\/?ocorrencia\/(\d+)$/);
  if (match) sessionStorage.setItem('meuBairro:returnTo', '/ocorrencia/' + match[1]);
  else sessionStorage.removeItem('meuBairro:returnTo');
}

function takePostAuthRoute(){
  const path = sessionStorage.getItem('meuBairro:returnTo');
  sessionStorage.removeItem('meuBairro:returnTo');
  return path && /^\/ocorrencia\/\d+$/.test(path) ? path : '/';
}

function toast(msg, type='success'){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.className = 'toast'; }, 2600);
}

function toggleMenu(){
  const header = document.getElementById('header');
  const button = header.querySelector('.menu-btn');
  const isOpen = header.classList.toggle('open');
  if(button) button.setAttribute('aria-expanded', String(isOpen));
}

function closeMenu(){
  document.getElementById('header').classList.remove('open');
}

function getOccurrence(id){
  const numericId = Number(id);
  return occurrences.find(o => o.id === numericId) ||
    myOccurrences.find(o => o.id === numericId);
}

function isMyOccurrence(id){
  return Boolean(state.currentUser && myOccurrences.some(o => Number(o.id) === Number(id)));
}

/* ---------- Foto (placeholder ou imagem real) ---------- */
function photoFor(o, size){
  const s = size || 34;
  if(o.foto) return '<img src="' + o.foto + '" alt="' + esc(o.title) + '">';
  const c = CATEGORIES[o.categoria] || CATEGORIES['Outro'];
  return '<div class="photo-ph" style="background:' + c.grad + '">' + icon(c.icon, s) + '<span>' + esc(o.categoria) + '</span></div>';
}

/* ---------- Badges ---------- */
function catBadge(cat){
  const c = CATEGORIES[cat] || CATEGORIES['Outro'];
  return '<span class="badge cat-' + c.slug + '">' + icon(c.icon, 14) + ' ' + esc(cat) + '</span>';
}
function statusBadge(status){
  const s = slug(status);
  return '<span class="badge status-' + s + '">' + (status === 'Resolvido' ? icon('check-circle',14) + ' ' : '') + esc(status) + '</span>';
}

/* ---------- Card de ocorrência ---------- */
function occurrenceCard(o){
  return '<article class="card">' +
    '<div class="card-media" onclick="go(\'/ocorrencia/' + o.id + '\')">' + photoFor(o) + '</div>' +
    '<div class="card-body">' +
      '<div class="card-top">' + catBadge(o.categoria) + statusBadge(o.status) + '</div>' +
      '<h3 class="card-title" onclick="go(\'/ocorrencia/' + o.id + '\')">' + esc(o.title) + '</h3>' +
      '<p class="card-loc">' + icon('pin',15) + ' ' + esc(o.bairro) + ' • ' + esc(o.rua) + '</p>' +
      '<p class="card-desc">' + esc(truncate(o.description)) + '</p>' +
      '<div class="card-footer">' +
        '<span>' + icon('clock',15) + ' ' + esc(o.data) + '</span>' +
      '</div>' +
      '<button class="btn btn-outline btn-block" onclick="go(\'/ocorrencia/' + o.id + '\')">Ver detalhes</button>' +
    '</div>' +
  '</article>';
}

/* ============================================================
   TELAS
   ============================================================ */

/* ---------- Header ---------- */
function renderHeader(){
  const h = document.getElementById('header');
  const u = state.currentUser;
  const parts = parseRoute();
  const name = parts[0] || 'home';

  const link = (label, route, key) =>
    '<a href="#' + route + '" class="nav-link ' + ((name === key || (key==='ocorrencias' && name==='ocorrencia')) ? 'active' : '') + '">' + label + '</a>';

  let navLinks = '';
  navLinks += link('Início', '/', 'home');
  navLinks += link('Ocorrências', '/ocorrencias', 'ocorrencias');
  if(u) navLinks += link('Minhas ocorrências', '/minhas', 'minhas');

  let auth = '';
  if(!u){
    auth = '<button class="btn btn-ghost" onclick="go(\'/login\')">Entrar</button>' +
           '<button class="btn btn-primary" onclick="go(\'/registrar\')">' + icon('plus',16) + ' Registrar ocorrência</button>';
  } else {
    auth = '<button class="btn btn-primary" onclick="go(\'/registrar\')">' + icon('plus',16) + ' Registrar ocorrência</button>' +
           '<span class="user-chip"><span class="avatar">' + esc(u.name.charAt(0).toUpperCase()) + '</span>Olá, ' + esc(u.name) + '</span>' +
           '<button class="btn btn-ghost" onclick="logout()">' + icon('logout',16) + ' Sair</button>';
  }

  h.className = '';
  h.innerHTML =
    '<div class="header-inner">' +
      '<a class="logo" href="#/" onclick="closeMenu()">' + icon('pin',22) + ' Meu Bairro</a>' +
      '<nav class="nav" onclick="closeMenu()">' + navLinks + '</nav>' +
      '<div class="auth-actions">' + auth + '</div>' +
      '<button class="menu-btn" onclick="toggleMenu()" aria-label="Abrir menu" aria-expanded="false">' + icon('menu',22) + '</button>' +
    '</div>';
}

/* ---------- Home ---------- */
function homeView(){
  const recent = occurrences.slice().sort((a,b) => b.id - a.id).slice(0,3);
  return (
    '<div class="hero">' +
      '<div class="hero-inner container">' +
        '<span class="kicker">' + icon('pin',14) + ' Comunidade • Manaus</span>' +
        '<h1>Problemas do seu bairro, visíveis para a comunidade.</h1>' +
        '<p>Registre problemas urbanos, encontre ocorrências próximas ao seu bairro e ajude a comunidade a identificar o que precisa de atenção.</p>' +
        '<div class="hero-actions">' +
          '<button class="btn btn-primary btn-lg" onclick="go(\'/ocorrencias\')">' + icon('eye',18) + ' Ver ocorrências</button>' +
          '<button class="btn btn-ghost btn-lg" onclick="go(\'/registrar\')">' + icon('plus',18) + ' Registrar ocorrência</button>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<section class="container">' +
      '<div class="grid">' + recent.map(occurrenceCard).join('') + '</div>' +
    '</section>' +

    '<section class="container" style="padding-top:0">' +
      '<div class="section-head"><h2>Como funciona</h2></div>' +
      '<div class="steps">' +
        '<div class="step"><div class="ico">' + icon('plus',24) + '</div><h3>1. Registre</h3><p>Crie uma ocorrência informando o bairro, a rua e o problema encontrado.</p></div>' +
        '<div class="step"><div class="ico">' + icon('check',24) + '</div><h3>2. Confirme</h3><p>Se você viu o mesmo problema, confirme para dar mais visibilidade.</p></div>' +
        '<div class="step"><div class="ico">' + icon('check-circle',24) + '</div><h3>3. Acompanhe</h3><p>Acompanhe o status e marque como resolvido quando o problema for atendido.</p></div>' +
      '</div>' +
    '</section>'
  );
}

/* ---------- Lista de ocorrências ---------- */
function listView(){
  const bairroOpts = BAIRROS.map(b => '<option value="' + esc(b) + '"' + (state.filters.bairro===b?' selected':'') + '>' + esc(b) + '</option>').join('');
  const catOpts = categoriasAPI.map(c => '<option value="' + esc(c.nome) + '"' + (state.filters.categoria===c.nome?' selected':'') + '>' + esc(c.nome) + '</option>').join('');
  const statusOpts = ['','Aberto','Resolvido'].map(s =>
    '<option value="' + s + '"' + (state.filters.status===s?' selected':'') + '>' + (s === '' ? 'Todos' : s) + '</option>').join('');

  return (
    '<section style="padding-top:32px">' +
      '<div class="section-head"><h1>Ocorrências</h1></div>' +
      '<div class="filters">' +
        '<input class="search" id="f-q" type="text" placeholder="Pesquisar ocorrência…" value="' + esc(state.filters.q) + '" oninput="applyFilters()">' +
        '<select id="f-bairro" onchange="applyFilters()"><option value="">Todos os bairros</option>' + bairroOpts + '</select>' +
        '<select id="f-categoria" onchange="applyFilters()"><option value="">Todas as categorias</option>' + catOpts + '</select>' +
        '<select id="f-status" onchange="applyFilters()">' + statusOpts + '</select>' +
        '<button class="btn btn-ghost" onclick="clearFilters()">Limpar</button>' +
      '</div>' +
      '<div class="result-count" id="result-count"></div>' +
      '<div class="grid" id="list-grid"></div>' +
    '</section>'
  );
}

function applyFilters(){
  state.filters.q = document.getElementById('f-q').value.trim().toLowerCase();
  state.filters.bairro = document.getElementById('f-bairro').value;
  state.filters.categoria = document.getElementById('f-categoria').value;
  state.filters.status = document.getElementById('f-status').value;
  renderListGrid();
}

function clearFilters(){
  state.filters = { q:'', bairro:'', categoria:'', status:'' };
  document.getElementById('f-q').value = '';
  document.getElementById('f-bairro').value = '';
  document.getElementById('f-categoria').value = '';
  document.getElementById('f-status').value = '';
  renderListGrid();
}

function renderListGrid(){
  const f = state.filters;
  let list = occurrences.slice().sort((a,b) => b.id - a.id);
  if(f.q){
    list = list.filter(o =>
      o.title.toLowerCase().includes(f.q) ||
      o.description.toLowerCase().includes(f.q) ||
      o.rua.toLowerCase().includes(f.q) ||
      o.bairro.toLowerCase().includes(f.q)
    );
  }
  if(f.bairro) list = list.filter(o => o.bairro === f.bairro);
  if(f.categoria) list = list.filter(o => o.categoria === f.categoria);
  if(f.status) list = list.filter(o => o.status === f.status);

  document.getElementById('result-count').textContent = list.length + (list.length === 1 ? ' ocorrência encontrada' : ' ocorrências encontradas');

  const grid = document.getElementById('list-grid');
  if(list.length === 0){
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1">' + icon('search',40) +
      '<h3>Nenhuma ocorrência encontrada</h3><p>Tente ajustar os filtros de busca.</p></div>';
  } else {
    grid.innerHTML = list.map(occurrenceCard).join('');
  }
}

/* ---------- Detalhes ---------- */
function detailView(id){
  const o = getOccurrence(id);
  if(!o){
    return '<section style="padding-top:40px"><div class="empty">' + icon('outro',40) +
      '<h3>Ocorrência não encontrada</h3><p>Esta ocorrência não existe ou foi removida.</p>' +
      '<button class="btn btn-primary" onclick="go(\'/ocorrencias\')">Ver ocorrências</button></div></section>';
  }

  const isAuthor = isMyOccurrence(o.id);
  const autenticado = Boolean(state.currentUser && localStorage.getItem('token'));
  
const confirmation = confirmationState[o.id];
const totalConfirmacoes = confirmation?.total ?? o.confirmations ?? 0;

const confirmArea =
  '<div class="confirm-area" style="margin-top:16px">' +
    '<p class="muted" style="margin-bottom:10px">' +
      icon('check-circle', 16) + ' ' +
      esc(confirmText(totalConfirmacoes)) +
    '</p>' +
    (autenticado
      ? '<button class="btn btn-outline" onclick="confirmar(' + o.id + ')">' +
          icon('check-circle', 16) + ' Confirmar ocorrência' +
        '</button>'
      : '<button class="btn btn-outline" onclick="solicitarLoginParaConfirmar(' + o.id + ')">' +
          icon('check-circle', 16) + ' Entrar para confirmar' +
        '</button>') +
  '</div>';


  /* Área do autor (resolver/reabrir/excluir) */
  let ownerArea = '';
  if(isAuthor){
    let statusBtn;
    if(o.status === 'Aberto'){
      statusBtn = '<button class="btn btn-outline" onclick="resolver(' + o.id + ', true)">' + icon('check-circle',16) + ' Marcar como resolvida</button>';
    } else {
      statusBtn = '<button class="btn btn-outline" onclick="reabrir(' + o.id + ', true)">' + icon('rotate-ccw',16) + ' Reabrir ocorrência</button>';
    }
    ownerArea =
      '<div class="owner-box">' +
        '<h4>' + icon('user',18) + ' Você é o autor desta ocorrência</h4>' +
        '<div class="action-row">' +
          statusBtn +
          '<button class="btn btn-outline" onclick="go(\'/editar/' + o.id + '\')">' + icon('edit',16) + ' Editar</button>' +
          '<button class="btn btn-danger-outline" onclick="pedirExclusao(' + o.id + ')">' + icon('trash',16) + ' Excluir ocorrência</button>' +
        '</div>' +
      '</div>';
  }

  return (
    '<div class="detail-wrap" style="padding-top:32px">' +
      '<a class="back-link" href="#/ocorrencias">' + icon('arrow-left',16) + ' Voltar para ocorrências</a>' +
      '<div class="detail-media">' + photoFor(o, 72) + '</div>' +
      '<div class="detail-card">' +
        '<div class="detail-badges">' + catBadge(o.categoria) + statusBadge(o.status) + '</div>' +
        '<h1 class="detail-title">' + esc(o.title) + '</h1>' +
        '<div class="info-grid">' +
          '<div class="info-item"><div class="label">' + icon('pin',13) + ' Bairro</div><div class="value">' + esc(o.bairro) + '</div></div>' +
          '<div class="info-item"><div class="label">' + icon('pin',13) + ' Rua</div><div class="value">' + esc(o.rua) + '</div></div>' +
          '<div class="info-item"><div class="label">' + icon('clock',13) + ' Registrado em</div><div class="value">' + esc(o.data) + '</div></div>' +
          '<div class="info-item"><div class="label">' + icon('check-circle',13) + ' Status</div><div class="value">' + esc(o.status) + '</div></div>' +
        '</div>' +
        '<div class="detail-desc">' + esc(o.description) + '</div>' +

        confirmArea +
        ownerArea +

      '</div>' +
    '</div>'
  );
}

/* ---------- Ações de ocorrência ---------- */
function solicitarLoginParaConfirmar(id){
  const occurrenceId = Number(id);
  if (!Number.isInteger(occurrenceId) || occurrenceId <= 0) return false;
  state.pendingConfirmId = occurrenceId;
  savePostAuthRoute('/ocorrencia/' + occurrenceId);
  toast('Entre na sua conta para confirmar esta ocorrência.', 'info');
  go('/login');
  return false;
}


function desconfirmar(){
  if (!requireAuth()) return false;
  toast('A API ainda não oferece confirmações.', 'info');
  return false;
}

async function atualizarStatus(id, status, fromDetail){
  const token = localStorage.getItem('token');
  if (!requireAuth() || !token) return;
  if (!isMyOccurrence(id)) {
    toast('Você só pode alterar suas próprias ocorrências.', 'info');
    return;
  }

  try {
    const resposta = await fetch(`${API_BASE}/occurrences/${Number(id)}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error('Erro ao alterar status:', resposta.status, detalhe);
      if (resposta.status === 401) logout();
      else toast(resposta.status === 403
        ? 'Você não tem permissão para alterar esta ocorrência.'
        : 'Não foi possível alterar o status.', 'info');
      return;
    }

    const texto = await resposta.text();
    if (texto) {
      try {
        const atualizada = adaptarOcorrencia(JSON.parse(texto));
        occurrences = occurrences.map(o => o.id === atualizada.id ? atualizada : o);
        myOccurrences = myOccurrences.map(o => o.id === atualizada.id ? atualizada : o);
      } catch (erro) {
        console.warn('Resposta de status não pôde ser interpretada; recarregando listas.', erro);
      }
    }

    await Promise.all([
      carregarOcorrencias(false),
      carregarMinhasOcorrencias(false)
    ]);
    toast(status === 'RESOLVIDO' ? 'Ocorrência marcada como resolvida.' : 'Ocorrência reaberta.');
    if (fromDetail) renderView('ocorrencia', id);
    else renderView('minhas');
  } catch (erro) {
    console.error('Falha ao alterar status:', erro);
    toast('Falha ao conectar com o servidor.', 'info');
  }
}

function resolver(id, fromDetail){
  const o = getOccurrence(id);
  if (!o || o.statusBackend === 'RESOLVIDO') return;
  return atualizarStatus(id, 'RESOLVIDO', fromDetail);
}

function reabrir(id, fromDetail){
  const o = getOccurrence(id);
  if (!o || o.statusBackend === 'PENDENTE') return;
  return atualizarStatus(id, 'PENDENTE', fromDetail);
}

/* ---------- Exclusão (com modal de confirmação) ---------- */
function pedirExclusao(id){
  const o = getOccurrence(id);
  if (!o || !isMyOccurrence(id)) {
    toast('Você só pode excluir suas próprias ocorrências.', 'info');
    return;
  }
  document.getElementById('modal-text').textContent = 'A ocorrência "' + o.title + '" será removida permanentemente. Esta ação não pode ser desfeita.';
  document.getElementById('modal').classList.add('show');
  document.getElementById('modal')._id = id;
}
function closeConfirm(){
  document.getElementById('modal').classList.remove('show');
}
async function modalYes(){
  const id = Number(document.getElementById('modal')._id);
  const token = localStorage.getItem('token');

  if (!token || !state.currentUser) {
    toast('Faça login para excluir uma ocorrência.', 'info');
    closeConfirm();
    go('/login');
    return;
  }
  if (!isMyOccurrence(id)) {
    toast('Você só pode excluir suas próprias ocorrências.', 'info');
    closeConfirm();
    return;
  }

  try {
    const resposta = await fetch(`${API_BASE}/occurrences/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      console.error('Erro ao excluir ocorrência:', resposta.status, erro);
      if (resposta.status === 401) {
        closeConfirm();
        logout();
      } else if (resposta.status === 403) {
        toast('Você não tem permissão para excluir esta ocorrência.', 'info');
      } else {
        toast('Não foi possível excluir a ocorrência.', 'info');
      }
      return;
    }

    occurrences = occurrences.filter(o => Number(o.id) !== id);
    myOccurrences = myOccurrences.filter(o => Number(o.id) !== id);
    closeConfirm();
    toast('Ocorrência excluída.');
    await carregarOcorrencias(false);
    if (state.currentUser && localStorage.getItem('token')) {
      await carregarMinhasOcorrencias(false);
    }
    const rota = parseRoute();
    if (rota[0] === 'ocorrencia' && Number(rota[1]) === id) go('/minhas');
    else renderView(...rota);
  } catch (erro) {
    console.error('Erro ao excluir ocorrência:', erro);
    toast('Falha ao conectar com o servidor.', 'info');
  }
}

/* ---------- Login ---------- */
function loginView(){
  return (
    '<section style="padding-top:44px"><div class="form-card">' +
      '<h1>Entrar no Meu Bairro</h1>' +
      '<p class="sub">Acesse sua conta para registrar e confirmar ocorrências.</p>' +
      '<form onsubmit="return login(event)">' +
        '<div class="field"><label>Email</label><input type="email" id="login-email" placeholder="voce@email.com" required></div>' +
        '<div class="field"><label>Senha</label><input type="password" id="login-senha" placeholder="Sua senha" required></div>' +
        '<button type="submit" class="btn btn-primary btn-block btn-lg">Entrar</button>' +
      '</form>' +
      '<p class="form-link">Ainda não tem conta? <a href="#/cadastro">Criar conta</a></p>' +
    '</div></section>'
  );
}


async function autenticar(email, senha){
  const resposta = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  const dados = await jsonOpcional(resposta) || {};

  if (!resposta.ok) {
    const mensagem = dados.message || dados.mensagem || dados.error || 'E-mail ou senha inválidos.';
    throw new Error(mensagem);
  }

  const token = dados.token || dados.accessToken;
  if (!token) {
    console.error('Resposta da API de login sem token JWT:', dados);
    throw new Error('O login não retornou um token JWT.');
  }

  const usuario = dados.user || dados.usuario || dados;
  state.currentUser = {
    id: String(usuario.id ?? ''),
    name: String(usuario.nome || usuario.name || usuario.email || email.split('@')[0]),
    email: usuario.email || email
  };
  localStorage.setItem('token', token);
  localStorage.setItem('currentUser', JSON.stringify(state.currentUser));

  await carregarMinhasOcorrencias(false);
  // Uma falha transitória ao carregar a lista não invalida o token recebido no login.
  // Respostas 401/403 já limpam a sessão dentro de carregarMinhasOcorrencias().
  if (!state.currentUser || !localStorage.getItem('token')) {
    throw new Error('A API rejeitou a sessão. Entre novamente.');
  }

  return true;
}

async function login(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value;

  try {
    await autenticar(email, senha);
    toast('Login realizado com sucesso!');
    go(takePostAuthRoute());
  } catch (erro) {
    console.error('Erro ao realizar login:', erro);
    toast(erro.message || 'Não foi possível conectar ao servidor.', 'info');
  }

  return false;
}

/* ---------- Cadastro ---------- */
function cadastroView(){
  return (
    '<section style="padding-top:44px"><div class="form-card">' +
      '<h1>Criar sua conta</h1>' +
      '<p class="sub">Leva menos de um minuto. Sem dados desnecessários.</p>' +
      '<form onsubmit="return cadastro(event)">' +
        '<div class="field"><label>Nome</label><input type="text" id="cad-nome" placeholder="Seu nome" required></div>' +
        '<div class="field"><label>Email</label><input type="email" id="cad-email" placeholder="voce@email.com" required></div>' +
        '<div class="form-row">' +
          '<div class="field"><label>Senha</label><input type="password" id="cad-senha" placeholder="Crie uma senha" required></div>' +
          '<div class="field"><label>Confirmar senha</label><input type="password" id="cad-senha2" placeholder="Repita a senha" required></div>' +
        '</div>' +
        '<button type="submit" class="btn btn-primary btn-block btn-lg">Criar conta</button>' +
      '</form>' +
      '<p class="form-link">Já tem conta? <a href="#/login">Entrar</a></p>' +
    '</div></section>'
  );
}


async function cadastro(e) {
  e.preventDefault();

  const nome = document.getElementById('cad-nome').value.trim();
  const email = document.getElementById('cad-email').value.trim();
  const senha = document.getElementById('cad-senha').value;
  const senha2 = document.getElementById('cad-senha2').value;

  if (senha !== senha2) {
    toast('As senhas não coincidem.', 'info');
    return false;
  }

  let contaCriada = false;
  try {
    const resposta = await fetch(`${API_BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    if (!resposta.ok) {
      const texto = await resposta.text();
      let mensagem = texto;
      try {
        const erroApi = texto ? JSON.parse(texto) : null;
        mensagem = erroApi?.message || erroApi?.mensagem || erroApi?.error || texto;
      } catch (_) {}
      console.error('Erro no cadastro:', resposta.status, texto);
      toast(mensagem || 'Não foi possível criar a conta. Verifique os dados informados.', 'info');
      return false;
    }

    contaCriada = true;
    // O cadastro atual pode apenas criar a conta; autentica pelo endpoint de login existente.
    await autenticar(email, senha);
    toast('Conta criada e login realizado com sucesso!');
    go(takePostAuthRoute());
  } catch (erro) {
    console.error('Erro no cadastro ou login automático:', erro);
    if (contaCriada) {
      toast('Conta criada, mas o login automático falhou. Entre com seus dados.', 'info');
      go('/login');
    } else {
      toast(erro.message || 'Não foi possível conectar ao servidor.', 'info');
    }
  }

  return false;
}


/* ---------- Registrar ocorrência ---------- */
function registrarView(){
  const bairroOpts = BAIRROS.map(b => '<option value="' + esc(b) + '">' + esc(b) + '</option>').join('');
  const catOpts = categoriasAPI.map(c =>
  '<option value="' + esc(c.id) + '">' + esc(c.nome) + '</option>'
).join('');

  const photoHtml = state.pendingPhoto
    ? '<div class="photo-preview"><img src="' + state.pendingPhoto + '" alt="Prévia da foto">' +
      '<button type="button" class="remove" onclick="removePhoto()">' + icon('x',16) + '</button></div>'
    : '<label class="upload-zone">' + icon('camera',28) + '<br>Adicionar foto (opcional)<br><span style="font-size:.78rem">Clique para escolher uma imagem</span>' +
      '<input type="file" accept="image/*" style="display:none" onchange="previewPhoto(this)"></label>';

  return (
    '<section style="padding-top:32px"><div class="form-card" style="max-width:560px">' +
      '<h1>Registrar ocorrência</h1>' +
      '<p class="sub">Descreva o problema encontrado no seu bairro.</p>' +
      '<form onsubmit="return publicar(event)">' +
        '<div class="field"><label>Título</label><input type="text" id="oc-titulo" placeholder="Ex.: Buraco na Rua das Flores" required></div>' +
        '<div class="field"><label>Descrição</label><textarea id="oc-descricao" placeholder="Descreva o problema com detalhes…" required></textarea></div>' +
        '<div class="form-row">' +
          '<div class="field"><label>Bairro</label><input type="text" id="oc-bairro" list="bairros" placeholder="Ex.: Cidade Nova" required>' +
            '<datalist id="bairros">' + bairroOpts + '</datalist></div>' +
          '<div class="field"><label>Rua</label><input type="text" id="oc-rua" placeholder="Ex.: Rua das Flores" required></div>' +
        '</div>' +
        '<div class="field"><label>Categoria</label><select id="oc-categoria" required>' +
          '<option value="" disabled selected>Selecione a categoria</option>' + catOpts + '</select></div>' +
        '<div class="field"><label>Foto</label>' + photoHtml +
          '<p class="muted" style="font-size:.8rem;margin-top:8px">A imagem é apenas uma prévia; o backend atual não possui campo ou endpoint para salvá-la.</p></div>' +
        '<button type="submit" class="btn btn-primary btn-block btn-lg">' + icon('plus',18) + ' Publicar ocorrência</button>' +
      '</form>' +
    '</div></section>'
  );
}

function previewPhoto(input){
  const file = input.files && input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(ev){
    state.pendingPhoto = ev.target.result;
    renderView('registrar');
  };
  reader.readAsDataURL(file);
}

function removePhoto(){
  state.pendingPhoto = null;
  renderView('registrar');
}


async function publicar(e) {
  e.preventDefault();

  if (!requireAuth()) return false;

  const titulo = document.getElementById('oc-titulo').value.trim();
  const descricao = document.getElementById('oc-descricao').value.trim();
  const bairro = document.getElementById('oc-bairro').value.trim();
  const rua = document.getElementById('oc-rua').value.trim();
  const categoryId = Number(
    document.getElementById('oc-categoria').value
  );

  if (!titulo || !descricao || !bairro || !rua || !categoryId) {
    toast('Preencha todos os campos obrigatórios.', 'info');
    return false;
  }

  const token = localStorage.getItem('token');

  try {
    const resposta = await fetch(`${API_BASE}/occurrences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        titulo,
        descricao,
        bairro,
        rua,
        endereco: `${rua}, ${bairro}`,
        categoryId
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      console.error('Erro ao publicar:', resposta.status, erro);
      toast('Não foi possível publicar. Confira o console.', 'info');
      return false;
    }

    let criada = null;
    const texto = await resposta.text();

    if (texto) {
      try {
        criada = JSON.parse(texto);
      } catch {
        criada = null;
      }
    }

    state.pendingPhoto = null;

    await carregarOcorrencias(false);
    if (state.currentUser && localStorage.getItem('token')) {
      await carregarMinhasOcorrencias(false);
    }

    if (criada?.id) {
      toast('Ocorrência registrada com sucesso!');
      go('/ocorrencia/' + criada.id);
    } else {
      toast('Ocorrência registrada com sucesso!');
      go('/ocorrencias');
    }
  } catch (erro) {
    console.error('Erro ao conectar com a API:', erro);
    toast('Não foi possível conectar ao servidor.', 'info');
  }

  return false;
}


/* ---------- Edição de ocorrência ---------- */
function editarView(id){
  const o = myOccurrences.find(item => Number(item.id) === Number(id));
  if (!o) {
    return '<section style="padding-top:40px"><div class="empty">' + icon('outro',40) +
      '<h3>Ocorrência não encontrada</h3><p>Você só pode editar ocorrências da sua conta.</p>' +
      '<button class="btn btn-primary" onclick="go(\'/minhas\')">Voltar para minhas ocorrências</button></div></section>';
  }

  const categoryOptions = categoriasAPI.map(c =>
    '<option value="' + Number(c.id) + '"' + (Number(c.id) === Number(o.categoryId) ? ' selected' : '') + '>' + esc(c.nome) + '</option>'
  ).join('');
  const bairroOpts = BAIRROS.map(b => '<option value="' + esc(b) + '">' + esc(b) + '</option>').join('');

  return '<section style="padding-top:32px"><div class="form-card" style="max-width:560px">' +
    '<h1>Editar ocorrência</h1>' +
    '<p class="sub">Atualize os dados da ocorrência registrada por você.</p>' +
    '<form onsubmit="return salvarEdicao(event, ' + Number(o.id) + ')">' +
      '<div class="field"><label>Título</label><input type="text" id="edit-titulo" value="' + esc(o.title) + '" required></div>' +
      '<div class="field"><label>Descrição</label><textarea id="edit-descricao" required>' + esc(o.description) + '</textarea></div>' +
      '<div class="form-row">' +
        '<div class="field"><label>Bairro</label><input type="text" id="edit-bairro" list="edit-bairros" value="' + esc(o.bairro) + '" required><datalist id="edit-bairros">' + bairroOpts + '</datalist></div>' +
        '<div class="field"><label>Rua</label><input type="text" id="edit-rua" value="' + esc(o.rua) + '" required></div>' +
      '</div>' +
      '<div class="field"><label>Categoria</label><select id="edit-categoria" required><option value="" disabled' + (o.categoryId ? '' : ' selected') + '>Selecione a categoria</option>' + categoryOptions + '</select></div>' +
      '<button type="submit" class="btn btn-primary btn-block btn-lg">Salvar alterações</button>' +
      '<button type="button" class="btn btn-ghost btn-block" onclick="go(\'/minhas\')">Cancelar</button>' +
    '</form>' +
  '</div></section>';
}

async function salvarEdicao(e, id){
  e.preventDefault();
  if (!requireAuth()) return false;
  if (!isMyOccurrence(id)) {
    toast('Você só pode editar suas próprias ocorrências.', 'info');
    go('/minhas');
    return false;
  }

  const titulo = document.getElementById('edit-titulo').value.trim();
  const descricao = document.getElementById('edit-descricao').value.trim();
  const bairro = document.getElementById('edit-bairro').value.trim();
  const rua = document.getElementById('edit-rua').value.trim();
  const categoryId = Number(document.getElementById('edit-categoria').value);
  if (!titulo || !descricao || !bairro || !rua || !Number.isInteger(categoryId) || categoryId <= 0) {
    toast('Preencha todos os campos obrigatórios.', 'info');
    return false;
  }

  const token = localStorage.getItem('token');
  try {
    const resposta = await fetch(`${API_BASE}/occurrences/${Number(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        titulo,
        descricao,
        bairro,
        rua,
        endereco: `${rua}, ${bairro}`,
        categoryId
      })
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error('Erro ao editar ocorrência:', resposta.status, detalhe);
      if (resposta.status === 401) logout();
      else if (resposta.status === 403) toast('Você não tem permissão para editar esta ocorrência.', 'info');
      else toast('Não foi possível salvar as alterações.', 'info');
      return false;
    }

    await Promise.all([
      carregarOcorrencias(false),
      carregarMinhasOcorrencias(false)
    ]);
    toast('Ocorrência atualizada com sucesso.');
    go('/ocorrencia/' + Number(id));
  } catch (erro) {
    console.error('Falha ao editar ocorrência:', erro);
    toast('Falha ao conectar com o servidor.', 'info');
  }
  return false;
}

/* ---------- Minhas ocorrências ---------- */
function minhasView(){
  const mine = myOccurrences.slice().sort((a, b) => b.id - a.id);

  if(mine.length === 0){
    return '<section style="padding-top:40px"><div class="section-head"><h1>Minhas ocorrências</h1></div>' +
      '<div class="empty">' + icon('pin',40) +
      '<h3>Você ainda não registrou ocorrências</h3><p>Registre o primeiro problema do seu bairro.</p>' +
      '<button class="btn btn-primary" onclick="go(\'/registrar\')">' + icon('plus',16) + ' Registrar ocorrência</button></div></section>';
  }

  const cards = mine.map(o => {
    let statusBtn = '';
    if(o.status === 'Aberto'){
      statusBtn = '<button class="btn btn-outline btn-block" onclick="resolver(' + o.id + ', false)">' + icon('check-circle',16) + ' Marcar como resolvido</button>';
    } else {
      statusBtn = '<div class="action-row">' +
                    '<div class="confirm-box" style="flex:1;justify-content:center">' + icon('check-circle',18) + ' Problema resolvido</div>' +
                    '<button class="btn btn-ghost" onclick="reabrir(' + o.id + ', false)">' + icon('rotate-ccw',16) + ' Reabrir</button>' +
                  '</div>';
    }
    return '<article class="card">' +
      '<div class="card-media" onclick="go(\'/ocorrencia/' + o.id + '\')">' + photoFor(o) + '</div>' +
      '<div class="card-body">' +
        '<div class="card-top">' + catBadge(o.categoria) + statusBadge(o.status) + '</div>' +
        '<h3 class="card-title" onclick="go(\'/ocorrencia/' + o.id + '\')">' + esc(o.title) + '</h3>' +
        '<p class="card-loc">' + icon('pin',15) + ' ' + esc(o.bairro) + ' • ' + esc(o.rua) + '</p>' +
        '<div class="card-footer">' +
          '<span>' + icon('clock',15) + ' ' + esc(o.data) + '</span>' +
        '</div>' +
        statusBtn +
        '<div class="card-actions">' +
          '<button class="btn btn-outline btn-sm" style="flex:1" onclick="go(\'/editar/' + o.id + '\')">' + icon('edit',14) + ' Editar</button>' +
          '<button class="btn btn-danger-outline btn-sm" style="flex:1" onclick="pedirExclusao(' + o.id + ')">' + icon('trash',14) + ' Excluir</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join('');

  return (
    '<section style="padding-top:32px">' +
      '<div class="section-head"><h1>Minhas ocorrências</h1></div>' +
      '<p class="result-count">' + mine.length + (mine.length === 1 ? ' ocorrência registrada por você' : ' ocorrências registradas por você') + '</p>' +
      '<div class="grid">' + cards + '</div>' +
    '</section>'
  );
}

/* ---------- 404 ---------- */
function notFoundView(){
  return '<section style="padding-top:40px"><div class="empty">' + icon('outro',40) +
    '<h3>Página não encontrada</h3><p>O endereço acessado não existe.</p>' +
    '<button class="btn btn-primary" onclick="go(\'/\')">Voltar ao início</button></div></section>';
}

/* ---------- Roteador ---------- */
function parseRoute(){
  let h = location.hash.replace(/^#/, '');
  if(!h || h === '/') return ['home'];
  return h.split('/').filter(Boolean);
}

function requireAuth(){
  if(!state.currentUser || !localStorage.getItem('token')){
    toast('Faça login para continuar.', 'info');
    go('/login');
    return false;
  }
  return true;
}

function renderView(name, id){
  let html;
  switch(name){
    case 'home':        html = homeView(); break;
    case 'ocorrencias': html = listView(); break;
    case 'ocorrencia':  html = detailView(id); break;
    case 'login':       html = loginView(); break;
    case 'cadastro':    html = cadastroView(); break;
    case 'registrar':   if(!requireAuth()) return; html = registrarView(); break;
    case 'editar':      if(!requireAuth()) return; html = editarView(id); break;
    case 'minhas':      if(!requireAuth()) return; html = minhasView(); break;
    default:            html = notFoundView();
  }
  document.getElementById('app').innerHTML = html;
  renderHeader();
  if(name === 'ocorrencias') renderListGrid();
  window.scrollTo({ top:0, behavior:'smooth' });
}


async function router() {
  const rota = parseRoute();

  if (rota[0] === 'minhas' || rota[0] === 'editar') {
    if (!requireAuth()) return;
    const carregou = await carregarMinhasOcorrencias(false);
    if (!carregou) return;
    if (parseRoute().join('/') !== rota.join('/')) return;
    renderView(...rota);
    return;
  }

  renderView(...rota);
}

function logout(){
  state.currentUser = null;
  myOccurrences = [];
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  toast('Você saiu da sua conta.', 'info');
  if (parseRoute()[0] === 'home') renderView('home');
  else go('/');
}

window.addEventListener('hashchange', router);

window.addEventListener('DOMContentLoaded', async () => {
  await carregarCategorias();
  await restaurarSessao();
  await carregarOcorrencias();
});