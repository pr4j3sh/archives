#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {
  int a[3] = {1, 2, 3};
  for (auto i : a) {
    cout << i << endl;
  }
  return 0;
}
