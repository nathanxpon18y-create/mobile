let totalAtendimentos = 0;
let totalCancelamentos = 0;

function salvarAtendimento() {
    const agora = new Date();

    const cliente = document.getElementById('cliente').value;
    const contrato = document.getElementById('contrato').value;
    const tipo = document.getElementById('tipo').value;
    const status = document.getElementById('status').value;
    const obs = document.getElementById('obs').value;

    if (!cliente || !contrato) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR').slice(0,5);

    totalAtendimentos++;

    const nota = document.createElement('div');
    nota.classList.add('registro-bloco');

    // Cor por tipo
    switch (tipo.toLowerCase()) {
        case 'venda': nota.classList.add('tipo-venda'); break;
        case 'suporte': nota.classList.add('tipo-suporte'); break;
        case 'retido': nota.classList.add('tipo-retido'); break;
        case 'cancelado': nota.classList.add('tipo-cancelado'); break;
        case 'transferida': nota.classList.add('tipo-transferida'); break;
    }

    // Conteúdo do bloco de notas
    nota.innerHTML = `
        <span class="linha-completa atendimento-numero">
            Atendimento #${totalAtendimentos}
        </span>
        <span><b>Cliente:</b> ${cliente}</span>
        <span><b>Contrato:</b> ${contrato}</span>
        <span><b>Data:</b> ${data}</span>
        <span><b>Hora:</b> ${hora}</span>
        <span><b>Tipo:</b> ${tipo}</span>
        <span><b>Status:</b> ${status}</span>
        <span class="linha-completa"><b>Obs:</b> ${obs}</span>
    `;

    // Botões de ação
    const botoes = document.createElement('div');
    botoes.classList.add('botao-acao');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.classList.add('editar');
    btnEditar.onclick = () => {
        document.getElementById('cliente').value = cliente;
        document.getElementById('contrato').value = contrato;
        document.getElementById('tipo').value = tipo;
        document.getElementById('status').value = status;
        document.getElementById('obs').value = obs;

        totalAtendimentos--;
        if (tipo.toLowerCase() === 'cancelado') totalCancelamentos--;
        atualizarEstatisticas();

        nota.remove();
    };

    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar';
    btnApagar.classList.add('apagar');
    btnApagar.onclick = () => {
        totalAtendimentos--;
        if (tipo.toLowerCase() === 'cancelado') totalCancelamentos--;
        atualizarEstatisticas();

        nota.remove();
    };

    botoes.appendChild(btnEditar);
    botoes.appendChild(btnApagar);
    nota.appendChild(botoes);

    document.getElementById('blocoNotas').prepend(nota);

    if (tipo.toLowerCase() === 'cancelado') totalCancelamentos++;

    atualizarEstatisticas();

    // Limpa formulário
    document.querySelector('.formulario').reset();
}

function atualizarEstatisticas() {
    document.getElementById('totalAtendimentos').textContent = totalAtendimentos;
    document.getElementById('totalCancelamentos').textContent = totalCancelamentos;

    const taxa = totalAtendimentos > 0
        ? ((totalCancelamentos / totalAtendimentos) * 100).toFixed(2)
        : 0;

    document.getElementById('taxaCancelamento').textContent = taxa + '%';
}
