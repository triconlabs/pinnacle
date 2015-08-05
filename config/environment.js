/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'ember-parse-bb',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created

        }
    };
    ENV.contentSecurityPolicy = {
        'default-src': "'none' 'unsafe-eval'",
        'script-src': "'self' 'unsafe-eval'",
        'font-src': "'self' http://fonts.gstatic.com '*'",
        'connect-src': "'self' 'localhost:4200' https://api.parse.com 'unsafe-eval'",
        'img-src': "'self'  http://files.parsetfss.com",
        'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
        'media-src': "'self' 'unsafe-eval'"
    };
    ENV['ember-parse'] = {
        PARSE_APPLICATION_ID: 'IrcvQfurruulfg3GMOFV9f2pESsBwcJ18wTlc850',
        PARSE_JAVASCRIPT_KEY: 'jFvFlAt54mDMjIZgWdXnISe3ELSsNpw34O6Wk9Sa'
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {
        minifyCSS: {
            enabled: true
        }
        minifyJS: {
            enabled: true
        }
    }

    return ENV;
};
