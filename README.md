# Quote Rater

Quote Rater is a web application that allows users to rate quotes from various books. It presents quotes one at a time, lets users rate them on a scale of 1 to 3 stars, and keeps track of progress.

## Copyright Disclaimer

**Important:** The quotes displayed in this application are the intellectual property of their respective authors and publishers. This application does not claim ownership of any of the quotes. The quotes are used for personal, non-commercial purposes only. If you are the copyright owner of any quote and wish for it to be removed, please contact the project maintainer.

## Features

- Displays quotes from books, showing one quote at a time
- Allows users to rate quotes on a 1-3 star scale
- Automatically progresses to the next unrated quote after rating
- Keeps track of how many quotes have been rated and how many are left
- Persists ratings and progress locally, allowing users to continue where they left off
- Provides an export function to download all ratings as a JSON file
- Responsive design suitable for both desktop and mobile use

## Data Persistence

The app uses localStorage to save your progress. This means you can close the browser or refresh the page, and your ratings and current position will be preserved.

## Exporting Data

The "Export Ratings" function creates a JSON file with all the quotes and their ratings. This file can be used for further analysis or to transfer your ratings to another system.

## Dependencies

This project uses:
- React (loaded via CDN in index.html)
- A JSON file (`readwise_data_filtered.json`) for the quote data

## Deployment

To deploy this app to a web server:
1. Upload all files to your web server.
2. Ensure the JSON data file is accessible at the URL specified in the `fetch` call in `QuoteRater.js`.

For GitHub Pages deployment, follow GitHub's instructions for deploying a static site, and update the `fetch` URL in `QuoteRater.js` to point to the raw GitHub URL of your JSON file.

## License

This project is open source and available under the [MIT License](LICENSE).