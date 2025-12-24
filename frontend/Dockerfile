# -------- build stage --------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Pass VITE_API_PATH as an argument and environment variable
ARG VITE_API_PATH=http://localhost:5000
ENV VITE_API_PATH=$VITE_API_PATH

RUN npm run build

# -------- runtime stage --------
FROM httpd:2.4-alpine

# Enable required modules
RUN sed -i \
  -e 's/^#LoadModule rewrite_module/LoadModule rewrite_module/' \
  -e 's/^#LoadModule proxy_module/LoadModule proxy_module/' \
  -e 's/^#LoadModule proxy_http_module/LoadModule proxy_http_module/' \
  conf/httpd.conf

# Copy build output
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Copy app config
COPY apache.conf /usr/local/apache2/conf/extra/wanderlust.conf
RUN echo "Include conf/extra/wanderlust.conf" >> conf/httpd.conf

EXPOSE 80
