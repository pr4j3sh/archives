#include <stdio.h>
#include <stdlib.h>

#define CSH_RL_BUFSIZE 1024

char *csh_read_line(void) {
  int bufsize = CSH_RL_BUFSIZE;
  int position = 0;
  char *buffer = malloc(sizeof(char) * bufsize);
  int c;

  if (!buffer) {
    fprintf(stderr, "csh: allocation error\n");
    exit(EXIT_FAILURE);
  }
  while (1) {
    c = getchar();
    if (c == EOF || c == '\n') {
      buffer[position] = '\0';
      return buffer;
    } else {
      buffer[position] = c;
    }
    position++;
    if (position >= bufsize) {
      bufsize += CSH_RL_BUFSIZE;
      buffer = realloc(buffer, bufsize);

      if (!buffer) {
        fprintf(stderr, "csh: allocation error\n");
        exit(EXIT_FAILURE);
      }
    }
  }
}
