// units.js - Handles unit conversions

const CONVERSIONS = {
    // Length
    'm': 1,
    'ft': 0.3048,
    'km': 1000,
    'in': 0.0254,
    'yd': 0.9144,
    'mi': 1609.34,
    'nautical miles': 1852,
    // Speed
    'm/s': 1,
    'ft/sec': 0.3048,
    'km/h': 1 / 3.6,
    'mph': 0.44704,
    'knots': 0.514444,
    // Acceleration
    'm/s²': 1,
    'ft/sec²': 0.3048,
    'km/s²': 1000,
    'g': 9.80665,
    // Energy
    'J': 1,
    'ft-lb': 1.35582,
    'N·m': 1,
    'kcal': 4184,
    'kWh': 3600000,
    // Rate
    'm/deg': 1,
    'ft/deg': 0.3048,
    'm/rad': 1 / 0.0174533,
    'km/deg': 1000,
    // Mass
    'kg': 1,
    'lb': 0.453592,
    'slugs': 14.5939,
    'oz': 0.0283495,
    'ton': 907.185,
    // Density
    'kg/m³': 1,
    'slugs/ft³': 515.379,
    'g/cm³': 1000,
    'lb/ft³': 16.0185,
    // Pressure
    'Pa': 1,
    'lb/ft²': 47.8803,
    'kg/m²': 9.80665,
    'psi': 6894.76,
    'bar': 100000,
    // Flow
    'kg/s': 1,
    'lb/sec': 0.453592,
    'g/s': 0.001,
    'lb/min': 0.00755987,
    // Angle
    'rad': 1,
    'deg': 0.0174533,
    'grad': 0.015708,
    'arcmin': 0.000290888,
    'arcsec': 4.84814e-6,
    // Time
    'sec': 1,
    'ms': 0.001,
    'min': 60,
    'h': 3600,
    'day': 86400,
    // Dimensionless
    'dimensionless': 1
};

function convertUnit(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }

    const fromFactor = CONVERSIONS[fromUnit];
    const toFactor = CONVERSIONS[toUnit];

    if (fromFactor && toFactor) {
        // Convert fromUnit to base unit, then base unit to toUnit
        const valueInBase = value * fromFactor;
        return valueInBase / toFactor;
    }

    return null; // Conversion not possible
}
