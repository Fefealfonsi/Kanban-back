# Kanban-back
#Projeto Kanban - backend.
##Endpoints:
1-) signup(este não estava nas especificações do projeto, porém achei importante incluí-lo)
2-)login
3-)createCard(Cria um cartão com título e conteúdo)
4-)getCard(captura os cartões criados da API Rest)
5-) deleteCard(deleta um card específico usando o ID)
6-) updateCard(atualiza o título e o conteúdo de um card específico usando o ID)
7) updateList(atualiza o nome da lista em que o card deve estar)
Obs:Este endpoint não estava específicado, porém o criei, pois foi a maneira que encontrei de finalizar o projeto.

##Tecnologias utilizadas:
1-)typeScript
2-)JavaScript
3-)SQL

##Bibliotecas utilizadas:
1-) bcryptjs
2-) cors
3-)dayjs
4-) dotenv
5-) express
6-) jsonwebtoken
7-) knex
8-) moment
9-) mysql
10-) uuid

## O que não consegui aplicar:
1-) docker-compose up
2-) persistir dados com Sequelize + sqlite (in-memory) ou diretamente o driver do sqlite (in-memory).
3-) testes unitários ( este deixei para fazer por último, pois não era essencial para o funcionamento da aplicação e não tive tempo para iniciar-los)

