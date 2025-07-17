// matrix.js - Handles data entry inputs and populates matrix table

// Preload EM variables from memo appendix (as array for now; later from JSON)
const EM_VARIABLES = [
    'r', 'V', 'g', 'N_r', 'ω', 'q', 'ρ', 'E', 'W', 'h', 'm', 'E_s',
    'P_s', 'T', 'D', 'Ṅ', 'γ', 'ḣ', 'E-ME', 'P_s*', 'ẇ_f', 'w_f',
    'R', 'V_ts', 'ẇ_c', 'W_f', 'x', 'C_D', 'C_{D0}', 'k', 'C_L', 'S',
    'C_{L_max}', 'n_L'
];

// Mapping for longforms and case-insensitivity (extend as needed)
const VAR_MAPPING = {
    'v': 'V',
    'velocity': 'V',
    'p_s': 'P_s',
    'specific excess power': 'P_s',
    // Add more mappings for other vars, e.g., 'thrust': 'T'
};

// Event listener setup on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const varNameInput = document.getElementById('var-name');
    const varAmountInput = document.getElementById('var-amount');
    const varUnitInput = document.getElementById('var-unit');
    const addButton = document.getElementById('add-var');
    const refreshButton = document.getElementById('refresh-matrix');
    const matrixTable = document.getElementById('matrix-table').querySelector('tbody');
    const aircraftSearch = document.getElementById('aircraft-search');

    // Function to normalize variable name
    function normalizeVarName(input) {
        const lower = input.toLowerCase().trim();
        return VAR_MAPPING[lower] || lower.toUpperCase(); // Default to uppercase if no map
    }

    // Function to check if variable exists in matrix
    function varExists(name) {
        const rows = matrixTable.rows;
        for (let row of rows) {
            if (row.cells[0].textContent === name) {
                return true;
            }
        }
        return false;
    }

    // Add variable on button click
    addButton.addEventListener('click', () => {
        const rawName = varNameInput.value.trim();
        const name = normalizeVarName(rawName);
        const amount = varAmountInput.value.trim();
        const unit = varUnitInput.value.trim();
        if (name && amount && unit && EM_VARIABLES.includes(name.toUpperCase()) && !varExists(name)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${amount}</td>
                <td>${unit}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            matrixTable.appendChild(row);
            addRowListeners(row); // Add edit/delete listeners
            // Clear inputs
            varNameInput.value = '';
            varAmountInput.value = '';
            varUnitInput.value = '';
            // Future: Trigger derivations/checks
        } else {
            alert('Invalid/missing fields or duplicate variable.');
        }
    });

    // Refresh matrix
    refreshButton.addEventListener('click', () => {
        matrixTable.innerHTML = '';
    });

    // Function to add edit/delete listeners to a row
    function addRowListeners(row) {
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', () => {
            const cells = row.cells;
            varNameInput.value = cells[0].textContent;
            varAmountInput.value = cells[1].textContent;
            varUnitInput.value = cells[2].textContent;
            row.remove(); // Remove old row; re-add after edit
        });
        
        deleteBtn.addEventListener('click', () => {
            row.remove();
        });
    }

    // Aircraft search placeholder (future: load from aircraft.js)
    aircraftSearch.addEventListener('input', (e) => {
        console.log('Searching for aircraft: ' + e.target.value);
        // Future: Filter and auto-populate inputs/matrix
    });
});
