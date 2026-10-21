CC = clang
CFLAGS = -O2 -ffreestanding -Wall -Werror -Wextra -Wpedantic -Wno-unused-parameter \
				 -Wno-unused-variable -Wno-unused-function -fPIC -fPIE

TARGET_EMU = librv32ima.dylib
TARGET_RUN = emulator

all: $(TARGET_RUN)

$(TARGET_RUN): $(TARGET_EMU) emulator.o
	$(CC) -o $@ -l:$(TARGET_EMU) emulator.o

$(TARGET_EMU): rv32ima.o
	$(CC) -o $@ rv32ima.o -shared

%.o: %.c
	$(CC) -c -o $@ $< $(CFLAGS)
