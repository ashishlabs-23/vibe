const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

async function main() {
    const prisma = new PrismaClient({ adapter });
    console.log('Seeding data to Postgres...');

    try {
        // Create a default user
        const vibeUser = await prisma.user.upsert({
            where: { email: 'official@vibe.app' },
            update: {},
            create: {
                email: 'official@vibe.app',
                name: 'Vibe Team',
                image: 'https://api.dicebear.com/7.x/bottts/svg?seed=vibe',
            },
        });

        console.log(`User created/found: ${vibeUser.id}`);

        const ideas = [
            {
                title: 'AI Urban Farming',
                content: 'Using autonomous drones and AI-driven sensors to manage vertical farms in abandoned city buildings, providing fresh produce to local communities.',
                category: '⚡ Tech',
                authorId: vibeUser.id,
            },
            {
                title: 'Ocean Plastic Bricks',
                content: 'A startup that collects microplastics from coastlines and compresses them into interlocking structural bricks for affordable, eco-friendly housing.',
                category: '🌍 Environment',
                authorId: vibeUser.id,
            },
            {
                title: 'Mindfulness VR',
                content: 'A VR experience that transports office workers into serene, procedurally generated natural environments to help reduce stress and boost mental clarity.',
                category: '🧠 Wellness',
                authorId: vibeUser.id,
            },
            {
                title: 'SkillSwap Network',
                content: 'A neighborhood-based platform where residents can trade skills without money—teach someone guitar in exchange for help with your garden.',
                category: '🤝 Community',
                authorId: vibeUser.id,
            },
            {
                title: 'Solar Paint',
                content: 'A thin-film solar technology that can be painted onto any surface, turning every rooftop and wall into a clean energy generator.',
                category: '⚡ Tech',
                authorId: vibeUser.id,
            },
            {
                title: 'Global Canvas',
                content: 'A massive online collaborative art project where users from every continent contribute one pixel a day to an ever-evolving masterpiece.',
                category: '🎨 Creative',
                authorId: vibeUser.id,
            },
        ];

        for (const idea of ideas) {
            // Check if idea exists to avoid duplicates
            const existing = await prisma.idea.findFirst({ where: { title: idea.title } });
            if (!existing) {
                await prisma.idea.create({ data: idea });
                console.log(`Created: ${idea.title}`);
            } else {
                console.log(`Skipped (exists): ${idea.title}`);
            }
        }

        console.log('Seed completed successfully!');
    } catch (error) {
        console.error('Seed error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
