Rápido & Seguro Logística – API Back-End

Sistema de gerenciamento com cadastro de clientes, pedidos e cálculo automático de entregas.

API Reference
Clientes
GET /clientes

Descrição: Obtém uma lista de clientes
Response:

[
  {
    "id": 1,
    "nome": "João da Silva",
    "cpf": "00000000000",
    "telefone": "11999999999",
    "email": "joao@email.com",
    "cidade": "São Paulo"
  }
]

POST /clientes

Descrição: Cria um novo cliente
Body:

{
    "nome": "Maria Oliveira",
    "cpf": "12345678910",
    "telefone": "11988887777",
    "email": "maria@email.com",
    "logradouro": "Rua A",
    "numero": "100",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01000-000"
}


Response:

{
    "message": "Cliente cadastrado com sucesso!"
}

GET /clientes/:id

Descrição: Obtém um cliente específico pelo ID
Response:

{
  "id": 1,
  "nome": "João da Silva",
  "cpf": "00000000000",
  "telefone": "11999999999",
  "email": "joao@email.com"
}

Pedidos
GET /pedidos

Descrição: Obtém todos os pedidos cadastrados
Response:

[
  {
    "id": 1,
    "cliente_id": 1,
    "tipo_entrega": "normal",
    "distancia_km": 50,
    "peso_kg": 10
  }
]

POST /pedidos

Descrição: Cria um novo pedido
Body:

{
    "cliente_id": 1,
    "data_pedido": "2025-01-20",
    "tipo_entrega": "urgente",
    "distancia_km": 120,
    "peso_kg": 40,
    "valor_km": 2.5,
    "valor_kg": 1.5
}


Response:

{
    "message": "Pedido cadastrado com sucesso!"
}

GET /pedidos/:id

Descrição: Obtém dados de um pedido específico
Response:

{
  "id": 1,
  "cliente_id": 1,
  "data_pedido": "2025-01-20",
  "tipo_entrega": "urgente",
  "distancia_km": 80,
  "peso_kg": 20,
  "valor_km": 2,
  "valor_kg": 1.5
}

Entregas
GET /entregas

Descrição: Obtém a lista de entregas já calculadas
Response:

[
  {
    "id": 1,
    "pedido_id": 1,
    "valor_final": 350.50,
    "status_entrega": "calculado"
  }
]

POST /entregas/calcular/:pedido_id

Descrição: Calcula automaticamente os valores da entrega
Body: Nenhum
Response:

{
    "message": "Entrega calculada com sucesso!",
    "valor_final": 480.75
}

GET /entregas/:id

Descrição: Obtém dados de uma entrega específica
Response:

{
  "id": 1,
  "pedido_id": 1,
  "valor_distancia": 200,
  "valor_peso": 60,
  "acrescimo": 40,
  "desconto": 0,
  "taxa_extra": 0,
  "valor_final": 300,
  "status_entrega": "calculado"
}

PATCH /entregas/status/:id

Descrição: Atualiza o status de uma entrega
Body:

{
  "status_entrega": "em_transito"
}


Response:

{
  "message": "Status atualizado com sucesso!"
}
