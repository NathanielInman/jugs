export const index = {
  head: [
    {
      tag: 'link',
      rel: 'shortcut icon',
      href: 'images/favicon.png',
      type: 'image/x-icon'
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
      innerHTML: ''+
        "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]"+
        "||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new "+
        "Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.as"+
        "ync=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"+
        "'script','//www.google-analytics.com/analytics.js','ga');ga('cr"+
        "eate', 'UA-XXXXXXXX-X', 'auto');"
    },
    {
      tag: 'noscript',
      innerHTML: "JavaScript is disabled in your browser."+
        "<a href='http://www.enable-javascript.com/' target='_blank'>"+
        "Here</a> is how to enable it."
    }
  ]
}

