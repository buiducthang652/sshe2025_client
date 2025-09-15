/**
 * Get video embed URL based on the source URL
 * @param {string} url - The video URL
 * @returns {Object} - Object containing embed URL and type
 */
export function getVideoEmbedUrl(url) {
  if (!url) return { embedUrl: '', type: 'unknown' };

  // YouTube
  const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[2].length === 11) {
    return {
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[2]}`,
      type: 'youtube'
    };
  }

  // Google Drive
  const driveRegex = /^https:\/\/drive\.google\.com\/file\/d\/([^/]+)/;
  const driveMatch = url.match(driveRegex);
  if (driveMatch) {
    return {
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      type: 'drive'
    };
  }

  // Direct video file URLs (mp4, webm, ogg)
  const videoFileRegex = /\.(mp4|webm|ogg)$/i;
  if (videoFileRegex.test(url)) {
    return {
      embedUrl: url,
      type: 'direct'
    };
  }

  // Vimeo
  const vimeoRegex = /vimeo\.com\/([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return {
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      type: 'vimeo'
    };
  }

  // Return original URL if no matches
  return {
    embedUrl: url,
    type: 'unknown'
  };
} 