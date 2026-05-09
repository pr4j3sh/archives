#include <iostream>
using namespace std;

bool ls(int arr[], int n, int find) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == find) {
      return true;
    }
  }
  return false;
}

int main() {
  cout << "linear search\n";

  int ds[] = {1, 2, 3, 4, 5};
  int n = 0;

  int find = 4;

  if (ls(ds, n, find)) {
    cout << "found\n";
  } else {
    cout << "not found\n";
  }

  return 0;
}
