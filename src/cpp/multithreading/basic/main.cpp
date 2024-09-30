#include <iostream>
#include <omp.h>

using namespace std;

int main(int argc, char *argv[]) {
#pragma omp parallel for
  for (int i = 0; i < 10; i++) {
    int thread_id = omp_get_thread_num();
    cout << "thread < " << thread_id << " > is processing itr -> " << i << endl;
  }
  return 0;
}
