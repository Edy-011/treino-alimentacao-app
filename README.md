# 🏋️‍♂️ App de Controle de Alimentação e Treino

Um aplicativo web pessoal para controlar sua alimentação, hidratação e treinos diários com base no seu plano alimentar personalizado.

## 🌟 Funcionalidades

### 📊 Dashboard de Progresso
- Visualização em tempo real do progresso geral do dia
- Barras de progresso individuais para:
  - **Alimentação**: 7 refeições programadas
  - **Hidratação**: Meta de 2,5L - 3L por dia
  - **Treino**: 4 grupos de exercícios
- Cores dinâmicas baseadas no progresso

### 🍽️ Controle de Alimentação
- **7 refeições programadas** com horários específicos:
  - ☀️ Café da Manhã (8h)
  - 🍎 Lanche da Manhã (11h)
  - 🍽️ Almoço (13h)
  - 💪 Pré-Treino (15h30)
  - 🏃‍♂️ Pós-Treino (17h30)
  - 🌙 Jantar (20h)
  - 🌜 Ceia (22h)

- **Múltiplas opções** para cada refeição
- **Objetivos específicos** para cada horário
- **Receitas detalhadas** com quantidades exatas
- **Botões de conclusão** para marcar refeições

### 💧 Controle de Hidratação
- Meta diária: 2,5L a 3L (10-12 copos de 250ml)
- Contador visual de copos consumidos
- Dicas de hidratação estratégica:
  - 200ml ao acordar
  - 200ml antes de cada refeição
  - 400-600ml durante o treino
- Visualização gráfica em tempo real

### 🏋️ Controle de Treinos
- **4 grupos de treino**:
  - 💪 Abdômen
  - 🦸‍♂️ Peito
  - 💪 Braços
  - 🦵 Pernas

- **Links diretos** para vídeos do YouTube e tutoriais
- **Horário programado**: 16h00 - 17h30
- **Marcação de conclusão** para cada treino

## 🚀 Como Usar

### 1. Abrir o App
```bash
# Simplesmente abra o arquivo index.html no seu navegador
# O app funciona 100% offline
```

### 2. Marcar Tarefas Concluídas
- Clique nos botões **"Concluído"** conforme executa as atividades
- Os botões mudam de cor quando marcados
- O progresso é atualizado automaticamente

### 3. Controlar Hidratação
- Clique em **"+1 Copo"** cada vez que beber 250ml de água
- Acompanhe o progresso visualmente nos copos
- Use o botão **"Resetar Água"** se necessário

### 4. Assistir Vídeos de Treino
- Clique nos links dos vídeos para abrir no YouTube
- Marque **"Treino Concluído"** após terminar
- Siga os horários sugeridos

## 💾 Persistência de Dados

### Salvamento Automático
- **Auto-save** a cada 30 segundos
- **Salvamento** ao fechar o navegador
- **Dados persistem** entre sessões

### Reset Automático
- **Novo dia**: Reset automático à meia-noite
- **Reset manual**: Botão "Resetar Dia Completo"
- **Reset parcial**: Apenas água ou tarefas específicas

## 🏆 Sistema de Conquistas

### Notificações de Progresso
- **100% Alimentação**: Parabéns por seguir o plano!
- **100% Hidratação**: Meta de água atingida!
- **100% Treino**: Todos os exercícios completos!
- **100% Geral**: Celebração especial com confetti! 🎉

### Dicas Motivacionais
- Mensagens inspiradoras a cada 30 minutos
- Lembretes de hidratação
- Frases motivacionais personalizadas

## ⚙️ Personalização

### Modificar Refeições
Edite o arquivo `config.js` para alterar as receitas:

```javascript
cafeDaManha: {
    horario: "08h",
    objetivo: "Seu objetivo aqui",
    opcoes: [
        {
            descricao: "Opção 1",
            itens: [
                "Seu ingrediente 1",
                "Seu ingrediente 2"
            ]
        }
    ]
}
```

### Modificar Treinos
Adicione seus próprios vídeos:

```javascript
{
    nome: "Seu Treino",
    videos: [
        {
            titulo: "Nome do Vídeo",
            link: "https://youtube.com/seu-video"
        }
    ]
}
```

## 📱 Design Responsivo

### Características
- **Mobile-first**: Funciona perfeitamente no celular
- **Tablet-friendly**: Interface adaptada para tablets
- **Desktop**: Experiência completa no computador
- **Animações suaves**: Transições elegantes
- **Cores dinâmicas**: Visual atrativo e moderno

### Compatibilidade
- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Android Chrome
- ✅ Tablets e iPads
- ✅ Funciona offline

## 🎯 Metas Diárias

### Objetivos
- **Alimentação**: 7/7 refeições (100%)
- **Hidratação**: 10-12 copos (2,5L-3L)
- **Treino**: 4/4 grupos completos
- **Meta Geral**: 100% em todas as categorias

### Cálculo de Progresso
- **Alimentação**: Número de refeições ÷ 7
- **Hidratação**: Copos consumidos ÷ 10 (máximo 100%)
- **Treino**: Treinos completos ÷ 4
- **Geral**: Média das três categorias

## 🛠️ Estrutura do Projeto

```
📁 Treino-alimentacao/
├── 📄 index.html      # Interface principal
├── 📄 style.css       # Estilos e design
├── 📄 script.js       # Funcionalidade JavaScript
├── 📄 config.js       # Configurações personalizadas
└── 📄 README.md       # Esta documentação
```

## 💡 Dicas de Uso

### Para Máxima Eficiência
1. **Marque as tarefas** assim que concluir
2. **Beba água** nos horários sugeridos
3. **Siga os horários** das refeições
4. **Assista os vídeos** antes de treinar
5. **Celebrate** suas conquistas! 🎉

### Troubleshooting
- **Dados perdidos**: Verifique se JavaScript está habilitado
- **Não salva**: Limpe o cache do navegador
- **Layout quebrado**: Atualize a página
- **Vídeos não abrem**: Verifique sua conexão

## 📈 Benefícios

### Físicos
- ✅ Alimentação balanceada
- ✅ Hidratação adequada
- ✅ Exercícios regulares
- ✅ Rotina estruturada

### Mentais
- ✅ Disciplina diária
- ✅ Senso de conquista
- ✅ Organização pessoal
- ✅ Motivação constante

---

**Desenvolvido para uso pessoal - Transforme sua rotina em resultados! 💪**

*Versão 1.0 - Criado com muito carinho para sua jornada de saúde e fitness* ❤️ 