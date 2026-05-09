#include <iostream>

using namespace std;
// 5
// 0  1  2  3  4
// 1, 2, 3, 4, 5
// i           j
//       m        (4 + 0) / 2 = 2 = (j + i)/2 = j/2 + i/2 - j/2 + j/2 = j +
//       (i-j)/2 = i/2 + j/2 - i/2 + i/2 = i + (j-i)/2 || [ i + ( j - i ) / 2 ]
//          i  j  i = m + 1
//          m
//             ij
//             m

bool bs(int arr[], int n, int find) {

  int i = 0, j = n - 1;
  while (i <= j) {
    int m = i + (j - i) / 2;
    if (arr[m] == find) {
      return true;
    } else if (arr[m] < find) {
      i = m + 1;
    } else if (arr[m] > find) {
      j = m - 1;
    }
  }
  return false;
}

int main() {
  cout << "binary search\n";
  int sorted_arr[] = {1, 2, 3, 4, 5};
  int n = 5;
  int find = 4;

  if (bs(sorted_arr, n, find)) {
    cout << "found\n";
  } else {
    cout << "not found\n";
  }

  return 0;
}
