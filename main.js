function calculateCarbonFootprint(electricity, fuel, waste, carMileage) {
    const electricityFactor = 0.7; 
    const fuelFactor = 2.3;      
    const wasteFactor = 0.2;      
    const carMileageFactor = 0.12; 

    const electricityEmissions = electricity * electricityFactor;
    const fuelEmissions = fuel * fuelFactor;
    const wasteEmissions = waste * wasteFactor;
    const carMileageEmissions = carMileage * carMileageFactor;

    const totalEmissions = electricityEmissions + fuelEmissions + wasteEmissions + carMileageEmissions;

    return totalEmissions;
}

// Handle form submission
const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const electricityUsage = parseFloat(document.getElementById('elec').value) || 0;
    const fuelConsumption = parseFloat(document.getElementById('fuel').value) || 0;
    const wasteGeneration = parseFloat(document.getElementById('waste').value) || 0;
    const carMileage = parseFloat(document.getElementById('mile').value) || 0;
    
    const carbonFootprint = calculateCarbonFootprint(electricityUsage, fuelConsumption, wasteGeneration, carMileage);
    const result = document.getElementById('result');
    result.textContent = `Your estimated carbon footprint is: ${carbonFootprint.toFixed(2)} kg CO2`;

    updateGoalProgress(carbonFootprint);
});

// Set Goal feature
const setGoalButton = document.getElementById('setGoal');
setGoalButton.addEventListener('click', function() {
    const goalInput = parseFloat(document.getElementById('goalInput').value) || 0;
    if (goalInput > 0) {
        localStorage.setItem('carbonGoal', goalInput);
        document.getElementById('goalDisplay').textContent = `Your goal: ${goalInput} kg CO2`;
        updateGoalProgress(calculateCurrentFootprint());
    } else {
        alert('Please enter a valid goal greater than 0.');
    }
});

// Function to update goal progress
function updateGoalProgress(carbonFootprint) {
    const goal = parseFloat(localStorage.getItem('carbonGoal'));
    const goalDisplay = document.getElementById('goalDisplay');
    const progressDisplay = document.getElementById('progressDisplay');
    
    if (goal) {
        goalDisplay.textContent = `Your goal: ${goal} kg CO2`;
        const progress = ((carbonFootprint / goal) * 100).toFixed(2);
        progressDisplay.textContent = `Progress: ${progress}% of your goal (${carbonFootprint.toFixed(2)} / ${goal} kg CO2)`;
    }
}

// Helper function to get current footprint from form inputs
function calculateCurrentFootprint() {
    const electricityUsage = parseFloat(document.getElementById('elec').value) || 0;
    const fuelConsumption = parseFloat(document.getElementById('fuel').value) || 0;
    const wasteGeneration = parseFloat(document.getElementById('waste').value) || 0;
    const carMileage = parseFloat(document.getElementById('mile').value) || 0;
    return calculateCarbonFootprint(electricityUsage, fuelConsumption, wasteGeneration, carMileage);
}

// What If? feature with real-time calculation and percentage display
const whatIfSliders = document.querySelectorAll('.what-if-slider');
whatIfSliders.forEach(slider => {
    slider.addEventListener('input', updateWhatIf);
});

function updateWhatIf() {
    const electricityReduction = parseFloat(document.getElementById('electricitySlider').value) / 100;
    const fuelReduction = parseFloat(document.getElementById('fuelSlider').value) / 100;
    const wasteReduction = parseFloat(document.getElementById('wasteSlider').value) / 100;
    const mileageReduction = parseFloat(document.getElementById('mileSlider').value) / 100;

    // Update percentage displays
    document.getElementById('electricityValue').textContent = `${(electricityReduction * 100).toFixed(0)}%`;
    document.getElementById('fuelValue').textContent = `${(fuelReduction * 100).toFixed(0)}%`;
    document.getElementById('wasteValue').textContent = `${(wasteReduction * 100).toFixed(0)}%`;
    document.getElementById('mileValue').textContent = `${(mileageReduction * 100).toFixed(0)}%`;

    const electricityUsage = (parseFloat(document.getElementById('elec').value) || 0) * (1 - electricityReduction);
    const fuelConsumption = (parseFloat(document.getElementById('fuel').value) || 0) * (1 - fuelReduction);
    const wasteGeneration = (parseFloat(document.getElementById('waste').value) || 0) * (1 - wasteReduction);
    const carMileage = (parseFloat(document.getElementById('mile').value) || 0) * (1 - mileageReduction);

    const whatIfFootprint = calculateCarbonFootprint(electricityUsage, fuelConsumption, wasteGeneration, carMileage);
    const whatIfResult = document.getElementById('whatIfResult');
    const originalFootprint = calculateCurrentFootprint();
    whatIfResult.textContent = `What If? New footprint: ${whatIfFootprint.toFixed(2)} kg CO2 (Savings: ${(originalFootprint - whatIfFootprint).toFixed(2)} kg CO2)`;
}

// Load saved goal on page load
window.addEventListener('load', function() {
    const savedGoal = localStorage.getItem('carbonGoal');
    if (savedGoal) {
        document.getElementById('goalDisplay').textContent = `Your goal: ${savedGoal} kg CO2`;
    }
});
