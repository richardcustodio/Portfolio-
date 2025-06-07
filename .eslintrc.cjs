/**
 * Configuração do ESLint para o projeto, garantindo qualidade e consistência do código JavaScript e JSX.
 */
module.exports = {
  /**
   * Define os ambientes de execução para o ESLint, disponibilizando variáveis globais apropriadas.
   */
  env: {
    browser: true, // Variáveis de ambiente de navegador (ex: 'window', 'document').
    es2021: true, // Suporte para recursos do ECMAScript 2021+.
    node: true, // Variáveis de ambiente Node.js (ex: 'module', 'require').
  },

  /**
   * Estende configurações predefinidas e plugins para regras ESLint.
   */
  extends: [
    'eslint:recommended', // Regras básicas recomendadas pelo ESLint.
    'plugin:react/recommended', // Regras para projetos React.
    'plugin:react-hooks/recommended', // Regras para o uso correto dos React Hooks.
    'prettier', // Desativa regras do ESLint que conflitam com o Prettier.
  ],

  /**
   * Define as opções do parser JavaScript para o ESLint.
   */
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Habilita o suporte a JSX.
    },
    ecmaVersion: 'latest', // Utiliza a versão mais recente do ECMAScript.
    sourceType: 'commonjs', // Arquivos de configuração usam sintaxe CommonJS.
  },

  /**
   * Registra plugins que fornecem regras adicionais ao ESLint.
   */
  plugins: [
    'react', // Plugin com regras específicas do React.
    'react-hooks', // Plugin com regras específicas dos React Hooks.
  ],

  /**
   * Configura opções específicas para os plugins.
   */
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React instalada.
    },
  },

  /**
   * Personaliza as regras do ESLint (habilitar, desabilitar, modificar severidade).
   */
  rules: {
    // Desabilita a regra 'react/react-in-jsx-scope', não necessária no React 17+.
    'react/react-in-jsx-scope': 'off',
    // Exemplo de regra personalizada:
    // 'no-unused-vars': 'warn', // Alerta sobre variáveis não utilizadas.
  },
}
