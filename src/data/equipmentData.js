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
      SW: 2,
      SEN: 3,
      REL: 2,
      VA: 1,
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
        max: 5000000,
      },
      pricePerBtu: 0.05,
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 2,
      REL: 1,
      VA: 2,
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
    pricingType: 'per-cfm',
    specs: {
      cfm: {
        min: 1000,
        max: 50000,
      },
      pricePerCfm: 3.5,
    },
    controls: {
      ST: 2,
      SW: 3,
      SEN: 5,
      REL: 3,
      VA: 4,
    },
  },
  {
    id: 'pump-1',
    type: 'pump',
    name: 'Pump',
    pricingType: 'per-hp',
    specs: {
      hp: {
        min: 0.5,
        max: 100,
      },
      pricePerHp: 1200,
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
    pricingType: 'per-ton',
    specs: {
      tons: {
        min: 50,
        max: 1000,
      },
      pricePerTon: 750,
    },
    controls: {
      ST: 2,
      SW: 2,
      SEN: 3,
      REL: 2,
      VA: 1,
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
        max: 200,
      },
      pricePerHp: 1800,
    },
    controls: {
      ST: 1,
      SW: 1,
      SEN: 2,
      REL: 1,
      VA: 0,
    },
  },
  {
    id: 'exhaust-fan-1',
    type: 'exhaust-fan',
    name: 'Exhaust Fan',
    pricingType: 'per-cfm',
    specs: {
      cfm: {
        min: 500,
        max: 20000,
      },
      pricePerCfm: 1.2,
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
      basePrice: 3200,
    },
    controls: {
      ST: 0,
      SW: 1,
      SEN: 1,
      REL: 1,
      VA: 1,
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
