FROM node:18.12.0-alpine as build

WORKDIR /app

ENV REACT_APP_SOGO_API=https://api.gosol.ink/api

COPY package*.json ./

ENV NODE_ENV=production
RUN npm install --omit=dev --fetch-timeout=60000

# RUN npm install react-scripts -g --silent

# RUN npm audit fix

COPY . .

RUN npm run build --production

#nginx environment setup

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
#
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]