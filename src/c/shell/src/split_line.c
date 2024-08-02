#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CSH_TOK_BUFSIZE 64
#define CSH_TOK_DELIM " \t\r\n\a"

char **csh_split_line(char *line) {
  int bufsize = CSH_TOK_BUFSIZE, position = 0;
  char **tokens = malloc(sizeof(char *) * bufsize);
  char *token;

  if (!tokens) {
    fprintf(stderr, "csh: allocation error\n");
    exit(EXIT_FAILURE);
  }

  token = strtok(line, CSH_TOK_DELIM);
  while (token != NULL) {
    tokens[position] = token;
    position++;

    if (position >= bufsize) {
      bufsize += CSH_TOK_BUFSIZE;
      tokens = realloc(tokens, sizeof(char *) * bufsize);

      if (!tokens) {
        fprintf(stderr, "csh: allocation error\n");
        exit(EXIT_FAILURE);
      }
    }
    token = strtok(NULL, CSH_TOK_DELIM);
  }
  tokens[position] = NULL;
  return tokens;
}
