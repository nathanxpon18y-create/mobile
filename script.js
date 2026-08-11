document.addEventListener('DOMContentLoaded', () => {
    carregarTemaSalvo();
    carregarDados();
    carregarBlocoNotas();

    const blocoNotas = document.getElementById('blocoNotas');
    if (blocoNotas) {
        blocoNotas.addEventListener('input', () => {
            localStorage.setItem('blocoNotasTexto', blocoNotas.innerHTML);
        });
    }
});

function alternarTema() {
    const body = document.body;
    const iconeTema = document.getElementById('iconeTema');

    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        iconeTema.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('temaSistema', 'light');
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        iconeTema.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('temaSistema', 'dark');
    }
}

function carregarTemaSalvo() {
    const temaSalvo = localStorage.getItem('temaSistema');
    const body = document.body;
    const iconeTema = document.getElementById('iconeTema');

    if (temaSalvo === 'light') {
        body.classList.replace('dark-mode', 'light-mode');
        if (iconeTema) iconeTema.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        if (iconeTema) iconeTema.classList.replace('fa-sun', 'fa-moon');
    }
}

function formatarTexto(comando) {
    document.execCommand(comando, false, null);
}

function inserirLink() {
    const url = prompt('Digite a URL do link:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function limparNotas() {
    if (confirm('Deseja limpar todo o bloco de anotações?')) {
        const blocoNotas = document.getElementById('blocoNotas');
        blocoNotas.innerHTML = '';
        localStorage.removeItem('blocoNotasTexto');
    }
}

function salvarAtendimento() {
    const cliente = document.getElementById('cliente').value.trim();
    const contrato = document.getElementById('contrato').value.trim();
    const tipo = document.getElementById('tipo').value;
    const status = document.getElementById('status').value;
    const obs = document.getElementById('obs').value.trim();

    if (!cliente || !contrato || !tipo || !status) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
    
    const form = document.querySelector('.formulario');
    const editIndex = form.dataset.editIndex;

    const novoAtendimento = { cliente, contrato, tipo, status, obs };

    if (editIndex !== undefined && editIndex !== '') {
        atendimentos[editIndex] = novoAtendimento;
        delete form.dataset.editIndex;
        form.querySelector('.btn-salvar').innerHTML = '<i class="fa-solid fa-plus"></i> Salvar Atendimento';
    } else {
        atendimentos.push(novoAtendimento);
    }

    localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
    
    form.reset();
    carregarDados();
}

function carregarDados() {
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
    const lista = document.getElementById('listaAtendimentos');
    lista.innerHTML = '';

    let total = atendimentos.length;
    let cancelados = atendimentos.filter(a => a.tipo === 'Cancelado').length;
    let taxa = total > 0 ? ((cancelados / total) * 100).toFixed(2) : 0;

    document.getElementById('totalAtendimentos').innerText = total;
    document.getElementById('totalCancelamentos').innerText = cancelados;
    document.getElementById('taxaCancelamento').innerText = taxa + '%';

    if (total === 0) {
        lista.innerHTML = `<div class="sem-registros">Nenhum atendimento registrado ainda.</div>`;
        return;
    }

    const coresTipos = {
        'Venda': '#3b82f6',
        'Suporte': '#eab308',
        'Retido': '#10b981',
        'Cancelado': '#ef4444',
        'Transferida': '#ec4899',
        'Combo Multi': '#3b82f6',
        'Informações': '#eab308'
    };

    atendimentos.forEach((a, index) => {
        const corBorda = coresTipos[a.tipo] || '#8b5cf6';

        lista.innerHTML += `
            <div class="registro-card" style="border-left-color: ${corBorda};">
                <div class="registro-topo">
                    <span>#${index + 1} - ${a.cliente}</span>
                    <span style="color: ${corBorda};">${a.tipo}</span>
                </div>
                <div class="registro-detalhes">
                    <div>Contrato: <span>${a.contrato}</span></div>
                    <div>Status: <span>${a.status}</span></div>
                    ${a.obs ? `<div style="grid-column: span 2;">Obs: <span>${a.obs}</span></div>` : ''}
                </div>
                <div class="botoes-acao-card">
                    <button type="button" onclick="editarAtendimento(${index})">Editar</button>
                    <button type="button" class="apagar-btn" onclick="apagarAtendimento(${index})">Apagar</button>
                </div>
            </div>
        `;
    });
}

function apagarAtendimento(index) {
    if (confirm('Deseja realmente apagar este atendimento?')) {
        let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
        atendimentos.splice(index, 1);
        localStorage.setItem('atendimentos', JSON.stringify(atendimentos));
        carregarDados();
    }
}

function editarAtendimento(index) {
    let atendimentos = JSON.parse(localStorage.getItem('atendimentos')) || [];
    const a = atendimentos[index];

    document.getElementById('cliente').value = a.cliente;
    document.getElementById('contrato').value = a.contrato;
    document.getElementById('tipo').value = a.tipo;
    document.getElementById('status').value = a.status;
    document.getElementById('obs').value = a.obs || '';

    const form = document.querySelector('.formulario');
    form.dataset.editIndex = index;
    form.querySelector('.btn-salvar').innerHTML = '<i class="fa-solid fa-rotate"></i> Atualizar Atendimento';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function carregarBlocoNotas() {
    const blocoNotas = document.getElementById('blocoNotas');
    const textoSalvo = localStorage.getItem('blocoNotasTexto');
    if (blocoNotas && textoSalvo) {
        blocoNotas.innerHTML = textoSalvo;
    }
}
