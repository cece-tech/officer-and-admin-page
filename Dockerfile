# Multi-stage build for Angular application
# Stage 1: Build production Angular app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli && \
    npm cache clean --force && \
    npm install --legacy-peer-deps

COPY . .

# Build Angular app for production
RUN ng build --configuration production

# Stage 2: Development server (for local Docker development)
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli && \
    npm cache clean --force && \
    npm install --legacy-peer-deps

COPY . .

EXPOSE 4200

ENV WATCHFILE_POLL_INTERVAL=2000

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000", "--disable-host-check"]

# Stage 3: Production server with Nginx
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy nginx configuration with reverse proxy for API
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Reverse proxy API requests to Laravel backend
    location /api/ {
        proxy_pass http://app:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_buffering off;
        proxy_request_buffering off;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
    gzip_proxied any;
    gzip_min_length 1000;
    gzip_disable "msie6";

    # Health check endpoint
    location /health {
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Copy built Angular app from builder stage
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
