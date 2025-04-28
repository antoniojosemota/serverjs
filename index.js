const express = require('express');
const axios = require('axios');
const app = express();

// Middleware para ler JSON (deixa para futuras melhorias)
app.use(express.json());

// URL do seu Realtime Database Firebase (modifique aqui)
const FIREBASE_URL = 'https://pico-bussola-default-rtdb.firebaseio.com/';

// Rota que recebe os dados do Pico W
app.get('/dados', async (req, res) => {
  const { direction, buttonState, sensor } = req.query;

  if (!direction || !buttonState || !sensor) {
    return res.status(400).send('Erro: Temperatura e umidade são obrigatórias.');
  }

  console.log(`Recebido: Direção = ${direction}, Botão = ${buttonState} e Sensor = ${sensor}`);

  try {
    // Envia para o Firebase
    await axios.post(`${FIREBASE_URL}/leituras.json`, {
      direcao: direction,
      botao: buttonState,
      sensor: sensor,
      timestamp: new Date().toISOString()
    });

    res.send('Dados recebidos e enviados ao Firebase com sucesso!');
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
