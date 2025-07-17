// equations.js - Handles equations grid, derivability checks, and focus

// Define EM equations with LaTeX and required vars
const EM_EQUATIONS = [
    {
        name: 'Specific Excess Power (P_s)',
        latex: 'P_s = V \\frac{T - D}{W}',
        requiredVars: ['V', 'T', 'D', 'W']
    },
    {
        name: 'Turn Radius (r)',
        latex: 'r = \\frac{V^2}{g N_r}',
        requiredVars: ['V', 'g', 'N_r']
    },
    {
        name: 'Turn Rate (ω)',
        latex: '\\omega = \\frac{g N_r}{V}',
        requiredVars: ['g', 'N_r', 'V']
    },
    {
        name: 'Dynamic Pressure (q)',
        latex: 'q = \\frac{1}{2} \\rho V^2',
        requiredVars: ['ρ', 'V']
    },
    // Add more equations from EM theory...
    {
        name: 'Energy-Maneuverability Efficiency (E-ME)',
        latex: 'E-ME = \\frac{P_s^*}{\\dot{w}_f} w_f',
        requiredVars: ['P_s*', '\\dot{w}_f', 'w_f']
    },
    {
        name: 'Range (R)',
        latex: 'R = \\frac{V_{ts}}{\\dot{w}_c} W_f + x',
        requiredVars: ['V_ts', '\\dot{w}_c', 'W_f', 'x']
    }
    // Extend with all from memo
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
            enteredVars.add(row.cells[0].textContent.toUpperCase());
        });

        document.querySelectorAll('.equation-box').forEach((box, index) => {
            const required = EM_EQUATIONS[index].requiredVars.map(v => v.toUpperCase());
            const hasAll = required.every(v => enteredVars.has(v));
            box.style.border = hasAll ? '2px solid #00FF00' : '1px solid #FFF'; // Green if derivable
        });
    }

    // Function to focus equation
    function focusEquation(index) {
        const eq = EM_EQUATIONS[index];
        focus.innerHTML = `<h3>${eq.name} (Focused)</h3><p>\\[ ${eq.latex} \\]</p>`;
        MathJax.typesetPromise(); // Re-render LaTeX
    }

    // Observe matrix changes (using MutationObserver for dynamic updates)
    const observer = new MutationObserver(checkDerivability);
    observer.observe(document.querySelector('#matrix-table tbody'), { childList: true });

    // Initial check
    checkDerivability();
});

// Future: Add pointer labels (SVG arrows from var names to equation terms)
