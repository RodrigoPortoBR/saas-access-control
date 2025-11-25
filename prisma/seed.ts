import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const modules = [
        { key: 'email', name: 'Email Marketing', description: 'Send and track emails' },
        { key: 'data', name: 'Data & Analytics', description: 'Advanced reporting and insights' },
        { key: 'crm', name: 'CRM', description: 'Customer Relationship Management' },
        { key: 'analytics', name: 'Analytics', description: 'Basic analytics' },
    ]

    for (const mod of modules) {
        await prisma.module.upsert({
            where: { key: mod.key },
            update: {},
            create: mod,
        })
    }

    console.log('Seeding completed.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
