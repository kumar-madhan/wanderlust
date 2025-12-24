#!/bin/bash
for i in {1..12}; do
  curl -s -X POST http://localhost:5000/api/posts \
    -H "Content-Type: application/json" \
    -d "{
      \"authorName\": \"Admin\",
      \"title\": \"Wanderlust Post $i\",
      \"imageLink\": \"https://picsum.photos/800/50$i.jpg\",
      \"categories\": [\"Travel\", \"Adventure\"],
      \"description\": \"Seeded content $i\",
      \"isFeaturedPost\": $([ $((i%3)) -eq 0 ] && echo true || echo false)
    }" >/dev/null
done


  