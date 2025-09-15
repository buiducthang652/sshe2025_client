// API Configuration
// export const API_CONFIG = {
//   BASE_URL: 'http://localhost:1337',
//   API_URL: 'http://localhost:1337/api',
// }

export const API_CONFIG = {
  BASE_URL: 'https://sshe2025.hnue.edu.vn/v2',
  API_URL: 'https://sshe2025.hnue.edu.vn/v2/api',
}


// Image and media base URLs
// export const MEDIA_CONFIG = {
//   IMAGE_BASE_URL: 'http://localhost:1337',
//   UPLOAD_BASE_URL: 'http://localhost:1337/uploads',
// }

// // Image and media base URLs
export const MEDIA_CONFIG = {
  IMAGE_BASE_URL: 'https://sshe2025.hnue.edu.vn/v2',
  UPLOAD_BASE_URL: 'https://sshe2025.hnue.edu.vn/v2/uploads',
}

// Helper function to build full image URL
export const buildImageUrl = (relativePath) => {
  if (!relativePath) return ''
  // Remove leading slash if present to avoid double slashes
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
  return `${MEDIA_CONFIG.IMAGE_BASE_URL}/${cleanPath}`
}

// Helper function to build full media URL
export const buildMediaUrl = (relativePath) => {
  if (!relativePath) return ''
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
  return `${API_CONFIG.BASE_URL}/${cleanPath}`
}

export const NEWS_MENU_CONFIG = {
  showTraining: false, // Ẩn tab Chương trình đào tạo
  showProjects: false, // Ẩn tab Dự án nghiên cứu
  menuItems: {
    cooperation: true,    // Thông tin hợp tác đối ngoại
    training: false,     // Chương trình đào tạo quốc tế
    projects: false,     // Các dự án, đề tài hợp tác quốc tế
    networks: true       // Các mạng lưới hợp tác đối ngoại
  }
} 