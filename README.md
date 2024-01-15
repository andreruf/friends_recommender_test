## FRIENDS RECOMMENDER - TEST

Projeto de recomendação de amizades.

## Requisitos

>node >=18.0.0

## Instalação

```bash 
npm i
```

## Uso

```bash 
npm run dev
```

## Endpoints

### **Create Person - [POST] http://localhost:3000/person**

> Exemplo de entrada

>>http://localhost:3000/person
```json
{
  "name": "André",
  "cpf": "12345678909"
}
```
> Exemplo de saída  

>> StatusCode **[200]**
``` json
{
    "name": "André",
    "cpf": "12345678909",
    "friends": []
}
```

>>StatusCode **[400]**
``` bash
# caso o CPF já está cadastrado
"cpf already exists" 

# caso o CPF fornecido for diferente de 11 dígitos ou não for numérico
"Invalid param: cpf"
```
---
### **Get Person - **[GET]** http://localhost:3000/person/:CPF**

>Exemplo de entrada 

>>http://localhost:3000/person/12345678909

>Exemplo de saída  

>>StatusCode **[200]**
``` json
{
    "name": "André",
    "cpf": "12345678909",
    "friends": []
}
```

>>StatusCode **[404]**
``` bash
# CPF não encontado
"cpf not found"
```
---
### **Clean - **[DELETE]** http://localhost:3000/clean**
>Exemplo de entrada 

>>http://localhost:3000/clean

>Exemplo de saída 
>>StatusCode **[200]**
``` bash
"Database cleaned"
```
---
### **Create Relationship - **[POST]** http://localhost:3000/relationship**

>Exemplo de entrada 

>>http://localhost:3000/relationship
``` json
{
    "cpf1": "12345678909",
    "cpf2": "12345678910"
}
```

>Exemplo de saída  

>>StatusCode **[200]**
``` bash
"Relationship created"
```
>>StatusCode **[400]**
``` bash
# não consiste em 11 digitos numéricos
"Invalid param: cpf"
```

>>StatusCode **[404]**
``` bash
# CPF não encontado
"cpf not found"

```
---
### **Get Recommendations - **[GET]** http://localhost:3000/recommendatons/:CPF**

>Exemplo de entrada

>>http://localhost:3000/recommendations/12345678909

>Exemplo de saída
>>StatusCode **[200]**
``` json
[
    "12345678910",
    "12345678911"
]
```
>>StatusCode **[400]**
``` bash
# não consiste em 11 digitos numéricos
"Invalid param: cpf"
```

>>StatusCode **[404]**
``` bash
# não foi encontrado
"cpf not found"
```

## Testes

Execução de todos os testes
```bash
npm run test
```
Execução dos testes unitários
```bash
npm run test:unit
```
Execução dos testes de integração
```bash
npm run test:integration
```
Execução da cobertura de testes
```bash
npm run test:ci

```

