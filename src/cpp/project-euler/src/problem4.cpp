#include <algorithm>
#include <climits>
#include <iostream>
#include <string>
using namespace std;

bool check(long long n) {
  string snum = to_string(n);
  string sn = snum;
  reverse(sn.begin(), sn.end());
  if (sn == snum)
    return true;
  return false;
}

int main() {
  int lb = 100, ub = 999;
  long long ans = INT_MIN;
  for (int i = ub; i >= lb; i--) {
    for (int j = ub; j >= lb; j--) {
      long long num = i * j;
      if (check(num)) {
        ans = max(ans, num);
      }
    }
  }
  cout << ans << endl;
  return 0;
}
