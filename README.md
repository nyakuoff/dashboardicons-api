# dashboardicons.com APIa

Lightweight REST API to fetch icons from [dashboardicons.com](https://dashboardicons.com/) (2700+ service icons).

## Setup

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000` by default. Set `PORT` in a `.env` file to change it.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | API info |
| `GET` | `/icons` | List all icon names. Filter with `?q=<query>` |
| `GET` | `/icons/:name` | Icon metadata + CDN URLs for all formats and theme variants |
| `GET` | `/icons/:name/:format` | Redirect to CDN asset (`svg` \| `png` \| `webp`) |

## Examples

```bash
# Search icons
curl http://localhost:3000/icons?q=plex

# Get icon info and all CDN URLs
curl http://localhost:3000/icons/github
```

Icons are sourced from [homarr-labs/dashboard-icons](https://github.com/homarr-labs/dashboard-icons) via jsDelivr CDN. Responses are cached for 1 hour.
