// Declare variables to store the user's responses
let applianceScore, renewableScore, transportScore, dietScore, shoppingScore, shoppingFreqScore, showerScore, waterTempScore;
let currentQuestionIndex = 0; // To track which question is being shown

// Function to show the next question
function nextQuestion() {
    // Calculate the score for the current question
    let currentQuestion = document.querySelectorAll('.question')[currentQuestionIndex];
    let selectedOption = currentQuestion.querySelector('select') || currentQuestion.querySelector('input[type="radio"]:checked');

    if (!selectedOption) {
        alert('Please select an option.');
        return; // Don't proceed if no selection is made
    }

    // Store the selected value based on the question type
    switch (currentQuestionIndex) {
        case 0: // Appliances
            applianceScore = parseInt(selectedOption.value);
            break;
        case 1: // Renewable Energy
            renewableScore = (selectedOption.value === 'yes') ? 500 : 0;
            break;
        case 2: // Transportation
            transportScore = parseInt(selectedOption.value);
            break;
        case 3: // Diet
            dietScore = parseInt(selectedOption.value);
            break;
        case 4: // Shopping
            shoppingScore = parseInt(selectedOption.value);
            break;
        case 5: // Shopping Frequency
            shoppingFreqScore = parseFloat(selectedOption.value);
            break;
        case 6: // Showering
            showerScore = parseInt(selectedOption.value);
            break;
        case 7: // Water Temperature
            waterTempScore = (selectedOption.value === 'yes') ? 200 : 0;
            break;
    }

    // Hide the current question and show the next one
    currentQuestion.classList.remove('active');
    currentQuestionIndex++;

    if (currentQuestionIndex < document.querySelectorAll('.question').length) {
        document.querySelectorAll('.question')[currentQuestionIndex].classList.add('active');
    } else {
        calculateFootprint(); // If there are no more questions, calculate the footprint
    }
}

// Function to calculate the ecological footprint based on user responses
function calculateFootprint() {
    // Sum up all the scores
    const totalScore = applianceScore + renewableScore + transportScore + dietScore + shoppingScore + (shoppingFreqScore * 100) + showerScore + waterTempScore;

    // Display the result
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';

    // Show a message based on the total score
    if (totalScore <= 5000) {
        resultElement.textContent = 'Your ecological footprint is low. Keep up the great work in being eco-conscious!';
    } else if (totalScore <= 15000) {
        resultElement.textContent = 'Your ecological footprint is moderate. Consider making small changes to reduce your impact.';
    } else {
        resultElement.textContent = 'Your ecological footprint is high. Consider adopting more sustainable practices.';
    }
}
