#include <dirent.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
  struct dirent *entry;
  const char *path = (argc > 1) ? argv[1] : ".";
  DIR *dir = opendir(path);
  if (dir == NULL) {
    perror("Unable to open dir");
    return 1;
  }

  while ((entry = readdir(dir)) != NULL) {
    printf("%s\n", entry->d_name);
  }

  closedir(dir);
  return 0;
}
