#include <algorithm>
#include <climits>
#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
  int n = 6;
  int a[] = {1, 2, 3, 4, 5, 6};
  int w = 3;
  int i = 0, j = 0;
  int sum = 0;
  int msum = INT_MIN;
  while (j < n) {
    int cw = j - i + 1;
    if (cw < w) {
      sum += a[j];
    } else if (cw == w) {
      sum += a[j];
      msum = max(sum, msum);

      sum -= a[i];
      i++;
    }
    j++;
  }
  cout << msum << endl;
  return 0;
}
