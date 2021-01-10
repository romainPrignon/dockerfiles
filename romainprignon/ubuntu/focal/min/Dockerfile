FROM ubuntu:focal

ENV DEBIAN_FRONTEND noninteractive

ARG user
ARG password

RUN apt-get update && apt-get install -y --no-install-recommends \
  openssl=1.1.1f-1ubuntu2.1 \
  python3-minimal=3.8.2-0ubuntu2 \
  sudo=1.8.31-1ubuntu1 \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN useradd --create-home --password "$(echo $password | openssl passwd -1 -stdin)" --shell /bin/bash $user
RUN usermod -aG sudo $user

USER $user
WORKDIR /home/$user
CMD ["/bin/bash"]
