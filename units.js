// units.js - Handles unit conversions

const CONVERSIONS = {
    // Length
    'm': 1, 'ft': 0.3048, 'km': 1000, 'in': 0.0254, 'yd': 0.9144, 'mi': 1609.34, 'nautical miles': 1852,
    // Speed
    'm/s': 1, 'ft/sec': 0.3048, 'km/h': 1 / 3.6, 'mph': 0.44704, 'knots': 0.514444,
    // Acceleration
    'm/s²': 1, 'ft/sec²': 0.3048, 'km/s²': 1000, 'g': 9.80665,
    // Energy
    'J': 1, 'ft-lb': 1.35582, 'N·m': 1, 'kcal': 4184, 'kWh': 3600000,
    // Rate
    'm/rad': 1, 'ft/deg': 17.4533, 'm/deg': 57.2958, 'km/deg': 57295.8,
    // Mass
    'kg': 1, 'lb': 0.453592, 'slugs': 14.5939, 'oz': 0.0283495, 'ton': 907.185,
    // Density
    'kg/m³': 1, 'slugs/ft³': 515.379, 'g/cm³': 1000, 'lb/ft³': 16.0185,
    // Pressure
    'Pa': 1, 'lb/ft²': 47.8803, 'kg/m²': 9.80665, 'psi': 6894.76, 'bar': 100000,
    // Flow
    'kg/s': 1, 'lb/sec': 0.453592, 'g/s': 0.001, 'lb/min': 0.00755987,
    // Angle
    'rad': 1, 'deg': 0.0174533, 'grad': 0.015708, 'arcmin': 0.000290888, 'arcsec': 4.84814e-6,
    // Time
    'sec': 1, 'ms': 0.001, 'min': 60, 'h': 3600, 'day': 86400,
    // Dimensionless
    'dimensionless': 1
};

const UNIT_CATEGORIES = {
    'length': ['m', 'ft', 'km', 'in', 'yd', 'mi', 'nautical miles'],
    'speed': ['m/s', 'ft/sec', 'km/h', 'mph', 'knots'],
    'acceleration': ['m/s²', 'ft/sec²', 'km/s²', 'g'],
    'energy': ['J', 'ft-lb', 'N·m', 'kcal', 'kWh'],
    'rate': ['m/rad', 'ft/deg', 'm/deg', 'km/deg'],
    'mass': ['kg', 'lb', 'slugs', 'oz', 'ton', 'g'],
    'density': ['kg/m³', 'slugs/ft³', 'g/cm³', 'lb/ft³'],
    'pressure': ['Pa', 'lb/ft²', 'kg/m²', 'psi', 'bar'],
    'flow': ['kg/s', 'lb/sec', 'g/s', 'lb/min'],
    'angle': ['rad', 'deg', 'grad', 'arcmin', 'arcsec'],
    'time': ['sec', 'ms', 'min', 'h', 'day'],
    'dimensionless': ['dimensionless']
};

function findCategory(unit) {
    for (const category in UNIT_CATEGORIES) {
        if (UNIT_CATEGORIES[category].includes(unit)) {
            return category;
        }
    }
    return null;
}

function convertUnit(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }

    const fromCategory = findCategory(fromUnit);
    const toCategory = findCategory(toUnit);

    if (fromCategory && toCategory && fromCategory === toCategory) {
        const valueInBase = value * CONVERSIONS[fromUnit];
        return valueInBase / CONVERSIONS[toUnit];
    }

    return null; // Conversion not possible
}
