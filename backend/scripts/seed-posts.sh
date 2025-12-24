#!/usr/bin/env bash
set -euo pipefail

# Improved seeding script: creates 12 realistic sample posts
# - varied authors, titles, categories, images, descriptions
# - includes ISO timestamps in `timeOfPost`

NUM=12
authors=("Alex Rivera" "Maya Chen" "Liam O'Connor" "Sofia Martinez" "Noah Patel" "Emma Johansson" "Daniel Kim" "Olivia Brown" "Ethan Wright" "Ava Thompson" "Lucas Silva" "Mia Rossi")
titles=(
  "Sunrise over the Serengeti"
  "Lost in Lisbon's Alleys"
  "Hiking the Dolomites"
  "Street Food Nights in Bangkok"
  "Kayaking through Ha Long Bay"
  "Autumn at Kyoto's Temples"
  "Desert Stars: A Wadi Night"
  "Barcelona: Gaudí and Sunsets"
  "Sailing the Whitsundays"
  "Roadtrip Across Patagonia"
  "Morning Markets of Marrakech"
  "Northern Lights in Tromsø"
)
keywords=("serengeti" "lisbon" "dolomites" "bangkok" "halong bay" "kyoto" "wadi" "barcelona" "whitsundays" "patagonia" "marrakech" "tromso")
categories_pool=("Travel" "Adventure" "Food" "Culture" "Nature" "Photography" "Roadtrip" "Beaches" "Hiking")
descriptions=(
  "A breathtaking sunrise that painted the grasslands gold, and a day filled with roaming wildlife and wide-open skies."
  "Wandering narrow cobbled streets, discovering hidden miradouros and tasting pastéis at a tiny bakery."
  "A challenging trek through jagged peaks, alpine meadows and crystal streams — the Dolomites never disappoint."
  "Night markets come alive with sizzling woks, fragrant spices and unforgettable street snacks."
  "Paddling between limestone karsts with emerald water and floating villages on the horizon."
  "Crisp air, rustling maple leaves and quiet temple gardens that feel a world away from the bustle."
  "An endless blanket of stars over sand dunes — quiet, vast and humbling."
  "Modernist architecture, sunlit plazas and tapas that keep you going until late evening."
  "Turquoise waters and white sands — sailing days filled with reef snorkeling and salty breezes."
  "Endless horizons, glacial lakes and winding gravel roads through dramatic landscapes."
  "Spices, colourful textiles and the hum of bargaining at sunrise markets — sensory overload in the best way."
  "Dancing curtains of green across the sky; cold nights rewarded by awe and silence."
)

join_categories() {
  local arr=("$@")
  local out=""
  for item in "${arr[@]}"; do
    out+="\"${item}\"," 
  done
  # remove trailing comma
  printf "%s" "${out%,}"
}

for i in $(seq 0 $((NUM-1))); do
  idx_author=$(( i % ${#authors[@]} ))
  author="${authors[$idx_author]}"
  idx_title=$(( i % ${#titles[@]} ))
  title="${titles[$idx_title]}"
  idx_keyword=$(( i % ${#keywords[@]} ))
  keyword="${keywords[$idx_keyword]}"
  image="https://source.unsplash.com/800x450/?${keyword// /%20}"

  # pick 1-3 random categories
  picked=()
  count=$((1 + RANDOM % 3))
  pool=("${categories_pool[@]}")
  for j in $(seq 1 $count); do
    idx=$((RANDOM % ${#pool[@]}))
    picked+=("${pool[$idx]}")
    # remove chosen to avoid duplicates
    pool=("${pool[@]:0:$idx}" "${pool[@]:$((idx+1))}")
  done

  categories_json=$(join_categories "${picked[@]}")

  idx_desc=$(( i % ${#descriptions[@]} ))
  description="${descriptions[$idx_desc]}"
  # featured every 4th post
  if (( i % 4 == 0 )); then
    isFeatured=true
  else
    isFeatured=false
  fi
  # spread timestamps over the past year
  days_ago=$((RANDOM % 365))
  timeOfPost=$(date -u -d "-${days_ago} days" +%Y-%m-%dT%H:%M:%SZ)

  json=$(cat <<EOF
{
  "authorName": "${author}",
  "title": "${title}",
  "imageLink": "${image}",
  "categories": [${categories_json}],
  "description": "${description}",
  "isFeaturedPost": ${isFeatured},
  "timeOfPost": "${timeOfPost}"
}
EOF
)

  curl -s -X POST http://localhost:5000/api/posts \
    -H "Content-Type: application/json" \
    -d "${json}" >/dev/null || echo "Failed to seed post: ${title}"
  sleep 0.1
done

echo "Seeded ${NUM} posts."