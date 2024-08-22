#include <iostream>
using namespace std;

int main() {
  long long sum = 0, a = 0, b = 1, num = 0, lim = 4000000;
  while (num < lim) {
    num = a + b;
    if (num % 2 == 0)
      sum += num;
    a = b;
    b = num;
  }
  cout << sum << endl;
  return 0;
}
