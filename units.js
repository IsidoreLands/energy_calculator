// units.js - Handles unit conversions

const CONVERSIONS = {
    'ft': {
        'm': 0.3048,
        'in': 12,
        'nmi': 0.000164579
    },
    'm': {
        'ft': 3.28084,
        'in': 39.3701,
        'nmi': 0.000539957
    },
    'in': {
        'ft': 0.0833333,
        'm': 0.0254,
        'nmi': 0.0000137149
    },
    'nmi': {
        'ft': 6076.12,
        'm': 1852,
        'in': 72913.4
    },
    'ft/sec': {
        'm/sec': 0.3048,
        'knots': 0.592484
    },
    'm/sec': {
        'ft/sec': 3.28084,
        'knots': 1.94384
    },
    'knots': {
        'ft/sec': 1.68781,
        'm/sec': 0.514444
    },
    'lb': {
        'kg': 0.453592
    },
    'kg': {
        'lb': 2.20462
    },
    'slugs': {
        'kg': 14.5939
    },
    'kg/m³': {
        'slugs/ft³': 0.00194032
    },
    'slugs/ft³': {
        'kg/m³': 515.379
    },
    'rad': {
        'deg': 57.2958
    },
    'deg': {
        'rad': 0.0174533
    }
};

function convertUnit(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }

    if (CONVERSIONS[fromUnit] && CONVERSIONS[fromUnit][toUnit]) {
        return value * CONVERSIONS[fromUnit][toUnit];
    }

    // Check for inverse conversion
    for (const unit in CONVERSIONS) {
        if (CONVERSIONS[unit][fromUnit] && toUnit === unit) {
            return value / CONVERSIONS[unit][fromUnit];
        }
    }

    return null; // Conversion not possible
}
