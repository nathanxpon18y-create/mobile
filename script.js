/* Estilos gerados dinamicamente para cada atendimento */
.registro-bloco {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.9rem;
    border-left: 4px solid var(--accent-color);
}

.registro-bloco span {
    color: var(--text-color);
}

.registro-bloco b {
    color: var(--text-muted);
}

.atendimento-numero {
    font-weight: bold;
    color: var(--accent-color);
    font-size: 1rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 5px;
    margin-bottom: 5px;
}

/* Cores específicas por tipo de atendimento */
.tipo-venda { border-left-color: #22c55e; }
.tipo-suporte { border-left-color: #38bdf8; }
.tipo-retido { border-left-color: #eab308; }
.tipo-cancelado { border-left-color: #f43f5e; }
.tipo-transferida { border-left-color: #a855f7; }

/* Botões de Ação dentro do Bloco */
.botao-acao {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.botao-acao button {
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.botao-acao button:hover {
    opacity: 0.85;
}

.botao-acao button.editar {
    background-color: #38bdf8;
    color: #0f172a;
}

.botao-acao button.apagar {
    background-color: #f43f5e;
    color: #f8fafc;
}
