export interface Module {
    key: string;
    name: string;
    description: string;
}

export interface Client {
    id: string;
    name: string;
    modules: string[]; // Array of Module keys
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    clientId: string;
    permissions: string[]; // Array of Module keys
}

// --- Mock Data ---

export const MODULES: Module[] = [
    { key: 'email', name: 'Email Marketing', description: 'Send and track emails' },
    { key: 'data', name: 'Data & Analytics', description: 'Advanced reporting and insights' },
    { key: 'crm', name: 'CRM', description: 'Customer Relationship Management' },
    { key: 'analytics', name: 'Analytics', description: 'Basic analytics' },
];

export const CLIENTS: Client[] = [
    {
        id: 'client-a',
        name: 'Acme Corp (Full Suite)',
        modules: ['email', 'data', 'crm', 'analytics'],
    },
    {
        id: 'client-b',
        name: 'Beta Inc (Limited)',
        modules: ['email', 'data'],
    },
];

export const USERS: User[] = [
    {
        id: 'user-a1',
        name: 'Alice Admin',
        email: 'alice@acme.com',
        role: 'ADMIN',
        clientId: 'client-a',
        permissions: ['email', 'data', 'crm', 'analytics'],
    },
    {
        id: 'user-a2',
        name: 'Adam User',
        email: 'adam@acme.com',
        role: 'USER',
        clientId: 'client-a',
        permissions: ['email'],
    },
    {
        id: 'user-b1',
        name: 'Bob Admin',
        email: 'bob@beta.com',
        role: 'ADMIN',
        clientId: 'client-b',
        permissions: ['email', 'data'],
    },
];

// --- Service Functions ---

export const getModules = () => MODULES;

export const getClients = () => CLIENTS;

export const getClientById = (id: string) => CLIENTS.find((c) => c.id === id);

export const getUsersByClientId = (clientId: string) => USERS.filter((u) => u.clientId === clientId);

export const getUserById = (id: string) => USERS.find((u) => u.id === id);

// Simulate "Database" Updates (In-Memory)
export const updateUserPermissions = (userId: string, newPermissions: string[]) => {
    const user = USERS.find((u) => u.id === userId);
    if (user) {
        user.permissions = newPermissions;
        return user;
    }
    return null;
};
