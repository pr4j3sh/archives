#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
  int a[10];
  a[0] = 1;
  a[1] = 2;
  a[2] = 3;
  for (int i = 0; i < 10; i++) {
    cout << a[i] << endl;
  }
  return 0;
}
