'use client';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-10 text-center">
                        <h1 className="text-4xl font-bold mb-3">📊 Arquitetura de Controle de Acesso SaaS</h1>
                        <p className="text-lg opacity-90">Visualização Interativa da Documentação Técnica</p>
                    </div>

                    {/* Content */}
                    <div className="p-10">
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border-2 border-purple-200">
                                <h2 className="text-2xl font-bold text-purple-700 mb-4">📄 Documentação Disponível</h2>
                                <div className="space-y-4">
                                    <a
                                        href="/docs/viewer.html"
                                        target="_blank"
                                        className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-400"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold text-purple-600 mb-2">🇧🇷 Visualizador Interativo</h3>
                                                <p className="text-gray-600">Visualize a documentação com tabelas, diagramas e código formatado</p>
                                            </div>
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </a>

                                    <a
                                        href="/docs/architecture_design_pt_br.md"
                                        download
                                        className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-400"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold text-indigo-600 mb-2">📥 Download Português (MD)</h3>
                                                <p className="text-gray-600">Baixe o arquivo markdown da especificação técnica</p>
                                            </div>
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                    </a>

                                    <a
                                        href="/docs/architecture_design.md"
                                        download
                                        className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-400"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold text-indigo-600 mb-2">📥 Download English (MD)</h3>
                                                <p className="text-gray-600">Download the technical specification markdown file</p>
                                            </div>
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            <strong className="font-semibold">Dica:</strong> Use o visualizador interativo para ver os diagramas Mermaid renderizados e as tabelas formatadas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
