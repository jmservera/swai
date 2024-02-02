FROM python:3.11-slim-bookworm as builder

RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash
RUN apt update && apt install -y cmake git git-lfs build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN git lfs install

RUN git clone --recursive https://github.com/foldl/chatllm.cpp.git

RUN cd chatllm.cpp && \
    pip3 install -r requirements.txt && \
    git lfs clone https://huggingface.co/microsoft/phi-2

WORKDIR /chatllm.cpp

RUN cmake -B build && cmake --build build -j

RUN python3 convert.py -i phi-2 -t q8_0 -o quantized.bin


FROM python:3.11-slim-bookworm
COPY --from=builder chatllm.cpp/build/bin/main /usr/local/bin/chatllm
COPY --from=builder chatllm.cpp/build/lib /usr/local/lib
COPY --from=builder chatllm.cpp/quantized.bin .
# update shared library cache
RUN ldconfig