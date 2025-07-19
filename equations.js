// equations.js

export const EQUATIONS = {
    'r': {
        inputs: ['V', 'N_r', 'g'],
        calculate: (V, N_r, g) => (V * V) / (g * N_r)
    },
    'ω': {
        inputs: ['N_r', 'V', 'g'],
        calculate: (N_r, V, g) => (g * N_r) / V
    },
    'E': {
        inputs: ['W', 'h', 'V', 'g'],
        calculate: (W, h, V, g) => W * (h + (V * V) / (2 * g))
    },
    'E_s': {
        inputs: ['h', 'V', 'g'],
        calculate: (h, V, g) => h + (V * V) / (2 * g)
    },
    'P_s': {
        inputs: ['T', 'D', 'V', 'W'],
        calculate: (T, D, V, W) => ((T - D) * V) / W
    },
    'q': {
        inputs: ['ρ', 'V'],
        calculate: (ρ, V) => 0.5 * ρ * V * V
    },
    'n_L': {
        inputs: ['q', 'S', 'C_L_max', 'W'],
        calculate: (q, S, C_L_max, W) => (q * S * C_L_max) / W
    },
    'm': {
        inputs: ['W', 'g'],
        calculate: (W, g) => W / g
    }
};
