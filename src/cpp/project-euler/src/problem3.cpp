#include <iostream>
using namespace std;
int main() {
  long long num = 600851475143;
  for (long long i = num - 1; i > 0; i--) {
    if (num % i == 0) {
      cout << i << endl;
      break;
    }
  }
  return 0;
}
