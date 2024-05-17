let questions = [
    {
        question: "What would you like to know?",
        options: {
            a: "About",
            b: "Beginner resources",
        },
        correctAnswer: "a",
        correctResponse: "This is an ongoing project I have started for my Web Design class. It serves as a showcase of my implication in projects and competitions, as well as my creative works.",
        incorrectResponse: "I am sorry, you need to wait a little more for this feature :("
    }
];

let currentQuestionIndex = 0;
let chatContainer = document.getElementById("chat-container");
let chatForm = document.getElementById("chat-form");
let userInput = document.getElementById("user-input");

displayQuestion();

function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let optionsHTML = Object.keys(currentQuestion.options).map(key => `${key}. ${currentQuestion.options[key]}`).join(' ');
    
    // Create a message element
    let botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message"); // Add bot-message class
    botResponse.innerHTML = `<strong>Bot:</strong> ${currentQuestion.question} <br> ${optionsHTML}`;
    chatContainer.appendChild(botResponse);
}


function scrollChatContainerToBottom() {
    let chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let userResponse = userInput.value.toLowerCase();
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<strong>You:</strong> ${userResponse}`;
    chatContainer.appendChild(userMessage);

    let currentQuestion = questions[currentQuestionIndex];
    let botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message");
    botResponse.innerHTML = `<strong>Bot:</strong> `;
    if (userResponse === currentQuestion.correctAnswer) {
        botResponse.innerHTML += currentQuestion.correctResponse;
    } else {
        botResponse.innerHTML += currentQuestion.incorrectResponse;
    }
    chatContainer.appendChild(botResponse);
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length; 
    displayQuestion();
    scrollChatContainerToBottom();
});