// equations.js - Handles equations grid, derivability checks, and focus


// Define EM equations with LaTeX and required vars
export const EM_EQUATIONS = [
    {
        name: 'Turn Radius (r)',
        latex: 'r = \\frac{V^2}{g N_r}',
        requiredVars: ['V', 'g', 'N_r'],
        page: 'Page02',
        display: true
    },
    {
        name: 'Turn Rate (ω)',
        latex: '\\omega = \\frac{g N_r}{V}',
        requiredVars: ['g', 'N_r', 'V'],
        page: 'Page02',
        display: true
    },
    {
        name: 'Total Energy (E)',
        latex: 'E = W h + \\frac{1}{2} m V^2',
        requiredVars: ['W', 'h', 'm', 'V'],
        page: 'Page04, Appendix II Page40',
        display: true
    },
    {
        name: 'Total Energy (in terms of weight)',
        latex: 'E = W (h + \\frac{V^2}{2g})',
        requiredVars: ['W', 'h', 'V', 'g'],
        page: 'Page04, Appendix II Page40',
        display: true
    },
    {
        name: 'Specific Energy (E_s)',
        latex: 'E_s = h + \\frac{V^2}{2g}',
        requiredVars: ['h', 'V', 'g'],
        page: 'Page04, Appendix II Page40',
        display: true
    },
    {
        name: 'Energy Rate (dE_s/dt)',
        latex: '\\frac{dE_s}{dt} = P_s',
        requiredVars: ['P_s'],
        page: 'Page04',
        display: false
    },
    {
        name: 'Specific Excess Power (P_s)',
        latex: 'P_s = \\frac{(T - D)V}{W}',
        requiredVars: ['T', 'D', 'V', 'W'],
        page: 'Page04, Appendix II Page41',
        display: true
    },
    {
        name: 'Force Balance',
        latex: '\\frac{W}{g} \\dot{V} = T_a - D - W \\sin{\\gamma}',
        requiredVars: ['W', 'g', '\\dot{V}', 'T_a', 'D', 'γ'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Rearranged Force Balance',
        latex: 'T_a - D = W \\sin{\\gamma} + \\frac{W}{g} \\dot{V}',
        requiredVars: ['T_a', 'D', 'W', 'γ', 'g', '\\dot{V}'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Normalized Force Balance',
        latex: '\\frac{T_a - D}{W} = \\sin{\\gamma} + \\frac{\\dot{V}}{g}',
        requiredVars: ['T_a', 'D', 'W', 'γ', '\\dot{V}', 'g'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Multiplied by V',
        latex: '\\frac{(T_a - D)V}{W} = V \\sin{\\gamma} + \\frac{V \\dot{V}}{g}',
        requiredVars: ['T_a', 'D', 'W', 'V', 'γ', '\\dot{V}', 'g'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Since dh/dt = V sin(γ)',
        latex: '\\frac{dh}{dt} + \\frac{V \\dot{V}}{g} = \\frac{(T_a - D)V}{W}',
        requiredVars: ['h', 't', 'V', '\\dot{V}', 'g', 'T_a', 'D', 'W'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Rutkowski Condition (Min Time)',
        latex: '(\\frac{\\partial P_s}{\\partial V})_{E_s=k} = 0',
        requiredVars: ['P_s', 'V', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Alt. Rutkowski Condition (Min Time)',
        latex: '(\\frac{\\partial P_s}{\\partial h})_{E_s=k} = 0',
        requiredVars: ['P_s', 'h', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Integral for Energy Change',
        latex: '\\Delta E_s = \\int \\frac{dE_s}{dt} dt',
        requiredVars: ['dE_s/dt', 't'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Energy per Fuel Weight',
        latex: '\\frac{dE_s}{dw_f} = -\\frac{P_s}{\\dot{w}_f}',
        requiredVars: ['dE_s', 'dw_f', 'P_s', 'ẇ_f'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Integral for Minimum Fuel',
        latex: '\\Delta E_s = -\\int \\frac{P_s}{\\dot{w}_f} dw_f',
        requiredVars: ['P_s', 'ẇ_f', 'dw_f'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Rutkowski Condition (Min Fuel)',
        latex: '(\\frac{\\partial (P_s / \\dot{w}_f)}{\\partial V})_{E_s=k} = 0',
        requiredVars: ['P_s', 'ẇ_f', 'V', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Alt. Rutkowski Condition (Min Fuel)',
        latex: '(\\frac{\\partial (P_s / \\dot{w}_f)}{\\partial h})_{E_s=k} = 0',
        requiredVars: ['P_s', 'ẇ_f', 'h', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Energy-Maneuverability Efficiency',
        latex: 'E-M = \\frac{P_s^* W_f}{\\dot{w}_f}',
        requiredVars: ['P_s^*', 'W_f', 'ẇ_f'],
        page: 'Page11, Appendix II Page44',
        display: false
    },
    {
        name: 'Range Equation',
        latex: 'R = \\frac{V_{ts} W_f}{\\dot{w}_{f_{avg}}} + x',
        requiredVars: ['V_ts', 'W_f', 'ẇ_f_avg', 'x'],
        page: 'Page13, Appendix II Page45',
        display: false
    },
    {
        name: 'Maximum Load Factor',
        latex: 'n_L = \\frac{q S C_{L_{max}}}{W}',
        requiredVars: ['q', 'S', 'C_{L_max}', 'W'],
        page: 'Appendix II Page40',
        display: true
    },
    {
        name: 'Dynamic Pressure',
        latex: 'q = \\frac{1}{2} \\rho V^2',
        requiredVars: ['ρ', 'V'],
        page: 'Appendix II Page40',
        display: true
    },
    {
        name: 'Linear Differential Equation (Perturbations)',
        latex: '\\frac{d(\\delta x)}{dt} = F(t) \\delta x + G(t) \\delta u',
        requiredVars: ['δx', 't', 'F(t)', 'G(t)', 'δu'],
        page: 'Appendix II Page52',
        display: false
    },
    {
        name: 'Adjoint Differential Equations',
        latex: '\\frac{d\\lambda}{dt} = -F\'(t) \\lambda(t)',
        requiredVars: ['λ', 't', 'F(t)'],
        page: 'Appendix II Page54',
        display: false
    },
    {
        name: 'Integral Constraint (Perturbations)',
        latex: '(d\\rho)^2 = \\int \\delta u\'(t) W(t) \\delta u(t) dt',
        requiredVars: ['dρ', 'δu(t)', 'W(t)', 't'],
        page: 'Appendix II Page55',
        display: false
    },
    {
        name: 'Perturbation in Control Variables',
        latex: '\\delta u(t) = \\frac{W^{-1} G\' \\lambda_{\\psi\\Omega}}{d\\rho} \\pm [W^{-1} G\' \\lambda_{\\psi\\Omega} - \\frac{I_{\\psi\\Omega}}{I_{\\Omega\\Omega}} W^{-1} G\' \\lambda_{\\psi\\Omega}] * \\frac{\\sqrt{I_{\\psi\\psi} \\delta\\psi - I_{\\psi\\Omega} \\delta\\Omega}}{\\sqrt{I_{\\psi\\psi} I_{\\Omega\\Omega} - (I_{\\psi\\Omega})^2}}',
        requiredVars: ['W', 'G', 'λ_{ψΩ}', 'dρ', 'I_{ψΩ}', 'I_{ΩΩ}', 'I_{ψψ}', 'δψ', 'δΩ'],
        page: 'Appendix II Page55',
        display: false
    },
    {
        name: 'Normal Acceleration',
        latex: 'n = \\frac{\\dot{V}}{g} + \\cos{\\gamma}',
        requiredVars: ['\\dot{V}', 'g', 'γ'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Approximate Pitch Angle',
        latex: '\\sin{\\bar{\\gamma}} = \\frac{h_i - h_{i-1}}{\\bar{V} \\Delta t}',
        requiredVars: ['h_i', 'h_{i-1}', 'V̄', 'Δt'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Estimate for sin(γ_i)',
        latex: '\\sin{\\gamma_i} = \\frac{2 \\Delta h}{\\bar{V} \\Delta t}',
        requiredVars: ['Δh', 'V̄', 'Δt'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Angular Rate',
        latex: '\\dot{\\gamma} = \\frac{\\gamma_i - \\gamma_{i-1}}{\\Delta t}',
        requiredVars: ['γ_i', 'γ_{i-1}', 'Δt'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Coefficient of Lift',
        latex: '\\bar{C}_L = \\Delta C_L + \\frac{\\sqrt{\\frac{\\bar{T}_a - \\bar{W} (\\sin{\\bar{\\gamma}} + \\dot{V}/g)}{\\bar{q} S} - (C_{D_0} + k (\\Delta C_L)^2)}}{\\sqrt{k}}',
        requiredVars: ['ΔC_L', 'T̄_a', 'W̄', 'γ̄', '\\dot{V}', 'g', 'q̄', 'S', 'C_{D_0}', 'k'],
        page: 'Appendix II Page71',
        display: false
    }
];

// Event listener setup on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('equation-grid');
    const focus = document.getElementById('focus-equation');

    // Render equations grid
    EM_EQUATIONS.forEach((eq, index) => {
        if (eq.display) {
            const div = document.createElement('div');
            div.classList.add('equation-box');
            div.innerHTML = `<h3>${eq.name}</h3><p>\\[ ${eq.latex} \\]</p>`;
            div.onclick = () => focusEquation(index);
            grid.appendChild(div);
        }
    });
    MathJax.typesetPromise();

    // Function to check derivability (from matrix data)
    function checkDerivability() {
        const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
        const enteredVars = new Set();
        matrixRows.forEach(row => {
            enteredVars.add(row.cells[0].textContent);
        });

        document.querySelectorAll('.equation-box').forEach((box, index) => {
            const required = EM_EQUATIONS[index].requiredVars;
            const hasAll = required.every(v => enteredVars.has(v));
            box.style.border = hasAll ? '2px solid #00FF41' : '1px solid #00AA00'; // HUD green if derivable
        });
    }

    // Function to focus equation
    function focusEquation(index) {
        const eq = EM_EQUATIONS[index];
        focus.innerHTML = `<h3>${eq.name} (Focused)</h3><p>\\[ ${eq.latex} \\]</p>`;
        MathJax.typesetPromise(); // Re-render LaTeX

        const required = eq.requiredVars;
        const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
        const enteredVars = new Set();
        const varValues = {};
        matrixRows.forEach(row => {
            const varName = row.cells[0].textContent;
            enteredVars.add(varName);
            varValues[varName] = row.cells[1].textContent;
        });

        const hasAll = required.every(v => enteredVars.has(v));

        if (hasAll) {
            const startRect = focus.getBoundingClientRect();
            const endRect = document.getElementById('matrix-table').getBoundingClientRect();
            let calculationString = eq.latex;
            let calculationResult = eq.latex;
            for (const key in varValues) {
                if (Object.hasOwnProperty.call(varValues, key)) {
                    const value = varValues[key];
                    const regExp = new RegExp(key, "g");
                    calculationString = calculationString.replace(regExp, value);
                    calculationResult = calculationResult.replace(regExp, value);
                }
            }

            // Helper function to strip LaTeX commands
            function stripLatex(latex) {
                // Replace \frac{a}{b} with (a)/(b)
                let stripped = latex.replace(/\\frac{(.*?)}{(.*?)}/g, '($1)/($2)');
                // Replace \sqrt{a} with sqrt(a)
                stripped = stripped.replace(/\\sqrt{(.*?)}/g, 'sqrt($1)');
                // Replace trig functions
                stripped = stripped.replace(/\\(sin|cos|tan|arcsin|arccos|arctan)\\left\((.*?)\\right\)/g, '$1($2)');
                // Remove all other LaTeX commands
                stripped = stripped.replace(/\\[a-zA-Z]+/g, '');
                // Remove braces
                stripped = stripped.replace(/[{}]/g, '');
                return stripped;
            }

            // Perform calculation
            let result;
            try {
                result = math.evaluate(stripLatex(calculationResult));
                // Clear any previous error highlighting
                const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
                matrixRows.forEach(row => {
                    row.classList.remove('error-variable');
                });
            } catch (error) {
                result = "Error";
                // Highlight error-causing variables
                const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
                matrixRows.forEach(row => {
                    const varName = row.cells[0].textContent;
                    if (required.includes(varName)) {
                        row.classList.add('error-variable');
                    }
                });
            }

            createParticleAnimation(endRect.left + endRect.width/2, endRect.top + endRect.height/2, startRect.left + startRect.width/2, startRect.top + startRect.height/2, "");
            focus.innerHTML = `<h3>${eq.name} (Focused)</h3><p>\\[ ${calculationString} = ${result} \\]</p>`;
            MathJax.typesetPromise(); // Re-render LaTeX
        } else {
            const missingVars = required.filter(v => !enteredVars.has(v));
            const matrixTable = document.getElementById('matrix-table').querySelector('tbody');
            missingVars.forEach(v => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${v}</td>
                    <td></td>
                    <td>${UNIT_AUTOCOMPLETE[v] || ''}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;
                matrixTable.appendChild(row);
                addRowListeners(row);
            });
        }
    }

    // Observe matrix changes (using MutationObserver for dynamic updates)
    const observer = new MutationObserver(checkDerivability);
    observer.observe(document.querySelector('#matrix-table tbody'), { childList: true });

    // Initial check
    setTimeout(checkDerivability, 0);
});

// Future: Add pointer labels (SVG arrows from var names to equation terms)

// Define EM equations with LaTeX and required vars
const EM_EQUATIONS = [
    {
        name: 'Turn Radius (r)',
        latex: 'r = \\frac{V^2}{g N_r}',
        requiredVars: ['V', 'g', 'N_r'],
        page: 'Page02',
        display: true
    },
    {
        name: 'Turn Rate (ω)',
        latex: '\\omega = \\frac{g N_r}{V}',
        requiredVars: ['g', 'N_r', 'V'],
        page: 'Page02',
        display: true
    },
    {
        name: 'Total Energy (E)',
        latex: 'E = W h + \\frac{1}{2} m V^2',
        requiredVars: ['W', 'h', 'm', 'V'],
        page: 'Page04, Appendix II Page40',
        display: true
    },
    {
        name: 'Total Energy (in terms of weight)',
        latex: 'E = W (h + \\frac{V^2}{2g})',
        requiredVars: ['W', 'h', 'V', 'g'],
        page: 'Page04, Appendix II Page40',
        display: true
    },
    {
        name: 'Specific Energy (E_s)',
        latex: 'E_s = h + \\frac{V^2}{2g}',
        requiredVars: ['h', 'V', 'g'],
        page: 'Page04, Appendix II Page40',
        display: true
    },
    {
        name: 'Energy Rate (dE_s/dt)',
        latex: '\\frac{dE_s}{dt} = P_s',
        requiredVars: ['P_s'],
        page: 'Page04',
        display: false
    },
    {
        name: 'Specific Excess Power (P_s)',
        latex: 'P_s = \\frac{(T - D)V}{W}',
        requiredVars: ['T', 'D', 'V', 'W'],
        page: 'Page04, Appendix II Page41',
        display: true
    },
    {
        name: 'Force Balance',
        latex: '\\frac{W}{g} \\dot{V} = T_a - D - W \\sin{\\gamma}',
        requiredVars: ['W', 'g', '\\dot{V}', 'T_a', 'D', 'γ'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Rearranged Force Balance',
        latex: 'T_a - D = W \\sin{\\gamma} + \\frac{W}{g} \\dot{V}',
        requiredVars: ['T_a', 'D', 'W', 'γ', 'g', '\\dot{V}'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Normalized Force Balance',
        latex: '\\frac{T_a - D}{W} = \\sin{\\gamma} + \\frac{\\dot{V}}{g}',
        requiredVars: ['T_a', 'D', 'W', 'γ', '\\dot{V}', 'g'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Multiplied by V',
        latex: '\\frac{(T_a - D)V}{W} = V \\sin{\\gamma} + \\frac{V \\dot{V}}{g}',
        requiredVars: ['T_a', 'D', 'W', 'V', 'γ', '\\dot{V}', 'g'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Since dh/dt = V sin(γ)',
        latex: '\\frac{dh}{dt} + \\frac{V \\dot{V}}{g} = \\frac{(T_a - D)V}{W}',
        requiredVars: ['h', 't', 'V', '\\dot{V}', 'g', 'T_a', 'D', 'W'],
        page: 'Appendix II Page41',
        display: false
    },
    {
        name: 'Rutkowski Condition (Min Time)',
        latex: '(\\frac{\\partial P_s}{\\partial V})_{E_s=k} = 0',
        requiredVars: ['P_s', 'V', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Alt. Rutkowski Condition (Min Time)',
        latex: '(\\frac{\\partial P_s}{\\partial h})_{E_s=k} = 0',
        requiredVars: ['P_s', 'h', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Integral for Energy Change',
        latex: '\\Delta E_s = \\int \\frac{dE_s}{dt} dt',
        requiredVars: ['dE_s/dt', 't'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Energy per Fuel Weight',
        latex: '\\frac{dE_s}{dw_f} = -\\frac{P_s}{\\dot{w}_f}',
        requiredVars: ['dE_s', 'dw_f', 'P_s', 'ẇ_f'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Integral for Minimum Fuel',
        latex: '\\Delta E_s = -\\int \\frac{P_s}{\\dot{w}_f} dw_f',
        requiredVars: ['P_s', 'ẇ_f', 'dw_f'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Rutkowski Condition (Min Fuel)',
        latex: '(\\frac{\\partial (P_s / \\dot{w}_f)}{\\partial V})_{E_s=k} = 0',
        requiredVars: ['P_s', 'ẇ_f', 'V', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Alt. Rutkowski Condition (Min Fuel)',
        latex: '(\\frac{\\partial (P_s / \\dot{w}_f)}{\\partial h})_{E_s=k} = 0',
        requiredVars: ['P_s', 'ẇ_f', 'h', 'E_s'],
        page: 'Appendix II Page43',
        display: false
    },
    {
        name: 'Energy-Maneuverability Efficiency',
        latex: 'E-M = \\frac{P_s^* W_f}{\\dot{w}_f}',
        requiredVars: ['P_s^*', 'W_f', 'ẇ_f'],
        page: 'Page11, Appendix II Page44',
        display: false
    },
    {
        name: 'Range Equation',
        latex: 'R = \\frac{V_{ts} W_f}{\\dot{w}_{f_{avg}}} + x',
        requiredVars: ['V_ts', 'W_f', 'ẇ_f_avg', 'x'],
        page: 'Page13, Appendix II Page45',
        display: false
    },
    {
        name: 'Maximum Load Factor',
        latex: 'n_L = \\frac{q S C_{L_{max}}}{W}',
        requiredVars: ['q', 'S', 'C_{L_max}', 'W'],
        page: 'Appendix II Page40',
        display: true
    },
    {
        name: 'Dynamic Pressure',
        latex: 'q = \\frac{1}{2} \\rho V^2',
        requiredVars: ['ρ', 'V'],
        page: 'Appendix II Page40',
        display: true
    },
    {
        name: 'Linear Differential Equation (Perturbations)',
        latex: '\\frac{d(\\delta x)}{dt} = F(t) \\delta x + G(t) \\delta u',
        requiredVars: ['δx', 't', 'F(t)', 'G(t)', 'δu'],
        page: 'Appendix II Page52',
        display: false
    },
    {
        name: 'Adjoint Differential Equations',
        latex: '\\frac{d\\lambda}{dt} = -F\'(t) \\lambda(t)',
        requiredVars: ['λ', 't', 'F(t)'],
        page: 'Appendix II Page54',
        display: false
    },
    {
        name: 'Integral Constraint (Perturbations)',
        latex: '(d\\rho)^2 = \\int \\delta u\'(t) W(t) \\delta u(t) dt',
        requiredVars: ['dρ', 'δu(t)', 'W(t)', 't'],
        page: 'Appendix II Page55',
        display: false
    },
    {
        name: 'Perturbation in Control Variables',
        latex: '\\delta u(t) = \\frac{W^{-1} G\' \\lambda_{\\psi\\Omega}}{d\\rho} \\pm [W^{-1} G\' \\lambda_{\\psi\\Omega} - \\frac{I_{\\psi\\Omega}}{I_{\\Omega\\Omega}} W^{-1} G\' \\lambda_{\\psi\\Omega}] * \\frac{\\sqrt{I_{\\psi\\psi} \\delta\\psi - I_{\\psi\\Omega} \\delta\\Omega}}{\\sqrt{I_{\\psi\\psi} I_{\\Omega\\Omega} - (I_{\\psi\\Omega})^2}}',
        requiredVars: ['W', 'G', 'λ_{ψΩ}', 'dρ', 'I_{ψΩ}', 'I_{ΩΩ}', 'I_{ψψ}', 'δψ', 'δΩ'],
        page: 'Appendix II Page55',
        display: false
    },
    {
        name: 'Normal Acceleration',
        latex: 'n = \\frac{\\dot{V}}{g} + \\cos{\\gamma}',
        requiredVars: ['\\dot{V}', 'g', 'γ'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Approximate Pitch Angle',
        latex: '\\sin{\\bar{\\gamma}} = \\frac{h_i - h_{i-1}}{\\bar{V} \\Delta t}',
        requiredVars: ['h_i', 'h_{i-1}', 'V̄', 'Δt'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Estimate for sin(γ_i)',
        latex: '\\sin{\\gamma_i} = \\frac{2 \\Delta h}{\\bar{V} \\Delta t}',
        requiredVars: ['Δh', 'V̄', 'Δt'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Angular Rate',
        latex: '\\dot{\\gamma} = \\frac{\\gamma_i - \\gamma_{i-1}}{\\Delta t}',
        requiredVars: ['γ_i', 'γ_{i-1}', 'Δt'],
        page: 'Appendix II Page72',
        display: false
    },
    {
        name: 'Coefficient of Lift',
        latex: '\\bar{C}_L = \\Delta C_L + \\frac{\\sqrt{\\frac{\\bar{T}_a - \\bar{W} (\\sin{\\bar{\\gamma}} + \\dot{V}/g)}{\\bar{q} S} - (C_{D_0} + k (\\Delta C_L)^2)}}{\\sqrt{k}}',
        requiredVars: ['ΔC_L', 'T̄_a', 'W̄', 'γ̄', '\\dot{V}', 'g', 'q̄', 'S', 'C_{D_0}', 'k'],
        page: 'Appendix II Page71',
        display: false
    }
];

// Event listener setup on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('equation-grid');
    const focus = document.getElementById('focus-equation');

    // Render equations grid
    EM_EQUATIONS.forEach((eq, index) => {
        if (eq.display) {
            const div = document.createElement('div');
            div.classList.add('equation-box');
            div.innerHTML = `<h3>${eq.name}</h3><p>\\[ ${eq.latex} \\]</p>`;
            div.onclick = () => focusEquation(index);
            grid.appendChild(div);
        }
    });
    MathJax.typesetPromise();

    // Function to check derivability (from matrix data)
    function checkDerivability() {
        const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
        const enteredVars = new Set();
        matrixRows.forEach(row => {
            enteredVars.add(row.cells[0].textContent);
        });

        document.querySelectorAll('.equation-box').forEach((box, index) => {
            const required = EM_EQUATIONS[index].requiredVars;
            const hasAll = required.every(v => enteredVars.has(v));
            box.style.border = hasAll ? '2px solid #00FF41' : '1px solid #00AA00'; // HUD green if derivable
        });
    }

    // Function to focus equation
    function focusEquation(index) {
        const eq = EM_EQUATIONS[index];
        focus.innerHTML = `<h3>${eq.name} (Focused)</h3><p>\\[ ${eq.latex} \\]</p>`;
        MathJax.typesetPromise(); // Re-render LaTeX

        const required = eq.requiredVars;
        const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
        const enteredVars = new Set();
        const varValues = {};
        matrixRows.forEach(row => {
            const varName = row.cells[0].textContent;
            enteredVars.add(varName);
            varValues[varName] = row.cells[1].textContent;
        });

        const hasAll = required.every(v => enteredVars.has(v));

        if (hasAll) {
            const startRect = focus.getBoundingClientRect();
            const endRect = document.getElementById('matrix-table').getBoundingClientRect();
            let calculationString = eq.latex;
            let calculationResult = eq.latex;
            for (const key in varValues) {
                if (Object.hasOwnProperty.call(varValues, key)) {
                    const value = varValues[key];
                    const regExp = new RegExp(key, "g");
                    calculationString = calculationString.replace(regExp, value);
                    calculationResult = calculationResult.replace(regExp, value);
                }
            }

            // Helper function to strip LaTeX commands
            function stripLatex(latex) {
                // Replace \frac{a}{b} with (a)/(b)
                let stripped = latex.replace(/\\frac{(.*?)}{(.*?)}/g, '($1)/($2)');
                // Replace \sqrt{a} with sqrt(a)
                stripped = stripped.replace(/\\sqrt{(.*?)}/g, 'sqrt($1)');
                // Replace trig functions
                stripped = stripped.replace(/\\(sin|cos|tan|arcsin|arccos|arctan)\\left\((.*?)\\right\)/g, '$1($2)');
                // Remove all other LaTeX commands
                stripped = stripped.replace(/\\[a-zA-Z]+/g, '');
                // Remove braces
                stripped = stripped.replace(/[{}]/g, '');
                return stripped;
            }

            // Perform calculation
            let result;
            try {
                result = math.evaluate(stripLatex(calculationResult));
                // Clear any previous error highlighting
                const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
                matrixRows.forEach(row => {
                    row.classList.remove('error-variable');
                });
            } catch (error) {
                result = "Error";
                // Highlight error-causing variables
                const matrixRows = document.querySelectorAll('#matrix-table tbody tr');
                matrixRows.forEach(row => {
                    const varName = row.cells[0].textContent;
                    if (required.includes(varName)) {
                        row.classList.add('error-variable');
                    }
                });
            }

            createParticleAnimation(endRect.left + endRect.width/2, endRect.top + endRect.height/2, startRect.left + startRect.width/2, startRect.top + startRect.height/2, "");
            focus.innerHTML = `<h3>${eq.name} (Focused)</h3><p>\\[ ${calculationString} = ${result} \\]</p>`;
            MathJax.typesetPromise(); // Re-render LaTeX
        } else {
            const missingVars = required.filter(v => !enteredVars.has(v));
            const matrixTable = document.getElementById('matrix-table').querySelector('tbody');
            missingVars.forEach(v => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${v}</td>
                    <td></td>
                    <td>${UNIT_AUTOCOMPLETE[v] || ''}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;
                matrixTable.appendChild(row);
                addRowListeners(row);
            });
        }
    }

    // Observe matrix changes (using MutationObserver for dynamic updates)
    const observer = new MutationObserver(checkDerivability);
    observer.observe(document.querySelector('#matrix-table tbody'), { childList: true });

    // Initial check
    setTimeout(checkDerivability, 0);
});

// Future: Add pointer labels (SVG arrows from var names to equation terms)
