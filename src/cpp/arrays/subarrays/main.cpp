#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
  int n = 3;
  int arr[3] = {1, 2, 3};
  cout << "array: " << endl;
  for (int i = 0; i < n; i++) {
    cout << arr[i] << endl;
  }

  cout << "subarrays: " << endl;
  for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
      for (int k = i; k <= j; k++) {
        cout << arr[k] << " ";
      }
      cout << endl;
    }
    cout << endl;
  }

  return 0;
}
