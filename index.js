var app = require('./config')();

app.listen(3001, function(){
  console.log('Servidor rodando na porta 3001.');
});