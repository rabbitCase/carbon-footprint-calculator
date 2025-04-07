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


const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const electricityUsage = parseFloat(document.getElementById('elec').value);
    const fuelConsumption = parseFloat(document.getElementById('fuel').value);
    const wasteGeneration = parseFloat(document.getElementById('waste').value);
    const carMileage = parseFloat(document.getElementById('mile').value);
    const carbonFootprint = calculateCarbonFootprint(electricityUsage, fuelConsumption, wasteGeneration, carMileage);
    const result = document.getElementById('result');
    result.textContent = `Your estimated carbon footprint is: ${carbonFootprint.toFixed(2)} kg CO2`;
});