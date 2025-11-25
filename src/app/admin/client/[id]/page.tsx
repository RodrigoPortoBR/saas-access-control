'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getClientById, getUsersByClientId, getModules, User, updateUserPermissions } from '@/services/mockData';
import { getAssignableModules } from '@/lib/accessControl';

export default function ClientAdminPage() {
    const params = useParams();
    const clientId = params.id as string;

    // In a real app, we'd fetch this data. For mock, we just call the functions.
    const client = getClientById(clientId);
    const [users, setUsers] = useState<User[]>([]);
    const allModules = getModules();

    useEffect(() => {
        if (clientId) {
            setUsers(getUsersByClientId(clientId));
        }
    }, [clientId]);

    if (!client) return <div className="p-8">Client not found</div>;

    const assignableModules = getAssignableModules(client);

    const handlePermissionChange = (userId: string, moduleKey: string, checked: boolean) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        let newPermissions = [...user.permissions];
        if (checked) {
            newPermissions.push(moduleKey);
        } else {
            newPermissions = newPermissions.filter(p => p !== moduleKey);
        }

        // Update Mock Data
        updateUserPermissions(userId, newPermissions);

        // Update Local State
        setUsers(users.map(u => u.id === userId ? { ...u, permissions: newPermissions } : u));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                        <a href="/admin" className="text-blue-600 hover:underline">← Back to Super Admin</a>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{client.name} - User Management</h1>
                    <p className="text-gray-600 mt-2">Manage User Permissions within Contract Scope</p>
                </header>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <h3 className="font-semibold text-gray-900">Contract Scope (Available to Assign)</h3>
                        <div className="flex gap-2 mt-2">
                            {assignableModules.map(m => (
                                <span key={m.key} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md font-medium">
                                    {m.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-medium text-gray-500">User</th>
                                <th className="p-4 font-medium text-gray-500">Role</th>
                                {allModules.map(m => (
                                    <th key={m.key} className="p-4 font-medium text-gray-500 text-center w-32">
                                        {m.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    {allModules.map(module => {
                                        const isContracted = client.modules.includes(module.key);
                                        const hasPermission = user.permissions.includes(module.key);

                                        return (
                                            <td key={module.key} className="p-4 text-center">
                                                {isContracted ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={hasPermission}
                                                        onChange={(e) => handlePermissionChange(user.id, module.key, e.target.checked)}
                                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                                    />
                                                ) : (
                                                    <span className="text-gray-300 text-xl" title="Not in Contract">×</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
