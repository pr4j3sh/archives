#include <iostream>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>

using namespace cv;

int main(int argc,char* argv[]){
    VideoCapture vid;
    vid.open(std::string(argv[1]));

    namedWindow("video",WINDOW_AUTOSIZE);

    Mat frame;

    while(true){
        vid >> frame;
        if(frame.empty()) {
            std::cout<<"Video ended"<<std::endl;
            break;
        };
        imshow("video",frame);
        if(waitKey(33)>=0) {
            std::cout<<"Video closed!"<<std::endl;
            break;
        };
    }

    return 0;
}