const pokemonNames = ['Pikachu', 'Charizard', 'Mewtwo', 'Giratina', 'Porygon-Z'];


const sprites = {
  'Pikachu': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  'Charizard': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  'Mewtwo': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
  'Giratina': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png',
  'Porygon-Z': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/474.png'
};


const descricoes = {
  'Pikachu': 'Extrovertido, leal e elétrico. Gosta de estar com amigos e animar o grupo.',
  'Charizard': 'Corajoso, intenso e competitivo. Enfrenta desafios de frente.',
  'Mewtwo': 'Racional, estratégico e direto. Valoriza conhecimento e lógica.',
  'Giratina': 'Misterioso, profundo e resiliente. Gosta do desconhecido.',
  'Porygon-Z': 'Criativo, imprevisível e curioso. Curte ideias diferentes.'
};

let formulario = document.getElementById("quizForm");
let resultDiv = document.getElementById("result");


const mapaPorPergunta = [
  { op1: [2,3,1,1,2], op2: [1,3,2,2,1], op3: [1,1,3,2,3] },
  { op1: [3,2,1,1,2], op2: [1,1,3,2,3], op3: [1,2,2,3,1] },
  { op1: [3,2,1,1,1], op2: [2,3,1,1,1], op3: [1,1,3,2,3] },
  { op1: [3,2,1,1,1], op2: [1,3,2,2,1], op3: [1,1,2,3,3] },
  { op1: [3,1,1,1,2], op2: [1,3,2,2,1], op3: [1,1,2,2,3] },
  { op1: [3,2,1,1,1], op2: [2,3,2,1,1], op3: [1,1,3,3,2] },
  { op1: [3,1,1,1,2], op2: [1,3,1,2,1], op3: [1,1,3,3,3] },
  { op1: [3,2,1,1,2], op2: [2,3,2,1,1], op3: [1,1,3,2,3] },
  { op1: [3,2,1,1,2], op2: [1,3,2,2,1], op3: [1,1,3,3,3] },
  { op1: [3,2,1,1,1], op2: [2,3,2,1,1], op3: [1,1,3,2,3] }
];


class Quiz {
  constructor(form, mapa) {
    this.form = form;
    this.mapa = mapa;
    this.pontuacao = [0,0,0,0,0]; 
  }

  
  pegarRespostas() {
    let respostas = [];
    for (let i = 1; i <= 10; i++) {
      let marcado = document.querySelector(`input[name="q${i}"]:checked`);
      if (!marcado) return null; 
      respostas.push(marcado.value);
      
    }
    
    return respostas;
  }

  
  calcularPontuacao(respostas) {
    this.pontuacao = [0,0,0,0,0];
    for (let i = 0; i < this.mapa.length; i++) {
      const chave = respostas[i]; 
      const pontos = this.mapa[i][chave]; 
      for (let j = 0; j < pontos.length; j++) {
        this.pontuacao[j] += pontos[j];
      }
      console.log(chave);
      console.log(this.mapa[i]);
    }
    return this.pontuacao;
    
  }

  
  obterVencedorIndex() {
    let maior = -Infinity;
    let idx = 0;
    for (let i = 0; i < this.pontuacao.length; i++) {
      if (this.pontuacao[i] > maior) {
        maior = this.pontuacao[i];
        idx = i;
      }
    }
    return idx;
  }
}


const quiz = new Quiz(formulario, mapaPorPergunta);
let resetBtn = null;

formulario.addEventListener("submit", function(e) {
  e.preventDefault();

  const respostas = quiz.pegarRespostas();
  if (!respostas) {
    alert("Responda todas as perguntas!");
    return;
  }

  const pontos = quiz.calcularPontuacao(respostas);
  console.log("Pontuações:", pontos);

  

  const vencedorIndex = quiz.obterVencedorIndex();
  const nome = pokemonNames[vencedorIndex];
  const total = pontos[vencedorIndex];

  
  resultDiv.innerHTML = `
    <h2>Você é: ${nome}</h2>
    <p>Pontuação: <strong>${total}</strong></p>
    <img src="${sprites[nome]}" alt="${nome}" style="image-rendering: pixelated;">
    <p style="max-width: 480px;">${descricoes[nome]}</p>
  `;

  
  if (!resetBtn) {
    resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.textContent = "Recomeçar";
    resetBtn.style.marginTop = "10px";
    resetBtn.addEventListener("click", function() {
      
      for (let i = 1; i <= 10; i++) {
        const marcado = document.querySelector(`input[name="q${i}"]:checked`);
        if (marcado) marcado.checked = false;
      }
      
      resultDiv.innerHTML = "";
      
      window.scrollTo(0, 0);
    });
    resultDiv.appendChild(resetBtn);
  }
});

