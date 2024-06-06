#include<iostream>
#include<opencv2/opencv.hpp>

using namespace cv;

int main(int argc, char* argv[]){
    VideoCapture vid;
    vid.open(std::string(argv[1]));
    std::cout<<"frames: "<<vid.get(CAP_PROP_FRAME_COUNT)<<std::endl;
    std::cout<<"dimensions [w x h]: [ "<<vid.get(CAP_PROP_FRAME_WIDTH)<<" x "<<vid.get(CAP_PROP_FRAME_HEIGHT)<<" ]"<<std::endl;
    return 0;
}