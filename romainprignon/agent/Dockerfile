FROM ubuntu:focal

# install: common
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  software-properties-common \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /opt
