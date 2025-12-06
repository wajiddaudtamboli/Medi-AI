// Suppress Apollo DevTools warning
if (typeof window !== 'undefined') {
  window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = {
    ApolloClient: () => {},
    push: () => {},
  };
}
