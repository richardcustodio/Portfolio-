/**
 * Arquivo de configuração do ESLint para o projeto.
 *
 * O ESLint é usado para analisar o código JavaScript e JSX, identificando
 * problemas de estilo, sintaxe e potenciais erros, ajudando a manter
 * a qualidade e consistência do código.
 */
module.exports = {
  /**
   * Define os ambientes em que o código será executado. Isso ajuda o ESLint
   * a entender quais variáveis globais estão disponíveis.
   */
  env: {
    browser: true, // Ambiente do navegador (permite o uso de variáveis como 'window', 'document').
    es2021: true, // Suporte para recursos do ECMAScript 2021 e posteriores.
    node: true, // Ambiente do Node.js (permite o uso de 'module', 'require').
  },

  /**
   * 'extends' especifica configurações predefinidas e plugins para estender
   * a configuração base do ESLint.
   */
  extends: [
    'eslint:recommended', // Regras recomendadas pelo ESLint.
    'plugin:react/recommended', // Regras recomendadas para projetos React.
    'plugin:react-hooks/recommended', // Regras para garantir o uso correto dos Hooks do React.
    'prettier', // Habilita a integração com o Prettier (desativa regras do ESLint que conflitam com o Prettier).
  ],

  /**
   * 'parserOptions' define as opções do parser JavaScript utilizado pelo ESLint.
   */
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Habilita o suporte para JSX.
    },
    ecmaVersion: 'latest', // Usa a versão mais recente do ECMAScript.
    sourceType: 'commonjs', // Especifica que os arquivos de configuração usam a sintaxe CommonJS (para 'module.exports').
  },

  /**
   * 'plugins' registra plugins que fornecem regras adicionais para o ESLint.
   */
  plugins: [
    'react', // Plugin para regras específicas do React.
    'react-hooks', // Plugin para regras específicas dos Hooks do React.
  ],

  /**
   * 'settings' permite configurar opções específicas para os plugins.
   */
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React instalada no projeto.
    },
  },

  /**
   * 'rules' permite personalizar as regras do ESLint. Aqui você pode
   * habilitar, desabilitar ou modificar o nível de severidade das regras.
   */
  rules: {
    'react/react-in-jsx-scope': 'off', // Não é necessário importar React em versões mais recentes (React 17+).
    // Adicione suas regras personalizadas aqui, por exemplo:
    // 'no-unused-vars': 'warn', // Alerta sobre variáveis não utilizadas.
  },
}
