CXX = g++
CXXFLAGS = -std=c++11
LDFLAGS = -lcpprest -lssl -lcrypto -lpthread

SRC_DIR = .
BUILD_DIR = build

SOURCES = $(SRC_DIR)/main.cpp
OBJECTS = $(BUILD_DIR)/main.o
EXECUTABLE = $(BUILD_DIR)/main

$(shell mkdir -p $(BUILD_DIR))

all: $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CXX) -o $@ $^ $(LDFLAGS)

$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(BUILD_DIR)

.PHONY: all clean
