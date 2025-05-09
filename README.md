﻿# final-shl-assessment-recommender
# SHL Assessment Recommendation System

This web application recommends relevant SHL individual test solutions based on a natural language query or job description.

## Features

1.  Takes a natural language query or job description text as input.
2.  Recommends up to 10 relevant SHL assessments in a tabular format.
3.  Each recommendation includes:
    * Assessment Name and URL (linked to SHL's catalog)
    * Remote Testing Support (Yes/No)
    * Adaptive/IRT Support (Yes/No)
    * Duration
    * Test Type

## Demo

[https://075neha.github.io/final-shl-assessment-recommender/]

## GitHub Repository

[https://github.com/075neha/final-shl-assessment-recommender]

## Setup (for local development)

1.  Clone this repository.
2.  Navigate to the project directory.
3.  Ensure you have a web server running or simply open the `index.html` file in your browser. The data is loaded from the local `data/shl_catalog_individual.json` file.

## Data Source

The assessment data is sourced from SHL's product catalog.

## Technical Stack

* HTML
* CSS
* JavaScript

## Further Improvements

* Implement more sophisticated text similarity techniques for better recommendations.
* Integrate with SHL's actual API (if available).
