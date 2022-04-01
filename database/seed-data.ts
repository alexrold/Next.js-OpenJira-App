interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending- Sint irure excepteur laborum est',
      status: 'pending',
      createAt: Date.now(),
    },
    {
      description: 'In-progress- excepteur laborum est laborum irure',
      status: 'in-progress',
      createAt: Date.now() - 1000000000,
    },
    {
      description: 'Finished- laborum irure excepteur est',
      status: 'finished',
      createAt: Date.now() - 90000000,
    },
  ]
}