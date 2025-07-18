// equations.js - Handles equations grid, derivability checks, and focus

// Define EM equations with LaTeX and required vars
const EM_EQUATIONS = [
    {
        name: 'Specific Excess Power (P_s)',
        latex: 'P_s = \\frac{(T - D)V}{W}',
        requiredVars: ['T', 'D', 'V', 'W'],
        derivedVars: {
            'T': 'D + \\frac{P_s W}{V}',
            'D': 'T - \\frac{P_s W}{V}',
            'W': '\\frac{(T - D)V}{P_s}',
            'V': '\\frac{P_s W}{T - D}'
        }
    },
    {
        name: 'Energy-Maneuverability Efficiency (E-ME)',
        latex: 'E-ME = \\frac{P_s^* w_f}{\\dot{w}_f}',
        requiredVars: ['P_s*', 'w_f', 'ẇ_f'],
        derivedVars: {
            'P_s*': '\\frac{E-ME \\dot{w}_f}{w_f}',
            'w_f': '\\frac{E-ME \\dot{w}_f}{P_s^*}',
            'ẇ_f': '\\frac{P_s^* w_f}{E-ME}'
        }
    },
    {
        name: 'Range (R)',
        latex: 'R = \\frac{V_{ts} W_f}{\\dot{w}_c} + x',
        requiredVars: ['V_ts', 'W_f', 'ẇ_c', 'x'],
        derivedVars: {
            'V_ts': '\\frac{(R - x) \\dot{w}_c}{W_f}',
            'W_f': '\\frac{(R - x) \\dot{w}_c}{V_{ts}}',
            'ẇ_c': '\\frac{V_{ts} W_f}{R - x}',
            'x': 'R - \\frac{V_{ts} W_f}{\\dot{w}_c}'
        }
    },
    {
        name: 'Dynamic Pressure (q)',
        latex: 'q = \\frac{1}{2} \\rho V^2',
        requiredVars: ['ρ', 'V'],
        derivedVars: {
            'ρ': '\\frac{2q}{V^2}',
            'V': '\\sqrt{\\frac{2q}{\\rho}}'
        }
    },
    {
        name: 'Turn Radius (r)',
        latex: 'r = \\frac{V^2}{g N_r}',
        requiredVars: ['V', 'g', 'N_r'],
        derivedVars: {
            'V': '\\sqrt{r g N_r}',
            'N_r': '\\frac{V^2}{g r}'
        }
    },
    {
        name: 'Turn Rate (ω)',
        latex: '\\omega = \\frac{g N_r}{V}',
        requiredVars: ['g', 'N_r', 'V'],
        derivedVars: {
            'N_r': '\\frac{\\omega V}{g}',
            'V': '\\frac{g N_r}{\\omega}'
        }
    },
    {
        name: 'Specific Energy (E_s)',
        latex: 'E_s = h + \\frac{V^2}{2g}',
        requiredVars: ['h', 'V', 'g'],
        derivedVars: {
            'h': 'E_s - \\frac{V^2}{2g}',
            'V': '\\sqrt{2g(E_s - h)}'
        }
    },
    {
        name: 'Acceleration (Ṅ)',
        latex: '\\dot{N} = \\frac{T - D - W \\sin \\gamma}{m}',
        requiredVars: ['T', 'D', 'W', 'γ', 'm'],
        derivedVars: {
            'T': '\\dot{N} m + D + W \\sin \\gamma',
            'D': 'T - \\dot{N} m - W \\sin \\gamma',
            'W': '\\frac{T - D - \\dot{N} m}{\\sin \\gamma}',
            'γ': '\\arcsin\\left(\\frac{T - D - \\dot{N} m}{W}\\right)',
            'm': '\\frac{T - D - W \\sin \\gamma}{\\dot{N}}'
        }
    },
    {
        name: 'Climb Rate (ḣ)',
        latex: '\\dot{h} = V \\sin \\gamma',
        requiredVars: ['V', 'γ'],
        derivedVars: {
            'V': '\\frac{\\dot{h}}{\\sin \\gamma}',
            'γ': '\\arcsin\\left(\\frac{\\dot{h}}{V}\\right)'
        }
    },
    {
        name: 'Drag Coefficient (C_D)',
        latex: 'D = q S C_D',
        requiredVars: ['q', 'S', 'C_D'],
        derivedVars: {
            'q': '\\frac{D}{S C_D}',
            'S': '\\frac{D}{q C_D}',
            'C_D': '\\frac{D}{q S}'
        }
    },
    {
        name: 'Total Energy (E)',
        latex: 'E = W \\left(h + \\frac{V^2}{2g}\\right)',
        requiredVars: ['W', 'h', 'V', 'g']
    }
];

// Event listener setup on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('equation-grid');
    const focus = document.getElementById('focus-equation');

    // Render equations grid
    EM_EQUATIONS.forEach((eq, index) => {
        const div = document.createElement('div');
        div.classList.add('equation-box');
        div.innerHTML = `<h3>${eq.name}</h3><p>\\[ ${eq.latex} \\]</p>`;
        div.onclick = () => focusEquation(index);
        grid.appendChild(div);
    });

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

            // Perform calculation
            let result;
            try {
                result = math.evaluate(calculationResult);
            } catch (error) {
                result = "Error";
            }

            createParticleAnimation(endRect.left + endRect.width/2, endRect.top + endRect.height/2, startRect.left + startRect.width/2, startRect.top + startRect.height/2, "");
            focus.innerHTML = `<h3>${eq.name} (Focused)</h3><p>\\[ ${calculationString} = ${result} \\]</p>`;
            MathJax.typesetPromise(); // Re-render LaTeX
        }
    }

    // Observe matrix changes (using MutationObserver for dynamic updates)
    const observer = new MutationObserver(checkDerivability);
    observer.observe(document.querySelector('#matrix-table tbody'), { childList: true });

    // Initial check
    checkDerivability();
});

// Future: Add pointer labels (SVG arrows from var names to equation terms)
