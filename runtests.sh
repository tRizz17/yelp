#!/bin/sh

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

# BUSINESSES

status 'GET all businesses'
curl http://localhost:3000/businesses

status 'GET business by id'
curl http://localhost:3000/businesses/0

status 'GET business by invalid id'
curl http://localhost:3000/businesses/999

status 'POST new business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name":"Taco Heaven","address":"456 taco ln","city":"Portland","state":"OR","zip":"97201","phone":"5035550199","category":"Mexican"}' \
    http://localhost:3000/businesses

status 'POST new business missing fields'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name":"Taco Town"}' \
    http://localhost:3000/businesses

status 'PUT update business'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"name":"Pizza World","address":"123 fun pl","city":"Portland","state":"OR","zip":"97212","phone":"123456789","category":"Pizza"}' \
    http://localhost:3000/businesses/0

status 'DELETE business'
curl -X DELETE http://localhost:3000/businesses/0

# REVIEWS

status 'GET all reviews'
curl http://localhost:3000/reviews

status 'POST new review'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"stars":4,"dollars":2,"body":"Great place"}' \
    http://localhost:3000/reviews/0

status 'POST new review invalid stars'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"stars":9,"dollars":2,"body":"Great place"}' \
    http://localhost:3000/reviews/0

status 'PUT update review'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"stars":2,"dollars":1,"body":"Argh"}' \
    http://localhost:3000/reviews/0

status 'DELETE review'
curl -X DELETE http://localhost:3000/reviews/0

# PHOTOS

status 'GET all photos'
curl http://localhost:3000/photos

status 'POST new photo'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"url":"https://example.com/photo.jpg","caption":"The place"}' \
    http://localhost:3000/photos/0

status 'POST new photo missing fields'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"url":"https://example.com/photo.jpg"}' \
    http://localhost:3000/photos/0

status 'PUT update photo'
curl -X PUT \
    -H 'Content-Type: application/json' \
    -d '{"url":"https://example.com/photo2.jpg","caption":"Seating area"}' \
    http://localhost:3000/photos/0

status 'DELETE photo'
curl -X DELETE http://localhost:3000/photos/0