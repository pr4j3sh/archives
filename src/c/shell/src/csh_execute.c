#include "csh_header.h"
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int csh_cd(char **args);
int csh_help(char **args);
int csh_exit(char **args);

char *builtin_str[] = {"cd", "help", "exit"};

int (*builtin_func[])(char **) = {&csh_cd, &csh_help, &csh_exit};

int csh_num_builtins() { return sizeof(builtin_str) / sizeof(char *); }

int csh_cd(char **args) {
  if (args[1] == NULL) {
    fprintf(stderr, "csh: expected argument to \"cd\"\n");
  } else if (chdir(args[1]) != 0) {
    perror("csh");
  }
  return 1;
}
int csh_help(char **args) {
  int i;
  printf("eleven's CSH\n");
  printf("following are built-in:\n");
  for (i = 0; i < csh_num_builtins(); i++) {
    printf("  %s\n", builtin_str[i]);
  }
  printf("use man command to view manual pages of programs.\n");
  return 1;
}
int csh_exit(char **args) { return 0; }

int csh_execute(char **args) {
  int i;
  if (args[0] == NULL) {
    return 1;
  }
  for (i = 0; i < csh_num_builtins(); i++) {
    if (strcmp(args[0], builtin_str[i]) == 0) {
      return (*builtin_func[i])(args);
    }
  }
  return csh_launch(args);
}
