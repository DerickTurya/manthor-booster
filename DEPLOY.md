# ManThor - Deployment Guide

## 🚀 Deploy com GitHub Pages e Domínio manthor.app

### Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **New repository** (ou visite: https://github.com/new)
3. Defina o nome do repositório (ex: `manthor-site`)
4. Deixe como **Public** (necessário para GitHub Pages grátis)
5. **NÃO** marque "Add a README file"
6. Clique em **Create repository**

### Passo 2: Fazer Upload dos Arquivos

**Opção A - Via Interface Web (Mais Fácil):**

1. No repositório criado, clique em **uploading an existing file**
2. Arraste TODOS os arquivos da pasta do projeto:
   - `index.html`
   - `login.html`
   - `lembretes.html`
   - `dieta.html`
   - `comprar.html`
   - `acompanhamento.html`
   - `server.js`
   - `package.json`
   - `.nojekyll`
   - `CNAME`
   - `.gitignore`
   - Pasta `images/` (se existir)
3. Clique em **Commit changes**

**Opção B - Via Git (Linha de Comando):**

```powershell
# No diretório do projeto, execute:
git init
git add .
git commit -m "Initial commit - ManThor site"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/manthor-site.git
git push -u origin main
```

### Passo 3: Ativar GitHub Pages

1. No repositório, vá em **Settings** (Configurações)
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
4. Clique em **Save**
5. Aguarde 1-2 minutos - aparecerá a mensagem: "Your site is live at https://seu-usuario.github.io/manthor-site/"

### Passo 4: Configurar Domínio manthor.app

#### 4.1 - Registrar o Domínio

1. Acesse um registrador de domínios `.app`:
   - [Google Domains](https://domains.google) (recomendado)
   - [Namecheap](https://namecheap.com)
   - [GoDaddy](https://godaddy.com)
2. Procure por `manthor.app`
3. Complete a compra do domínio

#### 4.2 - Configurar DNS

No painel do seu registrador de domínio, adicione os seguintes registros DNS:

**Tipo A (4 registros):**
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

**Tipo CNAME (1 registro):**
```
CNAME    www    seu-usuario.github.io
```

#### 4.3 - Configurar no GitHub Pages

1. Volte ao GitHub → Settings → Pages
2. Em **Custom domain**, digite: `manthor.app`
3. Clique em **Save**
4. Marque a opção **Enforce HTTPS** (aguarde alguns minutos se não estiver disponível)

### Passo 5: Aguardar Propagação

- DNS pode levar de **10 minutos a 48 horas** para propagar
- Teste no navegador: `https://manthor.app`
- Se não funcionar imediatamente, aguarde algumas horas

---

## ⚠️ IMPORTANTE: Sobre o Backend

O **GitHub Pages** só hospeda arquivos estáticos (HTML, CSS, JS).

Para o backend (`server.js` - autenticação, banco de dados), você precisará:

### Opção 1: Backend Separado (Recomendado)

**Hospedar o backend em plataforma gratuita:**

1. **Railway.app** (recomendado):
   - Crie conta em [railway.app](https://railway.app)
   - New Project → Deploy from GitHub
   - Selecione apenas `server.js` e `package.json`
   - Pegue a URL gerada (ex: `https://manthor-api.railway.app`)

2. **Render.com**:
   - Crie conta em [render.com](https://render.com)
   - New Web Service → Connect repository
   - Start Command: `node server.js`

3. **Vercel** (para APIs):
   - `npm install -g vercel`
   - `vercel --prod`

**Atualizar os arquivos HTML:**

Nos arquivos que fazem chamadas à API (`login.html`, `dieta.html`, etc.), altere:

```javascript
// De:
fetch('/auth/login', { ... })

// Para:
fetch('https://manthor-api.railway.app/auth/login', { ... })
```

### Opção 2: Tudo no Railway/Render

Se preferir hospedar tudo junto (frontend + backend):

1. Use **Railway** ou **Render** para hospedar o projeto completo
2. Configure o domínio `manthor.app` direto na plataforma
3. Não use GitHub Pages

---

## 📋 Checklist Final

- [ ] Repositório GitHub criado
- [ ] Arquivos enviados para o GitHub
- [ ] GitHub Pages ativado
- [ ] Domínio `manthor.app` registrado
- [ ] DNS configurado (4 registros A + 1 CNAME)
- [ ] Custom domain adicionado no GitHub Pages
- [ ] HTTPS habilitado
- [ ] Backend hospedado separadamente (Railway/Render)
- [ ] URLs da API atualizadas nos arquivos HTML
- [ ] Site testado em `https://manthor.app`

---

## 🆘 Problemas Comuns

**1. Site não carrega após configurar domínio:**
- Aguarde propagação DNS (até 48h)
- Verifique se os 4 registros A estão corretos
- Confirme que HTTPS está habilitado no GitHub Pages

**2. Erro 404 nas páginas:**
- Certifique-se que `.nojekyll` foi enviado
- Verifique se os arquivos HTML estão na raiz do repositório

**3. Login não funciona:**
- Backend precisa estar hospedado separadamente
- Atualize as URLs das chamadas `fetch()` nos arquivos HTML

**4. Domínio não conecta:**
- Verifique se `CNAME` contém exatamente: `manthor.app`
- Confirme a configuração DNS no registrador

---

## 💰 Custos

- **GitHub Pages:** Grátis
- **Domínio .app:** ~$12-15/ano
- **Backend Railway:** Grátis (até 500h/mês)
- **Backend Render:** Grátis (com limitações)

**Total estimado:** $12-15/ano (apenas o domínio)

---

## 🎯 Próximos Passos

1. Siga os passos 1-5 acima
2. Registre `manthor.app`
3. Configure DNS
4. Hospede backend no Railway
5. Atualize URLs da API
6. Teste tudo em `https://manthor.app`

Está tudo pronto para deploy! 🚀
