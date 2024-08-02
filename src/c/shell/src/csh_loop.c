#include "csh_header.h"
#include <stdio.h>
#include <stdlib.h>

void csh_loop(void) {
  char *line;
  char **args;
  int status;
  do {
    printf("> ");
    line = csh_read_line();
    args = csh_split_line(line);
    status = csh_execute(args);

    free(line);
    free(args);
  } while (status);
}
