
# Sistema_de_Compras_Publicas-API

API REST desenvolvida com Node.js, Express, Typescript e Mongoose para fornecer dados de um banco de dados MongoDB para uma aplicação Front-End.

A ideia desta aplicação é fornecer a comunicação entre a aplicação **Sistemas_de_compras_publicas-REACT** e o banco de dados MongoDB, onde ficam armazenados os dados necessários para o perfeito funcionamento dessa aplicação.

---

## Funcionalidades

- As senhas dos usuários passam por um processo de hash (criptografia).
- Sessões são gerenciadas pelo **express-session** e armazenadas no banco de dados por 30 minutos.

---

## Requisitos

- Banco de dados MongoDB

---

## Como instalar

### Clone o projeto para sua máquina

```bash
git clone https://github.com/Jorge-Luiz-11/Sistema_de_Compras_Publicas-API.git ./Sistema_de_Compras_Publicas-API
```

### Instale as dependências

```bash
cd siscopApi
npm install
```

### Crie o arquivo de ambiente

```bash
touch .env
```

### Preencha o arquivo `.env` com as informações necessárias

```dotenv
PORT= (porta em que a API irá rodar)
HOST= (host da API)
dbNAME= (nome do seu banco de dados)
dbURI= (URI do MongoDB, exemplo: mongodb://usuario:senha@host:porta/nomeDoBanco?options)
SECRET= (chave secreta para sessões)
ORIGIN= (origens permitidas no CORS, separadas por vírgula ',')
```

### Inicializar o banco de dados com valores iniciais

```bash
npm run migrate up
```

---

## Como usar

### Rodar a aplicação

```bash
npm start
```

### Login

- Para fazer requisições, é necessário estar logado.
- O login é feito acessando `HOST:PORT/login` e enviando no corpo da requisição:

```json
{
  "name": "ADM",
  "password": "123456"
}
```

---

## Coleções disponíveis

- **Login** - Usado para realizar o login (obrigatório para usar a aplicação)
- **Usuários (Users)** - Gerenciar usuários da aplicação
- **Processos (Processes)** - Gerenciar processos da aplicação
- **Estados de Processos (Process States)** - Gerenciar estados dos processos
- **Seções (Sections)** - Gerenciar as seções da entidade/empresa
- **Anos (Years)** - Gerenciar os anos dos processos
- **Modalidades de Aquisição (Acquisition Ways)** - Gerenciar tipos de processos
- **Mensagens (Messages)** - Gerenciar mensagens recebidas
- **Mensagens Enviadas (Messages Sent)** - Gerenciar mensagens enviadas
- **Mensagens Arquivadas (Messages Archived)** - Gerenciar mensagens arquivadas
- **Arquivos (Files)** - Gerenciar arquivos dos processos

---

## Para fazer requisições utilize

| Ação                | Método     | URL                             | Observação                     |
| ------------------- | ---------- | ------------------------------- | ------------------------------ |
| Listar todos        | **GET**    | `HOST:PORT/users`               |                                |
| Buscar um elemento  | **GET**    | `HOST:PORT/users/user?name=ADM` | Necessário filtro              |
| Criar novo elemento | **POST**   | `HOST:PORT/users`               | Necessário corpo da requisição |
| Atualizar elemento  | **PUT**    | `HOST:PORT/users?name=ADM`      | Necessário corpo + filtro      |
| Deletar elemento    | **DELETE** | `HOST:PORT/users?name=ADM`      | Necessário filtro              |

---

## Exemplos no Insomnia

<div style="display: inline">
<img src="https://lh3.googleusercontent.com/pw/ADCreHfSxs70Y9oqZy0HMoACmCdQnhNy4X1xGE08s5bdHXRZNQQPj3XUO8EJfDuPlOrl7Mbv3c2v47jPDH5Kdhu1ObDtAtQHuQIKdq2QZEwx4eG4ApxVBTcKpZfP7FyPjAUDUAZeNsk8BwLppczSps0SLg=w1358-h701-s-no?authuser=1" width="400px" />
<img src="https://lh3.googleusercontent.com/pw/ADCreHc8Ord5eg8AH7s9MHqpS2xzmT22Vu80N_ptVQC-BqhX1eazkWKA0oAtIFYKTfVq_sPB0fIi6EVBCQTwYOYK21Me142olKdd0CnVvN-6RdY73xJd59WB-W_V8SA2aR_0D-BQNFsOR4ydOw4uj5YN-Q=w1358-h701-s-no?authuser=1" width="400px" />  
</div>
<div style="display: inline">
<img src="https://lh3.googleusercontent.com/pw/ADCreHcj0HiGxplew5v4dzR-OktE7ICM03MjAoahL4rS-M6WRH7iR6_uA7jvQ3Pf_s3tgToIeTp7hFwW2t58C2jP1aRsN-UVFXmYPNBYblLEF1pDegsDDUv7JT1OmbmC-dCILKabHsuKhehMDgirQuc3EQ=w1358-h701-s-no?authuser=1" width="400px" />
<img src="https://lh3.googleusercontent.com/pw/ADCreHfLNJ_C6FX82YpayTUS1dmRcxCCJZFWcuohh576_zJVu3n8s-o1WyU6_FRB2Eafk-Q87tIEJhmLuAz3TgW0D5F7hHMHywrXmbEShTmrKw4BS1wAT5Y8B1LaHgdFZSolwgG6sURCupxBbLi5ZDpfPQ=w1358-h701-s-no?authuser=1" width="400px" />  
</div>
<div style="display: inline">
<img src="https://lh3.googleusercontent.com/pw/ADCreHd6cGQwCtaFbnGcnFgEP5jsT_3PsL7cWFYJhfCxVEfDzvRCYjQNvkR9fDA6ZFOJ67Ukg9jG9GeEaeALO319EUO3REiUXRUsfLzLCz6H4Ykb8hzDQ92sMSmDKUifcFQnK-2lcm-suQN4LNh7aCB0VA=w1358-h701-s-no?authuser=1" width="400px" />
<img src="https://lh3.googleusercontent.com/pw/ADCreHeL9lyvNOoKQCrdqediWdXdxc4LSwpzj-dZsZymTDC9AHX3LfxUB_6PQxB9EU3gcERM3iFoslkYcrA4thncqKPvXF3e0De4Ic3vWHVBkbImkvC3tXVLM4mER7yDM444tdkllPh6AbtCAIi311zzhQ=w1358-h701-s-no?authuser=1" width="400px" />  
</div>
