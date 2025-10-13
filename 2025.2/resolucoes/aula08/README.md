# Aula 08 — Exemplos e Resoluções (2025.2)

Este diretório contém exemplos mínimos executáveis para cada assunto da Aula 08.

Pastas:
- `flatlist/` — exemplo com FlatList (keyExtractor, header, separator, renderItem)
- `navigation/` — exemplo com Stack Navigation (params, setOptions, headerRight)
- `tab/` — exemplo com Tab Navigator (3 abas, titles e cor ativa)
- `drawer/` — exemplo com Drawer Navigator (Home/Settings, initialRouteName)
- `apis/` — exemplo com Fetch (loading, erro, FlatList, ListEmptyComponent)

Como executar (opções):
1) Expo Snack (recomendado para testar rapidamente)
   - Abra https://snack.expo.dev
   - Crie um novo Snack e cole o conteúdo do `App.js` da pasta desejada
   - Adicione dependências quando necessário:
     - Stack/Tab/Drawer: `@react-navigation/native`, `@react-navigation/stack` ou `@react-navigation/bottom-tabs`/`@react-navigation/drawer`
     - E também: `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`

2) Projeto Expo local
   - npx create-expo-app meu-app
   - Substitua o App.js do projeto pelo App.js de uma pasta de exemplo
   - Instale as dependências conforme o assunto (Navigation ou apenas Fetch)

Dica: mantenha cada exemplo isolado para facilitar os testes.