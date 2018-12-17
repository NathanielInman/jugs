import indexTemplate from 'html-webpack-template-pug';

export const index = {
  inject: false,
  template: indexTemplate,
  mobile: true,
  title: '<%= name %>',
  injectExtras: {
    head: [
      {
        tag: 'link',
        rel: 'shortcut icon',
        href: '/favicon.ico'
      },
      {
        tag: 'base',
        href: '/'
      },
      {
        tag: 'meta',
        name: 'description',
        content: '<%= appDescription %>'
      },
      {
        tag: 'meta',
        name: 'version',
        content: '<%= appVersion %>'
      }
    ],
    body: [
      {tag: 'app'},
      {
        tag: 'script',
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-65195017-15'
      },
      {
        tag: 'script',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'UA-XXXXXXXX-XX');`
      },
      {
        tag: 'noscript',
        innerHTML: `JavaScript is disabled in your browser. 
          <a href='http://www.enable-javascript.com/' target='_blank'>
          Here</a> is how to enable it.`
      }
    ]
  }
};
