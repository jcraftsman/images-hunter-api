# Image hunter API

[![Build Status](https://travis-ci.org/jcraftsman/images-hunter-api.svg?branch=master)](https://travis-ci.org/jcraftsman/images-hunter-api)

## About this repo

This is the git repo of Image hunter API.

## Endpoints

Image hunter web APIs provide two endpoints:

- Index an image. To save the metadata related to an image: `POST images/:id`
- Find an image by its id: `GET images/:id`
- Find an image. To seek for an image by a given attribute in its metadata: `GET hunt/:keyword`