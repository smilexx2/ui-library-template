export default {
  plugins: {
    'postcss-import': {
      resolve: (id, basedir, importOptions) => {
        // Handle package imports like @smilexx2/ui-theme/src/styles/index.css
        if (id.startsWith('@smilexx2/ui-theme/')) {
          return id.replace('@smilexx2/ui-theme/', '../ui-theme/')
        }
        return id
      }
    },
    '@tailwindcss/postcss': {},
  },
}