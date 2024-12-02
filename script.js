// script.js
let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');

function nextQuestion() {
    // Store the current question's answer
    currentQuestionIndex++;

    // If the last question is reached, calculate the result
    if (currentQuestionIndex >= questions.length) {
        calculateFootprint();
        return;
    }

    // Hide current question and show next
    questions[currentQuestionIndex - 1].classList.remove('active');
    questions[currentQuestionIndex].classList.add('active');
}

function calculateFootprint() {
    let totalFootprint = 0;

    // Energy Use
    const appliances = document.getElementById('appliances').value;
    totalFootprint += appliances ? parseInt(appliances) : 0;

    // Renewable Energy
    const renewable = document.querySelector('input[name="renewable"]:checked');
    if (renewable) {
        totalFootprint += renewable.value === "yes" ? -500 : 0; // Reduction if renewable
    }

    // Transportation
    const transport = document.getElementById('transport').value;
    totalFootprint += transport ? parseInt(transport) : 0;

    // Diet
    const diet = document.getElementById('diet').value;
    totalFootprint += diet ? parseInt(diet) : 0;

    // Consumption
    const shopping = document.getElementById('shopping').value;
    totalFootprint += shopping ? parseInt(shopping) : 0;

    const shoppingFrequency = document.getElementById('shoppingFrequency').value;
    totalFootprint += shoppingFrequency ? parseFloat(shoppingFrequency) * 100 : 0;

    // Water Usage
    const shower = document.getElementById('shower').value;
    totalFootprint += shower ? parseInt(shower) : 0;

    const waterTemp = document.querySelector('input[name="waterTemp"]:checked');
    if (waterTemp) {
        totalFootprint += waterTemp.value === "yes" ? 200 : 0;
    }

    // Call the assessFootprint function to get feedback
    const feedback = assessFootprint(totalFootprint);

    // Show the result and feedback
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your ecological footprint is approximately ${totalFootprint} kg CO₂ per year.<br><br>${feedback}`;
    resultDiv.style.display = "block"; // Show result when calculation is done

    }

    // Show the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your ecological footprint is approximately ${totalFootprint} kg CO₂ per year.`;
    resultDiv.style.display = "block"; // Show result when calculation is done
}
// Function to assess the ecological footprint and provide feedback
function assessFootprint(totalFootprint) {
    let assessment, feedback;

    // Provide feedback based on the footprint value
    if (totalFootprint > 5000) {
        assessment = "High";
        feedback = "Your ecological footprint is high, indicating a significant impact on the environment. Here are some suggestions to reduce it:<br>" +
            "- Consider reducing car travel or switching to a more sustainable mode of transportation.<br>" +
            "- Try to buy second-hand or thrift more often to lower clothing consumption.<br>" +
            "- Reduce the number of plugged-in appliances or switch to renewable energy if possible.<br>" +
            "- Shorten shower times and try using cold water occasionally to reduce water usage.";
    } else if (totalFootprint >= 2500 && totalFootprint <= 5000) {
        assessment = "Average";
        feedback = "Your ecological footprint is average, meaning you're doing some things well but could still improve. Consider making a few adjustments to lower your impact.";
    } else {
        assessment = "Low";
        feedback = "Great job! Your ecological footprint is low. Keep up the sustainable practices!";
    }

    return `${assessment} footprint.<br><br>${feedback}`;
}
