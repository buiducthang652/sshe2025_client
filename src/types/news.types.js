/**
 * @typedef {Object} NewsImage
 * @property {string} url - URL of the image
 * @property {string} alternativeText - Alternative text for the image
 */

/**
 * @typedef {Object} NewsItem
 * @property {number} id - News ID
 * @property {string} title - News title
 * @property {string} description - News description
 * @property {string} content - News content
 * @property {string} publishedAt - Publication date
 * @property {NewsImage} image - News image
 */

/**
 * @typedef {Object} NewsPagination
 * @property {number} page - Current page
 * @property {number} pageSize - Items per page
 * @property {number} pageCount - Total number of pages
 * @property {number} total - Total number of items
 */

/**
 * @typedef {Object} NewsResponse
 * @property {NewsItem[]} data - Array of news items
 * @property {NewsPagination} meta - Pagination metadata
 */

export {}; 