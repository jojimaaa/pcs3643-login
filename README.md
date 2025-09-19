# PCS3643 - Laboratório de Engenharia de Software

## Geral
Requisitos:
- git
---

1. Instale o chocolatey e o Node.js

Abra o powershell e digite os seguinte comandos para instalar o chocolatey e o Node.js:
```powershell
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
```
```powershell
choco install nodejs-lts --version="22"
```
</br>

2. Instale o Python3
```powershell
winget install -e --id Python.Python.3.12
```
</br>

3. Instale o PostgreSQL
```powershell
winget install -e --id PostgreSQL.PostgreSQL
```
</br>

4. Clone o repositório
```powershell
git clone https://github.com/jojimaaa/pcs3643-login
```
</br>

5. Entre no repositório
```powershell
cd pcs3643-login
```

## Frontend - Enzo Koichi Jojima (14568285)
1. Entrar no repositório do frontend
```powershell
cd frontend-login
```
</br>

2. Instalar as dependências
```powershell
npm install
```
</br>

3. Rodar o projeto
```powershell
npm run build
npm run start
```

</br>

4. Acesse o site
Entre em [localhost:3000](http://localhost:3000) para acessar o site.

---
## Backend - Eduardo Ribeiro do Amparo Rodrigues de Souza (14567346)
1. Entre no diretório backend-login
```powershell
cd pcs3643-login/backend-login
```
</br>

2. Permitir ativação de venv
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```
</br>

3. Criar e ativar venv
```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```
</br>

4. Atualizar pip da venv
```powershell
py -m pip install --upgrade pip
```
</br>

5. Instalar dependências do backend
```powershell
py -m pip install fastapi "uvicorn[standard]" sqlmodel "psycopg[binary]" alembic python-dotenv "python-jose[cryptography]" "passlib[bcrypt]" pydantic[email] python-multipart watchfiles
```
</br>

6. Definir variáveis de ambiente
```powershell
$env:JWT_KEY = "pcs3643_jwtkey_123456789_abcdefg"
$env:DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/pcs3643"
```
</br>


7. Criar banco de dados
```powershell
psql -U postgres -h localhost -c "CREATE DATABASE pcs3643;"
```
</br>

8. Rodar backend
```powershell
py -m uvicorn app.main:app --reload --port 8000
```
</br>