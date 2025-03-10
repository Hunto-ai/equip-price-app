// Initial equipment data
export const initialEquipmentData = [
  {
    id: 'rtu-1',
    type: 'rtu',
    name: 'Rooftop Unit (RTU)',
    pricingType: 'per-ton',
    specs: {
      tons: {
        min: 1,
        max: 50,
      },
      pricePerTon: 2800,
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'boiler-1',
    type: 'boiler',
    name: 'Boiler',
    pricingType: 'per-btu',
    specs: {
      btu: {
        min: 100000,
        max: 6500000,
      },
      pricePerBtu: 0.04,
    },
    controls: {
      ST: 0,
      SW: 5,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'chiller-1',
    type: 'chiller',
    name: 'Chiller',
    pricingType: 'per-ton',
    specs: {
      tons: {
        min: 20,
        max: 500,
      },
      pricePerTon: 3500,
    },
    controls: {
      ST: 2,
      SW: 2,
      SEN: 4,
      REL: 3,
      VA: 2,
    },
  },
  {
    id: 'ahu-1',
    type: 'ahu',
    name: 'Air Handling Unit (AHU)',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 2,
        max: 100,
      },
      pricePerHp: 1000,
      presets: [
        { hp: 2, price: 12000 },
        { hp: 5, price: 19000 },
        { hp: 15, price: 29000 },
        { hp: 30, price: 55000 },
        { hp: 50, price: 70000 },
        { hp: 100, price: 100000 },
      ]
    },
    controls: {
      ST: 0,
      SW: 5,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'pump-1',
    type: 'pump',
    name: 'Base Mount Pump',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 0.33,
        max: 25,
      },
      pricePerHp: 1000,
      presets: [
        { hp: 0.33, price: 750 },
        { hp: 0.5, price: 1000 },
        { hp: 1, price: 1000 },
        { hp: 1.5, price: 1500 },
        { hp: 2, price: 2500 },
        { hp: 3, price: 4500 },
        { hp: 5, price: 7500 },
        { hp: 10, price: 14000 },
        { hp: 15, price: 15000 },
        { hp: 20, price: 22000 },
        { hp: 25, price: 26000 },
      ]
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'fan-1',
    type: 'fan',
    name: 'Fan',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 0.25,
        max: 50,
      },
      pricePerHp: 950,
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 1,
      REL: 1,
      VA: 0,
    },
  },
  {
    id: 'cooling-tower-1',
    type: 'cooling-tower',
    name: 'Cooling Tower',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 10,
        max: 30,
      },
      pricePerHp: 2000,
      presets: [
        { hp: 10, price: 14000 },
        { hp: 25, price: 26000 },
        { hp: 30, price: 60000 },
      ]
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'vav-1',
    type: 'vav',
    name: 'VAV Box',
    pricingType: 'fixed',
    specs: {
      basePrice: 1500,
    },
    controls: {
      ST: 0,
      SW: 1,
      SEN: 2,
      REL: 1,
      VA: 1,
    },
  },
  {
    id: 'compressor-1',
    type: 'compressor',
    name: 'Air Compressor',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 5,
        max: 7.5,
      },
      pricePerHp: 1500,
      presets: [
        { hp: 5, price: 7500 },
        { hp: 7.5, price: 10000 },
      ]
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 1,
      REL: 1,
      VA: 1,
    },
  },
  {
    id: 'exhaust-fan-1',
    type: 'exhaust-fan',
    name: 'Exhaust Fan',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 0.08,
        max: 15,
      },
      pricePerHp: 1500,
      presets: [
        { hp: 0.08, price: 450 },  // 1/12 HP
        { hp: 0.25, price: 850 },  // 1/4 HP
        { hp: 0.33, price: 1000 }, // 1/3 HP
        { hp: 0.5, price: 1200 },  // 1/2 HP
        { hp: 1, price: 1950 },
        { hp: 2, price: 2700 },
        { hp: 3, price: 4700 },
        { hp: 5, price: 7700 },
        { hp: 15, price: 15000 },
      ]
    },
    controls: {
      ST: 0,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'heat-exchanger-1',
    type: 'heat-exchanger',
    name: 'Heat Exchanger',
    pricingType: 'fixed',
    specs: {
      basePrice: 8500,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 2,
      REL: 0,
      VA: 2,
    },
  },
  {
    id: 'humidifier-1',
    type: 'humidifier',
    name: 'Humidifier',
    pricingType: 'fixed',
    specs: {
      basePrice: 1500,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'air-drier-1',
    type: 'air-drier',
    name: 'Air Drier',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 1,
        max: 1,
      },
      pricePerHp: 2000,
      presets: [
        { hp: 1, price: 2000 },
      ]
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'co-monitor-1',
    type: 'co-monitor',
    name: 'CO Monitor',
    pricingType: 'fixed',
    specs: {
      basePrice: 3000,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'gas-monitor-1',
    type: 'gas-monitor',
    name: 'Gas Monitor',
    pricingType: 'fixed',
    specs: {
      basePrice: 5000,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'ductless-split-1',
    type: 'ductless-split',
    name: 'Ductless Split',
    pricingType: 'fixed',
    specs: {
      basePrice: 3000,
      options: [
        { name: 'Standard', price: 3000 },
        { name: 'Premium', price: 6000 },
      ]
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'dust-collector-1',
    type: 'dust-collector',
    name: 'Dust Collector',
    pricingType: 'fixed',
    specs: {
      basePrice: 5000,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 2,
    },
  },
  {
    id: 'fan-coil-1',
    type: 'fan-coil',
    name: 'Fan Coil Unit',
    pricingType: 'fixed',
    specs: {
      basePrice: 1000,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'force-flow-1',
    type: 'force-flow',
    name: 'Force Flow Convector',
    pricingType: 'fixed',
    specs: {
      basePrice: 900,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'furnace-1',
    type: 'furnace',
    name: 'Furnace',
    pricingType: 'fixed',
    specs: {
      basePrice: 4500,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'split-system-1',
    type: 'split-system',
    name: 'Split System',
    pricingType: 'per-ton',
    specs: {
      tons: {
        min: 1,
        max: 20,
      },
      pricePerTon: 2800,
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'condensing-unit-1',
    type: 'condensing-unit',
    name: 'Condensing Unit',
    pricingType: 'per-ton',
    specs: {
      tons: {
        min: 1,
        max: 20,
      },
      pricePerTon: 2000,
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'hepa-unit-1',
    type: 'hepa-unit',
    name: 'HEPA Unit (Residential)',
    pricingType: 'fixed',
    specs: {
      basePrice: 2000,
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'hrv-1',
    type: 'hrv',
    name: 'HRV (Commercial)',
    pricingType: 'fixed',
    specs: {
      basePrice: 2000,
      options: [
        { name: 'Small', price: 2000 },
        { name: 'Medium', price: 6000 },
        { name: 'Large', price: 8000 },
      ]
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'ice-machine-1',
    type: 'ice-machine',
    name: 'Ice Machine',
    pricingType: 'fixed',
    specs: {
      basePrice: 500,
      options: [
        { name: 'Small', price: 500 },
        { name: 'Medium', price: 1500 },
        { name: 'Large', price: 3000 },
      ]
    },
    controls: {
      ST: 0,
      SW: 0,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'makeup-air-1',
    type: 'makeup-air',
    name: 'Make Up Air',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 3,
        max: 40,
      },
      pricePerHp: 1500,
      presets: [
        { hp: 3, price: 15000 },
        { hp: 5, price: 20000 },
        { hp: 7.5, price: 25000 },
        { hp: 10, price: 35000 },
        { hp: 25, price: 45000 },
        { hp: 40, price: 65000 },
      ]
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 1,
      REL: 1,
      VA: 1,
    },
  },
  {
    id: 'radiant-heater-1',
    type: 'radiant-heater',
    name: 'Radiant Tube Heaters',
    pricingType: 'fixed',
    specs: {
      basePrice: 4000,
      options: [
        { name: 'Less than 60 ft', price: 4000 },
        { name: '60 ft or more', price: 5000 },
      ]
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'strip-heater-1',
    type: 'strip-heater',
    name: 'Strip Heaters (Electric)',
    pricingType: 'fixed',
    specs: {
      basePrice: 2000,
    },
    controls: {
      ST: 0,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'unit-heater-1',
    type: 'unit-heater',
    name: 'Unit Heaters',
    pricingType: 'fixed',
    specs: {
      basePrice: 3500,
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'water-heater-1',
    type: 'water-heater',
    name: 'Water Heaters (Hot Water)',
    pricingType: 'fixed',
    specs: {
      basePrice: 1200,
      options: [
        { name: '25 gallons', price: 900 },
        { name: '40 gallons', price: 1200 },
        { name: '100 gallons', price: 12000 },
      ]
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
  {
    id: 'tankless-water-heater-1',
    type: 'tankless-water-heater',
    name: 'Water Heaters (Electric - Tankless)',
    pricingType: 'fixed',
    specs: {
      basePrice: 800,
      options: [
        { name: '19 gallons', price: 800 },
        { name: '200,000 BTU Tankless', price: 6000 },
      ]
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 0,
      REL: 0,
      VA: 0,
    },
  },
];

// Schema for session data (for reference)
export const sessionDataSchema = {
  equipmentList: [
    {
      id: 'string', // Unique identifier
      type: 'string', // Equipment type (e.g., 'rtu', 'boiler')
      name: 'string', // Display name
      quantity: 'number', // Quantity of this equipment
      specs: {
        // Varies based on equipment type
        tons: 'number',
        btu: 'number',
        cfm: 'number',
        hp: 'number',
        basePrice: 'number',
        // Price per unit values
        pricePerTon: 'number',
        pricePerBtu: 'number',
        pricePerCfm: 'number',
        pricePerHp: 'number',
      },
      controls: {
        ST: 'number', // Starters
        SW: 'number', // Switches
        SEN: 'number', // Sensors
        REL: 'number', // Relays
        VA: 'number', // Valves
      },
      calculatedPrice: 'number', // Calculated price at time of addition
    },
  ],
  settings: {
    priceAdjustments: {
      // Optional price adjustments by equipment type
      // e.g., 'rtu': 1.1 for 10% increase
    },
    controlCounts: {
      // Optional control count overrides
    },
    lastModified: 'string', // ISO date string
  },
};
