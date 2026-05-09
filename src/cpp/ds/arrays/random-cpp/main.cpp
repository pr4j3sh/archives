#include <iostream>
using namespace std;

void p(string paylaod) { cout << paylaod; }
void s() {
  cout << endl;
  cout << "--------------------";
  cout << endl;
}

void pa(int a[], int n) {
  for (int i = 0; i < n; i++) {
    cout << a[i] << " ";
  }
}

int main() {
  int a[5] = {1, 2, 3, 4, 5};

  p("array");
  p("\n");
  pa(a, 5);

  s();

  p("randomly accessing element by index: 2");
  p("\n");
  p("a[2] = ");

  cout << a[2];
  p("\n");

  return 0;
}
