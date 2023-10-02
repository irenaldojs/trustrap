# TruStrap

**Tecnologias Utilizadas:**

- TypeScript
- Vite
- Bootstrap
- FontAwesome
  <img src="https://github.com/irenaldojs/trustrap/blob/print.png" />
- [# Link para o Deploy <-- ](https://trustrap.netlify.app/) - Veja a versão ao vivo do projeto em ação!

**Instalacao**

Para começar, utilize o Vite como base. Basta copiar o projeto e executar os seguintes comandos no terminal:

- npm i - Isso irá instalar as dependências do projeto.
- npm run dev - Isso iniciará o servidor de desenvolvimento.
  Siga esses passos simples para configurar o ambiente e começar a trabalhar com o projeto.

**Introdução:**

Você já se perguntou como as modernas frameworks de frontend funcionam? São muitos termos: controle de estado, provider, observer, reatividade, virtual DOM, useState, entre outros. Eu também tive dificuldade em entender esses conceitos e, inspirado por um projeto pessoal de um amigo, decidi encarar o desafio de criar minha própria framework. O objetivo era entender exatamente o que acontece por trás da interface bonita que o frontend exibe.

**Principais Decisões:**

**1. Linguagem e Construtor:**
Atualmente, trabalho com **TypeScript**, então optei por criar toda a estrutura baseada em classes, permitindo abstração e o uso de interfaces. Também escolhi o **Vite** como construtor, já que tenho pouca experiência com Webpack, e o Vite oferece uma solução pronta para transformar um projeto TypeScript em uma Single Page Application (SPA) JavaScript.

**2. Estilo:**
Escolhi **Bootstrap** devido à sua simplicidade e minha familiaridade com ele. Além disso, usando npm, posso facilmente instalar diversas dependências JavaScript, tornando o desenvolvimento mais flexível.

**3. Controle de Estado:**
Inspirado no Flutter, criei uma abstração que já tem o estado pré-vinculado à classe, e uma função para instanciar os estados antes mesmo de montar o render na DOM. Então, o `mountState()` vai criar um estado com as variáveis que serão usadas pelos componentes.

**4. Componentes (Widgets):**
Semelhante ao Flutter, criei uma classe raiz para converter variáveis em elementos HTML, e com essa base, usei herança para trazer comportamentos diferentes para cada tipo. Inicialmente, criei os mais usados: Div, Button, H1/H6, Span e P.

**5. Pacote de Ícones:**
Adaptei o pacote de ícones FontAwesome em um pacote próprio para agilizar a montagem de ícones.

**6. Render:**
Com base no que ouvi falar sobre como o React monta o HTML, fiz mais ou menos do jeito que imagino que aconteça por baixo dos panos. Na minha classe, tem uma virtual DOM onde eu monto através do `render()`. Sempre que quero mostrar o resultado da virtual DOM na tela, invoco a função `renderDom()`.

**7. Atualizando a Página:**
Usando o padrão comum, `createState()` cria um estado, `setState()` altera o estado e `getState()` traz o valor atual do estado. Sempre que chamamos a função `setState()`, iniciamos o próximo passo para atualizar a página.

**8. Observers:**
O "pulo do gato" final é que cada componente com estado na tela precisa de dois parâmetros para ser notificado pelo `setState()`. Primeiro: um ID fixo, que não é obrigatório; caso não seja definido no widget, um número aleatório será criado. Segundo: OBSERVERS, definimos no componente que estados irá observar. Quando `setState()` é chamado, o `updateVirtualDom()` procurará qual componente tem definido o nome da variável de estado que está sendo atualizada, para alterar o corpo do seu elemento.

**Considerações:**
A princípio, o código ficou um pouco verboso; no entanto, no núcleo da framework, está escrito da forma mais simples que consegui. Para quem quiser estudar e entender uma forma mais simples de como funcionam as ferramentas modernas, é uma ótima fonte de estudo. Não pude gastar tanto tempo quanto gostaria, faculdade e trabalho juntos são sempre um desafio. Espero que ajude nos estudos.
