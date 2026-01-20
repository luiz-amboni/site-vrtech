<div align="center">

  <h1>VEAR TECH</h1>
  
  <p><strong>Soluções Tecnológicas Corporativas e Governamentais</strong></p>
  <p>Landing Page Institucional com sistema de captura de leads integrado.</p>

</div>

<div align="center">
  <img src="https://img.shields.io/badge/node.js-%3E%3D%2014.0.0-green" alt="Node Version"/>
  <img src="https://img.shields.io/badge/express-4.18.2-blue" alt="Express Version"/>
  <img src="https://img.shields.io/badge/frontend-HTML5%20%2B%20Tailwind-orange" alt="Frontend"/>
  <img src="https://img.shields.io/badge/license-ISC-lightgrey" alt="License"/>
</div>

---

## 🎯 Sobre o Projeto

A **Vear Tech** é uma aplicação web composta por uma Landing Page institucional de alta performance e um Backend leve para gerenciamento de contatos. O projeto visa apresentar soluções em Realidade Virtual e Hardware para o setor corporativo (B2B) e governamental.

---

## ✨ Funcionalidades

- **🎨 Interface Moderna:** Design responsivo utilizando Tailwind CSS e animações suaves (Scroll Reveal).
- **📝 Captura de Leads:** Formulário de contato funcional integrado ao backend.
- **server-side:** API RESTful construída com Express para processar dados do formulário.
- **💾 Persistência de Dados:** Armazenamento local de contatos em arquivo JSON (`contacts.json`), sem necessidade de banco de dados complexo para o MVP.
- **📱 Mobile First:** Menu de navegação adaptável e otimizado para dispositivos móveis.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza uma arquitetura simples e eficiente:

*   **Frontend:** HTML5, JavaScript (Vanilla), Tailwind CSS (via CDN).
*   **Backend:** Node.js, Express.
*   **Utilitários:** Cors, File System (fs/promises).

---

## 📦 Instalação e Execução

Siga os passos abaixo para rodar o projeto em sua máquina local.

### Pré-requisitos

- Node.js instalado.

### Passo a Passo

1.  **Instale as dependências do Backend:**
    Abra o terminal na pasta raiz do projeto e execute:
    ```bash
    npm install
    ```

2.  **Inicie o Servidor (API):**
    ```bash
    npm start
    ```
    *O servidor iniciará em `http://localhost:3000`.*

3.  **Acesse o Frontend:**
    Como o frontend é estático (HTML), você pode simplesmente abrir o arquivo `index.html` no seu navegador.
    
    > **Dica:** Para uma melhor experiência (e evitar bloqueios de CORS em alguns navegadores), recomenda-se usar uma extensão como "Live Server" no VS Code para servir o `index.html`.

---

## 📂 Estrutura de Arquivos

----
----
*   `server.js`: Ponto de entrada da API Backend.
*   `index.html`: Página principal (Landing Page).
*   `main.js`: Lógica do frontend (menu, scroll, envio de formulário).
*   `contacts.json`: "Banco de dados" local onde os leads são salvos.
