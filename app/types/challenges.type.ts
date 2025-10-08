// types/challenges.ts
export interface Challenge {
  id: string;
  title: string;
  description: string;
  questionText: string;
  answerOptions: string[];
  correctAnswer: number;
  completed: boolean;
  unlocked: boolean;
}

export interface StorySection {
  type: "text" | "image";
  content: string; // URL da imagem ou texto
  style?: {
    fontSize?: number;
    fontWeight?: "normal" | "bold";
    color?: string;
    textAlign?: "left" | "center" | "right";
    marginBottom?: number;
    marginTop?: number;
    width?: string;
    height?: number;
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    lineHeight?: number;
  };
}

export interface Story {
  id: string;
  title: string;
  preview: string; // Texto curto para exibição na lista
  unlocked: boolean;
  challengeId: string;
  order: number; // Para ordenação de 1 a 10
  sections: StorySection[]; // Conteúdo detalhado com textos e imagens
}

export const DEFAULT_CHALLENGES: Array<Challenge> = [
  {
    id: "1",
    title: "Venda indevida de bens do idoso - Sr. João",
    description:
      "Sr. João confiou ao neto a administração dos seus documentos e cartões, após uma cirurgia. Com o tempo, percebeu que parte dos seus bens havia sido vendida sem seu consentimento. A justificativa do neto? “Era melhor resolver logo isso antes que ele esquecesse”.",
    questionText:
      "Diante da situação vivida por Sr. João, qual é a análise mais adequada sobre os direitos da pessoa idosa?",
    answerOptions: [
      "Ser cuidador da pessoa idosa dá automaticamente o direito de gerenciar e vender seus bens.",
      "Vender bens de familiares idosos pode ser aceitável se for feito com boas intenções e pensando no futuro.",
      "Como Sr. João estava debilitado, o neto podia tomar decisões em seu nome, mesmo sem autorização formal.",
      "O neto agiu de forma ilegal, desrespeitando o direito à autonomia e ao patrimônio da pessoa idosa.",
    ],
    correctAnswer: 3,
    completed: false,
    unlocked: true,
  },
  {
    id: "2",
    title: "Agressão verbal e isolamento - Dona Lúcia",
    description:
      "Dona Lúcia mora com a filha e o genro, mas quase não sai do quarto. A família diz que é por segurança, mas vizinhos escutam gritos e ofensas vindas da casa. Quando perguntada, Dona Lúcia apenas sorri e responde: “Eles só estão estressados”.",
    questionText:
      "Ao analisar o caso de Dona Lúcia, o que pode estar acontecendo e qual deve ser a postura correta diante dessa situação?",
    answerOptions: [
      "Como é uma situação familiar, não cabe a ninguém interferir, já que cada família lida à sua maneira com o cuidado da pessoa idosa.",
      "É normal que pessoas idosas fiquem mais reclusas e sensíveis; o isolamento pode ser apenas uma escolha pessoal.",
      "Dona Lúcia pode estar sofrendo violência psicológica e isolamento social, formas de violência contra a pessoa idosa previstas em lei.",
      "Se Dona Lúcia não denuncia, é porque provavelmente não vê problema na forma como está sendo tratada",
    ],
    correctAnswer: 2,
    completed: false,
    unlocked: false,
  },
  {
    id: "3",
    title: "Abrigo negligente - Abrigo São José",
    description:
      "No Abrigo São José, o atendimento aos idosos é marcado por atrasos, má alimentação e ausência de cuidados médicos. Os funcionários justificam: “São muitos e todos já estão no fim da vida mesmo. Não dá pra fazer milagre.”",
    questionText:
      "Diante da realidade do Abrigo São José, como esse tipo de conduta deve ser interpretado à luz dos direitos da pessoa idosa?",
    answerOptions: [
      "O abrigo está praticando negligência institucional, violando os direitos básicos da pessoa idosa previstos no Estatuto do Idoso.",
      "Como o abrigo possui muitos residentes, é natural que alguns cuidados sejam menos rigorosos do que em casa.",
      "A sobrecarga de trabalho justifica parcialmente a precariedade no atendimento, desde que haja boas intenções.",
      "Em instituições com poucos recursos, é aceitável oferecer apenas o básico, mesmo que falte acompanhamento médico.",
    ],
    correctAnswer: 0,
    completed: false,
    unlocked: false,
  },
  {
    id: "4",
    title:
      "Família negligente/falta de atendimento médico domiciliar - Dona Tereza",
    description:
      "Após a morte do marido, Dona Tereza foi morar com os sobrinhos, esperando encontrar apoio e companhia para essa nova fase da vida. No início, havia alguma atenção, mas com o tempo ela passou a ser deixada sozinha por longos períodos, sem acompanhamento e sem afeto. Mesmo lúcida, escuta constantemente frases cruéis, como: “Não dá pra ficar o tempo todo cuidando de velho.” A situação é ainda mais grave porque Dona Tereza está acamada e precisa de cuidados constantes. Seu estado de saúde exige atendimento domiciliar de médicos e enfermeiros, mas isso não acontece. Ela passa os dias em abandono, sofrendo não apenas pela fragilidade física, mas também pela solidão e pelo descaso",
    questionText:
      "O que a situação vivida por Dona Tereza revela e como ela deve ser encarada do ponto de vista dos direitos da pessoa idosa?",
    answerOptions: [
      "Como os sobrinhos já acolheram Dona Tereza em casa, eles não têm obrigação de atenção constante ou afeto.",
      "O caso representa negligência e abandono familiar, configurando uma forma de violência contra a pessoa idosa prevista em lei.",
      "É comum que idosos viúvos fiquem mais solitários, o que pode justificar sua reclusão.",
      "O cuidado emocional não é uma responsabilidade da família, desde que as necessidades básicas estejam sendo atendidas.",
    ],
    correctAnswer: 1,
    completed: false,
    unlocked: false,
  },
  {
    id: "5",
    title: "Empréstimos indevidos - Sr. Antônio",
    description:
      "O Sr. Antônio é aposentado e sempre ajudou com as contas de casa. Um dia, descobriu que vários empréstimos haviam sido feitos em seu nome. Para sua tristeza, percebeu que quem havia realizado esses empréstimos era um de seus filhos, que só aparece de vez em quando e nunca para ajudá-lo de verdade. Quando tentou reclamar, ouviu uma justificativa fria: “Você não usa mesmo esse dinheiro”. Desde então, a vida do Sr. Antônio ficou muito difícil. Quase toda a sua aposentadoria vai para pagar dívidas que ele não contraiu. Com o pouco que sobra, precisa comprar seus remédios e, por isso, quase não consegue se alimentar bem. Muitas vezes sente fraqueza e passa fome, porque a prioridade é não deixar de tomar a medicação.",
    questionText:
      "O que podemos identificar na situação vivida por Sr. Antônio e qual deve ser a conduta correta nesse tipo de caso?",
    answerOptions: [
      "Caso a pessoa idosa não perceba de imediato, não há problema em usar o dinheiro para “adiantar” necessidades da casa",
      "Quando o idoso já tem quem cuide dele, é normal que os familiares também administrem sua aposentadoria.",
      "Se o idoso mora com a família, é natural que parte da sua renda seja usada para ajudar nas despesas, mesmo sem avisá-lo.",
      "Fazer empréstimos em nome da pessoa idosa sem consentimento é crime e configura abuso financeiro.",
    ],
    correctAnswer: 3,
    completed: false,
    unlocked: false,
  },
  {
    id: "6",
    title: "Idosa sobrecarregada e explorada - Dona Maria",
    description:
      "Dona Maria cuida dos netos, cozinha, limpa a casa e ainda faz pequenos bicos para completar a renda. Apesar da idade avançada e de dores constantes, escuta da filha: “Você só fica em casa, não tem com o que se preocupar”.",
    questionText:
      "Como podemos interpretar a situação de Dona Maria à luz dos direitos da pessoa idosa?",
    answerOptions: [
      "Dona Maria está sendo explorada pela família, com excesso de tarefas e ausência de reconhecimento, o que pode configurar violência.",
      "Por estar em casa, é natural que Dona Maria assuma todas as tarefas do lar, independentemente da idade.",
      "A ajuda de avós na criação dos netos é tradicional na cultura brasileira e não deve ser vista como exploração.",
      "Se ela faz pequenos bicos, é sinal de que está ativa e feliz com a rotina, o que invalida a ideia de abuso.",
    ],
    correctAnswer: 0,
    completed: false,
    unlocked: false,
  },
  {
    id: "7",
    title: "Discriminação no mercado de trabalho - Srta. Irene",
    description:
      "Srta. Irene é uma profissional com mais de 30 anos de experiência. Mesmo com excelente currículo, já ouviu em entrevistas: “Estamos buscando alguém mais moderno, com energia de jovem”. A vaga foi dada a uma pessoa com metade da idade e menos qualificação.",
    questionText:
      "O que esse episódio revela sobre o ambiente profissional e os direitos das pessoas com mais idade?",
    answerOptions: [
      "O mercado de trabalho valoriza juventude e inovação, por isso é natural preferir candidatos mais novos.",
      "A escolha por alguém mais jovem é estratégica, pois pessoas com mais idade tendem a ter mais dificuldades com tecnologia.",
      "Pessoas com muita experiência podem se tornar inflexíveis, então é razoável a empresa evitar esse tipo de contratação",
      "Trata-se de etarismo: discriminação ilegal baseada na idade, que viola o direito à igualdade e desvaloriza a experiência profissional.",
    ],
    correctAnswer: 3,
    completed: false,
    unlocked: false,
  },
  {
    id: "8",
    title: "Negação de autonomia - Sr. Sebastião",
    description:
      "Sr. Sebastião sempre foi independente, mas após uma queda leve, passou a ter todas as suas decisões questionadas. Quer sair sozinho? “Não pode mais”. Quer participar das finanças da casa? “Melhor deixar com os filhos”. Ele sente que perdeu o direito de escolher.",
    questionText:
      "O que a situação de Sr. Sebastião demonstra e como ela deve ser tratada em relação aos direitos da pessoa idosa?",
    answerOptions: [
      "Após uma queda, é prudente que a família assuma o controle de todas as decisões, mesmo que temporariamente.",
      "Negar a autonomia de uma pessoa idosa lúcida é uma forma de violência sutil, conhecida como infantilização ou tutela indevida",
      "Quando a pessoa idosa envelhece, é normal que seus familiares passem a decidir o que é melhor para ela.",
      "Se a família tem boas intenções, não há problema em limitar a liberdade da pessoa idosa para protegê-la.",
    ],
    correctAnswer: 1,
    completed: false,
    unlocked: false,
  },
  {
    id: "9",
    title: "Violência institucional em hospital/transporte - Dona Elza",
    description:
      "Dona Elza chegou ao hospital com dores fortes. A médica, sem sequer examiná-la, disse: “Isso é normal para sua idade. Vá pra casa e descanse.” Nenhum exame foi pedido. Ela voltou pra casa sem diagnóstico e com a dor cada vez mais forte. Para piorar, quando tentou voltar para casa, o ônibus que costumava pegar simplesmente não parou para ela. O motorista a ignorou, como se sua presença não tivesse importância. Sem outra opção, Dona Elza precisou enfrentar o caminho a pé, mesmo com dificuldade e dor. Cada passo foi um esforço, marcado não só pelo sofrimento físico, mas também pela sensação de abandono e desrespeito.",
    questionText:
      "Como essa situação deve ser compreendida à luz dos direitos da pessoa idosa no atendimento à saúde?",
    answerOptions: [
      "É compreensível que profissionais da saúde priorizem pacientes mais jovens, que têm mais chances de recuperação.",
      "A fala da médica foi apenas um mal-entendido e não configura nenhuma forma de violência.",
      "Dona Elza foi vítima de violência institucional, caracterizada pela negligência e pelo preconceito etário no atendimento médico.",
      "O corpo envelhecido sente mais dores mesmo, então nem sempre é necessário investigar com exames.",
    ],
    correctAnswer: 2,
    completed: false,
    unlocked: false,
  },
  {
    id: "10",
    title:
      "Relacionamentos e afetos entre pessoas idosas - Sr. Benedito e Dona Nair",
    description:
      "Benedito e Nair se reencontraram em um curso de dança e começaram a namorar. Os netos riram: “Namorar com essa idade? Que vergonha!” O casal se sentiu ridicularizado por querer viver algo bonito e verdadeiro, apenas por estarem em uma fase mais avançada da vida.",
    questionText:
      "Como essa situação deve ser compreendida do ponto de vista do respeito à afetividade das pessoas idosas?",
    answerOptions: [
      "Pessoas idosas têm o direito de viver relacionamentos afetivos e amorosos com dignidade e sem julgamentos.",
      "Demonstrar afeto nessa idade pode gerar desconforto na família, então é melhor manter a discrição.",
      "Embora pareça estranho no início, os netos têm razão em se preocupar com a imagem dos avós.",
      "É compreensível que a sociedade estranhe esse tipo de comportamento, mas o casal deve saber lidar com isso.",
    ],
    correctAnswer: 0,
    completed: false,
    unlocked: false,
  }, // Adicione mais 8 desafios...
];

export const DEFAULT_STORIES: Story[] = [
  {
    id: "1",
    title: "A Jornada Inicia",
    preview:
      "Esta é a primeira história que se desbloqueia ao completar o primeiro desafio...",
    unlocked: true,
    challengeId: "1",
    order: 1,
    sections: [
      {
        type: "text",
        content:
          "Na noite estrelada, a lua iluminava uma planície de nuvens com seu belo brilho prateado. Flutuando alto no céu, o mago Alonso brincava com as antigas nuvens, tão fofas como algodão, elas arremessavam o mago para cima como se fosse um trampolim. Em meio à brincadeira, o mago pensa avistar algo pequeno e voando até lá ele percebe que é uma semente de girassol. Ele já estava deveras feliz, mas um sorriso ainda maior cresce em seu rosto e então diz:",
        style: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#333",
        },
      },
      {
        type: "image",
        content: "https://example.com/images/story1_1.jpg",
        style: {
          width: "100%",
          height: 200,
          resizeMode: "cover",
          marginBottom: 15,
        },
      },
      {
        type: "text",
        content:
          "O desafio matemático que ele acabara de resolver era apenas o começo de uma jornada épica que mudaria seu destino para sempre.",
        style: {
          fontSize: 16,
          lineHeight: 24,
          color: "#555",
        },
      },
    ],
  },
  {
    id: "2",
    title: "O Primeiro Obstáculo",
    preview: "Com o primeiro desafio superado, uma nova história se revela...",
    unlocked: false,
    challengeId: "2",
    order: 2,
    sections: [
      {
        type: "text",
        content:
          "Após resolver o enigma lógico, o caminho adiante se revelou, mas não sem perigos.",
        style: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#333",
        },
      },
      {
        type: "image",
        content: "https://example.com/images/story2_1.jpg",
        style: {
          width: "100%",
          height: 200,
          resizeMode: "cover",
          marginBottom: 15,
        },
      },
      {
        type: "text",
        content:
          "O que parecia ser uma simples porta na verdade guardava segredos ancestrais que apenas os mais perspicazes poderiam decifrar.",
        style: {
          fontSize: 16,
          lineHeight: 24,
          color: "#555",
        },
      },
    ],
  },
  // Adicione mais 8 histórias com order de 3 a 10...
];
