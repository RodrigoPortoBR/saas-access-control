# Especificação Técnica: Arquitetura de Controle de Acesso SaaS

## 1. Resumo Executivo
Este documento define a arquitetura para o sistema de **Controle de Acesso Baseado em Contrato**. Este sistema é a camada de segurança fundamental para nossa plataforma SaaS, garantindo que o acesso a recursos seja estritamente limitado pelos contratos do cliente antes que quaisquer permissões em nível de usuário sejam aplicadas.

**Objetivo Chave**: Impor um "Teto Rígido" (Hard Ceiling) onde `Acesso do Usuário <= Contrato do Cliente`.

## 2. Definições Principais

| Termo | Definição |
| :--- | :--- |
| **Módulo** | Um conjunto de recursos distinto e vendável (ex: `email`, `crm`, `analytics`). Identificado por uma `chave` única. |
| **Cliente** | Um locatário/conta empresarial. |
| **Escopo do Contrato** | O conjunto de Módulos que um Cliente comprou. Este é o **Acesso Máximo Possível** para qualquer usuário nesse cliente. |
| **Permissão do Usuário** | O conjunto de Módulos que um Usuário específico tem permissão para acessar. |

## 3. Modelo de Dados Otimizado

### 3.1 Tabela: `modules` (Catálogo de Módulos)
Lista completa de todos os módulos disponíveis na plataforma.

| id | nome | categoria | descricao |
|:---|:-----|:----------|:----------|
| 0001 | Relatório Email | Relatórios | Análise de campanhas de email |
| 0002 | Relatório SMS | Relatórios | Análise de campanhas SMS |
| 0003 | Relatório WhatsApp | Relatórios | Análise de campanhas WhatsApp |
| 0004 | CDP | Plataforma | Customer Data Platform |
| 0005 | Envio Email | Envios | Ferramenta de envio de email |
| 0006 | Envio SMS | Envios | Ferramenta de envio SMS |

**Schema:**
```sql
CREATE TABLE modules (
  id VARCHAR(10) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),
  descricao TEXT
);
```

---

### 3.2 Tabela: `clients` (Clientes/Marcas)
Cadastro de todos os clientes da plataforma.

| id | nome | status | data_contrato |
|:---|:-----|:-------|:--------------|
| 0001 | Via Mia | Ativo | 2024-01-15 |
| 0002 | Empresa XYZ | Ativo | 2024-03-20 |
| 0003 | Marca ABC | Inativo | 2023-11-10 |

**Schema:**
```sql
CREATE TABLE clients (
  id VARCHAR(10) PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  status VARCHAR(20) DEFAULT 'Ativo',
  data_contrato DATE
);
```

---

### 3.3 Tabela: `client_contracts` (Contrato = Universo do Cliente)
Define quais módulos cada cliente contratou. **Este é o "teto rígido"**.

| client_id | module_id | module_name | data_ativacao | data_expiracao |
|:----------|:----------|:------------|:--------------|:---------------|
| 0001 | 0001 | Relatório Email | 2024-01-15 | NULL |
| 0001 | 0002 | Relatório SMS | 2024-01-15 | NULL |
| 0001 | 0005 | Envio Email | 2024-01-15 | NULL |
| 0002 | 0001 | Relatório Email | 2024-03-20 | NULL |
| 0002 | 0004 | CDP | 2024-03-20 | NULL |

**Exemplo**: Via Mia (0001) tem acesso a Relatório Email, Relatório SMS e Envio Email.

**Nota**: O campo `module_name` é desnormalizado para facilitar consultas. É derivado de `modules.nome` via FK.

**Schema:**
```sql
CREATE TABLE client_contracts (
  client_id VARCHAR(10) NOT NULL,
  module_id VARCHAR(10) NOT NULL,
  module_name VARCHAR(100) NOT NULL, -- Desnormalizado de modules.nome
  data_ativacao DATE,
  data_expiracao DATE,
  PRIMARY KEY (client_id, module_id),
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE INDEX idx_client_contract ON client_contracts(client_id);
```

---

### 3.4 Tabela: `access_profiles` (Perfis de Acesso)
Perfis criados pela marca para agrupar permissões.

| id | client_id | nome | descricao |
|:---|:----------|:-----|:----------|
| 0001 | 0001 | Marketing | Acesso a relatórios de campanhas |
| 0002 | 0001 | Operações | Acesso a envios e relatórios |
| 0003 | 0002 | Analista | Acesso completo |

**Schema:**
```sql
CREATE TABLE access_profiles (
  id VARCHAR(10) PRIMARY KEY,
  client_id VARCHAR(10) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE INDEX idx_profile_client ON access_profiles(client_id);
```

---

### 3.5 Tabela: `profile_permissions` (Módulos do Perfil)
Define quais módulos cada perfil pode acessar. **Deve ser subconjunto do contrato**.

| profile_id | module_id | module_name |
|:-----------|:----------|:------------|
| 0001 | 0001 | Relatório Email |
| 0001 | 0002 | Relatório SMS |
| 0002 | 0001 | Relatório Email |
| 0002 | 0002 | Relatório SMS |
| 0002 | 0005 | Envio Email |

**Exemplo**: Perfil "Marketing" (0001) da Via Mia tem acesso apenas aos relatórios.

**Nota**: O campo `module_name` é desnormalizado para facilitar consultas. É derivado de `modules.nome` via FK.

**Schema:**
```sql
CREATE TABLE profile_permissions (
  profile_id VARCHAR(10) NOT NULL,
  module_id VARCHAR(10) NOT NULL,
  module_name VARCHAR(100) NOT NULL, -- Desnormalizado de modules.nome
  PRIMARY KEY (profile_id, module_id),
  FOREIGN KEY (profile_id) REFERENCES access_profiles(id),
  FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE INDEX idx_profile_perms ON profile_permissions(profile_id);
```

---

### 3.6 Tabela: `users` (Usuários)
Usuários finais vinculados a um cliente e perfil.

| id | client_id | profile_id | email | nome | funcao | status | last_login |
|:---|:----------|:-----------|:------|:-----|:-------|:-------|:-----------|
| 1234 | 0001 | 0001 | sellbie@viamia.com.br | João Silva | Vendedor | Ativo | 2024-11-25 10:30:00 |
| 1235 | 0001 | 0002 | maria@viamia.com.br | Maria Santos | Gerente | Ativo | 2024-11-24 15:45:00 |
| 1236 | 0002 | 0003 | ana@xyz.com | Ana Costa | Analista | Ativo | 2024-11-25 09:15:00 |

**Schema:**
```sql
CREATE TABLE users (
  id VARCHAR(10) PRIMARY KEY,
  client_id VARCHAR(10) NOT NULL,
  profile_id VARCHAR(10),
  email VARCHAR(200) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  funcao VARCHAR(100),
  status VARCHAR(20) DEFAULT 'Ativo',
  last_login TIMESTAMP, -- Registro do último acesso
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (profile_id) REFERENCES access_profiles(id)
);

CREATE INDEX idx_user_client ON users(client_id);
CREATE INDEX idx_user_profile ON users(profile_id);
CREATE INDEX idx_user_last_login ON users(last_login); -- Para queries de atividade
```

---

## 4. Lógica de Acesso Otimizada

### 4.1 Query de Verificação (1 JOIN apenas)
```sql
-- Verifica se usuário 1234 pode acessar módulo 0001
SELECT 
  u.id as user_id,
  u.nome as user_name,
  m.id as module_id,
  m.nome as module_name,
  CASE 
    WHEN cc.module_id IS NULL THEN 'NEGADO - Módulo não contratado'
    WHEN pp.module_id IS NULL THEN 'NEGADO - Perfil sem permissão'
    ELSE 'PERMITIDO'
  END as resultado
FROM users u
LEFT JOIN client_contracts cc 
  ON u.client_id = cc.client_id AND cc.module_id = '0001'
LEFT JOIN profile_permissions pp 
  ON u.profile_id = pp.profile_id AND pp.module_id = '0001'
CROSS JOIN modules m
WHERE u.id = '1234' AND m.id = '0001';
```

### 4.2 Query: Listar Módulos Disponíveis para Usuário
```sql
-- Lista todos os módulos que o usuário 1234 pode acessar
SELECT DISTINCT
  m.id,
  m.nome,
  m.categoria
FROM users u
JOIN profile_permissions pp ON u.profile_id = pp.profile_id
JOIN modules m ON pp.module_id = m.id
JOIN client_contracts cc ON u.client_id = cc.client_id AND m.id = cc.module_id
WHERE u.id = '1234' AND u.status = 'Ativo';
```

---

## 5. Diagrama Otimizado

```mermaid
erDiagram
    MODULES {
        varchar id PK "0001, 0002, 0003..."
        varchar nome "Relatório Email, CDP..."
        varchar categoria
    }

    CLIENTS {
        varchar id PK "0001, 0002..."
        varchar nome "Via Mia, Empresa XYZ..."
        varchar status
    }

    CLIENT_CONTRACTS {
        varchar client_id FK
        varchar module_id FK
        varchar module_name "Desnormalizado"
        date data_ativacao
    }

    ACCESS_PROFILES {
        varchar id PK "0001, 0002..."
        varchar client_id FK
        varchar nome "Marketing, Operações..."
    }

    PROFILE_PERMISSIONS {
        varchar profile_id FK
        varchar module_id FK
        varchar module_name "Desnormalizado"
    }

    USERS {
        varchar id PK "1234, 1235..."
        varchar client_id FK
        varchar profile_id FK
        varchar email
        varchar nome "João Silva..."
        varchar funcao "Vendedor..."
        varchar status "Ativo/Inativo"
        timestamp last_login "Último acesso"
    }

    %% Relacionamentos
    CLIENTS ||--o{ CLIENT_CONTRACTS : "contrata"
    MODULES ||--o{ CLIENT_CONTRACTS : "incluído em"
    
    CLIENTS ||--o{ ACCESS_PROFILES : "define"
    ACCESS_PROFILES ||--o{ PROFILE_PERMISSIONS : "contém"
    MODULES ||--o{ PROFILE_PERMISSIONS : "acessível via"
    
    CLIENTS ||--o{ USERS : "emprega"
    ACCESS_PROFILES ||--o{ USERS : "atribuído a"

    %% Regra de Negócio
    CLIENT_CONTRACTS ||..|| PROFILE_PERMISSIONS : "REGRA: profile_permissions.module_id DEVE existir em client_contracts"
```

---

## 6. Vantagens desta Arquitetura

✅ **Performance**: Queries com 1-2 JOINs apenas, usando índices otimizados  
✅ **Escalabilidade**: Estrutura horizontal permite milhões de registros  
✅ **Clareza**: IDs numéricos facilitam rastreamento e debugging  
✅ **Segurança**: Validação em 2 camadas (Contrato → Perfil)  
✅ **Flexibilidade**: Fácil adicionar/remover módulos do contrato ou perfil
