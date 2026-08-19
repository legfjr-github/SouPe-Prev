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

// Salário inicial padrão
const salarioR1M1 = ggov_pe.matrix1[0].bruto - ggov_pe.food; 

let servidor = {
    idadeAtual: 32,
    mesesContribuicao: 1, // Mudado para 1 mês
    salarioSimulado: salarioR1M1,
    saldoComplementarAtual: 0 
};

let anoSelecionado = 30; // Default será atualizado dinamicamente

const formatBRL = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- NAVEGAÇÃO SPA & TABS ---
function openPrevidencia() {
    document.getElementById('view-home').classList.remove('active');
    document.getElementById('view-prev').classList.add('active');
    window.scrollTo(0, 0);
    recalcularBase();
}

function openHome() {
    document.getElementById('view-prev').classList.remove('active');
    document.getElementById('view-home').classList.add('active');
    window.scrollTo(0, 0);
}

function switchTab(tabId) {
    document.getElementById('btn-simulacao').classList.remove('active');
    document.getElementById('btn-transparencia').classList.remove('active');
    document.getElementById('tab-simulacao').classList.remove('active');
    document.getElementById('tab-transparencia').classList.remove('active');
    
    document.getElementById('btn-' + tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
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

    // 1. Calcular Histórico se Ativo
    if (usarHistorico && dataIngressoInput) {
        let dataIngresso = new Date(dataIngressoInput);
        let hoje = new Date(); 
        
        let mesesPassados = (hoje.getFullYear() - dataIngresso.getFullYear()) * 12 + (hoje.getMonth() - dataIngresso.getMonth());
        if (mesesPassados < 0) mesesPassados = 0;
        
        servidor.mesesContribuicao = mesesPassados;
        
        let saldoAcumulado = 0;
        let salarioParaHoje = salarioR1M1;

        for (let m = 1; m <= mesesPassados; m++) {
            let anosCarreiraPassado = Math.floor((m - 1) / 12);
            let maxIndex = 17;
            let idx = Math.min(anosCarreiraPassado, maxIndex);
            
            let refSalario;
            if (anosCarreiraPassado < 3) {
                refSalario = ggov_pe.matrix1[0]; 
                nivelAtualTexto = "Matriz 1 / R1";
            } else {
                refSalario = ggov_pe.matrix2[idx];
                nivelAtualTexto = "Matriz 2 / " + refSalario.ref;
            }
            
            let salarioDoMes = refSalario.bruto - ggov_pe.food;
            salarioParaHoje = salarioDoMes;

            saldoAcumulado += (saldoAcumulado * taxaMensal);
            let baseComplementarMes = Math.max(0, salarioDoMes - tetoINSS);
            let aporteMensal = baseComplementarMes * 0.17; 
            saldoAcumulado += aporteMensal;
        }

        servidor.saldoComplementarAtual = saldoAcumulado;
        
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
        // 2. Comportamento Padrão
        servidor.mesesContribuicao = 1; // 1 mês padrão
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

        let aporteBaseAtual = Math.max(0, servidor.salarioSimulado - tetoINSS) * 0.17; 
        servidor.saldoComplementarAtual = aporteBaseAtual * 1; 
    }

    document.getElementById('ui-nivel-atual').innerText = nivelAtualTexto;

    let baseObrigatoria = Math.min(servidor.salarioSimulado, tetoINSS);
    let descontoObrig = baseObrigatoria * 0.14;

    let baseComplementar = Math.max(0, servidor.salarioSimulado - tetoINSS);
    let contrServidor = baseComplementar * 0.085;
    let contrEstado = baseComplementar * 0.085;

    document.getElementById('ui-salario').innerText = formatBRL(servidor.salarioSimulado);
    document.getElementById('ui-teto').innerText = formatBRL(tetoINSS);
    document.getElementById('ui-obrig-desc').innerText = "-" + formatBRL(descontoObrig);
    document.getElementById('ui-saldo-atual').innerText = formatBRL(servidor.saldoComplementarAtual);
    
    if(baseComplementar > 0) {
        document.getElementById('ui-comp-serv').innerText = formatBRL(contrServidor);
        document.getElementById('ui-comp-est').innerText = formatBRL(contrEstado);
    } else {
        document.getElementById('ui-comp-serv').innerText = "R$ 0,00 (Abaixo do teto)";
        document.getElementById('ui-comp-est').innerText = "R$ 0,00 (Abaixo do teto)";
    }

    gerarBotoesAnos();
    executarSimulacao();
}

function gerarBotoesAnos() {
    const container = document.getElementById('btn-group-anos');
    container.innerHTML = '';
    
    let genero = document.getElementById('inputGenero') ? document.getElementById('inputGenero').value : 'F';
    let anosContribuicaoAtual = servidor.mesesContribuicao / 12;
    
    // Regras Legais
    let idadeMinIntegral = genero === 'M' ? 60 : 55;
    let tempoContribMinIntegral = genero === 'M' ? 35 : 30;
    let idadeMinProporcional = genero === 'M' ? 65 : 60;
    
    // Cálculo do GAP para Integral
    let anosParaIdadeIntegral = Math.max(0, idadeMinIntegral - servidor.idadeAtual);
    let anosParaContribIntegral = Math.max(0, tempoContribMinIntegral - anosContribuicaoAtual);
    let anosFaltantesIntegral = Math.ceil(Math.max(anosParaIdadeIntegral, anosParaContribIntegral));
    
    // Cálculo do GAP para Proporcional por Idade
    let anosFaltantesProporcional = Math.ceil(Math.max(0, idadeMinProporcional - servidor.idadeAtual));
    
    const anosCompulsoria = 75 - servidor.idadeAtual;
    
    let btnLabels = {};
    
    // Botões genéricos
    [5, 10, 15, 20].forEach(a => { 
        if(a > 0 && a < anosCompulsoria) btnLabels[a] = a + ' anos'; 
    });
    
    // Botões precisão legal
    if (anosFaltantesIntegral > 0 && anosFaltantesIntegral < anosCompulsoria) {
        btnLabels[anosFaltantesIntegral] = anosFaltantesIntegral + ' anos (Integral)';
    }
    if (anosFaltantesProporcional > 0 && anosFaltantesProporcional < anosCompulsoria) {
        if (btnLabels[anosFaltantesProporcional]) {
            if (anosFaltantesProporcional !== anosFaltantesIntegral) {
                 btnLabels[anosFaltantesProporcional] += ' / Prop. Idade';
            }
        } else {
            btnLabels[anosFaltantesProporcional] = anosFaltantesProporcional + ' anos (Prop. Idade)';
        }
    }
    btnLabels[anosCompulsoria] = 'Compulsória (' + anosCompulsoria + ' anos)';
    
    let sortedAnos = Object.keys(btnLabels).map(Number).sort((a,b) => a - b);
    
    // Auto-selecionar o ideal
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
    let taxaAnual = parseFloat(document.getElementById('inputTaxa').value) || 6; 
    let taxaMensal = Math.pow(1 + (taxaAnual / 100), 1/12) - 1;
    
    let expectativaVida = parseInt(document.getElementById('inputExpectativa').value) || 82;

    let mesesSimulacao = anoSelecionado * 12;
    let saldoFuturo = servidor.saldoComplementarAtual;

    for (let m = 1; m <= mesesSimulacao; m++) {
        let tempoTotalMeses = servidor.mesesContribuicao + m;
        let anosCarreira = Math.floor(tempoTotalMeses / 12);
        
        let salarioDoMes = servidor.salarioSimulado; 

        if (usarCarreira) {
            let maxIndex = 17; 
            let idx = Math.min(anosCarreira, maxIndex);
            
            let refSalario;
            if (anosCarreira < 3) {
                refSalario = ggov_pe.matrix1[0]; 
            } else {
                refSalario = ggov_pe.matrix2[idx]; 
            }
            salarioDoMes = refSalario.bruto - ggov_pe.food;
        }

        saldoFuturo += (saldoFuturo * taxaMensal);

        let baseComplementarMes = Math.max(0, salarioDoMes - tetoINSS);
        let aporteMensal = baseComplementarMes * 0.17; 
        
        saldoFuturo += aporteMensal;
    }
    
    let idadeFutura = servidor.idadeAtual + anoSelecionado;
    let mesesSobrevivencia = (expectativaVida - idadeFutura) * 12;
    
    let rendaMensal = 0;
    if (mesesSobrevivencia > 0) {
        rendaMensal = saldoFuturo * (taxaMensal) / (1 - Math.pow(1 + taxaMensal, -mesesSobrevivencia));
    } else {
        rendaMensal = saldoFuturo; 
    }

    // Precisão Legal - Avaliação
    let genero = document.getElementById('inputGenero').value;
    let generoTexto = genero === 'M' ? 'Homem' : 'Mulher';
    let idadeMinIntegral = genero === 'M' ? 60 : 55;
    let tempoContribMinIntegral = genero === 'M' ? 35 : 30;
    let idadeMinProporcional = genero === 'M' ? 65 : 60;
    
    let tempoTotalContribuicaoProjetado = (servidor.mesesContribuicao + mesesSimulacao) / 12;
    
    let isIntegral = (idadeFutura >= idadeMinIntegral) && (tempoTotalContribuicaoProjetado >= tempoContribMinIntegral);
    let isProporcional = (idadeFutura >= idadeMinProporcional);
    let isCompulsoria = (idadeFutura >= 75);

    // Renderizando Projeção
    document.getElementById('ui-proj-idade').innerText = idadeFutura + " anos";
    document.getElementById('ui-proj-tempo-cont').innerText = tempoTotalContribuicaoProjetado.toFixed(1) + " anos";
    document.getElementById('ui-proj-total').innerText = formatBRL(saldoFuturo);
    document.getElementById('ui-proj-renda').innerText = formatBRL(rendaMensal) + " / mês";

    let alertaIdade = document.getElementById('alerta-idade');
    if (isCompulsoria) {
         alertaIdade.innerHTML = `<strong>Aposentadoria Compulsória</strong> aos 75 anos. Proventos são proporcionais ao tempo de contribuição. O valor mensal acima simula a renda do seu saldo complementar nesta data.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#a5d8ff';
         alertaIdade.style.borderLeft = '4px solid #a5d8ff';
    } else if (isIntegral) {
         alertaIdade.innerHTML = `✅ <strong>Requisitos de Integralidade Atingidos!</strong> Você terá ${idadeFutura} anos de idade e atingirá o tempo mínimo exigido de contribuição.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#28A745'; 
         alertaIdade.style.borderLeft = '4px solid #28A745';
    } else if (isProporcional) {
         alertaIdade.innerHTML = `⚠️ <strong>Atenção:</strong> Nesta data, você cumpre apenas a idade para aposentadoria <strong>proporcional</strong> (${idadeMinProporcional} anos). Faltará tempo de contribuição para a integral (Exige: ${tempoContribMinIntegral} anos / Projetado: ${tempoTotalContribuicaoProjetado.toFixed(1)} anos).`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#ffdd57';
         alertaIdade.style.borderLeft = '4px solid #ffdd57';
    } else {
         alertaIdade.innerHTML = `⛔ <strong>Atenção: Requisitos Não Atingidos.</strong><br>Aposentadoria Integral (${generoTexto}): ${idadeMinIntegral} anos de idade + ${tempoContribMinIntegral} anos de contribuição.<br>Aposentadoria Proporcional: ${idadeMinProporcional} anos de idade.`;
         alertaIdade.style.display = 'block';
         alertaIdade.style.color = '#ff9999';
         alertaIdade.style.borderLeft = '4px solid #ff9999';
    }
}

// Inicia a aplicação recarregando os dados básicos
window.onload = function() {
    recalcularBase();
};
