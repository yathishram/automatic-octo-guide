import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  const threatreId = '181bf90b-15ba-4ebc-b35b-b0baebfebdf4';

  const movie1Id = 'a4b2c9c9-7f2a-4d6b-9d1a-4d4d7b3a5a4b';
  const movie2Id = 'b4b2c9c9-7f2a-4d6b-9d1a-4d4d7b3a5a4b';

  console.log('Creating threatre...');
  await prisma.theatres.upsert({
    where: { id: threatreId },
    update: {},
    create: {
      id: threatreId,
      name: 'PVR: Nexus',
      location: 'https://maps.app.goo.gl/eQgGmdpph1DBi9Tk7',
    },
  });

  console.log('Creating movies...');

  await prisma.movies.upsert({
    where: { id: movie1Id },
    update: {},
    create: {
      id: movie1Id,
      name: 'Dasara',
      rating: 'UA',
      language: 'Telugu',
      duration: 150,
    },
  });

  await prisma.movies.upsert({
    where: { id: movie2Id },
    update: {},
    create: {
      id: movie2Id,
      name: 'Kisi Ka Bhai Kisi Ki Jaan',
      rating: 'UA',
      language: 'Hindi',
      duration: 180,
    },
  });

  console.log('Creating shows...');

  await prisma.shows.upsert({
    where: { id: 'aef1ca1e-7909-4057-b943-bfb961e0b30f' },
    update: {},
    create: {
      id: 'aef1ca1e-7909-4057-b943-bfb961e0b30f',
      movieId: movie1Id,
      theatreId: threatreId,
    },
  });

  await prisma.shows.upsert({
    where: { id: 'bef1ca1e-7909-4057-b943-bfb961e0b30f' },
    update: {},
    create: {
      id: 'bef1ca1e-7909-4057-b943-bfb961e0b30f',
      movieId: movie2Id,
      theatreId: threatreId,
    },
  });

  console.log('Creating showtimes...');

  await prisma.showtimes.upsert({
    where: { id: 'aef1ca1e-7909-4057-b943-bfb961e0b30f' },
    update: {},
    create: {
      id: 'aef1ca1e-7909-4057-b943-bfb961e0b30f',
      showId: 'aef1ca1e-7909-4057-b943-bfb961e0b30f',
      startTime: new Date('2021-10-15T10:00:00'),
      endTime: new Date('2021-10-15T12:30:00'),
    },
  });

  await prisma.showtimes.upsert({
    where: { id: 'bef1ca1e-7909-4057-b943-bfb961e0b30f' },
    update: {},
    create: {
      id: 'bef1ca1e-7909-4057-b943-bfb961e0b30f',
      showId: 'bef1ca1e-7909-4057-b943-bfb961e0b30f',
      startTime: new Date('2021-10-15T13:00:00'),
      endTime: new Date('2021-10-15T15:30:00'),
    },
  });

  console.log('Seeding complete!');

  console.log('Fetching shows for given threatre...');

  const showsWithMaxDate = await prisma.shows.findMany({
    where: {
      theatreId: threatreId, // replace with the actual theatreId
    },
    select: {
      movie: {
        select: {
          title: true,
        },
      },
      ShowTime: {
        orderBy: {
          startTime: 'asc',
        },
        select: {
          startTime: true,
          // Assuming you want the date part of the DateTime
          date: {
            select: {
              // Extracting the date from startTime
              startTime: true,
            },
          },
        },
      },
      _max: {
        select: {
          ShowTime: {
            select: {
              startTime: true,
            },
          },
        },
      },
    },
    orderBy: {
      ShowTime: {
        startTime: 'asc',
      },
    },
  });

  console.log(
    'Shows with max date: ',
    JSON.stringify(showsWithMaxDate, null, 2),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
