#include <opencv2/opencv.hpp>

using namespace cv;

int main(int argc, char * argv[]){
    Mat img1 = imread(argv[1],-1);
    Mat img2 = imread(argv[2],-1);
    namedWindow("img1", WINDOW_AUTOSIZE);
    namedWindow("img2", WINDOW_AUTOSIZE);
    imshow("img1",img1);
    imshow("img2",img2);
    waitKey(0);
    destroyWindow("img1");
    destroyWindow("img2");
    return 0;
}