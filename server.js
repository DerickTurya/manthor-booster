const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'manthor_secret_key_2025_viking_power_' + Math.random();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Banco de dados SQLite
const db = new sqlite3.Database('./manthor.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
  } else {
    console.log('✅ Banco de dados conectado');
  }
});

// Criar tabelas
db.serialize(() => {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de dados do cliente
  db.run(`
    CREATE TABLE IF NOT EXISTS user_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      age INTEGER,
      weight REAL,
      height REAL,
      goal TEXT,
      routine_history TEXT,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Tabela de lembretes
  db.run(`
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      time TEXT NOT NULL,
      frequency TEXT NOT NULL,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('✅ Tabelas criadas/verificadas');
});

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ========== ROTAS DE AUTENTICAÇÃO ==========

// Cadastro
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validations
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (user) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.run(
        'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
        [name, email, phone, hashedPassword],
        function(err) {
          if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
          }

          const userId = this.lastID;

          // Criar registro inicial de dados do usuário
          db.run(
            'INSERT INTO user_data (user_id) VALUES (?)',
            [userId],
            (err) => {
              if (err) {
                console.error('Erro ao criar user_data:', err);
              }
            }
          );

          // Generate token
          const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

          res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: userId, name, email, phone }
          });
        }
      );
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone }
      });
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// ========== ROTAS PROTEGIDAS ==========

// Obter dados do usuário
app.get('/api/user', authenticate, (req, res) => {
  db.get(
    `SELECT u.id, u.name, u.email, u.created_at, 
            ud.age, ud.weight, ud.height, ud.goal, ud.routine_history 
     FROM users u 
     LEFT JOIN user_data ud ON u.id = ud.user_id 
     WHERE u.id = ?`,
    [req.userId],
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(user);
    }
  );
});

// Atualizar dados do usuário
app.put('/api/user/data', authenticate, (req, res) => {
  const { age, weight, height, goal } = req.body;

  db.run(
    `UPDATE user_data 
     SET age = ?, weight = ?, height = ?, goal = ?, last_updated = CURRENT_TIMESTAMP 
     WHERE user_id = ?`,
    [age, weight, height, goal, req.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar dados' });
      }
      res.json({ message: 'Dados atualizados com sucesso' });
    }
  );
});

// Salvar rotina calculada
app.post('/api/user/routine', authenticate, (req, res) => {
  const { routine } = req.body;

  db.get(
    'SELECT routine_history FROM user_data WHERE user_id = ?',
    [req.userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar histórico' });
      }

      let history = [];
      if (row && row.routine_history) {
        try {
          history = JSON.parse(row.routine_history);
        } catch (e) {
          history = [];
        }
      }

      history.unshift({
        routine,
        timestamp: new Date().toISOString()
      });

      // Manter apenas últimas 10 rotinas
      history = history.slice(0, 10);

      db.run(
        'UPDATE user_data SET routine_history = ? WHERE user_id = ?',
        [JSON.stringify(history), req.userId],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Erro ao salvar rotina' });
          }
          res.json({ message: 'Rotina salva com sucesso' });
        }
      );
    }
  );
});

// Obter lembretes
app.get('/api/reminders', authenticate, (req, res) => {
  db.all(
    'SELECT * FROM reminders WHERE user_id = ? ORDER BY time',
    [req.userId],
    (err, reminders) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar lembretes' });
      }
      res.json(reminders);
    }
  );
});

// Criar lembrete
app.post('/api/reminders', authenticate, (req, res) => {
  const { time, frequency } = req.body;

  db.run(
    'INSERT INTO reminders (user_id, time, frequency) VALUES (?, ?, ?)',
    [req.userId, time, frequency],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar lembrete' });
      }
      res.status(201).json({ 
        message: 'Lembrete criado com sucesso',
        id: this.lastID 
      });
    }
  );
});

// Deletar lembrete
app.delete('/api/reminders/:id', authenticate, (req, res) => {
  db.run(
    'DELETE FROM reminders WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar lembrete' });
      }
      res.json({ message: 'Lembrete deletado com sucesso' });
    }
  );
});

// Servir páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🔥 MANTHOR SERVER ATIVO 🔥         ║
║                                       ║
║   Servidor: Port ${PORT}              ║
║   Banco de dados: SQLite (manthor.db) ║
║   API: REST + JWT Authentication      ║
║                                       ║
║   🪓  Viking Power Activated! 🪓       ║
╚═══════════════════════════════════════╝
  `);
  console.log(`🚀 Server running on port ${PORT}`);
});
