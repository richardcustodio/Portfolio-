/**
 * Configuração do Prettier para o projeto, garantindo um estilo de código consistente.
 */
module.exports = {
  /**
   * Adiciona ponto e vírgula no final das declarações.
   * false: estilo sem ponto e vírgula (mais moderno).
   */
  semi: false,

  /**
   * Tipo de aspas para strings.
   * true: usa aspas simples.
   */
  singleQuote: true,

  /**
   * Adiciona vírgulas à direita em todos os lugares possíveis (objetos, arrays, parâmetros).
   * 'all': melhora a legibilidade e facilita diffs.
   */
  trailingComma: 'all',

  /**
   * Comprimento máximo da linha antes que o Prettier quebre o código.
   * Valor comum é 80 ou 100.
   */
  printWidth: 100,

  /**
   * Número de espaços para cada nível de indentação (se 'useTabs' for false).
   * 2: padrão recomendado.
   */
  tabWidth: 2,

  /**
   * Usa tabs (true) ou espaços (false) para indentação.
   * false: uso de espaços é mais consistente entre editores.
   */
  useTabs: false,
}
