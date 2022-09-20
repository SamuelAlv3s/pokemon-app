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

**by [Samuel Alves](https://github.com/SamuelAlv3s)**
