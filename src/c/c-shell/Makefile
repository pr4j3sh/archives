CC = gcc
CFLAGS = -Iinclude -Wall -Wextra
TARGET = build/main
SRC_DIR = src
SRC = $(shell find $(SRC_DIR) -name '*.c')
OBJ_DIR = build/out
OBJ = $(patsubst $(SRC_DIR)/%.c, $(OBJ_DIR)/%.o, $(SRC))

$(TARGET): $(OBJ)
	$(CC) $(OBJ) -o $(TARGET)

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	mkdir -p $(OBJ_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(TARGET)
	rm -rf $(OBJ_DIR)
