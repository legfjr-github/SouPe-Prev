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

// DADOS DE COMPOSIÇÃO DE CARTEIRA REAIS
const compFunaprev = {
    total: 1474871586.25,
    classes: {
        'Títulos Públicos': 356860264.44, // Soma NTN-Bs
        'Fundos Renda Fixa': 1038437713.70, // Soma Fundos RF
        'Letras Financeiras': 56551505.35, // Soma LFs
        'Fundos Multimercado': 13212885.37,
        'Fundos Renda Variável': 20370768.01, // Soma Ações/BDR
        'Disponibilidades': 3439906.40 // Caixa/Bancos
    },
    detalhes: [
        {nome: "Fundo 100% Títulos Públicos CAIXA BRASIL (FUNAPREV)", valor: 326397019.63, perc: "22,13%"},
        {nome: "Fundo 100% Títulos Públicos CAIXA BRASIL (FUNAFIN)", valor: 278311922.30, perc: "18,87%"},
        {nome: "Fundo Renda Fixa BRADESCO PREMIUM (FUNAPREV)", valor: 127854332.80, perc: "8,67%"},
        {nome: "Fundo CAIXA BRASIL RENDA FIXA DI", valor: 80750217.24, perc: "5,48%"},
        {nome: "Títulos Públicos Tesouro IPCA+ NTN-B 92500944", valor: 51397814.77, perc: "3,48%"},
        {nome: "Títulos Públicos Tesouro IPCA+ NTN-B 92690930", valor: 31414220.63, perc: "2,13%"},
        {nome: "Operação com Letras Financeiras L.F. (29.056.395,42)", valor: 29056395.42, perc: "1,97%"},
        {nome: "Fundo Cotas CAIXA BRASIL (FUNAFIN)", valor: 24722887.91, perc: "1,69%"},
        {nome: "Demais Títulos Públicos IPCA+ NTN-B", valor: 274048229.04, perc: "18,58%"},
        {nome: "Demais Letras Financeiras", valor: 27495109.93, perc: "1,86%"},
        {nome: "Fundo CAIXA BOLSA AMERICANA MULTIMERCADO", valor: 13212885.37, perc: "0,90%"},
        {nome: "Fundo CAIXA INSTITUCIONAL BDR NIVEL 1", valor: 10053302.50, perc: "0,68%"},
        {nome: "Fundos de Renda Variável (Diversos)", valor: 10317465.51, perc: "0,70%"},
        {nome: "Disponibilidades Financeiras", valor: 3439906.40, perc: "0,23%"}
    ]
};

const compPeprevcom = {
    total: 31170009.39,
    classes: {
        'Títulos Públicos': 14880556.35,
        'Fundos Renda Fixa': 6635837.75,
        'Fundos Multimercado': 48118.79,
        'Fundos Renda Variável': 77547.09,
        'Fundos Exterior': 156735.59
    },
    detalhes: [
        {nome: "NTN-B 15/08/2050 (Vencimento)", valor: 8582147.51, perc: "27,53%"},
        {nome: "NTN-B 15/05/2045 (Vencimento)", valor: 7527271.18, perc: "24,15%"},
        {nome: "BB PREVIDÊNCIA LIQUIDEZ RESP LIMITADA FIF RENDA FIXA", valor: 5686946.92, perc: "18,24%"},
        {nome: "NTN-B 15/05/2055 (Vencimento)", valor: 3499659.11, perc: "11,23%"},
        {nome: "NTN-B 15/08/2060 (Vencimento)", valor: 2684015.67, perc: "8,61%"},
        {nome: "BB PREVIDÊNCIA IMA-B 5 ATIVO FIF RESP LIMITADA", valor: 757251.38, perc: "2,43%"},
        {nome: "NTN-F 01/01/2031 (Mercado)", valor: 683162.82, perc: "2,19%"},
        {nome: "NTN-B 15/05/2045 (Mercado)", valor: 409666.03, perc: "1,31%"},
        {nome: "NTN-B 15/05/2035 (Vencimento)", valor: 306852.99, perc: "0,98%"},
        {nome: "BB PREVIDÊNCIA TP RESP LIMITADA FIF RENDA FIXA CRÉDITO PRIVA", valor: 191639.45, perc: "0,61%"},
        {nome: "Demais Títulos Públicos (Mercado)", valor: 559499.81, perc: "1,80%"},
        {nome: "BB SCHRODER INVESTIMENTO NO EXTERIOR RESP LIMITADA FIF MULTI", valor: 128641.23, perc: "0,43%"},
        {nome: "BB PREVIDÊNCIA RESP LIMITADA FIF AÇÕES", valor: 77547.09, perc: "0,25%"},
        {nome: "BB PREVIDÊNCIA MÓDULO FIF CIC MULTIMERCADO", valor: 48118.79, perc: "0,15%"},
        {nome: "BB GLOBAL SELECT EQUITY IE RESP LIMITADA FIF MULTIMERCADO", valor: 28094.36, perc: "0,09%"}
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
let chartResumoFunaprev = null;
let chartResumoPeprevcom = null;
let chartComposicaoDetalhada = null;

const formatBRL = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- NAVEGAÇÃO SPA & TABS ---
function openPrevidencia() {
    fecharTelas();
    document.getElementById('view-prev').classList.add('active');
    window.scrollTo(0, 0);
    recalcularBase();
}

function openHome() {
    fecharTelas();
    document.getElementById('view-home').classList.add('active');
    window.scrollTo(0, 0);
}

function fecharTelas() {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
}

function abrirDetalhamento() {
    fecharTelas();
    document.getElementById('view-detalhes').classList.add('active');
    window.scrollTo(0, 0);
    
    let selectAno = document.getElementById('select-ano-detalhe');
    selectAno.innerHTML = '';
    
    let anosDisponiveis = Object.keys(detalheGlobal.anos).sort((a,b) => a - b);
    anosDisponiveis.forEach(ano => {
        let opt = document.createElement('option');
        opt.value = ano;
        opt.innerText = "Ano Exercício: " + ano;
        selectAno.appendChild(opt);
    });

    if(anosDisponiveis.length > 0) {
        selectAno.value = anosDisponiveis[anosDisponiveis.length - 1];
    }
    
    renderAnoDetalhe();
}

function fecharDetalhamento() {
    fecharTelas();
    document.getElementById('view-prev').classList.add('active');
}

function abrirComposicao(fundo) {
    fecharTelas();
    document.getElementById('view-composicao').classList.add('active');
    window.scrollTo(0, 0);

    let dados = fundo === 'funaprev' ? compFunaprev : compPeprevcom;
    document.getElementById('titulo-composicao').innerText = `Composição da Carteira (${fundo === 'funaprev' ? 'Funaprev' : 'PE-PREVCOM'})`;
    document.getElementById('comp-total-valor').innerText = formatBRL(dados.total);

    // Grafico detalhado
    if(chartComposicaoDetalhada) chartComposicaoDetalhada.destroy();
    const ctx = document.getElementById('chartComposicaoDetalhe').getContext('2d');
    
    let labels = Object.keys(dados.classes);
    let valores = Object.values(dados.classes);
    let cores = ['#1A365D', '#63C5F1', '#28A745', '#ff9999', '#ffdd57', '#ccc'];

    chartComposicaoDetalhada = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: cores.slice(0, labels.length),
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom'} } }
    });

    // Lista de ativos
    let lista = document.getElementById('lista-ativos-container');
    lista.innerHTML = '';
    dados.detalhes.forEach(det => {
        lista.innerHTML += `
        <div style="background: #fff; border: 1px solid #eee; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1; padding-right: 10px;">
                <p style="font-size: 12px; font-weight: bold; color: var(--dark-blue); line-height: 1.2;">${det.nome}</p>
                <p style="font-size: 11px; color: var(--text-light); margin-top: 4px;">${formatBRL(det.valor)}</p>
            </div>
            <div style="background: #f0f9ff; color: var(--primary-blue); font-weight: bold; padding: 5px 8px; border-radius: 4px; font-size: 13px;">
                ${det.perc}
            </div>
        </div>`;
    });
}

function fecharComposicao() {
    fecharTelas();
    document.getElementById('view-prev').classList.add('active');
    switchTab('transparencia');
}


function switchTab(tabId) {
    document.getElementById('btn-simulacao').classList.remove('active');
    document.getElementById('btn-transparencia').classList.remove('active');
    document.getElementById('tab-simulacao').classList.remove('active');
    document.getElementById('tab-transparencia').classList.remove('active');
    
    document.getElementById('btn-' + tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');

    if(tabId === 'transparencia') renderGraficosTransparencia();
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
    
    let taxaAnual = parseFloat(document.getElementById('inputTaxa').value) || 6; 
    let taxaMensal = Math.pow(1 + (taxaAnual / 100), 1/12) - 1;

    let nivelAtualTexto = "Matriz 1 / R1";

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

    detalheGlobal = { anos: {}, totalPessoal: 0, totalPatronal: 0, totalRendimento: 0 };
    let saldoSimulacao = 0;
    
    let dataReferencia = new Date();
    if (usarHistorico && document.getElementById('inputDataIngresso').value) {
        dataReferencia = new Date(document.getElementById('inputDataIngresso').value);
    }
    
    let mesesPassados = servidor.mesesContribuicao;
    let mesesFuturos = anoSelecionado * 12;
    let totalMesesSimular = mesesPassados + mesesFuturos;

    let saldoAtualCongelado = 0;

    for (let m = 1; m <= totalMesesSimular; m++) {
        let anosCarreira = Math.floor((m - 1) / 12);
        let salarioDoMes = servidor.salarioSimulado; 

        if (usarCarreira) {
            let idx = Math.min(anosCarreira, 17);
            let refSalario = anosCarreira < 3 ? ggov_pe.matrix1[0] : ggov_pe.matrix2[idx];
            salarioDoMes = refSalario.bruto - ggov_pe.food;
        }

        let rendimentoMes = saldoSimulacao * taxaMensal;
        saldoSimulacao += rendimentoMes;

        let baseComplementarMes = Math.max(0, salarioDoMes - tetoINSS);
        let aportePessoal = baseComplementarMes * 0.085;
        let aportePatronal = baseComplementarMes * 0.085;
        
        saldoSimulacao += (aportePessoal + aportePatronal);

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

        if (m === mesesPassados) {
            saldoAtualCongelado = saldoSimulacao;
            
            let descontoObrig = Math.min(salarioDoMes, tetoINSS) * 0.14;
            document.getElementById('ui-salario').innerText = formatBRL(salarioDoMes);
            document.getElementById('ui-teto').innerText = formatBRL(tetoINSS);
            document.getElementById('ui-obrig-desc').innerText = "-" + formatBRL(descontoObrig);
            document.getElementById('ui-saldo-atual').innerText = formatBRL(saldoAtualCongelado);
            document.getElementById('ui-comp-serv').innerText = formatBRL(aportePessoal);
            document.getElementById('ui-comp-est').innerText = formatBRL(aportePatronal);
            
            // Calculo da Prev Obrigatória no Momento PRESENTE (Pra home)
            let genero = document.getElementById('inputGenero').value;
            let reqTempo = genero === 'M' ? 35 : 30;
            let anosContr = mesesPassados / 12;
            let fatorHoje = Math.min(1, anosContr / reqTempo);
            let prevHoje = tetoINSS * fatorHoje;
            document.getElementById('home-prev-obrig').innerText = formatBRL(prevHoje);
        }

        dataReferencia.setMonth(dataReferencia.getMonth() + 1);
    }
    
    let idadeFutura = servidor.idadeAtual + anoSelecionado;
    let mesesSobrevivencia = (expectativaVida - idadeFutura) * 12;
    
    let rendaMensal = 0;
    if (mesesSobrevivencia > 0) {
        rendaMensal = saldoSimulacao * (taxaMensal) / (1 - Math.pow(1 + taxaMensal, -mesesSobrevivencia));
    } else {
        rendaMensal = saldoSimulacao; 
    }

    let genero = document.getElementById('inputGenero').value;
    let idadeMinIntegral = genero === 'M' ? 60 : 55;
    let tempoContribMinIntegral = genero === 'M' ? 35 : 30;
    let idadeMinProporcional = genero === 'M' ? 65 : 60;
    
    let tempoTotalContribuicaoProjetado = totalMesesSimular / 12;
    
    let isIntegral = (idadeFutura >= idadeMinIntegral) && (tempoTotalContribuicaoProjetado >= tempoContribMinIntegral);
    let isProporcional = (idadeFutura >= idadeMinProporcional);
    let isCompulsoria = (idadeFutura >= 75);

    let prevObrigEstimada = 0;
    let fatorTempo = Math.min(1, tempoTotalContribuicaoProjetado / tempoContribMinIntegral);
    prevObrigEstimada = tetoINSS * fatorTempo; 

    document.getElementById('ui-proj-idade').innerText = idadeFutura + " anos";
    document.getElementById('ui-proj-tempo-cont').innerText = tempoTotalContribuicaoProjetado.toFixed(1) + " anos";
    document.getElementById('ui-proj-total').innerText = formatBRL(saldoSimulacao);
    document.getElementById('ui-proj-renda').innerText = formatBRL(rendaMensal) + " / mês";
    document.getElementById('ui-proj-obrig').innerText = formatBRL(prevObrigEstimada) + " / mês";

    let alertaIdade = document.getElementById('alerta-idade');
    if (isCompulsoria) {
         alertaIdade.innerHTML = `<strong>Aposentadoria Compulsória</strong> aos 75 anos. A prev. obrigatória será limitato ao teto e proporcional (${(fatorTempo*100).toFixed(0)}%). O valor complementar simula a renda do saldo.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#a5d8ff';
         alertaIdade.style.borderLeft = '4px solid #a5d8ff';
    } else if (isIntegral) {
         alertaIdade.innerHTML = `✅ <strong>Requisitos de Integralidade Atingidos!</strong> Você terá ${idadeFutura} anos de idade e baterá o tempo mínimo de contribuição. A prev. obrigatória atinge o teto do INSS.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#28A745'; 
         alertaIdade.style.borderLeft = '4px solid #28A745';
    } else if (isProporcional) {
         alertaIdade.innerHTML = `⚠️ <strong>Atenção:</strong> Você cumpre apenas a idade para aposentadoria <strong>proporcional</strong> (${idadeMinProporcional} anos). A obrigatória será reduzida a ${(fatorTempo*100).toFixed(0)}% do teto.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#ffdd57';
         alertaIdade.style.borderLeft = '4px solid #ffdd57';
    } else {
         alertaIdade.innerHTML = `⛔ <strong>Atenção: Requisitos Não Atingidos.</strong> Você não tem idade/tempo para aposentadoria voluntária nesta data. <br><br><i>*Em caso de aposentadoria por invalidez precoce, o benefício obrigatório estimado seria proporcional ao tempo (${(fatorTempo*100).toFixed(0)}% do Teto INSS).</i>`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#ff9999';
         alertaIdade.style.borderLeft = '4px solid #ff9999';
    }
}

function renderGraficosTransparencia() {
    if(chartResumoFunaprev) chartResumoFunaprev.destroy();
    if(chartResumoPeprevcom) chartResumoPeprevcom.destroy();

    const ctxFunaprev = document.getElementById('chartFunaprevResumo').getContext('2d');
    chartResumoFunaprev = new Chart(ctxFunaprev, {
        type: 'doughnut',
        data: {
            labels: Object.keys(compFunaprev.classes),
            datasets: [{
                data: Object.values(compFunaprev.classes),
                backgroundColor: ['#1A365D', '#63C5F1', '#28A745', '#ffdd57', '#ff9999', '#ccc'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    const ctxPeprevcom = document.getElementById('chartPeprevcomResumo').getContext('2d');
    chartResumoPeprevcom = new Chart(ctxPeprevcom, {
        type: 'doughnut',
        data: {
            labels: Object.keys(compPeprevcom.classes),
            datasets: [{
                data: Object.values(compPeprevcom.classes),
                backgroundColor: ['#1A365D', '#63C5F1', '#ffdd57', '#ff9999', '#9933cc'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
}


function renderAnoDetalhe() {
    let ano = document.getElementById('select-ano-detalhe').value;
    let dadosAno = detalheGlobal.anos[ano];
    
    if(!dadosAno) return;
    
    document.getElementById('det-saldo-ano').innerText = formatBRL(dadosAno.totalPessoal + dadosAno.totalPatronal + dadosAno.totalRendimento);
    document.getElementById('det-pessoal-ano').innerText = formatBRL(dadosAno.totalPessoal);
    document.getElementById('det-patronal-ano').innerText = formatBRL(dadosAno.totalPatronal);
    document.getElementById('det-rendimento-ano').innerText = formatBRL(dadosAno.totalRendimento);

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
                    <span style="flex:1; color: var(--dark-blue); font-weight: bold; font-size: 11px;">TOTAL APORTADO NO MÊS</span>
                    <div class="extrato-cols">
                        <span class="extrato-col" style="color: var(--dark-blue); font-weight: bold;">${formatBRL(totalMesPes)}</span>
                        <span class="extrato-col" style="color: var(--dark-blue); font-weight: bold;">${formatBRL(totalMesPat)}</span>
                    </div>
                </div>
                <div class="extrato-row" style="border-bottom: none; padding-top: 15px;">
                    <span style="flex:1; color: var(--text-light); font-size: 11px;">Rendimento do Fundo no Mês:</span>
                    <div class="extrato-cols" style="justify-content: flex-end; width: 100%;">
                        <span style="color: var(--success); font-weight:bold; font-size: 14px;">+${formatBRL(mesData.rendimento)}</span>
                    </div>
                </div>
            </div>
        </div>`;
        listaContainer.innerHTML += html;
    });

    if(chartPizza) chartPizza.destroy();
    if(chartBarras) chartBarras.destroy();

    const ctxPizza = document.getElementById('chartPizzaAcumulado').getContext('2d');
    chartPizza = new Chart(ctxPizza, {
        type: 'pie',
        data: {
            labels: ['Total de Aportes no Ano', 'Total de Rendimentos no Ano'],
            datasets: [{
                data: [dadosAno.totalPessoal + dadosAno.totalPatronal, dadosAno.totalRendimento],
                backgroundColor: ['#1A365D', '#28A745'],
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
                y: { stacked: false } // Mudado para não empilhar e ver a relação visual
            }
        }
    });
}

// Inicia
window.onload = function() {
    recalcularBase();
};

