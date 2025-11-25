import { Client, User, MODULES } from '@/services/mockData';

/**
 * Checks if a Client has a specific module in their contract.
 */
export function isModuleInContract(client: Client, moduleKey: string): boolean {
    return client.modules.includes(moduleKey);
}

/**
 * Checks if a User has permission to access a module.
 * STRICTLY enforces that the module must also be in the Client's contract.
 */
export function canUserAccessModule(client: Client, user: User, moduleKey: string): boolean {
    // 1. Contract Check (Hard Stop)
    if (!isModuleInContract(client, moduleKey)) {
        console.warn(`Access Denied: Module '${moduleKey}' not in contract for client '${client.name}'`);
        return false;
    }

    // 2. Permission Check
    return user.permissions.includes(moduleKey);
}

/**
 * Returns the list of modules that an Admin can assign to a User.
 * This is filtered by the Client's contract.
 */
export function getAssignableModules(client: Client) {
    return MODULES.filter((m) => client.modules.includes(m.key));
}
