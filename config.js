// config.js

const planoAlimentarETreino = {
    planoAlimentar: {
      cafeDaManha: {
        horario: "08h",
        objetivo: "Fornecer energia e proteína para iniciar o dia.",
        opcoes: [
          {
            descricao: "Opção 1",
            itens: [
              "3 ovos inteiros (150g)",
              "1 fatia de pão integral (30g)",
              "1 banana prata média (100g)",
              "1 colher de sopa de pasta de amendoim (15g)",
              "1 xícara (200 ml) de café preto sem açúcar"
            ]
          },
          {
            descricao: "Opção 2",
            itens: [
              "50g de aveia",
              "200 ml de leite desnatado",
              "1 banana amassada (100g)",
              "1 colher de chá de canela",
              "1 colher de sopa de mel (15g)"
            ]
          }
        ]
      },
  
      lancheManha: {
        horario: "11h",
        objetivo: "Evitar catabolismo e manter o metabolismo ativo.",
        opcoes: [
          {
            descricao: "Opção 1",
            itens: [
              "170g de iogurte natural integral",
              "1 colher de sopa de mel (15g)",
              "1 colher de sopa de chia ou linhaça (10g)"
            ]
          },
          {
            descricao: "Opção 2",
            itens: [
              "1 maçã média (130g)",
              "10 castanhas de caju ou 6 nozes (20g)"
            ]
          }
        ]
      },
  
      almoco: {
        horario: "13h",
        objetivo: "Refeição principal com equilíbrio entre carboidrato, proteína e gordura boa.",
        base: [
          "120g de arroz integral ou 200g de batata-doce cozida",
          "120g de frango grelhado ou carne vermelha magra",
          "1 colher de sopa de azeite extravirgem (10g)"
        ],
        legumesRefogados: ["Cenoura", "Abobrinha", "Vagem", "Chuchu", "Brócolis", "Couve-flor"],
        saladaCrua: ["Alface", "Rúcula", "Tomate", "Pepino", "Cenoura ralada", "Beterraba crua ralada"],
        temperoSugerido: [
          "1 colher de sopa de azeite de oliva (10g)",
          "Suco de 1/2 limão ou 1 colher de sopa de vinagre de maçã",
          "Pitada de sal, alho picado, orégano, pimenta-do-reino, salsinha, cúrcuma"
        ]
      },
  
      preTreino: {
        horario: "15h30",
        objetivo: "Garantir energia e disponibilidade de aminoácidos para o treino.",
        opcoes: [
          {
            descricao: "Opção 1 (rápido)",
            itens: [
              "1 banana média (100g)",
              "1 colher de sopa de aveia (15g)",
              "1 dose de whey protein (30g) + 200 ml de água"
            ]
          },
          {
            descricao: "Opção 2 (natural)",
            itens: [
              "3 claras + 1 gema (120g total) cozidas",
              "1 fatia de pão integral (30g)",
              "1 colher de pasta de amendoim (15g)"
            ]
          }
        ]
      },
  
      posTreino: {
        horario: "17h30",
        objetivo: "Reposição rápida de proteína e carboidrato.",
        opcoes: [
          {
            descricao: "Opção 1 (shake)",
            itens: [
              "1 banana média (100g)",
              "1 dose de whey protein (30g)",
              "300 ml de leite desnatado ou água",
              "1 colher de sopa de aveia (15g)"
            ]
          },
          {
            descricao: "Opção 2 (comida)",
            itens: [
              "2 ovos inteiros + 2 claras (150g)",
              "2 fatias de pão integral OU 120g de batata-doce",
              "1 copo de suco natural sem açúcar (200 ml)"
            ]
          }
        ]
      },
  
      jantar: {
        horario: "20h",
        objetivo: "Repor nutrientes sem pesar o sistema digestivo à noite.",
        opcoes: [
          {
            descricao: "Opção 1",
            itens: [
              "100g de arroz integral",
              "100g de frango ou peixe grelhado",
              "1 porção de legumes refogados (100g)",
              "Salada crua variada à vontade",
              "1 colher de sopa de azeite (10g)"
            ]
          },
          {
            descricao: "Opção 2 (mais leve)",
            itens: [
              "1 omelete com 2 ovos + espinafre ou brócolis refogados",
              "1 fatia de pão integral",
              "1 chá sem açúcar (hortelã, camomila, etc.)"
            ]
          }
        ]
      },
  
      ceia: {
        horario: "22h",
        objetivo: "Manter o metabolismo ativo e evitar catabolismo noturno.",
        opcoes: [
          {
            descricao: "Opção 1",
            itens: [
              "100g de iogurte grego natural sem açúcar",
              "1 colher de sopa de pasta de amendoim (15g)"
            ]
          },
          {
            descricao: "Opção 2",
            itens: [
              "2 ovos cozidos",
              "1 colher de sopa de azeite de oliva ou 1 punhado de castanhas (15g)"
            ]
          }
        ]
      },
  
      hidratacao: {
        objetivo: "Meta: 2,5 a 3 litros/dia",
        dicas: ["200 ml ao acordar", "200 ml antes de cada refeição", "400-600 ml durante o treino"]
      }
    },
  
    planoTreino: {
      horarioTreino: { inicio: "16h00", fim: "17h30" },
      grupos: [
        {
          nome: "Abdômen",
          videos: [
            { titulo: "Treino em pé para perder barriga (15 min)", link: "https://www.youtube.com/watch?v=Qh7SzMwJB_Q" },
            { titulo: "10 melhores exercícios para definir o abdômen", link: "https://www.tuasaude.com/6-exercicios-para-definir-o-abdomen-em-casa" }
          ]
        },
        {
          nome: "Peito",
          videos: [
            { titulo: "Treino de peito em casa com peso do corpo", link: "https://www.tuasaude.com/treino-de-peito-em-casa" },
            { titulo: "Peito para iniciantes (vídeo explicativo)", link: "https://treinomestre.com.br/treino-de-peito-para-iniciantes-6-exercicios-com-video" }
          ]
        },
        {
          nome: "Braços",
          videos: [
            { titulo: "Treino rápido de braços em casa (15 min)", link: "https://www.youtube.com/watch?v=4YV4B88Oq_A" },
            { titulo: "Guia com os 15 melhores exercícios para braços", link: "https://livel.com.br/treino-de-braco-em-casa" }
          ]
        },
        {
          nome: "Pernas",
          videos: [
            { titulo: "Treino intenso de pernas sem equipamentos", link: "https://www.youtube.com/watch?v=EF40JZApMYw" },
            { titulo: "Treino de pernas para iniciantes com foco em força", link: "https://www.youtube.com/watch?v=1iPqD12mlLs" }
          ]
        }
      ]
    }
  };
  
  export default planoAlimentarETreino;
  