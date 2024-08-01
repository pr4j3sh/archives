#include <iostream>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>

using namespace cv;

VideoCapture vid;

void onTrackbarSlide(int pos, void *){
    vid.set(CAP_PROP_POS_FRAMES, pos);
}

int main(int argc,char* argv[]){
    vid.open(std::string(argv[1]));

    int frames = (int)vid.get(CAP_PROP_FRAME_COUNT);
    int pos = 0;

    namedWindow("video",WINDOW_AUTOSIZE);
    createTrackbar("tracker","video",&pos,frames,onTrackbarSlide);

    Mat frame;

    while(true){
        vid >> frame;
        if(frame.empty()) {
            std::cout<<"Video ended"<<std::endl;
            break;
        };
        int current_pos = vid.get(CAP_PROP_POS_FRAMES);
        setTrackbarPos("tracker", "video", current_pos);
        imshow("video",frame);
        if(waitKey(33)>=0) {
            std::cout<<"Video closed!"<<std::endl;
            break;
        };
    }

    return 0;
}