# SaaS Access Control - Arquitetura de Controle de Acesso

Este repositório contém a **especificação técnica completa** da arquitetura de controle de acesso baseado em contrato para plataformas SaaS.

## 📋 Conteúdo

Este projeto é **apenas documentação**. Não há código de implementação, apenas a especificação arquitetural detalhada.

### Documentos Disponíveis

- **[architecture_design_pt_br.md](./docs/architecture_design_pt_br.md)** - Especificação Técnica em Português
- **[architecture_design.md](./docs/architecture_design.md)** - Technical Specification in English  
- **[architecture_design_pt_br.html](./docs/architecture_design_pt_br.html)** - Versão HTML renderizada (PT-BR)
- **[index.html](./docs/index.html)** - Visualizador interativo com Mermaid

## 🚀 Como Visualizar

### Opção 1: Visualizador HTML (Recomendado)
Abra o arquivo `docs/architecture_design_pt_br.html` diretamente no navegador para ver:
- ✅ Tabelas formatadas
- ✅ Diagramas ER renderizados
- ✅ Código SQL com syntax highlighting
- ✅ Design profissional

### Opção 2: Markdown
Abra os arquivos `.md` em qualquer editor que suporte Markdown (VS Code, GitHub, etc.)

### Opção 3: Visualizador Interativo
Abra `docs/index.html` para alternar entre PT-BR e EN dinamicamente.

## 📊 O que está documentado

### Modelo de Dados Completo
- **17 módulos** organizados em 4 categorias:
  - **CDP**: Painel 360, Indicadores CRM, Performance Venda, Indicadores de atendimento
  - **Campanhas Criação**: Campanhas pontuais, Jornadas, Biblioteca de templates, etc.
  - **Campanhas Performance**: Relatórios de email, SMS, WhatsApp, etc.
  - **IA**: ChatCRM, Propensão de cliente

### Tabelas do Sistema
- `modules` - Catálogo de módulos da plataforma
- `clients` - Cadastro de clientes/marcas
- `client_contracts` - Contrato (universo de módulos do cliente)
- `access_profiles` - Perfis de acesso criados pelo cliente
- `profile_permissions` - Módulos atribuídos a cada perfil
- `users` - Usuários finais

### Lógica de Segurança
- **Hard Ceiling Rule**: Acesso do usuário ≤ Contrato do cliente
- Queries SQL otimizadas para verificação de acesso
- Diagramas ER completos

## 🎯 Objetivo

Fornecer uma especificação técnica clara e detalhada para o time de desenvolvimento implementar o sistema de controle de acesso baseado em contrato.

## 📝 Estrutura do Projeto

```
saas-access-control/
├── docs/
│   ├── README.md                          # Índice da documentação
│   ├── architecture_design_pt_br.md       # Especificação PT-BR
│   ├── architecture_design.md             # Especificação EN
│   ├── architecture_design_pt_br.html     # HTML renderizado
│   └── index.html                         # Visualizador interativo
├── .git/                                  # Controle de versão
├── .gitignore                             # Arquivos ignorados
└── README.md                              # Este arquivo
```

## 🔄 Versionamento

Este projeto usa Git para controle de versão. Todas as alterações na arquitetura devem ser documentadas e versionadas.

---

**Nota**: Este é um projeto de **documentação apenas**. Para implementação, consulte os arquivos na pasta `docs/`.
