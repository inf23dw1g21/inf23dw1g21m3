####### MYSQL ########
FROM inf23dwg21/webhoster1.0:mysql5.7
RUN chown -R mysql:root /var/lib/mysql
ENV MYSQL_DATABASE=webhoster
ENV MYSQL_ROOT_PASSWORD=secret
ENV MYSQL_PASSWORD=secret

ADD ./database/m2_webhoster.sql /etc/mysql/m2_webhoster.sql
RUN sed -i 's/MYSQL_DATABASE/'${MYSQL_DATABASE}'/g' /etc/mysql/m2_webhoster.sql
RUN cp /etc/mysql/m2_webhoster.sql /docker-entrypoint-initdb.d

EXPOSE 3306

####### NODE JS ######
FROM inf23dwg21/webhoster1.0:node20
USER node
RUN mkdir -p /home/node/app
RUN chown -R node /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./
COPY --chown=node . .
RUN chown -R node /home/node/app
RUN npm install
EXPOSE 3000
CMD ["sh", "-c", "sleep 10 && npm start"]
