FROM httpd:latest

WORKDIR /usr/local/apache2/htdocs

RUN echo "<html><body><h1>Docker Build Test</h1></body></html>" > ./index.html

EXPOSE 80

CMD ["httpd-foreground"]