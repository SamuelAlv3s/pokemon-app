# Pokédex App

**Descrição do Projeto**

- Tela principal com uma lista de pokemons, cada pokemon com uma imagem, nome e botão para favoritar
- Tela com os detalhes de um pokemon, (Imagem, nome e 7 atributos do pokemon)

**Extras e abordagens de solução**

- Service com funções para listar todos os pokemons, pegar url de imagem de um pokemon e pegar detalhes de um pokemon, foi usado o módulo HttpClient do angular para fazer as requisições e o operador map do Rxjs para mapear o resultado da API e retornar apenas os dados necessários para esse projeto.
- Service para enviar dados de um pokemon para [webhook](https://webhook.site/#!/8a4f30ff-e242-4e91-89c5-1a7eb9d6ea60/fa380dd0-a661-4a6e-8132-e1d93da338f4/1), (https://webhook.site/#!/8a4f30ff-e242-4e91-89c5-1a7eb9d6ea60/fa380dd0-a661-4a6e-8132-e1d93da338f4/1)
- Paginação de resultados da página inicial
- Diretiva customizada para exibir o footer com os itens da paginação apenas quando o scroll estiver chegando no fim da pagina.
- Animação no botão de favoritar usando o IonicAnimations
- Testes unitários com Jasmine e Karma dos 2 services(PokeService, WebhookService) e das duas paginas(HomePage, PokemonDetails)
- Teste de UI básicos com Cypress

![image](https://user-images.githubusercontent.com/49680351/191176061-3bfa7e10-5a7f-4842-9f79-5af7f5bd2d59.png)
![image](https://user-images.githubusercontent.com/49680351/191175950-fa1458cb-1a82-462b-bf4f-923ebd646bb5.png)
![image](https://user-images.githubusercontent.com/49680351/191176005-eb5cb9bb-b6e6-47b2-b5be-56ab73e33511.png)


**by [Samuel Alves](https://github.com/SamuelAlv3s)**
