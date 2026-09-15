/**
 * Conventional Commits — feat:, fix:, docs:, test:, chore:, refactor:, etc.
 *
 * Só validamos a SEMÂNTICA da mensagem (ter um tipo válido e uma descrição).
 * Regras de estilo (maiúscula, ponto final, tamanho) ficam desligadas pra não
 * travar commit em aula.
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'subject-full-stop': [0],
    'header-max-length': [0],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
    'footer-leading-blank': [0],
    'body-leading-blank': [0],
  },
};
