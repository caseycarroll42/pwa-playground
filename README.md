# PWA Playground 🎉
A repo for experimenting with progressive enhancements

## What's Inside:

### sw-precache
This site has sw-precache set up in its build process to implement best practices for caching static assets. 

[more about sw-precache](https://github.com/GoogleChrome/sw-precache)

### Web App Manifest
This allows the user to install the website to their homescreen as if it were a native application. A web site becomes installable after the following criteria are met:
- A web app manifest json file is added to the root of the site with
  - a short_name 
  - a name
  - a 144x144 png icon
  - a start_url that loads
- A service worker is registered on the site
- The site is servered over HTTPS
- Is visited at least twice, with at least five minutes between visits

To learn more about the web app manifest, check out [Matt Guant and Paul Kinlan's article on Google's Web Fundamentals site](https://www.youtube.com/watch?v=Z4nxxThIDVk). 

### Custom Web Components
The search bar and list of stories are custom web components. Each component has its own HTML element tag. 

When the user types into the search bar, the stories list is filtered on the fly. The example is simple, but flexible.
