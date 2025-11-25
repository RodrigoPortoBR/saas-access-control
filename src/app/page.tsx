import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SaaS Access Control Prototype</h1>
            <p className="text-gray-600 mb-8 max-w-md text-center">
                This prototype demonstrates a modular, contract-driven access control system.
            </p>
            <Link
                href="/admin"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
                Go to Admin Dashboard
            </Link>
        </div>
    );
}
