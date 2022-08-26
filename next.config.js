const { withFaust } = require('@faustjs/next');

/**
 * @type {import('next').NextConfig}
 **/
// module.exports = withFaust();

module.exports = withFaust({
    images: {
        domains: ['ada-kapitus.com', 'res.cloudinary.com',],
        // domains: ['res.cloudinary.com'],
        formats: ['image/avif', 'image/webp']
      }
  }); 
