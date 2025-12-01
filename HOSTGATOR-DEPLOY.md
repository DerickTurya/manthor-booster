# 🚀 Deploy ManThor na HostGator

## Guia Completo: Hospedar Site + Backend na HostGator com manthor.app

---

## ✅ Passo 1: Domínio manthor.app (JÁ REGISTRADO)

Você já tem o domínio **manthor.app** registrado! Perfeito! 🎉

Agora vamos direto para fazer upload dos arquivos.

---

## 📦 Passo 2: Fazer Upload dos Arquivos

### 2.1 - Acessar o cPanel

1. No portal da HostGator, vá em **"Hospedagem"**
2. Clique em **"Gerenciar"** no seu plano
3. Clique em **"cPanel"** (ícone laranja)

### 2.2 - Criar Pasta para o Site (Opcional)

Se você quiser criar uma pasta específica para o manthor.app:

1. No cPanel, clique em **"File Manager"** (Gerenciador de Arquivos)
2. Entre na pasta `public_html`
3. Clique em **"+ Folder"** (Nova Pasta)
4. Nome: `manthor.app`
5. Clique em **"Create New Folder"**

**OU use direto o `public_html` se for o domínio principal.**

### 2.3 - Fazer Upload dos Arquivos

1. Ainda no File Manager, entre na pasta escolhida (`public_html` ou `public_html/manthor.app`)
2. Clique em **"Upload"** no topo
3. Arraste ou selecione TODOS os arquivos do projeto:
   ```
   ✅ index.html
   ✅ login.html
   ✅ lembretes.html
   ✅ dieta.html
   ✅ comprar.html
   ✅ acompanhamento.html
   ✅ server.js
   ✅ package.json
   ✅ package-lock.json
   ✅ styles.css
   ✅ script.js
   ✅ sw.js
   ✅ .gitignore
   ✅ Pasta assets/ (com todas as imagens)
   ```

4. **NÃO envie:**
   - ❌ `.nojekyll` (só para GitHub)
   - ❌ `CNAME` (só para GitHub)
   - ❌ `vercel.json` (só para Vercel)
   - ❌ `DEPLOY.md`, `README.md` (opcionais)
   - ❌ `node_modules/` (será instalado depois)
   - ❌ `manthor.db` (será criado automaticamente)

5. Aguarde o upload finalizar (pode levar alguns minutos dependendo da conexão)

---

## ⚙️ Passo 3: Configurar Node.js no HostGator

### 3.1 - Acessar Setup Node.js App

1. Volte ao cPanel principal
2. Na busca do cPanel, digite: **"Node.js"**
3. Clique em **"Setup Node.js App"**

### 3.2 - Criar Aplicação Node.js

1. Clique em **"Create Application"** (Criar Aplicação)

2. **Preencha os campos:**

   - **Node.js version:** Selecione `18.x` ou `20.x` (mais recente disponível)
   
   - **Application mode:** `Production`
   
   - **Application root:** 
     - Se usou `public_html`: `/home/seu_usuario/public_html`
     - Se criou pasta: `/home/seu_usuario/public_html/manthor.app`
   
   - **Application URL:** `manthor.app` (ou deixe em branco se for domínio principal)
   
   - **Application startup file:** `server.js`
   
   - **Passenger log file:** (deixe padrão)

3. Clique em **"Create"** (Criar)

### 3.3 - Configurar Porta

O HostGator usa Apache/Passenger que escuta automaticamente na porta que o sistema define. Você precisa ajustar o `server.js`:

**Volte ao File Manager e edite o `server.js`:**

Procure a linha:
```javascript
const PORT = process.env.PORT || 3000;
```

Altere para:
```javascript
const PORT = process.env.PORT || 3000;

// Para HostGator/Passenger
if (process.env.PASSENGER_APP_ENV) {
    app.listen(0); // Passenger gerencia a porta
} else {
    app.listen(PORT, () => {
        // ... seu código atual
    });
}
```

Ou simplesmente use:
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT);
```

### 3.4 - Instalar Dependências

1. Volte para **"Setup Node.js App"** no cPanel
2. Clique na aplicação que você criou
3. Na seção **"Detected configuration files"**, você verá `package.json`
4. Clique em **"Run NPM Install"**
5. Aguarde a instalação (pode levar 2-5 minutos)

### 3.5 - Iniciar a Aplicação

1. Depois da instalação, clique em **"Start"** ou **"Restart"**
2. Aguarde alguns segundos
3. Status deve aparecer como **"Running"** (Verde)

---

## 🌐 Passo 4: Configurar o Domínio manthor.app

### 4.1 - Adicionar Domínio (se necessário)

Se `manthor.app` não for seu domínio principal:

1. No cPanel, procure por **"Addon Domains"** ou **"Domínios Adicionais"**
2. Clique e preencha:
   - **New Domain Name:** `manthor.app`
   - **Subdomain:** (deixe em branco ou como `manthor`)
   - **Document Root:** `/public_html/manthor.app` (ou onde estão os arquivos)
3. Clique em **"Add Domain"**

### 4.2 - Configurar SSL (HTTPS)

1. No cPanel, procure por **"SSL/TLS Status"** ou **"Let's Encrypt SSL"**
2. Selecione o domínio `manthor.app`
3. Clique em **"Run AutoSSL"** ou **"Install"**
4. Aguarde a instalação do certificado SSL (1-5 minutos)
5. Seu site agora terá HTTPS: `https://manthor.app` 🔒

---

## 🗄️ Passo 5: Verificar Banco de Dados

O banco de dados SQLite (`manthor.db`) será criado automaticamente quando o servidor iniciar.

**Verificar:**

1. No File Manager, vá até a pasta onde está o `server.js`
2. Após a primeira execução, você verá o arquivo `manthor.db`
3. Se não aparecer, verifique os logs de erro

---

## 🔍 Passo 6: Testar o Site

1. Acesse: `https://manthor.app`
2. Teste as funcionalidades:
   - ✅ Página inicial carrega
   - ✅ Calculadora funciona
   - ✅ Cadastro/Login funciona
   - ✅ Sistema de lembretes
   - ✅ Gerador de dieta
   - ✅ Página de compra
   - ✅ Imagens carregam

---

## 🆘 Problemas Comuns e Soluções

### 1. **Site não carrega / Erro 500**

**Causa:** Aplicação Node.js não está rodando ou erro no código

**Solução:**
- Vá em **Setup Node.js App** → Clique na aplicação → **Restart**
- Verifique os logs em **"View Logs"**
- Certifique-se que `server.js` está configurado corretamente

### 2. **"Cannot find module" ou "Module not found"**

**Causa:** Dependências não instaladas

**Solução:**
- Vá em **Setup Node.js App** → Clique em **"Run NPM Install"** novamente
- Aguarde completar

### 3. **Erro "EADDRINUSE" (porta em uso)**

**Causa:** Tentando usar porta fixa

**Solução:**
- Edite `server.js` e use `process.env.PORT`
- Certifique-se de ter a configuração para Passenger (passo 3.3)

### 4. **Login não funciona / Database error**

**Causa:** Permissões do arquivo `manthor.db`

**Solução:**
- No File Manager, selecione `manthor.db`
- Clique em **"Permissions"**
- Defina para `644` ou `666`

### 5. **CSS/JS não carregam**

**Causa:** Caminhos incorretos

**Solução:**
- Verifique se os arquivos `styles.css`, `script.js` estão na mesma pasta do HTML
- Verifique os links nos arquivos HTML: devem ser relativos (`./styles.css` ou `styles.css`)

### 6. **Imagens não aparecem**

**Causa:** Pasta `assets/` não foi enviada ou caminho errado

**Solução:**
- Certifique-se que a pasta `assets/` está no mesmo diretório
- Verifique os caminhos no HTML: `./assets/imagem.png`

---

## 📊 Monitoramento

### Ver Logs de Erro:

1. **Setup Node.js App** → Clique na aplicação
2. Role até **"Logs"**
3. Clique em **"View Logs"**
4. Verifique erros de execução

### Reiniciar Aplicação:

Sempre que fizer alterações no código:
1. **Setup Node.js App** → Clique na aplicação
2. Clique em **"Restart"**

---

## 💰 Custos Totais

- **Domínio .app:** R$ 60-80/ano
- **Hospedagem HostGator:** Seu plano atual (já pago)
- **Total:** R$ 60-80/ano

---

## 🎯 Checklist Final

- [ ] Domínio `manthor.app` registrado na HostGator
- [ ] Arquivos enviados para `public_html` via File Manager
- [ ] Node.js App criado no cPanel
- [ ] Dependências instaladas (`npm install`)
- [ ] Aplicação Node.js rodando (status "Running")
- [ ] Domínio configurado (Addon Domains ou principal)
- [ ] SSL/HTTPS ativado
- [ ] Site testado em `https://manthor.app`
- [ ] Login/cadastro funcionando
- [ ] Dieta e calculadora operacionais
- [ ] Imagens carregando corretamente

---

## 🚀 Próximos Passos

1. Registre `manthor.app` na HostGator
2. Faça upload dos arquivos
3. Configure Node.js App
4. Instale dependências
5. Inicie a aplicação
6. Configure SSL
7. Teste tudo!

**Seu site estará 100% funcional em `https://manthor.app`!** 🔥

---

## 📞 Suporte HostGator

Se precisar de ajuda:
- **Chat ao vivo:** No portal da HostGator
- **Telefone:** 0800 942 2655
- **Email:** suporte@hostgator.com.br
- **Tutoriais:** https://suporte.hostgator.com.br

---

✅ **Está tudo pronto para o deploy na HostGator!**
