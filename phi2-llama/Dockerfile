# A docker file to build LLaMA and provide a CLI to convert and run files
FROM python:3.11-slim-bookworm as builder
# Uncomment the following line to use the Intel GPU
# and use it with docker run --privileged --device="/dev/dri" --device=/dev/dxg -v /usr/lib/wsl:/usr/lib/wsl --net=host -e LIBVA_DRIVER_NAME=iHD -e DISPLAY=$DISPLAY -it -v $(pwd)/open_llama_7b/:/llama/models/7B/ llamabuild sh
# RUN apt install intel-opencl-icd clinfo -y
ENV LLAMA_CLBLAST=1

RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash
RUN apt update && \
    apt install \
        # libclblast-dev \
        git-lfs \
        build-essential -y

WORKDIR /llama
# RUN git clone https://github.com/ggerganov/llama.cpp

# RUN cd llama.cpp && \
#     make LLAMA_CLBLAST=${LLAMA_CLBLAST}

# RUN python3 -m venv /llama/llamavenv
RUN git clone https://github.com/ggerganov/llama.cpp

RUN cd /llama/llama.cpp && python3 -m pip install -r requirements.txt
# RUN python3 -m pip install llama-cpp-python[server]

RUN git lfs install
RUN git lfs clone https://huggingface.co/microsoft/phi-2

#RUN echo hello
RUN python3 /llama/llama.cpp/convert-hf-to-gguf.py /llama/phi-2 --outfile phi-2.gguf
# COPY llamacpp.requirements.txt .
# RUN . /llama/llamavenv/bin/activate && cd /llama && python3 -m pip install -r llamacpp.requirements.txt

# FROM debian:bookworm

# ENV USER=llamauser

# ENV PYTHONUNBUFFERED=1
# RUN apt update && apt install python3 python3-venv git git-lfs -y && \
#     rm -rf /var/lib/apt/lists/*
    
# COPY --from=builder /llama/llama.cpp/main /llama/main
# COPY --from=builder /llama/llama.cpp/*.py /llama
# COPY --from=builder /llama/llamavenv /llama/llamavenv

# ENV PATH=/llama/llamavenv/bin:$PATH
# WORKDIR /llama

FROM python:3.11-slim-bookworm
RUN apt update && apt install build-essential -y && \
    rm -rf /var/lib/apt/lists/*

# enable CPU support
ENV LLAMA_CLBLAST=1 
ENV MODEL_PATH=/llama/phi-2.gguf

WORKDIR /llama-server

RUN python3 -m pip install llama-cpp-python[server]
COPY --from=builder ${MODEL_PATH} ${MODEL_PATH}
ENV LLAMA_SEED=-1

CMD ["sh","-c","python -m llama_cpp.server --model \"${MODEL_PATH}\" --host \"0.0.0.0\" --n_ctx 2048"]
