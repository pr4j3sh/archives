#include "iostream"
using namespace std;

int main(int argc, char *argv[]) {
  int n = 2;
  int arr[] = {1, 2, 3, 4, 5, 6};
  int window = 3;
  if (window > n) {
    cerr << "window is greater";
    return 1;
  }
  int i = 0, j = 0;
  while (j < n) {
    int cw = j - i + 1;
    if (cw == window) {
      // i = 0, j = 2
      for (int l = i; l <= j; l++) {
        cout << arr[l] << " ";
      }
      cout << endl;
      i++;
    }
    // cout << arr[j] << " ";
    j++;
  }
  cout << endl;
  return 0;
}
