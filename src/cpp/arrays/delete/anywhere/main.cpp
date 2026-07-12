#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
  int n = 5;
  int arr[5] = {1, 2, 3, 4, 5};
  int at = 3;

  // insert
  int newSize = 4;
  int newArr[4];

  for (int i = 0; i < at; i++) {
    newArr[i] = arr[i];
  }

  for (int i = at; i < newSize; i++) {
    newArr[i] = arr[i + 1];
  }

  for (auto i : newArr) {
    cout << i << endl;
  }

  return 0;
}
