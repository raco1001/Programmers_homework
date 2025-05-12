FROM ubuntu:22.04

RUN apt-get update && apt-get install -y python3 python3-pip

COPY hello.py /app/hello.py

WORKDIR /app

ENV NAME="Grepp"

CMD ["python3", "hello.py"]