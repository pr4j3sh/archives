#include <opencv2/opencv.hpp>

using namespace cv;

int main(int argc, char * argv[]){
    Mat img = imread(argv[1],-1);
    // std::cout<<img;
    // std::cout<<Mat.size(); // -- wrong
    return 0;
}