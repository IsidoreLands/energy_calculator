// matrix.js - Handles data entry inputs and populates matrix table
import { EQUATIONS } from './equations.js';

export function handleEquationSelection(equationKey) {
    const equation = EQUATIONS[equationKey];
    if (!equation) return;

    const matrixTable = document.getElementById('matrix-table').querySelector('tbody');

    equation.inputs.forEach(inputVar => {
        if (!varExists(inputVar)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${inputVar}</td>
                <td></td>
                <td>${UNIT_AUTOCOMPLETE[inputVar] || ''}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            matrixTable.appendChild(row);
            addRowListeners(row);
        }
    });
}

// Preload EM variables from memo appendix (as array for now; later from JSON)
// Uppercase for consistency
const EM_VARIABLES = [
    'a', 'C_{D_0}', 'C_L', 'C_{L_max}', 'ΔC_L', 'D', 'dE_s/dt', 'dh/dt', 'dt', 'dV/dt', 'dρ', 'dw_f', 'dγ/dt', 'δu(t)', 'δx(t)', 'δΩ', 'δψ', 'E', 'E_k', 'E_p', 'E_s', 'E-M', 'F(t)', 'f_c', 'G(t)', 'g', 'h', 'Δh', 'I_{ψψ}', 'I_{ψΩ}', 'I_{ΩΩ}', 'k', 'λ', 'm', 'M', 'n', 'n_L', 'N_r', 'Ω', 'P_s', 'P_s^*', 'ψ', 'q', 'q̄', 'r', 'R', 'S', 't', 'T', 'T_a', 'T̄_a', 'V', '\dot{V}', 'V̄', 'V_ts', 'W', 'W̄', 'W_f', 'ẇ_f', 'ẇ_f_avg', 'x', 'Δx', 'γ', 'γ̄', 'ρ', 'ω'
];

// Expanded mapping for longforms and case-insensitivity (keys lowercase)
const UNIT_AUTOCOMPLETE = {
    'a': 'ft/sec²',
    'C_{D_0}': 'dimensionless',
    'C_L': 'dimensionless',
    'C_{L_max}': 'dimensionless',
    'ΔC_L': 'dimensionless',
    'D': 'lb',
    'dE_s/dt': 'ft/sec',
    'dh/dt': 'ft/sec',
    'dt': 'sec',
    'dV/dt': 'ft/sec²',
    'dρ': 'dimensionless',
    'dw_f': 'lb',
    'dγ/dt': 'rad/sec',
    'δu(t)': 'varies',
    'δx(t)': 'varies',
    'δΩ': 'varies',
    'δψ': 'varies',
    'E': 'ft-lb',
    'E_k': 'ft-lb',
    'E_p': 'ft-lb',
    'E_s': 'ft',
    'E-M': 'ft',
    'F(t)': 'varies',
    'f_c': 'lb',
    'G(t)': 'varies',
    'g': 'ft/sec²',
    'h': 'ft',
    'Δh': 'ft',
    'I_{ψψ}': 'varies',
    'I_{ψΩ}': 'varies',
    'I_{ΩΩ}': 'varies',
    'k': 'dimensionless',
    'λ': 'varies',
    'm': 'slugs',
    'M': 'dimensionless',
    'n': 'g',
    'n_L': 'g',
    'N_r': 'dimensionless',
    'Ω': 'varies',
    'P_s': 'ft/sec',
    'P_s^*': 'ft/sec',
    'ψ': 'varies',
    'q': 'lb/ft²',
    'q̄': 'lb/ft²',
    'r': 'ft',
    'R': 'nautical miles',
    'S': 'ft²',
    't': 'sec',
    'T': 'lb',
    'T_a': 'lb',
    'T̄_a': 'lb',
    'V': 'ft/sec',
    '\dot{V}': 'ft/sec²',
    'V̄': 'ft/sec',
    'V_ts': 'knots',
    'W': 'lb',
    'W̄': 'lb',
    'W_f': 'lb',
    'ẇ_f': 'lb/sec',
    'ẇ_f_avg': 'lb/sec',
    'x': 'nautical miles',
    'Δx': 'nautical miles',
    'γ': 'deg',
    'γ̄': 'deg',
    'ρ': 'slugs/ft³',
    'ω': 'rad/sec'
};

const VAR_MAPPING = {
    'a': 'a',
    'acceleration': 'a',
    'c_d0': 'C_{D_0}',
    'zero-lift drag coefficient': 'C_{D_0}',
    'c_l': 'C_L',
    'lift coefficient': 'C_L',
    'c_l_max': 'C_{L_max}',
    'maximum lift coefficient': 'C_{L_max}',
    'δc_l': 'ΔC_L',
    'd': 'D',
    'drag': 'D',
    'de_s/dt': 'dE_s/dt',
    'energy rate': 'dE_s/dt',
    'dh/dt': 'dh/dt',
    'altitude rate': 'dh/dt',
    'dt': 'dt',
    'time increment': 'dt',
    'dv/dt': 'dV/dt',
    'velocity rate': 'dV/dt',
    'dρ': 'dρ',
    'perturbation size': 'dρ',
    'dw_f': 'dw_f',
    'differential fuel weight': 'dw_f',
    'dγ/dt': 'dγ/dt',
    'pitch angle rate': 'dγ/dt',
    'δu(t)': 'δu(t)',
    'perturbation in control variables': 'δu(t)',
    'δx(t)': 'δx(t)',
    'perturbation in state variables': 'δx(t)',
    'δω': 'δΩ',
    'change in stopping condition': 'δΩ',
    'δψ': 'δψ',
    'change in pay-off function': 'δψ',
    'e': 'E',
    'total energy': 'E',
    'e_k': 'E_k',
    'kinetic energy': 'E_k',
    'e_p': 'E_p',
    'potential energy': 'E_p',
    'e_s': 'E_s',
    'specific energy': 'E_s',
    'e-m': 'E-M',
    'energy-maneuverability efficiency': 'E-M',
    'f(t)': 'F(t)',
    'jacobian matrix of state derivatives': 'F(t)',
    'f_c': 'f_c',
    'fuel consumed': 'f_c',
    'g(t)': 'G(t)',
    'jacobian matrix of control influences': 'G(t)',
    'g': 'g',
    'gravitational acceleration': 'g',
    'h': 'h',
    'altitude': 'h',
    'δh': 'Δh',
    'altitude change': 'Δh',
    'i_{ψψ}': 'I_{ψψ}',
    'i_{ψω}': 'I_{ψΩ}',
    'i_{ωω}': 'I_{ΩΩ}',
    'k': 'k',
    'induced drag parameter': 'k',
    'λ': 'λ',
    'lagrange multipliers': 'λ',
    'm': 'm',
    'aircraft mass': 'm',
    'M': 'M',
    'mach number': 'M',
    'n': 'n',
    'normal acceleration': 'n',
    'n_l': 'n_L',
    'maximum load factor': 'n_L',
    'n_r': 'N_r',
    'radial g': 'N_r',
    'ω': 'Ω',
    'stopping condition': 'Ω',
    'p_s': 'P_s',
    'specific excess power': 'P_s',
    'p_s*': 'P_s^*',
    'average specific excess power': 'P_s^*',
    'ψ': 'ψ',
    'pay-off function': 'ψ',
    'q': 'q',
    'dynamic pressure': 'q',
    'q̄': 'q̄',
    'average dynamic pressure': 'q̄',
    'r': 'r',
    'turn radius': 'r',
    'R': 'R',
    'range': 'R',
    'S': 'S',
    'wing reference area': 'S',
    't': 't',
    'time': 't',
    'T': 'T',
    'thrust available': 'T',
    't_a': 'T_a',
    't̄_a': 'T̄_a',
    'average thrust available': 'T̄_a',
    'V': 'V',
    'true airspeed': 'V',
    '\dot{v}': '\dot{V}',
    'acceleration along path': '\dot{V}',
    'v̄': 'V̄',
    'average true airspeed': 'V̄',
    'v_ts': 'V_ts',
    'true airspeed for cruise': 'V_ts',
    'W': 'W',
    'aircraft weight': 'W',
    'w̄': 'W̄',
    'average aircraft weight': 'W̄',
    'w_f': 'W_f',
    'fuel weight available': 'W_f',
    'ẇ_f': 'ẇ_f',
    'fuel flow rate': 'ẇ_f',
    'ẇ_f_avg': 'ẇ_f_avg',
    'average fuel flow': 'ẇ_f_avg',
    'x': 'x',
    'horizontal distance traversed': 'x',
    'δx': 'Δx',
    'distance increment': 'Δx',
    'γ': 'γ',
    'pitch angle': 'γ',
    'γ̄': 'γ̄',
    'average pitch angle': 'γ̄',
    'ρ': 'ρ',
    'air density': 'ρ',
    'ω': 'ω',
    'turn rate': 'ω'
};

// Event listener setup on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const varNameInput = document.getElementById('var-name');
    const varAmountInput = document.getElementById('var-amount');
    const varUnitInput = document.getElementById('var-unit');
    const addButton = document.getElementById('add-var');
    const refreshButton = document.getElementById('refresh-matrix');
    const clearButton = document.getElementById('clear-matrix');
    const matrixTable = document.getElementById('matrix-table').querySelector('tbody');
    const aircraftSearch = document.getElementById('aircraft-search');

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            matrixTable.innerHTML = `
                <tr>
                    <td>g</td>
                    <td>32.174</td>
                    <td>ft/sec²</td>
                    <td></td>
                </tr>
            `;
        });
    }

    varNameInput.addEventListener('input', () => {
        const normalizedVar = normalizeVarName(varNameInput.value);
        if (UNIT_AUTOCOMPLETE[normalizedVar]) {
            varUnitInput.value = UNIT_AUTOCOMPLETE[normalizedVar];
        }
    });

    // Function to normalize variable name to uppercase standard
    function normalizeVarName(input) {
        const lower = input.toLowerCase().trim();
        return (VAR_MAPPING[lower] || lower.toUpperCase());
    }

    // Function to check if variable exists in matrix
    function varExists(name) {
        const rows = matrixTable.rows;
        for (let row of rows) {
            if (row.cells[0].textContent.toUpperCase() === name.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    // Add variable on button click
    addButton.addEventListener('click', () => {
        const rawName = varNameInput.value.trim();
        const name = normalizeVarName(rawName);
        let amount = varAmountInput.value.trim();
        let unit = varUnitInput.value.trim();

        if (EQUATIONS[name]) {
            alert('This variable is calculated automatically.');
            return;
        }

        if (name && amount && unit && EM_VARIABLES.includes(name) && !varExists(name)) {
            const targetUnit = UNIT_AUTOCOMPLETE[name];
            const convertedAmount = convertUnit(amount, unit, targetUnit);

            if (convertedAmount !== null) {
                amount = convertedAmount;
                unit = targetUnit;
            }

            const row = document.createElement('tr');
            row.dataset.originalAmount = varAmountInput.value.trim();
            row.dataset.originalUnit = varUnitInput.value.trim();

            const fromUnit = varUnitInput.value.trim();
            const toUnit = UNIT_AUTOCOMPLETE[name];
            const fromCategory = findCategory(fromUnit);
            const toCategory = findCategory(toUnit);
            const converted = fromCategory && toCategory && fromCategory === toCategory && fromUnit !== toUnit;

            row.innerHTML = `
                <td>${name}</td>
                <td>${amount}</td>
                <td class="${converted ? 'converted-unit' : ''}">${unit}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            matrixTable.appendChild(row);
            addRowListeners(row); // Add edit/delete listeners
            updateCalculations();
            // Clear inputs
            varNameInput.value = '';
            varAmountInput.value = '';
            varUnitInput.value = '';
            // Future: Trigger derivations/checks
        } else {
            alert('Invalid/missing fields or duplicate variable.');
        }
    });

    function updateCalculations() {
        const matrixData = getMatrixData();
        Object.keys(EQUATIONS).forEach(variable => {
            const equation = EQUATIONS[variable];
            const inputValues = equation.inputs.map(input => matrixData[input]);
            if (inputValues.every(val => val !== undefined)) {
                const result = equation.calculate(...inputValues);
                updateOrAddRow(variable, result, UNIT_AUTOCOMPLETE[variable]);
            }
        });
    }

    function getMatrixData() {
        const data = {};
        const rows = matrixTable.rows;
        for (let row of rows) {
            const name = row.cells[0].textContent;
            const value = parseFloat(row.cells[1].textContent);
            data[name] = value;
        }
        return data;
    }

    function updateOrAddRow(name, amount, unit) {
        const rows = matrixTable.rows;
        for (let row of rows) {
            if (row.cells[0].textContent === name) {
                row.cells[1].textContent = amount.toFixed(2);
                row.cells[2].textContent = unit;
                return;
            }
        }
        // If the row doesn't exist, add it
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${amount.toFixed(2)}</td>
            <td>${unit}</td>
            <td></td>
        `;
        matrixTable.appendChild(row);
    }

    // Refresh matrix
    refreshButton.addEventListener('click', () => {
        matrixTable.innerHTML = '';
    });

    // Aircraft search placeholder (future: load from aircraft.js)
    // Temporarily remove functionality; log only
    aircraftSearch.addEventListener('input', (e) => {
        console.log('Searching for aircraft: ' + e.target.value);
        // Future: Filter and auto-populate inputs/matrix
    });

    function addRowListeners(row) {
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                // For simplicity, we'll just log to the console.
                console.log('Editing row...');
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                row.remove();
                updateCalculations();
            });
        }
    }
});
