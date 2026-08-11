let totalAtendimentos = 0;
let totalCancelamentos = 0;

// Carrega os dados salvos e o bloco de notas ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarAtendimentosSalvos();
    carregarBlocoNotas();
});

function salvarAtendimento() {
    const agora = new Date();

    const cliente = document.getElementById('cliente').value.trim();
    const contrato = document.getElementById('contrato').value.trim();
    const tipo = document.getElementById('tipo').value;
    const status = document.getElementById('status').value;
    const obs = document.getElementById('obs').value.trim();

    if (!cliente || !contrato) {
        alert("Preencha os campos obrigatórios (Cliente e Contrato)!");
        return;
    }

    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR').slice(0, 5);

    const atendimento = {
        id: Date.now(),
        cliente,
        contrato,
        tipo,
        status,
        obs,
        data,
        hora
    };

    let atendimentos = JSON.parse(localStorage.getItem("listaAtendimentosStorage")) || [];
    atendimentos.unshift(atendimento); 
    localStorage.setItem("listaAtendimentosStorage", JSON.stringify(atendimentos));

    carregarAtendimentosSalvos();
    document.querySelector('.formulario').reset();
}

function carregarAtendimentosSalvos() {
    const container = document.getElementById('listaAtendimentos');
    container.innerHTML = "";

    let atendimentos = JSON.parse(localStorage.getItem("listaAtendimentosStorage")) || [];
    
    totalAtendimentos = atendimentos.length;
    totalCancelamentos = atendimentos.filter(a => a.tipo.toLowerCase() === 'cancelado').length;

    if (atendimentos.length === 0) {
        container.innerHTML = `<div class="sem-registros">Nenhum atendimento salvo ainda.</div>`;
        atualizarEstatisticas();
        return;
    }

    atendimentos.forEach((atendimento, index) => {
        const numeroExibicao = totalAtendimentos - index;
        const nota = document.createElement('div');
        nota.classList.add('registro-bloco');

        switch (atendimento.tipo.toLowerCase()) {
            case 'venda': nota.classList.add('tipo-venda'); break;
            case 'suporte': nota.classList.add('tipo-suporte'); break;
            case 'retido': nota.classList.add('tipo-retido'); break;
            case 'cancelado': nota.classList.add('tipo-cancelado'); break;
            case 'transferida': nota.classList.add('tipo-transferida'); break;
        }

        nota.innerHTML = `
            <span class="linha-completa atendimento-numero">Atendimento #${numeroExibicao}</span>
            <span><b>Cliente:</b> ${atendimento.cliente}</span>
            <span><b>Contrato:</b> ${atendimento.contrato}</span>
            <span><b>Data:</b> ${atendimento.data}</span>
            <span><b>Hora:</b> ${atendimento.hora}</span>
            <span><b>Tipo:</b> ${atendimento.tipo}</span>
            <span><b>Status:</b> ${atendimento.status}</span>
            <span class="linha-completa"><b>Obs:</b> ${atendimento.obs}</span>
        `;

        const botoes = document.createElement('div');
        botoes.classList.add('botao-acao');

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('editar');
        btnEditar.onclick = () => {
            document.getElementById('cliente').value = atendimento.cliente;
            document.getElementById('contrato').value = atendimento.contrato;
            document.getElementById('tipo').value = atendimento.tipo;
            document.getElementById('status').value = atendimento.status;
            document.getElementById('obs').value = atendimento.obs;

            removerAtendimento(atendimento.id);
        };

        const btnApagar = document.createElement('button');
        btnApagar.textContent = 'Apagar';
        btnApagar.classList.add('apagar');
        btnApagar.onclick = () => {
            removerAtendimento(atendimento.id);
        };

        botoes.appendChild(btnEditar);
        botoes.appendChild(btnApagar);
        nota.appendChild(botoes);

        container.appendChild(nota);
    });

    atualizarEstatisticas();
}

function removerAtendimento(id) {
    let atendimentos = JSON.parse(localStorage.getItem("listaAtendimentosStorage")) || [];
    atendimentos = atendimentos.filter(a => a.id !== id);
    localStorage.setItem("listaAtendimentosStorage", JSON.stringify(atendimentos));
    carregarAtendimentosSalvos();
}

function atualizarEstatisticas() {
    document.getElementById('totalAtendimentos').textContent = totalAtendimentos;
    document.getElementById('totalCancelamentos').textContent = totalCancelamentos;

    const taxa = totalAtendimentos > 0
        ? ((totalCancelamentos / totalAtendimentos) * 100).toFixed(2)
        : 0;

    document.getElementById('taxaCancelamento').textContent = taxa + '%';
}

const campoBlocoNotas = document.getElementById("blocoNotas");
if (campoBlocoNotas) {
    campoBlocoNotas.addEventListener("input", () => {
        localStorage.setItem("blocoNotasTexto", campoBlocoNotas.innerHTML);
    });
}

function carregarBlocoNotas() {
    const notasSalvas = localStorage.getItem("blocoNotasTexto");
    if (notasSalvas && campoBlocoNotas) {
        campoBlocoNotas.innerHTML = notasSalvas;
    }
}
