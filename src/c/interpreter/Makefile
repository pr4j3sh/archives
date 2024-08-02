CC = gcc
CFLAGS = -Iinclude -Wall -Wextra
TARGET = build/main
SRC = $(shell find $(SRC_DIR) -name '*.c')
OBJ = $(SRC:.c=.o)

$(TARGET): $(OBJ)
	$(CC) $(OBJ) -o $(TARGET) $(OBJS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(TARGET)
