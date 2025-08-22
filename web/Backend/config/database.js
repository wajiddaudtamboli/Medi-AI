const { PrismaClient } = require('@prisma/client');

// Mock Prisma client function
function createMockPrismaClient() {
  return {
    $connect: () => Promise.resolve(),
    $disconnect: () => Promise.resolve(),
    user: {
      create: (data) => Promise.resolve({
        id: 'demo-' + Date.now(),
        email: data.data.email || 'demo@example.com',
        name: data.data.name || 'Demo User',
        role: data.data.role || 'patient',
        createdAt: new Date(),
        ...data.data
      }),
      findUnique: (query) => {
        // Handle the query with includes for profile endpoint
        if (query.where.id) {
          const mockUser = {
            id: query.where.id,
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'patient',
            password: '$2b$10$hashedpassword',
            phone: '+1234567890',
            address: '123 Demo Street',
            age: 25,
            gender: 'male',
            bloodGroup: 'O+',
            createdAt: new Date(),
            updatedAt: new Date()
          };

          // Add nested relationships if included
          if (query.include) {
            if (query.include.medicalHistory) {
              mockUser.medicalHistory = [
                {
                  id: 'demo-medical-1',
                  userId: query.where.id,
                  condition: 'Regular Checkup',
                  diagnosis: 'Healthy',
                  treatment: 'Maintain current lifestyle',
                  date: new Date(),
                  createdAt: new Date()
                }
              ];
            }
            if (query.include.analysisResults) {
              mockUser.analysisResults = [
                {
                  id: 'demo-analysis-1',
                  userId: query.where.id,
                  type: 'Health Checkup',
                  result: 'Normal',
                  confidence: 0.95,
                  createdAt: new Date()
                }
              ];
            }
          }

          return Promise.resolve(mockUser);
        }
        if (query.where.email === 'demo@example.com') {
          return Promise.resolve({
            id: 'demo-user-1',
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'patient',
            password: '$2b$10$hashedpassword',
            phone: '+1234567890',
            createdAt: new Date()
          });
        }
        return Promise.resolve(null);
      },
      findMany: (query) => {
        // Handle doctors query
        if (query && query.where && query.where.role === 'doctor') {
          return Promise.resolve([
            {
              id: 'demo-doctor-1',
              name: 'Dr. Sarah Johnson',
              speciality: 'Cardiologist',
              availability: 'Available',
              avatarUrl: '/assets/doctor-default.png'
            },
            {
              id: 'demo-doctor-2',
              name: 'Dr. Michael Chen',
              speciality: 'Neurologist',
              availability: 'Available',
              avatarUrl: '/assets/doctor-default.png'
            },
            {
              id: 'demo-doctor-3',
              name: 'Dr. Emily Davis',
              speciality: 'General Practitioner',
              availability: 'Busy',
              avatarUrl: '/assets/doctor-default.png'
            }
          ]);
        }

        // Default user list
        return Promise.resolve([
          {
            id: 'demo-user-1',
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'patient',
            createdAt: new Date()
          },
          {
            id: 'demo-doctor-1',
            email: 'doctor@example.com',
            name: 'Dr. Demo',
            role: 'doctor',
            createdAt: new Date()
          }
        ]);
      },
      update: (data) => Promise.resolve({
        id: data.where.id || 'demo-user-1',
        ...data.data,
        updatedAt: new Date()
      }),
    },
    analysisResult: {
      create: (data) => Promise.resolve({
        id: 'demo-analysis-' + Date.now(),
        ...data.data,
        createdAt: new Date()
      }),
      findMany: () => Promise.resolve([]),
      findUnique: () => Promise.resolve(null),
    },
    medicalHistory: {
      create: (data) => Promise.resolve({
        id: 'demo-medical-' + Date.now(),
        ...data.data,
        createdAt: new Date()
      }),
      findMany: () => Promise.resolve([]),
    },
    emergencyNotification: {
      create: (data) => Promise.resolve({
        id: 'demo-emergency-' + Date.now(),
        patientId: data.data.patientId,
        roomId: data.data.roomId || 'emergency',
        status: data.data.status || 'pending',
        createdAt: new Date(),
        patient: {
          id: data.data.patientId,
          name: 'Demo Patient',
          contact: 'patient@demo.com'
        }
      }),
      findMany: (query) => Promise.resolve([
        {
          id: 'demo-emergency-1',
          patientId: 'demo-user-1',
          roomId: 'emergency',
          status: 'pending',
          createdAt: new Date(),
          patient: {
            id: 'demo-user-1',
            name: 'Demo Patient',
            contact: 'patient@demo.com'
          }
        }
      ]),
      findUnique: (query) => Promise.resolve({
        id: query.where.id,
        patientId: 'demo-user-1',
        roomId: 'emergency',
        status: 'pending',
        createdAt: new Date(),
        patient: {
          id: 'demo-user-1',
          name: 'Demo Patient',
          contact: 'patient@demo.com'
        }
      }),
      update: (data) => Promise.resolve({
        id: data.where.id,
        patientId: 'demo-user-1',
        roomId: 'emergency',
        status: data.data.status || 'pending',
        createdAt: new Date(),
        patient: {
          id: 'demo-user-1',
          name: 'Demo Patient',
          contact: 'patient@demo.com'
        }
      })
    },
  };
}

let prisma;

// Initialize with real Prisma client first
try {
  const realPrisma = new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  // Test connection with a simple timeout
  const testConnection = async () => {
    try {
      await Promise.race([
        realPrisma.$connect(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Connection timeout')), 10000)
        )
      ]);
      console.log('✅ Connected to Neon PostgreSQL database successfully');
      prisma = realPrisma;
    } catch (error) {
      console.error('❌ Failed to connect to database:', error.message);
      console.log('⚠️ Falling back to mock client for demo');
      prisma = createMockPrismaClient();
    }
  };

  // Test connection asynchronously
  testConnection();

  // Initialize with mock for immediate use
  prisma = createMockPrismaClient();

} catch (error) {
  console.error('❌ Prisma client initialization failed:', error);
  console.log('⚠️ Using mock database for testing');
  prisma = createMockPrismaClient();
}

// Graceful shutdown
process.on('beforeExit', async () => {
  if (prisma.$disconnect) {
    await prisma.$disconnect();
  }
});

module.exports = prisma;
