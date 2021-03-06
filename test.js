const clannad = require('./entry');

clannad.configDB((mongoose) => {
  // connection with mongodb
  mongoose.connect('mongodb://127.0.0.1:27017/clannad');
});

clannad.configIO({
  db: 'clannad',
  host: '127.0.0.1',
  port: 27017
});

clannad.auth((ctx, authArr) => {
  process.stderr.write(`need auth: ${authArr}\n`);
  return authArr.slice();
});

clannad.app.listen(3000, () => {
  process.stderr.write(`Server running at http://localhost:3000\n`);
});
