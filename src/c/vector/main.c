#include <stdio.h>
#include <stdlib.h>

#define INITIAL_CAPACITY 8

typedef struct {
  int size;
  int capacity;
  int *data;
} Vector;

Vector *init(int n) {
  Vector *v = (Vector *)malloc(sizeof(Vector));
  if (v == NULL) {
    perror("Unable to initialize vector");
    return NULL;
  }

  n = n > 0 ? n : INITIAL_CAPACITY;
  v->data = (int *)malloc(sizeof(int) * n);
  if (v->data == NULL) {
    perror("Unable to initialize data for vector");
    free(v);
    return NULL;
  }

  v->size = 0;
  v->capacity = n;
  return v;
}

int resize(Vector *v, int capacity) {
  int *temp = (int *)realloc(v->data, sizeof(int) * capacity);
  if (temp == NULL) {
    perror("Unable to resize vector");
    return -1;
  }

  v->data = temp;
  v->capacity = capacity;
  return 0;
}

int push_back(Vector *v, int value) {
  if (v->size == v->capacity) {
    if (resize(v, 2 * v->capacity) != 0) {
      return -1;
    }
  }
  v->data[v->size] = value;
  v->size++;
  return 0;
}

int size(Vector *v) { return v->size; }

void free_vector(Vector *v) {
  if (v != NULL) {
    free(v->data);
    free(v);
  }
}

void debug(char *name, Vector *v, int value) {
  printf("%s\t%4d\n", name, value);
  printf("vector \t%4d %4d\t", v->capacity, v->size);
  printf("[ ");
  for (int i = 0; i < v->size; i++) {
    printf("%d ", v->data[i]);
  }
  printf("]\n");
}

int main(int argc, char *argv[]) {
  Vector *v = init(0);
  if (v == NULL) {
    return 1;
  }

  for (int i = 1; i <= 10; i++) {
    if (push_back(v, i) != 0) {
      printf("Failed to push %d into vector\n", i);
      free_vector(v);
      return 1;
    }
    debug("push", v, i);
  }

  debug("size", v, size(v));
  free_vector(v);
  return 0;
}
