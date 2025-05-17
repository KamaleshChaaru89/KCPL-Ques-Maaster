const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: "Pacific",
    },
    {
      question: "What is the value of 2+2 ?",
      options: ["1", "2", "3", "4"],
      answer: "4",
    },

  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let globalTimer; // Timer variable for the entire quiz
  let totalTime = 60; // Total time for the entire quiz in seconds
  
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const resultContainer = document.getElementById("result-container");
  const scoreElement = document.createElement("p");
  const timerElement = document.createElement("p");
  questionElement.style.fontSize = "2rem";
  
  // Add score and timer elements to the DOM
  scoreElement.id = "score";
  timerElement.id = "timer";
  scoreElement.style.position = "absolute";
  scoreElement.style.top = "8%";
  scoreElement.style.left = "23%";
  scoreElement.style.color = "black";
  timerElement.style.position = "absolute";
  timerElement.style.top = "8%";
  timerElement.style.right = "23%";
  timerElement.style.color = "green";

  document.body.appendChild(scoreElement);
  document.body.appendChild(timerElement);
  
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  restartBtn.addEventListener("click", restartQuiz);
  
  function startQuiz() {
    startBtn.classList.add("hide");
    questionContainer.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    startGlobalTimer(); // Start the global timer for the entire quiz
    updateScoreDisplay(); // Initialize score display
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      showResult();
    }
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectAnswer(option, question.answer));
      optionsContainer.appendChild(button);
    });
  }
  
  function resetState() {
    nextBtn.classList.add("hide");
    optionsContainer.innerHTML = "";
  }
  
  function selectAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
      score++;
    }
  
    Array.from(optionsContainer.children).forEach((button) => {
      button.disabled = true;
      if (button.innerText === correctAnswer) {
        button.style.backgroundColor = "green";
      } else {
        button.style.backgroundColor = "red";
      }
    });
  
    updateScoreDisplay(); // Update score after the question is answered
    nextBtn.classList.remove("hide");
  }
  
  function showResult() {
    questionContainer.classList.add("hide");
    resultContainer.classList.remove("hide");
    restartBtn.classList.remove("hide");
    resultContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
    stopGlobalTimer(); // Stop the global timer when quiz ends
  }
  
  function restartQuiz() {
    resultContainer.classList.add("hide");
    restartBtn.classList.add("hide");
    startBtn.classList.remove("hide");
    stopGlobalTimer(); // Reset the timer if restarting
  }
  
  // Global Timer Functions
  function startGlobalTimer() {
    totalTime = 60; // Reset total time for the quiz
    updateGlobalTimerDisplay();
    globalTimer = setInterval(() => {
      totalTime--;
      updateGlobalTimerDisplay();
      if (totalTime <= 0) {
        stopGlobalTimer();
        showResult(); // End the quiz when time runs out
      }
    }, 1000);
  }
  
  function stopGlobalTimer() {
    clearInterval(globalTimer);
  }
  
  function updateGlobalTimerDisplay() {
    timerElement.innerText = `Time Left: ${totalTime} seconds`;
  }
  
  function updateScoreDisplay() {
    scoreElement.innerText = `Score: ${score}`;
  }