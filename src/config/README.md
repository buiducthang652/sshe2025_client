# Configuration Constants

## API URL Configuration

All API URLs and base URLs are centralized in `constants.js` to make it easy to change them across the entire application.

### How to Change URLs

To change the base URL for the entire application, simply modify the values in `src/config/constants.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://your-new-domain.com',  // Change this
  API_URL: 'https://your-new-domain.com/api',  // Change this
}

export const MEDIA_CONFIG = {
  IMAGE_BASE_URL: 'https://your-new-domain.com',  // Change this
  UPLOAD_BASE_URL: 'https://your-new-domain.com/uploads',  // Change this
}
```

### Usage Examples

1. **For API calls**: Already configured in `src/services/axios.js`
2. **For images**: Use the `buildImageUrl()` helper function
3. **For media files**: Use the `buildMediaUrl()` helper function

```javascript
import { buildImageUrl, buildMediaUrl } from '../config/constants'

// For images
const imageUrl = buildImageUrl('/path/to/image.jpg')

// For other media files
const mediaUrl = buildMediaUrl('/path/to/file.pdf')
```

### Files Using These Constants

- `src/services/axios.js` - API configuration
- `src/components/HomeHero.js` - Hero images
- `src/components/HomeNewsList.js` - News thumbnails
- `src/components/NewsList.js` - News thumbnails
- `src/components/NewsDetail.js` - News images
- `src/app/[lng]/news/training/page.js` - Training news images
- `src/app/[lng]/news/projects/page.js` - Projects news images
- `src/app/[lng]/news/networks/page.js` - Networks news images
- `src/app/[lng]/news/cooperation/page.js` - Cooperation news images
- `src/app/[lng]/news/[documentId]/page.js` - News detail images

### Benefits

✅ **Single source of truth**: Change URL in one place affects entire app
✅ **Easy maintenance**: No need to search and replace across multiple files
✅ **Environment flexibility**: Can easily switch between dev, staging, and production URLs
✅ **Type safety**: Helper functions ensure consistent URL building 