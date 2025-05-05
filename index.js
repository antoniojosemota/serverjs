const express = require('express');
const axios = require('axios');
const app = express();

// Middleware para ler JSON (deixa para futuras melhorias)
app.use(express.json());

// URL do seu Realtime Database Firebase (modifique aqui)
const FIREBASE_URL = 'https://pico-bussola-default-rtdb.firebaseio.com/';

function codificarDirecao(direcao) {
  const mapa = {
     "NORTE": 0,
    "NORDESTE": 45,
    "LESTE": 90,
    "SUDESTE": 135,
    "SUL": 180,
    "SUDOESTE": 225,
    "OESTE": 270,
    "NOROESTE": 315,
    "CENTRO": 0
  };
  return mapa[direcao.toUpperCase()] ?? -1; // Retorna -1 se direção for inválida
}

// Rota que recebe os dados do Pico W
app.get('/update', async (req, res) => {
  const { direction, buttonState, sensor } = req.query;
  const direcaoCodigo = codificarDirecao(direction);
  if (!direction || !buttonState || !sensor) {
    return res.status(400).send('Erro: Temperatura e umidade são obrigatórias.');
  }

  console.log(`Recebido (via /update): Direção = ${direction}, Botão = ${buttonState} e Sensor = ${sensor}`);

  try {
    await axios.post(`${FIREBASE_URL}/leituras.json`, {
      direcao: direction,
      direcao_code: direcaoCodigo,
      botao: buttonState,
      sensor: sensor,
      timestamp: new Date().toISOString()
    });

    res.send('Dados recebidos (via /update) e enviados ao Firebase com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar para o Firebase:', error.message);
    res.status(500).send('Erro ao enviar dados para o Firebase.');
  }
});
// Porta padrão (Railway usa variável de ambiente PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
