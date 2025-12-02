# API Reference

#### RELOAD ENTIDADE RELACIONAMENTO
![MODELO ENTIDADE RELACIONAMENTO](Cópia%20do%20Diagrama%20sem%20nome.drawio.png)

### Clientes

#### GET /clientes
- **Descriçao**: Obtém uma lista de clientes
[ { "id": 1, 
"nome": "João da Silva", 
"cpf": "00000000000", 
"telefone": "11999999999", 
"email": " joao@email.com ", 
"cidade": "São Paulo" } ]
- **Response**: Array de clientes
{
    "message": "Cliente cadastrado com sucesso!"
}

#### POST /clientes
- **Descriçao**: Cria um novo cliente
- **Body**:{
"nomeCliente": "João Vitor",
  "email": "joaovitor@gmail.com",
  "telefone": "19 99999-1234",
  "endereco": "Rua das Flores, 123",
  "cpfCliente": "12345678900",
  "logradouro": "Rua das Flores",
  "numero": "000",
  "bairro": "Centro",
  "cidade": "Sumaré",
  "estado": "SP",
  "cep":"00000-000"
}
- **Response**: {
    "message": "Cliente cadastrado com sucesso!"
}


### Pedidos


#### GET /pedidos

- **Descrição**: Obtém todos os pedidos cadastrados Resposta:
- **Body**:
[ { "id": 1, "cliente_id": 1, "tipo_entrega": "normal", "distancia_km": 50, "peso_kg": 10 } ]

#### POSTAGEM /pedidos

- **Descrição**: Crie um novo pedido Corpo:

{ "cliente_id": 1, "data_pedido": "2025-01-20", "tipo_entrega": "urgente", "distancia_km": 120, "peso_kg": 40, "valor_km": 2,5, "valor_kg": 1,5 }

- **body**:

{ "message": "Pedido cadastrado com sucesso!" }


#### GET /pedidos/:id

- **Descrição**: Obtenha dados de um pedido específico Resposta:

{ "id": 1, "cliente_id": 1, "data_pedido": "2025-01-20", "tipo_entrega": "urgente", "distancia_km": 80, "peso_kg": 20, "valor_km": 2, "valor_kg": 1,5 }

#### Entregas GET /entregas

- **Descrição**: Obtenha a lista de entregas já calculadas Resposta:

[ { "id": 1, "pedido_id": 1, "valor_final": 350,50, "status_entrega": "calculado" } ]

#### POST /entregas/calcular/:pedido_id

- **Descrição**: Calcula automaticamente os valores da entrega Corpo: Nenhum Resposta:

{ "message": "Entrega calculada com sucesso!", "valor_final": 480,75 }

 #### GET /entregas/:id

- **Descrição**: Obtenha dados de uma entrega específica Resposta:

{ "id": 1, "pedido_id": 1, "valor_distancia": 200, "valor_peso": 60, "acrescimo": 40, "desconto": 0, "taxa_extra": 0, "valor_final": 300, "status_entrega": "calculado" }







