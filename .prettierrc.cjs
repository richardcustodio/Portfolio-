/**
 * Arquivo de configuração do Prettier para o projeto.
 *
 * O Prettier é um formatador de código que garante um estilo consistente
 * em toda a base de código, formatando automaticamente arquivos JavaScript,
 * JSX, CSS e outros.
 */
module.exports = {
  /**
   * Define se o Prettier deve adicionar ponto e vírgula no final das declarações.
   * Recomendado: false (segue o estilo mais moderno sem ponto e vírgula).
   */
  semi: false,

  /**
   * Define qual tipo de aspas deve ser usado em strings.
   * Recomendado: true (usa aspas simples).
   */
  singleQuote: true,

  /**
   * Define se o Prettier deve adicionar vírgula à direita em todos os lugares
   * possíveis (objetos, arrays, parâmetros de função).
   * Recomendado: 'all' (melhora a legibilidade e facilita a adição/remoção de itens).
   */
  trailingComma: 'all',

  /**
   * Define o comprimento máximo da linha antes que o Prettier tente quebrar o código.
   * Um valor comum é 80 ou 100.
   */
  printWidth: 100,

  /**
   * Define o número de espaços para cada nível de indentação (quando 'useTabs' é false).
   * Recomendado: 2 espaços.
   */
  tabWidth: 2,

  /**
   * Define se o Prettier deve usar tabs (true) ou espaços (false) para indentação.
   * Recomendado: false (usar espaços é mais consistente entre diferentes editores).
   */
  useTabs: false,
}
