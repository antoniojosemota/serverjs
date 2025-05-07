# API Node.js – Integração com Firebase (Pico W)

Este servidor em Node.js foi desenvolvido para receber dados de um dispositivo embarcado (como o Raspberry Pi Pico W) e armazená-los no Firebase Realtime Database.

## Funcionalidades

- Recebe dados via HTTP GET na rota `/update`
- Extrai informações como direção, estado de botão e valor de sensor
- Codifica a direção cardinal em graus
- Armazena os dados no Firebase Realtime Database
- Loga as informações no console

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **Node.js** – Ambiente de execução JavaScript.
- **Express.js** *(caso seja usado)* – Framework minimalista para servidores.
- **JavaScript/ES6+** – Linguagem de programação.

## Instalação

Para rodar o servidor localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js) ou yarn

### Passos

Clone o repositório:

```bash
git clone https://github.com/antoniojosemota/serverjs.git
```
Navegue até a pasta do projeto:
```
cd serverjs
```
Instale as dependências:
```
npm install
```
Inicie o servidor:
```
npm start
```
### Como utilizar 
Endpoints disponíveis:
- GET / – Retorna uma mensagem de boas-vindas.

- POST /data – Recebe dados em formato JSON e retorna uma confirmação.

- GET /data/:id – Retorna os dados associados ao ID especificado.

Exemplo de requisição:
```
curl http://localhost:PORT/update?direction="DIRECÃO"&buttonState="ESTADO_DO_BOTAO"&sensor=VALOR_DO_SENSOR
```
Substitua **PORT**, **DIREÇÃO**, **ESTADO_DO_BOTAO** e **VALOR_DO_SENSOR**, pelos valores dos respectivos.


