document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
});


let currentQuestion = 0;
let score = 0;
let hasAnswered = false;
let percent;


const questions = [
    {
        question: "Quel est le langue la plus utilisé dans le monde ?",
        answers: ["Anglais", "Espagnol", "Français"],
        correct: 0
    },
    {
        question: "Que signifie DOM ?",
        answers: ["Document Object Model", "Data Object Model", "Design Object Model"],
        correct: 1
    },
    {
      question: "Quel manga est le plus vendu",
      answers: ["One Piece", "Naruto", "SNK"],
      correct: 0
  },
];



function showQuestion() {
  hasAnswered = false;
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.question;

  const container = document.getElementById("answers-container");
  container.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("answer-btn");

    btn.addEventListener("click", () => {
      if (hasAnswered) return;
      hasAnswered = true;

      if (index === q.correct) {
        btn.style.backgroundColor = "green";
        score++;
      } else {
        btn.style.backgroundColor = "red";
      }

      Array.from(container.children).forEach((child, i) => {
        if (i === q.correct) child.style.backgroundColor = "green";
        child.disabled = true;
      });
    });

    container.appendChild(btn);
  });

  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  if (currentQuestion < questions.length - 1) {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  } else {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  }

  updateProgressBar();
}
  document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length){
      showQuestion();
    }else{
      showResult();
    }
});

function showResult(){
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("score-text").textContent = 
  `Vous avez obtenu ${score} / ${questions.length} bonnes réponses.`;
  document.getElementById("progress-bar").style.width= `${percent}%`;
}

function updateProgressBar(){
  const percent = ((currentQuestion) / questions.length) * 100;
  document.getElementById("progress-bar").style.width= `${percent}%`;
}

document.getElementById("submit-btn").addEventListener("click", () => {
  showResult();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
});
