#!/bin/bash
# Save as test-api.sh and run: bash test-api.sh

BASE_URL="http://localhost:5000"

echo "=== 1. LOGIN ==="
TOKEN=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' | jq -r .token)
echo "Token: $TOKEN"

echo -e "\n=== 2. USER ENDPOINTS ==="
curl -s $BASE_URL/api/users/me -H "Authorization: Bearer $TOKEN" | jq .
curl -s $BASE_URL/api/users/all -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n=== 3. POSTS ENDPOINTS ==="
curl -s $BASE_URL/api/posts | jq . | head -20
curl -s $BASE_URL/api/posts/featured | jq .
curl -s "$BASE_URL/api/posts/author/Emma%20Wilson" | jq .
curl -s $BASE_URL/api/posts/695540bddbf1d97c6b756be4 | jq .

echo -e "\n=== 4. VALIDATION FAILURES ==="
curl -i $BASE_URL/api/users/me | head -10

