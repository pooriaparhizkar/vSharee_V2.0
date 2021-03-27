FROM nginx:latest
ADD build /var/wwww
COPY nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx" , "-g", "daemon off;"]