#include <iostream>
using namespace std;

int main(int argc, char *argv[]) {

  int n = 3;
  int arr[3];
  cout << "defining array of size: " << n << endl;

  cout << "setting values in array" << endl;
  for (int i = 0; i < n; i++) {
    arr[i] = i + 1;
  }

  cout << "printing values" << endl;
  for (int i = 0; i < n; i++) {
    cout << i << " -> " << arr[i] << endl;
  }
  cout << "value of arr" << endl;
  cout << "arr -> " << arr << endl;
  cout << "size of an element" << endl;
  cout << "size -> " << sizeof(arr[0]) << endl;

  cout << "printing values using pointer arithmetic" << endl;
  for (int i = 0; i < n; i++) {
    cout << i << " -> " << *(arr + i) << endl;
  }

  cout << "appending value to array" << endl;
  *(arr + 3) = 4;
  *(arr + 4) = 5;
  *(arr + 5) = 6;

  n = 6;
  cout << "increasing size of array: " << n << endl;

  cout << "printing values using pointer arithmetic" << endl;
  for (int i = 0; i < n; i++) {
    cout << i << " -> " << arr[i] << endl;
  }
  return 0;
}
