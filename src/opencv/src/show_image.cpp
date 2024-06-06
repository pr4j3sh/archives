#include <opencv2/opencv.hpp>
#include <typeinfo>

using namespace cv;

int main(int argc, char * argv[]){
    // std::cout<<argc<<std::endl<<argv[1];
    Mat img = imread(argv[1],-1);
    std::cout<<"type: "<<typeid(img).name()<<std::endl;
    std::cout<<"size [w x h]: "<<img.size()<<std::endl;
    std::cout<<"type of size: "<<typeid(img.size()).name()<<std::endl;
    if(img.empty()){
        std::cout<<"No image provided"<<std::endl;
        return -1;
    }
    namedWindow("Wallpaper - Rage", WINDOW_AUTOSIZE);
    imshow("Wallpaper - Rage",img);
    waitKey(0);
    destroyWindow("Wallpaper - Rage");
    return 0;
}