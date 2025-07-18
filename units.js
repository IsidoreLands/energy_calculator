// units.js - Handles unit conversions

const CONVERSIONS = {
    'deg': {
        'rad': 0.0174533,
        'grad': 1.11111,
        'arcmin': 60,
        'arcsec': 3600
    },
    'ft': {
        'm': 0.3048,
        'km': 0.0003048,
        'in': 12,
        'yd': 0.333333,
        'mi': 0.000189394
    },
    'ft/sec': {
        'm/s': 0.3048,
        'km/h': 1.09728,
        'mph': 0.681818,
        'knots': 0.592484
    },
    'ft/sec²': {
        'm/s²': 0.3048,
        'km/s²': 0.0003048,
        'g': 0.031081
    },
    'ft-lb': {
        'J': 1.35582,
        'N·m': 1.35582,
        'kcal': 0.000323832,
        'kWh': 3.76616e-7
    },
    'ft/deg': {
        'm/deg': 0.3048,
        'm/rad': 17.464,
        'km/deg': 0.0003048
    },
    'g': {
        'm/s²': 9.80665,
        'ft/s²': 32.174
    },
    'knots': {
        'm/s': 0.514444,
        'km/h': 1.852,
        'mph': 1.15078,
        'ft/s': 1.68781
    },
    'lb': {
        'kg': 0.453592,
        'N': 4.44822,
        'g': 453.592,
        'oz': 16,
        'ton': 0.0005
    },
    'lb/ft²': {
        'Pa': 47.8803,
        'kg/m²': 4.88243,
        'psi': 0.00694444,
        'bar': 0.000478803
    },
    'lb/sec': {
        'kg/s': 0.453592,
        'g/s': 453.592,
        'lb/min': 60
    },
    'nautical miles': {
        'km': 1.852,
        'm': 1852,
        'sm': 1.15078,
        'ft': 6076.12
    },
    'rad': {
        'deg': 57.2958,
        'grad': 63.662,
        'arcmin': 3437.75,
        'arcsec': 206265
    },
    'rad/sec': {
        'deg/s': 57.2958,
        'rpm': 9.5493,
        'Hz': 0.159155
    },
    'sec': {
        'ms': 1000,
        'min': 0.0166667,
        'h': 0.000277778,
        'day': 1.1574e-5
    },
    'slugs': {
        'kg': 14.5939,
        'g': 14593.9,
        'lb': 32.174
    },
    'slugs/ft³': {
        'kg/m³': 515.379,
        'g/cm³': 0.515379,
        'lb/ft³': 32.174
    }
};

function convertUnit(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }

    // Direct conversion
    if (CONVERSIONS[fromUnit] && CONVERSIONS[fromUnit][toUnit]) {
        return value * CONVERSIONS[fromUnit][toUnit];
    }

    // Inverse conversion
    if (CONVERSIONS[toUnit] && CONVERSIONS[toUnit][fromUnit]) {
        return value / CONVERSIONS[toUnit][fromUnit];
    }

    // Conversion between sub-units
    let fromMainUnit, toMainUnit;
    for (const mainUnit in CONVERSIONS) {
        if (CONVERSIONS[mainUnit][fromUnit] || mainUnit === fromUnit) {
            fromMainUnit = mainUnit;
        }
        if (CONVERSIONS[mainUnit][toUnit] || mainUnit === toUnit) {
            toMainUnit = mainUnit;
        }
    }

    if (fromMainUnit && toMainUnit && fromMainUnit === toMainUnit) {
        const valueInMain = fromUnit === fromMainUnit ? value : value / CONVERSIONS[fromMainUnit][fromUnit];
        return toUnit === toMainUnit ? valueInMain : valueInMain * CONVERSIONS[toMainUnit][toUnit];
    }

    return null; // Conversion not possible
}
