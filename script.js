const quizData = [
    {
      question: 'Cual es la capital de Francia? &#x1F914;',
      options: ['Paris', 'Londres', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: 'Que equipo gano el mundial de 2018? &#x26BD',
      options: ['Brasil', 'Alemania', 'Francia', 'Argentina'],
      answer: 'Francia',
    },
    {
      question: 'Cual es la montaña mas alta del mundo? &#x1F5FB',
      options: ['Monte Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      answer: 'Monte Everest',
    },
    {
      question: 'Cual es el oceano mas largo del mundo? &#x1F6A3',
      options: ['Oceano Pacifico','Océano Índico','Oceano Atlantico','Océano Ártico'],
      answer: 'Oceano Pacifico',
    },
    {
      question: 'Quien pinto la Mona Lisa? &#x1F58B',
      options: ['Pablo Picasso','Vincent van Gogh','Leonardo da Vinci','Michelangelo'],
      answer: 'Leonardo da Vinci',
    },
    {
      question: 'En que año salio campeon por primera vez los leones del Caracas? &#x26BE',
      options: ['1954', '1960', '1984', '1948'],
      answer: '1948',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Usted acerto ${score} de ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Pregunta:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Su Respuesta:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Respuesta Correcta:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Usted acerto ${score} de ${quizData.length}!</p>
      <p>Respuestas Incorrectas:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();

  let tiempoterminado;
  let intervalodeTiempo;

  function comenzarCuentaRegresiva(){
    tiempoterminado = setTimeout(tiempoCumplido, 20000);
    intervalodeTiempo = setInterval(ticTac, 1000);

    document.getElementById("cuentaRegresiva").textContent = 20;
  }

  function ticTac(){
    let tiempo = document.getElementById("cuentaRegresiva").textContent;

    document.getElementById("cuentaRegresiva").textContent = tiempo - 1;
  }

  function tiempoCumplido(){
    clearInterval(intervalodeTiempo);
    document.getElementById("cuentaRegresiva").textContent = 0;
    document.getElementById("audioFinal").play();
    alert("se acabo el tiempo");
    elementoTextoAlarma.style.color = "green";
  }

  function finalizado(){
    clearTimeout(tiempoterminado);
    clearInterval(intervalodeTiempo);
  }
  