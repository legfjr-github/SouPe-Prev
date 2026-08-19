// --- DADOS E REGRAS ---
const tetoINSS = 8475.55; 

const ggov_pe = {
    food: 334.40,
    matrix1: [
      { ref: "R1", bruto: 12029.44 }, { ref: "R1", bruto: 12029.44 }, { ref: "R1", bruto: 12029.44 },
      { ref: "R2", bruto: 12555.72 }, { ref: "R3", bruto: 13105.68 }, { ref: "R4", bruto: 13616.53 },
      { ref: "R5", bruto: 14147.81 }, { ref: "R6", bruto: 14769.42 }, { ref: "R7", bruto: 15418.99 },
      { ref: "R8", bruto: 16022.38 }, { ref: "R9", bruto: 19159.97 }, { ref: "R10", bruto: 19536.48 },
      { ref: "R11", bruto: 19920.52 }, { ref: "R12", bruto: 20312.25 }, { ref: "R13", bruto: 21311.14 },
      { ref: "R14", bruto: 21940.44 }, { ref: "R15", bruto: 22588.62 }, { ref: "R16", bruto: 23256.25 }
    ],
    matrix2: [
      { ref: "R1", bruto: 14953.20 }, { ref: "R1", bruto: 14953.20 }, { ref: "R1", bruto: 14953.20 },
      { ref: "R2", bruto: 15611.05 }, { ref: "R3", bruto: 16298.50 }, { ref: "R4", bruto: 16937.06 },
      { ref: "R5", bruto: 17601.17 }, { ref: "R6", bruto: 18378.17 }, { ref: "R7", bruto: 19190.14 },
      { ref: "R8", bruto: 19944.37 }, { ref: "R9", bruto: 23866.36 }, { ref: "R10", bruto: 24337.00 },
      { ref: "R11", bruto: 24817.05 }, { ref: "R12", bruto: 25306.71 }, { ref: "R13", bruto: 26585.71 },
      { ref: "R14", bruto: 27372.34 }, { ref: "R15", bruto: 28182.57 }, { ref: "R16", bruto: 29017.10 }
    ]
};

// Salário inicial padrão e Variáveis Globais
const salarioR1M1 = ggov_pe.matrix1[0].bruto - ggov_pe.food; 

let servidor = {
    idadeAtual: 32,
    mesesContribuicao: 1, 
    salarioSimulado: salarioR1M1,
    saldoComplementarAtual: 0 
};

let anoSelecionado = 30;
let detalheGlobal = { anos: {}, totalPessoal: 0, totalPatronal: 0, totalRendimento: 0 };

let chartPizza = null;
let chartBarras = null;

const formatBRL = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- NAVEGAÇÃO SPA & TABS ---
function openPrevidencia() {
    document.getElementById('view-home').classList.remove('active');
    document.getElementById('view-detalhes').classList.remove('active');
    document.getElementById('view-prev').classList.add('active');
    window.scrollTo(0, 0);
    recalcularBase();
}

function openHome() {
    document.getElementById('view-prev').classList.remove('active');
    document.getElementById('view-detalhes').classList.remove('active');
    document.getElementById('view-home').classList.add('active');
    window.scrollTo(0, 0);
}

function abrirDetalhamento() {
    document.getElementById('view-prev').classList.remove('active');
    document.getElementById('view-detalhes').classList.add('active');
    window.scrollTo(0, 0);
    
    // Popula o select com os anos gerados na simulação
    let selectAno = document.getElementById('select-ano-detalhe');
    selectAno.innerHTML = '';
    
    let anosDisponiveis = Object.keys(detalheGlobal.anos).sort((a,b) => a - b);
    anosDisponiveis.forEach(ano => {
        let opt = document.createElement('option');
        opt.value = ano;
        opt.innerText = "Ano Exercício: " + ano;
        selectAno.appendChild(opt);
    });

    // Seleciona o último ano disponível por padrão
    if(anosDisponiveis.length > 0) {
        selectAno.value = anosDisponiveis[anosDisponiveis.length - 1];
    }
    
    renderAnoDetalhe();
}

function fecharDetalhamento() {
    document.getElementById('view-detalhes').classList.remove('active');
    document.getElementById('view-prev').classList.add('active');
}

function switchTab(tabId) {
    document.getElementById('btn-simulacao').classList.remove('active');
    document.getElementById('btn-transparencia').classList.remove('active');
    document.getElementById('tab-simulacao').classList.remove('active');
    document.getElementById('tab-transparencia').classList.remove('active');
    
    document.getElementById('btn-' + tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
}

function switchSubTab(tab) {
    document.getElementById('btn-sub-saldo').classList.remove('active');
    document.getElementById('btn-sub-cont').classList.remove('active');
    document.getElementById('sub-tab-saldo').classList.remove('active');
    document.getElementById('sub-tab-cont').classList.remove('active');
    
    document.getElementById('btn-sub-' + tab).classList.add('active');
    document.getElementById('sub-tab-' + tab).classList.add('active');
}

function toggleCustomSim() {
    const box = document.getElementById('box-custom-sim');
    box.classList.toggle('active');
}

function toggleHistoricoInput() {
    const box = document.getElementById('box-data-ingresso');
    box.style.display = document.getElementById('toggleHistorico').checked ? 'block' : 'none';
}

// --- LÓGICA DE NEGÓCIO ---
function recalcularBase() {
    const usarCarreira = document.getElementById('toggleCarreira').checked;
    const usarHistorico = document.getElementById('toggleHistorico').checked;
    const inputSal = document.getElementById('inputSalario');
    const dataIngressoInput = document.getElementById('inputDataIngresso').value;
    
    let nivelAtualTexto = "Matriz 1 / R1";

    // Define Tempo e Base (Historico vs Padrão)
    if (usarHistorico && dataIngressoInput) {
        let dataIngresso = new Date(dataIngressoInput);
        let hoje = new Date(); 
        
        let mesesPassados = (hoje.getFullYear() - dataIngresso.getFullYear()) * 12 + (hoje.getMonth() - dataIngresso.getMonth());
        if (mesesPassados < 0) mesesPassados = 0;
        servidor.mesesContribuicao = mesesPassados;
        
        let salarioParaHoje = salarioR1M1;
        for (let m = 1; m <= mesesPassados; m++) {
            let anosCarreiraPassado = Math.floor((m - 1) / 12);
            let idx = Math.min(anosCarreiraPassado, 17);
            
            let refSalario = anosCarreiraPassado < 3 ? ggov_pe.matrix1[0] : ggov_pe.matrix2[idx];
            nivelAtualTexto = anosCarreiraPassado < 3 ? "Matriz 1 / R1" : "Matriz 2 / " + refSalario.ref;
            salarioParaHoje = refSalario.bruto - ggov_pe.food;
        }

        if (usarCarreira) {
            servidor.salarioSimulado = salarioParaHoje;
            inputSal.value = salarioParaHoje.toFixed(2);
            inputSal.disabled = true;
        }

        let anosContr = Math.floor(mesesPassados/12);
        let mesesContr = mesesPassados % 12;
        let textoTempo = anosContr > 0 ? `${anosContr} anos e ${mesesContr} meses` : `${mesesContr} meses`;
        
        document.getElementById('ui-badge-tempo').innerHTML = `<strong>Contribuição:</strong> ${textoTempo}`;
        document.getElementById('home-badge-tempo').innerText = `Idade: ${servidor.idadeAtual} anos | Tempo de Serviço: ${textoTempo}`;

    } else {
        servidor.mesesContribuicao = 1; 
        document.getElementById('ui-badge-tempo').innerHTML = `<strong>Contribuição:</strong> 1 mês`;
        document.getElementById('home-badge-tempo').innerText = `Idade: 32 anos | Tempo de Serviço: 1 mês`;
        
        if (usarCarreira) {
            servidor.salarioSimulado = salarioR1M1; 
            inputSal.value = salarioR1M1.toFixed(2);
            inputSal.disabled = true;
            nivelAtualTexto = "Matriz 1 / R1";
        } else {
            inputSal.disabled = false;
            if (!inputSal.value) inputSal.value = salarioR1M1.toFixed(2);
            servidor.salarioSimulado = parseFloat(inputSal.value);
            nivelAtualTexto = "Personalizado";
        }
    }

    document.getElementById('ui-nivel-atual').innerText = nivelAtualTexto;

    // Call Execução que vai rodar o ciclo desde o dia 0 e atualizar valores
    gerarBotoesAnos();
    executarSimulacao();
}

function gerarBotoesAnos() {
    const container = document.getElementById('btn-group-anos');
    container.innerHTML = '';
    
    let genero = document.getElementById('inputGenero') ? document.getElementById('inputGenero').value : 'F';
    let anosContribuicaoAtual = servidor.mesesContribuicao / 12;
    
    let idadeMinIntegral = genero === 'M' ? 60 : 55;
    let tempoContribMinIntegral = genero === 'M' ? 35 : 30;
    let idadeMinProporcional = genero === 'M' ? 65 : 60;
    
    let anosParaIdadeIntegral = Math.max(0, idadeMinIntegral - servidor.idadeAtual);
    let anosParaContribIntegral = Math.max(0, tempoContribMinIntegral - anosContribuicaoAtual);
    let anosFaltantesIntegral = Math.ceil(Math.max(anosParaIdadeIntegral, anosParaContribIntegral));
    
    let anosFaltantesProporcional = Math.ceil(Math.max(0, idadeMinProporcional - servidor.idadeAtual));
    const anosCompulsoria = 75 - servidor.idadeAtual;
    
    let btnLabels = {};
    [5, 10, 15, 20].forEach(a => { if(a > 0 && a < anosCompulsoria) btnLabels[a] = a + ' anos'; });
    
    if (anosFaltantesIntegral > 0 && anosFaltantesIntegral < anosCompulsoria) {
        btnLabels[anosFaltantesIntegral] = anosFaltantesIntegral + ' anos (Integral)';
    }
    if (anosFaltantesProporcional > 0 && anosFaltantesProporcional < anosCompulsoria) {
        if (btnLabels[anosFaltantesProporcional]) {
            if (anosFaltantesProporcional !== anosFaltantesIntegral) btnLabels[anosFaltantesProporcional] += ' / Prop. Idade';
        } else {
            btnLabels[anosFaltantesProporcional] = anosFaltantesProporcional + ' anos (Prop. Idade)';
        }
    }
    btnLabels[anosCompulsoria] = 'Compulsória (' + anosCompulsoria + ' anos)';
    
    let sortedAnos = Object.keys(btnLabels).map(Number).sort((a,b) => a - b);
    
    if (!sortedAnos.includes(anoSelecionado) && anoSelecionado !== anosCompulsoria) {
        anoSelecionado = anosFaltantesIntegral > 0 ? anosFaltantesIntegral : anosCompulsoria;
    }

    sortedAnos.forEach(ano => {
        let btn = document.createElement('button');
        btn.className = 'btn-sim ' + (ano === anoSelecionado ? 'active' : '');
        btn.innerText = btnLabels[ano];
        
        btn.onclick = () => {
            anoSelecionado = ano;
            gerarBotoesAnos();
            executarSimulacao();
        };
        container.appendChild(btn);
    });
}

function executarSimulacao() {
    const usarCarreira = document.getElementById('toggleCarreira').checked;
    const usarHistorico = document.getElementById('toggleHistorico').checked;
    let taxaAnual = parseFloat(document.getElementById('inputTaxa').value) || 6; 
    let taxaMensal = Math.pow(1 + (taxaAnual / 100), 1/12) - 1;
    let expectativaVida = parseInt(document.getElementById('inputExpectativa').value) || 82;

    // Reset Detalhamento Global
    detalheGlobal = { anos: {}, totalPessoal: 0, totalPatronal: 0, totalRendimento: 0 };
    let saldoSimulacao = 0;
    
    // Controladores de Data (Começa do passado ou de hoje)
    let dataReferencia = new Date();
    if (usarHistorico && document.getElementById('inputDataIngresso').value) {
        dataReferencia = new Date(document.getElementById('inputDataIngresso').value);
    }
    
    let mesesPassados = servidor.mesesContribuicao;
    let mesesFuturos = anoSelecionado * 12;
    let totalMesesSimular = mesesPassados + mesesFuturos;

    let saldoAtualCongelado = 0; // Guardará o saldo do mês "Atual" para a UI de resumo

    // Laço único Unificado (Passado + Futuro)
    for (let m = 1; m <= totalMesesSimular; m++) {
        let anosCarreira = Math.floor((m - 1) / 12);
        let salarioDoMes = servidor.salarioSimulado; 

        if (usarCarreira) {
            let idx = Math.min(anosCarreira, 17);
            let refSalario = anosCarreira < 3 ? ggov_pe.matrix1[0] : ggov_pe.matrix2[idx];
            salarioDoMes = refSalario.bruto - ggov_pe.food;
        }

        // Rendimentos e Aportes
        let rendimentoMes = saldoSimulacao * taxaMensal;
        saldoSimulacao += rendimentoMes;

        let baseComplementarMes = Math.max(0, salarioDoMes - tetoINSS);
        let aportePessoal = baseComplementarMes * 0.085;
        let aportePatronal = baseComplementarMes * 0.085;
        
        saldoSimulacao += (aportePessoal + aportePatronal);

        // Alimentar Detalhamento Anual
        let anoStr = dataReferencia.getFullYear().toString();
        let nomeMes = dataReferencia.toLocaleString('pt-BR', { month: 'long' });
        
        if(!detalheGlobal.anos[anoStr]) {
            detalheGlobal.anos[anoStr] = { meses: [], totalPessoal: 0, totalPatronal: 0, totalRendimento: 0 };
        }
        
        detalheGlobal.anos[anoStr].meses.push({
            mes: nomeMes,
            pessoal: aportePessoal,
            patronal: aportePatronal,
            rendimento: rendimentoMes
        });
        
        detalheGlobal.anos[anoStr].totalPessoal += aportePessoal;
        detalheGlobal.anos[anoStr].totalPatronal += aportePatronal;
        detalheGlobal.anos[anoStr].totalRendimento += rendimentoMes;
        
        detalheGlobal.totalPessoal += aportePessoal;
        detalheGlobal.totalPatronal += aportePatronal;
        detalheGlobal.totalRendimento += rendimentoMes;

        // Se o loop chegou exatamente ao "Hoje", guardamos a foto do momento
        if (m === mesesPassados) {
            saldoAtualCongelado = saldoSimulacao;
            
            // Atualiza quadro do Mês Atual
            let descontoObrig = Math.min(salarioDoMes, tetoINSS) * 0.14;
            document.getElementById('ui-salario').innerText = formatBRL(salarioDoMes);
            document.getElementById('ui-teto').innerText = formatBRL(tetoINSS);
            document.getElementById('ui-obrig-desc').innerText = "-" + formatBRL(descontoObrig);
            document.getElementById('ui-saldo-atual').innerText = formatBRL(saldoAtualCongelado);
            document.getElementById('ui-comp-serv').innerText = formatBRL(aportePessoal);
            document.getElementById('ui-comp-est').innerText = formatBRL(aportePatronal);
        }

        dataReferencia.setMonth(dataReferencia.getMonth() + 1);
    }
    
    // Cálculo Renda Estimada e Validações Legais
    let idadeFutura = servidor.idadeAtual + anoSelecionado;
    let mesesSobrevivencia = (expectativaVida - idadeFutura) * 12;
    
    let rendaMensal = 0;
    if (mesesSobrevivencia > 0) {
        rendaMensal = saldoSimulacao * (taxaMensal) / (1 - Math.pow(1 + taxaMensal, -mesesSobrevivencia));
    } else {
        rendaMensal = saldoSimulacao; 
    }

    let genero = document.getElementById('inputGenero').value;
    let generoTexto = genero === 'M' ? 'Homem' : 'Mulher';
    let idadeMinIntegral = genero === 'M' ? 60 : 55;
    let tempoContribMinIntegral = genero === 'M' ? 35 : 30;
    let idadeMinProporcional = genero === 'M' ? 65 : 60;
    
    let tempoTotalContribuicaoProjetado = totalMesesSimular / 12;
    
    let isIntegral = (idadeFutura >= idadeMinIntegral) && (tempoTotalContribuicaoProjetado >= tempoContribMinIntegral);
    let isProporcional = (idadeFutura >= idadeMinProporcional);
    let isCompulsoria = (idadeFutura >= 75);

    // Calcular Previdência Obrigatória Estimada
    let prevObrigEstimada = 0;
    if (isIntegral || isProporcional || isCompulsoria) {
        let fatorTempo = Math.min(1, tempoTotalContribuicaoProjetado / tempoContribMinIntegral);
        prevObrigEstimada = tetoINSS * fatorTempo; // Proporcionalidade Limitada ao Teto
    }

    // Renderizando Projeção
    document.getElementById('ui-proj-idade').innerText = idadeFutura + " anos";
    document.getElementById('ui-proj-tempo-cont').innerText = tempoTotalContribuicaoProjetado.toFixed(1) + " anos";
    document.getElementById('ui-proj-total').innerText = formatBRL(saldoSimulacao);
    document.getElementById('ui-proj-renda').innerText = formatBRL(rendaMensal) + " / mês";
    document.getElementById('ui-proj-obrig').innerText = formatBRL(prevObrigEstimada) + " / mês";

    let alertaIdade = document.getElementById('alerta-idade');
    if (isCompulsoria) {
         alertaIdade.innerHTML = `<strong>Aposentadoria Compulsória</strong> aos 75 anos. O valor mensal simula a renda do seu saldo complementar nesta data.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#a5d8ff';
         alertaIdade.style.borderLeft = '4px solid #a5d8ff';
    } else if (isIntegral) {
         alertaIdade.innerHTML = `✅ <strong>Requisitos de Integralidade Atingidos!</strong> Você terá ${idadeFutura} anos de idade e baterá o tempo mínimo de contribuição.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#28A745'; 
         alertaIdade.style.borderLeft = '4px solid #28A745';
    } else if (isProporcional) {
         alertaIdade.innerHTML = `⚠️ <strong>Atenção:</strong> Você cumpre apenas a idade para aposentadoria <strong>proporcional</strong> (${idadeMinProporcional} anos). Faltará tempo de contribuição para a integral. (Obrigatória reduzida).`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#ffdd57';
         alertaIdade.style.borderLeft = '4px solid #ffdd57';
    } else {
         alertaIdade.innerHTML = `⛔ <strong>Atenção: Requisitos Não Atingidos.</strong><br>Você não tem idade/tempo para receber benefícios oficiais nesta data.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#ff9999';
         alertaIdade.style.borderLeft = '4px solid #ff9999';
    }
}

// Renderiza a Tela Detalhada para o Ano Selecionado
function renderAnoDetalhe() {
    let ano = document.getElementById('select-ano-detalhe').value;
    let dadosAno = detalheGlobal.anos[ano];
    
    if(!dadosAno) return;
    
    // Atualiza Resumo Superior do Detalhamento
    document.getElementById('det-saldo-ano').innerText = formatBRL(dadosAno.totalPessoal + dadosAno.totalPatronal + dadosAno.totalRendimento);
    document.getElementById('det-pessoal-ano').innerText = formatBRL(dadosAno.totalPessoal);
    document.getElementById('det-patronal-ano').innerText = formatBRL(dadosAno.totalPatronal);
    document.getElementById('det-rendimento-ano').innerText = formatBRL(dadosAno.totalRendimento);

    // Renderiza Extrato Mensal (Aba Contribuições)
    let listaContainer = document.getElementById('lista-meses-container');
    listaContainer.innerHTML = '';
    
    [...dadosAno.meses].reverse().forEach(mesData => {
        let totalMesPes = mesData.pessoal;
        let totalMesPat = mesData.patronal;
        
        let html = `
        <div class="extrato-mes">
            <div class="extrato-header">${mesData.mes} ${ano}</div>
            <div class="extrato-body">
                <div class="extrato-row" style="font-weight: bold; border-bottom: 2px solid #eee; padding-bottom: 8px;">
                    <span style="flex:1;"></span>
                    <div class="extrato-cols">
                        <span class="extrato-col" style="color:var(--text-light);">PESSOAL</span>
                        <span class="extrato-col" style="color:var(--text-light);">PATRONAL</span>
                    </div>
                </div>
                <div class="extrato-row">
                    <span style="flex:1;">Aporte Complementar</span>
                    <div class="extrato-cols">
                        <span class="extrato-col">${formatBRL(mesData.pessoal)}</span>
                        <span class="extrato-col">${formatBRL(mesData.patronal)}</span>
                    </div>
                </div>
                <div class="extrato-row" style="background: #f0f9ff; margin-top: 5px; padding: 10px 5px; border-radius: 4px;">
                    <span style="flex:1; color: var(--dark-blue);">TOTAL DO MÊS</span>
                    <div class="extrato-cols">
                        <span class="extrato-col" style="color: var(--dark-blue);">${formatBRL(totalMesPes)}</span>
                        <span class="extrato-col" style="color: var(--dark-blue);">${formatBRL(totalMesPat)}</span>
                    </div>
                </div>
            </div>
        </div>`;
        listaContainer.innerHTML += html;
    });

    // Renderiza Gráficos (Aba Saldo de Conta)
    if(chartPizza) chartPizza.destroy();
    if(chartBarras) chartBarras.destroy();

    const ctxPizza = document.getElementById('chartPizzaAcumulado').getContext('2d');
    chartPizza = new Chart(ctxPizza, {
        type: 'pie',
        data: {
            labels: ['Pessoal (Total)', 'Patronal (Total)', 'Rendimentos (Total)'],
            datasets: [{
                data: [detalheGlobal.totalPessoal, detalheGlobal.totalPatronal, detalheGlobal.totalRendimento],
                backgroundColor: ['#63C5F1', '#1A365D', '#28A745'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom'} } }
    });

    const ctxBarras = document.getElementById('chartBarrasAno').getContext('2d');
    let labelsMeses = dadosAno.meses.map(m => m.mes.substring(0,3).toUpperCase());
    let dataAportes = dadosAno.meses.map(m => m.pessoal + m.patronal);
    let dataRendimentos = dadosAno.meses.map(m => m.rendimento);

    chartBarras = new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: labelsMeses,
            datasets: [
                {
                    label: 'Aportes (Pes+Pat)',
                    data: dataAportes,
                    backgroundColor: '#1A365D'
                },
                {
                    label: 'Rendimentos no Mês',
                    data: dataRendimentos,
                    backgroundColor: '#28A745'
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            }
        }
    });
}

// Inicia
window.onload = function() {
    recalcularBase();
};
