import Link from 'next/link';
import { getClients, getModules } from '@/services/mockData';

export default function SuperAdminPage() {
    const clients = getClients();
    const allModules = getModules();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage Clients and Contracts</p>
                </header>

                <div className="grid gap-6">
                    {clients.map((client) => (
                        <div key={client.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
                                    <p className="text-sm text-gray-500">ID: {client.id}</p>
                                </div>
                                <Link
                                    href={`/admin/client/${client.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Manage Users
                                </Link>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Contracted Modules</h3>
                                <div className="flex flex-wrap gap-2">
                                    {allModules.map((module) => {
                                        const hasModule = client.modules.includes(module.key);
                                        return (
                                            <span
                                                key={module.key}
                                                className={`px-3 py-1 rounded-full text-sm font-medium border ${hasModule
                                                        ? 'bg-green-50 text-green-700 border-green-200'
                                                        : 'bg-gray-50 text-gray-400 border-gray-200 opacity-50'
                                                    }`}
                                            >
                                                {module.name}
                                                {hasModule && ' ✓'}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
