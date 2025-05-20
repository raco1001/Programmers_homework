FROM jenkins/jnlp-agent-docker

USER root

COPY entrypoint.sh /entrypoint.sh
RUN chown jenkins:jenkins /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN wget https://releases.hashicorp.com/terraform/1.12.0/terraform_1.12.0_linux_amd64.zip
RUN unzip terraform_1.12.0_linux_amd64.zip
RUN mv terraform /bin && chmod +x /bin/terraform

USER jenkins

ENTRYPOINT ["/entrypoint.sh"]
