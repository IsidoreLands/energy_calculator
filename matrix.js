// matrix.js - Handles data entry inputs and populates matrix table

// Preload EM variables from memo appendix (as array for now; later from JSON)
const EM_VARIABLES = [
    'r', 'V', 'g', 'N_r', 'ω', 'q', 'ρ', 'E', 'W', 'h', 'm', 'E_s',
    'P_s', 'T', 'D', 'Ṅ', 'γ', 'ḣ', 'E-ME', 'P_s*', 'ẇ_f', 'w_f',
    'R', 'V_ts', 'ẇ_c', 'W_f', 'x', 'C_D', 'C_{D0}', 'k', 'C_L', 'S',
    'C_{L_max}', 'n_L'
];

// Event listener setup on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const varNameInput = document.getElementById('var-name');
    const varAmountInput = document.getElementById('var-amount');
    const varUnitInput = document.getElementById('var-unit');
    const addButton = document.getElementById('add-var');
    const matrixTable = document.getElementById('matrix-table').querySelector('tbody');
    const aircraftSearch = document.getElementById('aircraft-search');

    // Add variable on button click
    addButton.addEventListener('click', () => {
        const name = varNameInput.value.trim();
        const amount = varAmountInput.value.trim();
        const unit = varUnitInput.value.trim();
        if (name && amount && unit && EM_VARIABLES.includes(name)) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${name}</td><td>${amount}</td><td>${unit}</td>`;
            matrixTable.appendChild(row);
            // Clear inputs
            varNameInput.value = '';
            varAmountInput.value = '';
            varUnitInput.value = '';
            // Future: Trigger derivations/checks
        } else {
            alert('Invalid variable name or missing fields.');
        }
    });

    // Aircraft search placeholder (future: load from aircraft.js)
    aircraftSearch.addEventListener('input', (e) => {
        console.log('Searching for aircraft: ' + e.target.value);
        // Future: Filter and auto-populate inputs/matrix
    });
});
