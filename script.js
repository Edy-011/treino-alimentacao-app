// Estado do aplicativo com 3 estados
let appState = {
    tasks: {
        // Alimentação (7 refeições) - 0: não iniciado, 1: iniciado, 2: concluído
        'cafe-manha': 0,
        'lanche-manha': 0,
        'almoco': 0,
        'pre-treino': 0,
        'pos-treino': 0,
        'jantar': 0,
        'ceia': 0,
        // Treinos (4 grupos) - 0: não iniciado, 1: iniciado, 2: concluído
        'treino-abdomen': 0,
        'treino-peito': 0,
        'treino-bracos': 0,
        'treino-pernas': 0
    },
    waterCount: 0,
    date: new Date().toISOString().split('T')[0]
};

// Estados dos botões
const TASK_STATES = {
    NOT_STARTED: 0,
    STARTED: 1,
    COMPLETED: 2
};

// Categorias de tarefas
const taskCategories = {
    alimentacao: ['cafe-manha', 'lanche-manha', 'almoco', 'pre-treino', 'pos-treino', 'jantar', 'ceia'],
    treino: ['treino-abdomen', 'treino-peito', 'treino-bracos', 'treino-pernas']
};

// Configurações dos botões por estado
const BUTTON_CONFIG = {
    [TASK_STATES.NOT_STARTED]: {
        text: {
            meal: '<i class="fas fa-play"></i> Iniciar Refeição',
            workout: '<i class="fas fa-play"></i> Iniciar Treino'
        },
        class: 'btn-not-started',
        gradient: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
        color: 'white'
    },
    [TASK_STATES.STARTED]: {
        text: {
            meal: '<i class="fas fa-utensils"></i> Finalizando...',
            workout: '<i class="fas fa-dumbbell"></i> Treinando...'
        },
        class: 'btn-started',
        gradient: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
        color: 'white'
    },
    [TASK_STATES.COMPLETED]: {
        text: {
            meal: '<i class="fas fa-check-circle"></i> ✅ Refeição Concluída!',
            workout: '<i class="fas fa-check-circle"></i> ✅ Treino Concluído!'
        },
        class: 'btn-completed',
        gradient: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
        color: 'white'
    }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM carregado, inicializando app...');
    
    // Carregar estado salvo
    loadState();
    
    // Inicializar elementos
    updateDate();
    initializeButtons();
    createWaterGlasses();
    updateWaterDisplay(); // IMPORTANTE: Atualizar display de água
    updateProgress();
    
    // Verificar novo dia
    setInterval(checkNewDay, 60000); // Verificar a cada minuto
    
    console.log('✅ App inicializado com sucesso!');
    console.log('📊 Estado inicial:', appState);
});

// ===== FUNÇÕES PRINCIPAIS =====

// Toggle estado da tarefa (FUNÇÃO PRINCIPAL CORRIGIDA)
function toggleTask(taskId) {
    console.log(`🔄 Alterando estado da tarefa: ${taskId}`);
    console.log(`Estado atual: ${appState.tasks[taskId]}`);
    
    const currentState = appState.tasks[taskId] || 0;
    let newState;
    
    // Ciclar entre os estados: 0 → 1 → 2 → 0
    switch(currentState) {
        case TASK_STATES.NOT_STARTED:
            newState = TASK_STATES.STARTED;
            break;
        case TASK_STATES.STARTED:
            newState = TASK_STATES.COMPLETED;
            break;
        case TASK_STATES.COMPLETED:
            newState = TASK_STATES.NOT_STARTED;
            break;
        default:
            newState = TASK_STATES.NOT_STARTED;
    }
    
    // Atualizar estado
    appState.tasks[taskId] = newState;
    console.log(`Novo estado: ${newState}`);
    
    // Atualizar botão
    const button = document.querySelector(`[data-task="${taskId}"]`);
    updateButtonState(button, taskId, newState);
    
    // CHAMADA CRÍTICA: Atualizar progresso imediatamente
    updateProgress();
    
    // Salvar estado
    saveState();
    
    // Efeitos visuais
    handleStateChange(button, taskId, currentState, newState);
    
    // Log para debug
    const stats = calculateProgress();
    console.log('📊 Progresso atualizado:', stats);
}

// Calcular progresso (FUNÇÃO CORRIGIDA)
function calculateProgress() {
    console.log('📊 Calculando progresso...');
    
    const stats = {};
    
    // Debug: mostrar estado atual das tarefas
    console.log('Estado atual das tarefas:', appState.tasks);
    
    // Calcular progresso da alimentação
    const alimentacaoTasks = taskCategories.alimentacao;
    const alimentacaoCompleted = alimentacaoTasks.filter(taskId => {
        const isCompleted = appState.tasks[taskId] === TASK_STATES.COMPLETED;
        console.log(`${taskId}: ${appState.tasks[taskId]} (completo: ${isCompleted})`);
        return isCompleted;
    }).length;
    stats.alimentacao = (alimentacaoCompleted / alimentacaoTasks.length) * 100;
    console.log(`Alimentação: ${alimentacaoCompleted}/${alimentacaoTasks.length} = ${stats.alimentacao.toFixed(1)}%`);
    
    // Calcular progresso do treino
    const treinoTasks = taskCategories.treino;
    const treinoCompleted = treinoTasks.filter(taskId => {
        const isCompleted = appState.tasks[taskId] === TASK_STATES.COMPLETED;
        console.log(`${taskId}: ${appState.tasks[taskId]} (completo: ${isCompleted})`);
        return isCompleted;
    }).length;
    stats.treino = (treinoCompleted / treinoTasks.length) * 100;
    console.log(`Treino: ${treinoCompleted}/${treinoTasks.length} = ${stats.treino.toFixed(1)}%`);
    
    // Calcular progresso da hidratação
    stats.hidratacao = Math.min((appState.waterCount / 10) * 100, 100);
    console.log(`Hidratação: ${appState.waterCount}/10 = ${stats.hidratacao.toFixed(1)}%`);
    
    // Calcular progresso geral
    stats.geral = (stats.alimentacao + stats.treino + stats.hidratacao) / 3;
    console.log(`Geral: ${stats.geral.toFixed(1)}%`);
    
    return stats;
}

// Atualizar barras de progresso (FUNÇÃO CORRIGIDA)
function updateProgress() {
    console.log('🔄 Atualizando interface de progresso...');
    
    const stats = calculateProgress();
    
    // Atualizar círculos de progresso
    updateProgressCircle('geral', stats.geral);
    updateProgressCircle('alimentacao', stats.alimentacao);
    updateProgressCircle('hidratacao', stats.hidratacao);
    updateProgressCircle('treino', stats.treino);
    
    // Verificar conquistas
    checkAchievements(stats);
    
    console.log('✅ Interface atualizada:', {
        geral: `${stats.geral.toFixed(1)}%`,
        alimentacao: `${stats.alimentacao.toFixed(1)}%`,
        hidratacao: `${stats.hidratacao.toFixed(1)}%`,
        treino: `${stats.treino.toFixed(1)}%`,
        agua: `${appState.waterCount}/12 copos`
    });
}

// Função para atualizar círculo de progresso (MELHORADA COM CORES GRADATIVAS)
function updateProgressCircle(elementId, percentage) {
    const circle = document.getElementById(elementId + 'Circle');
    const text = document.getElementById(elementId + 'Text');
    const status = document.getElementById(elementId + 'Status');
    const progressItem = circle?.closest('.progress-item');
    
    console.log(`Atualizando círculo ${elementId}: ${percentage.toFixed(1)}%`);
    
    if (circle && text) {
        // Calcular stroke-dashoffset para o círculo
        const circumference = 2 * Math.PI * 40; // raio = 40
        const offset = circumference - (percentage / 100) * circumference;
        
        // ===== APLICAR CORES GRADATIVAS BASEADAS NA PORCENTAGEM =====
        const roundedPercentage = Math.round(percentage);
        
        // Atualizar data-progress para ativar as cores CSS
        circle.setAttribute('data-progress', roundedPercentage.toString());
        
        // Aplicar cor dinâmica também no texto
        const textElement = text.parentElement || text;
        textElement.setAttribute('data-progress', roundedPercentage.toString());
        
        // Aplicar cor no progress-item também
        if (progressItem) {
            progressItem.setAttribute('data-progress', roundedPercentage.toString());
        }
        
        // Animar o círculo
        circle.style.strokeDashoffset = offset;
        circle.style.transition = 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease';
        
        // Animar o texto
        animateNumber(text, parseInt(text.textContent) || 0, Math.round(percentage));
        
        // Atualizar status baseado na categoria
        if (progressItem) {
            const category = progressItem.dataset.category;
            updateProgressStatus(category, percentage, status);
            
            // Marcar como completo se 100%
            if (percentage >= 100) {
                progressItem.dataset.completed = 'true';
                progressItem.style.animation = 'celebrateComplete 1s ease-in-out';
                
                // ===== EFEITO ESPECIAL PARA 100% =====
                setTimeout(() => {
                    createCelebrationEffect(progressItem);
                }, 500);
            } else {
                progressItem.dataset.completed = 'false';
                progressItem.style.animation = '';
            }
        }
        
        // ===== LOG DAS CORES APLICADAS =====
        console.log(`🎨 Cor aplicada para ${elementId}: ${roundedPercentage}% - ${getCor(roundedPercentage)}`);
    } else {
        console.warn(`Elementos não encontrados para ${elementId}`);
    }
}

// Função para obter descrição da cor baseada na porcentagem
function getCor(percentage) {
    if (percentage === 0) return "Cinza (0%)";
    else if (percentage <= 10) return "Vermelho escuro (0-10%)";
    else if (percentage <= 25) return "Laranja-avermelhado (11-25%)";
    else if (percentage <= 50) return "Amarelo-laranja (26-50%)";
    else if (percentage <= 75) return "Amarelo-verde (51-75%)";
    else if (percentage <= 90) return "Verde claro (76-90%)";
    else if (percentage < 100) return "Verde intenso (91-99%)";
    else return "🏆 VERDE - 100% COMPLETO! 🏆";
}

// Efeito de celebração para 100%
function createCelebrationEffect(element) {
    // Criar elemento de celebração
    const celebration = document.createElement('div');
    celebration.innerHTML = `
        <div style="
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            border: 3px solid #28a745;
            border-radius: inherit;
            animation: celebrationGlow 2s ease-in-out;
            pointer-events: none;
            z-index: 1000;
        "></div>
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            animation: celebrationBounce 1s ease-in-out;
            pointer-events: none;
            z-index: 1001;
        ">🎉</div>
    `;
    
    element.style.position = 'relative';
    element.appendChild(celebration);
    
    // Remover após animação
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.parentNode.removeChild(celebration);
        }
    }, 2000);
}

// Adicionar animações CSS dinamicamente
const celebrationStyles = `
@keyframes celebrationGlow {
    0% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0; transform: scale(1.2); }
}

@keyframes celebrationBounce {
    0%, 20%, 60%, 100% { transform: translate(-50%, -50%) scale(1); }
    40% { transform: translate(-50%, -50%) scale(1.3); }
    80% { transform: translate(-50%, -50%) scale(1.1); }
}
`;

// Injetar estilos se ainda não existirem
if (!document.getElementById('celebration-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'celebration-styles';
    styleSheet.textContent = celebrationStyles;
    document.head.appendChild(styleSheet);
}

// Atualizar barra de progresso linear (fallback)
function updateProgressBar(elementId, percentage) {
    const progressBar = document.getElementById(elementId);
    const progressText = document.getElementById(elementId + 'Text');
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
        progressBar.style.transition = 'width 1s ease-in-out';
        
        // Mudar cor baseada no progresso
        if (percentage === 100) {
            progressBar.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        } else if (percentage >= 75) {
            progressBar.style.background = 'linear-gradient(45deg, #ffc107, #fd7e14)';
        } else if (percentage >= 50) {
            progressBar.style.background = 'linear-gradient(45deg, #17a2b8, #138496)';
        } else {
            progressBar.style.background = 'linear-gradient(45deg, #007bff, #6610f2)';
        }
    }
    
    if (progressText) {
        progressText.textContent = Math.round(percentage) + '%';
    }
}

// Função para animar números
function animateNumber(element, start, end) {
    const duration = 800;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Atualizar status de progresso (MELHORADO)
function updateProgressStatus(category, percentage, statusElement) {
    let status = '';
    
    switch (category) {
        case 'geral':
            if (percentage === 0) status = 'Pronto para começar!';
            else if (percentage < 25) status = 'Primeiros passos! 🌱';
            else if (percentage < 50) status = 'Progresso constante! 📈';
            else if (percentage < 75) status = 'Indo muito bem! 🚀';
            else if (percentage < 100) status = 'Quase perfeito! ⭐';
            else status = '🎉 Dia 100% completo! 🏆';
            break;
            
        case 'alimentacao':
            const completedMeals = Math.round((percentage / 100) * 7);
            const startedMeals = taskCategories.alimentacao.filter(taskId => 
                appState.tasks[taskId] === TASK_STATES.STARTED
            ).length;
            
            status = `${completedMeals}/7 concluídas`;
            if (startedMeals > 0) status += ` (${startedMeals} em andamento)`;
            if (percentage >= 100) status += ' ✅';
            break;
            
        case 'hidratacao':
            const glasses = Math.round((percentage / 100) * 10);
            status = `${appState.waterCount}/10 copos`;
            if (percentage >= 100) status += ' ✅ Meta atingida!';
            else if (percentage >= 80) status += ' 🔥 Quase lá!';
            break;
            
        case 'treino':
            const completedWorkouts = Math.round((percentage / 100) * 4);
            const startedWorkouts = taskCategories.treino.filter(taskId => 
                appState.tasks[taskId] === TASK_STATES.STARTED
            ).length;
            
            status = `${completedWorkouts}/4 concluídos`;
            if (startedWorkouts > 0) status += ` (${startedWorkouts} em andamento)`;
            if (percentage >= 100) status += ' ✅';
            break;
    }
    
    if (statusElement) {
        statusElement.textContent = status;
    }
}

// Inicializar botões
function initializeButtons() {
    console.log('🔄 Inicializando botões...');
    
    // Botões de tarefas
    document.querySelectorAll('.btn-complete').forEach(button => {
        const taskId = button.getAttribute('data-task');
        if (taskId && appState.tasks.hasOwnProperty(taskId)) {
            const state = appState.tasks[taskId];
            updateButtonState(button, taskId, state);
            
            // Adicionar event listener se não tiver
            if (!button.hasAttribute('data-listener')) {
                button.addEventListener('click', () => toggleTask(taskId));
                button.setAttribute('data-listener', 'true');
            }
        }
    });
}

// Atualizar estado visual do botão
function updateButtonState(button, taskId, state) {
    if (!button) return;
    
    // Remover classes anteriores
    button.classList.remove('btn-not-started', 'btn-started', 'btn-completed');
    
    // Verificar se é uma refeição
    const isFood = ['cafe-manha', 'lanche-manha', 'almoco', 'pre-treino', 'pos-treino', 'jantar', 'ceia'].includes(taskId);
    
    switch (state) {
        case TASK_STATES.NOT_STARTED:
            button.classList.add('btn-not-started');
            button.innerHTML = isFood ? 
                '<i class="fas fa-play"></i> Iniciar Refeição' : 
                '<i class="fas fa-play"></i> Iniciar Treino';
            break;
            
        case TASK_STATES.STARTED:
            button.classList.add('btn-started');
            button.innerHTML = isFood ? 
                '<i class="fas fa-utensils"></i> Fazendo Refeição...' : 
                '<i class="fas fa-dumbbell"></i> Treinando...';
            break;
            
        case TASK_STATES.COMPLETED:
            button.classList.add('btn-completed');
            button.innerHTML = isFood ? 
                '<i class="fas fa-check-circle"></i> Refeição Concluída!' : 
                '<i class="fas fa-trophy"></i> Treino Concluído!';
            break;
    }
    
    // Atualizar data-state para CSS
    button.setAttribute('data-state', state);
    
    console.log(`Botão ${taskId} atualizado para estado ${state}`);
}

// Função de água (CORRIGIDA para atualizar progresso)
function addWater() {
    // Verificar se já não atingiu o limite
    if (appState.waterCount >= 12) {
        showInAppNotification(
            '💧 Limite atingido!',
            'Você já bebeu 12 copos hoje! Parabéns! 🎉',
            'success'
        );
        return;
    }
    
    // Incrementar contador
    appState.waterCount++;
    console.log(`💧 Água adicionada: ${appState.waterCount}/12`);
    
    // Atualizar displays
    updateWaterDisplay();
    updateProgress(); // Atualizar progresso geral
    saveState(); // Salvar no localStorage
    
    // Feedback visual e mensagens
    if (appState.waterCount === 12) {
        // Meta atingida!
        showInAppNotification(
            '🎉 Meta atingida!',
            '12/12 copos! Hidratação 100% concluída! 💧',
            'success'
        );
        createConfetti();
    } else if (appState.waterCount === 6) {
        // Meio caminho
        showInAppNotification(
            '💧 Meio caminho!',
            `${appState.waterCount}/12 copos. Continue assim! 👍`,
            'info'
        );
    } else {
        // Progresso normal
        showInAppNotification(
            '💧 Água adicionada!',
            `${appState.waterCount}/12 copos. Continue hidratando! 🚰`,
            'info'
        );
    }
    
    // Animar o botão
    const button = document.querySelector('.btn-water');
    if (button) {
        button.style.animation = 'pulse 0.4s ease-in-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 400);
    }
}

function resetWater() {
    if (!confirm('🔄 Resetar contador de água?\n\nIsso irá zerar seu progresso de hidratação.')) {
        return;
    }
    
    appState.waterCount = 0;
    
    // Atualizar displays
    updateWaterDisplay();
    updateProgress(); // Atualizar progresso geral
    saveState(); // Salvar no localStorage
    
    showInAppNotification(
        '🔄 Água resetada!', 
        'Contador zerado! Comece novamente. 💧', 
        'warning'
    );
    
    console.log('🔄 Contador de água resetado para 0');
}

// Verificar conquistas
function checkAchievements(stats) {
    // Verificar 100% em cada categoria
    if (stats.alimentacao >= 100 && !appState.achievementShown?.alimentacao) {
        createConfetti();
        showAchievement('🍽️ Alimentação 100%!', 'Todas as refeições concluídas!');
        if (!appState.achievementShown) appState.achievementShown = {};
        appState.achievementShown.alimentacao = true;
    }
    
    if (stats.treino >= 100 && !appState.achievementShown?.treino) {
        createConfetti();
        showAchievement('💪 Treino 100%!', 'Todos os treinos concluídos!');
        if (!appState.achievementShown) appState.achievementShown = {};
        appState.achievementShown.treino = true;
    }
    
    if (stats.hidratacao >= 100 && !appState.achievementShown?.hidratacao) {
        showAchievement('💧 Hidratação 100%!', 'Meta de água atingida!');
        if (!appState.achievementShown) appState.achievementShown = {};
        appState.achievementShown.hidratacao = true;
    }
    
    if (stats.geral >= 100 && !appState.achievementShown?.geral) {
        createConfetti();
        setTimeout(() => showCongratulations(), 1000);
        if (!appState.achievementShown) appState.achievementShown = {};
        appState.achievementShown.geral = true;
    }
}

// Obter nome amigável da tarefa
function getTaskDisplayName(taskId) {
    const taskNames = {
        'cafe-manha': 'Café da Manhã',
        'lanche-manha': 'Lanche da Manhã', 
        'almoco': 'Almoço',
        'pre-treino': 'Pré-Treino',
        'pos-treino': 'Pós-Treino',
        'jantar': 'Jantar',
        'ceia': 'Ceia',
        'treino-abdomen': 'Treino de Abdômen',
        'treino-peito': 'Treino de Peito',
        'treino-bracos': 'Treino de Braços',
        'treino-pernas': 'Treino de Pernas'
    };
    
    return taskNames[taskId] || taskId;
}

// Manipular mudanças de estado
function handleStateChange(button, taskId, oldState, newState) {
    const taskName = getTaskDisplayName(taskId);
    const isFood = ['cafe-manha', 'lanche-manha', 'almoco', 'pre-treino', 'pos-treino', 'jantar', 'ceia'].includes(taskId);
    
    switch (newState) {
        case TASK_STATES.STARTED:
            console.log(`🎬 ${taskName} iniciado!`);
            showInAppNotification(
                '🎬 Iniciado!', 
                isFood ? `Aproveite sua ${taskName}!` : `Bom treino: ${taskName}!`,
                'success'
            );
            break;
            
        case TASK_STATES.COMPLETED:
            console.log(`✅ ${taskName} concluído!`);
            celebrateTask(button);
            showInAppNotification(
                '🎉 Concluído!', 
                isFood ? `${taskName} finalizada com sucesso!` : `${taskName} completado!`,
                'success'
            );
            break;
            
        case TASK_STATES.NOT_STARTED:
            console.log(`🔄 ${taskName} resetado`);
            showInAppNotification(
                '🔄 Resetado', 
                `${taskName} pronto para começar novamente`,
                'info'
            );
            break;
    }
}

// Funções auxiliares necessárias
function loadState() {
    const saved = localStorage.getItem('alimentacao-treino-app');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            if (savedState.date === appState.date) {
                appState = { ...appState, ...savedState };
                console.log('📥 Estado carregado:', appState);
            } else {
                resetDay(true);
            }
        } catch (error) {
            console.error('Erro ao carregar estado:', error);
        }
    }
}

function saveState() {
    try {
        localStorage.setItem('alimentacao-treino-app', JSON.stringify(appState));
        console.log('💾 Estado salvo');
    } catch (error) {
        console.error('Erro ao salvar estado:', error);
    }
}

function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('pt-BR', options);
    }
}

function checkNewDay() {
    const today = new Date().toISOString().split('T')[0];
    if (appState.date !== today) {
        showNewDayNotification();
        resetDay(true);
    }
}

function showNewDayNotification() {
    alert('🌅 Novo dia detectado! Resetando progresso para começar fresh! 💪');
}

function resetDay(automatic = false) {
    if (!automatic && !confirm('Resetar todo o progresso do dia?')) {
        return;
    }
    
    // Resetar todos os estados
    Object.keys(appState.tasks).forEach(taskId => {
        appState.tasks[taskId] = TASK_STATES.NOT_STARTED;
    });
    
    appState.waterCount = 0;
    appState.date = new Date().toISOString().split('T')[0];
    appState.achievementShown = {};
    
    saveState();
    updateDate();
    initializeButtons();
    updateWaterDisplay();
    updateProgress();
    
    if (!automatic) {
        showInAppNotification('🔄 Dia Resetado!', 'Tudo foi resetado!', 'info');
    }
}

// Funções de notificação e feedback (simplificadas)
function showInAppNotification(title, message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${title} - ${message}`);
    // Aqui você pode adicionar a lógica visual de notificação
}

function showAchievement(title, message) {
    console.log(`🏆 CONQUISTA: ${title} - ${message}`);
    alert(`🏆 ${title}\n\n${message}`);
}

function celebrateTask(button) {
    button.style.animation = 'pulse 0.6s ease-in-out';
    console.log('🎉 Celebrando tarefa!');
}

function createConfetti() {
    console.log('🎊 Criando confetti!');
    // Aqui você pode adicionar a lógica de confetti
}

function showCongratulations() {
    alert('🎉 PARABÉNS! VOCÊ COMPLETOU 100% DO SEU DIA! 🎉\n\nVocê é incrível! Continue assim! 💪');
}

function createWaterGlasses() {
    const container = document.getElementById('waterGlasses');
    if (!container) return;
    
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const glass = document.createElement('div');
        glass.className = 'water-glass';
        glass.id = `glass-${i}`;
        glass.title = `Copo ${i + 1} (250ml)`;
        container.appendChild(glass);
    }
}

function updateWaterDisplay() {
    // Atualizar o contador principal "X/12 copos"
    const waterCountElement = document.getElementById('waterCount');
    if (waterCountElement) {
        waterCountElement.textContent = appState.waterCount;
        console.log(`💧 Display atualizado: ${appState.waterCount}/12 copos`);
    }
    
    // Atualizar contador alternativo se existir
    const counterElement = document.getElementById('waterCounter');
    if (counterElement) {
        counterElement.textContent = appState.waterCount;
    }
    
    // Atualizar copos visuais
    for (let i = 0; i < 12; i++) {
        const glass = document.getElementById(`glass-${i}`);
        if (glass) {
            if (i < appState.waterCount) {
                glass.classList.add('filled');
                glass.style.animation = 'waterRipple 0.6s ease-out';
            } else {
                glass.classList.remove('filled');
                glass.style.animation = '';
            }
        }
    }
    
    // Log para debug
    console.log(`💧 Água atual: ${appState.waterCount}/12 copos`);
}

console.log('📋 Script carregado. Aguardando DOM...'); 