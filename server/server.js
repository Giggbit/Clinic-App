const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Неверный логин или пароль' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
