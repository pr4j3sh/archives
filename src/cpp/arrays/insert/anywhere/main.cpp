#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
  int n = 5;
  int arr[5] = {1, 2, 3, 4, 5};
  int at = 3;
  int toInsert = 11;

  // insert
  int newSize = 6;
  int newArr[6];

  for (int i = 0; i < at; i++) {
    newArr[i] = arr[i];
  }
  newArr[at] = toInsert;
  for (int i = at + 1; i < newSize; i++) {
    newArr[i] = arr[i - 1];
  }

  for (auto i : newArr) {
    cout << i << endl;
  }

  return 0;
}
