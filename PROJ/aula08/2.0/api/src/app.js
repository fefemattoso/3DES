const express = require('express');
const cors = require('cors');

const automoveisRoutes = require('./routes/automoveisRoutes');
const areasRoutes = require('./routes/areasRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const concessionariasRoutes = require('./routes/concessionariasRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/automoveis', automoveisRoutes);
app.use('/areas', areasRoutes);
app.use('/clientes', clientesRoutes);
app.use('/concessionarias', concessionariasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
