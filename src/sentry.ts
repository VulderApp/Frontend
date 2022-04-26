import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

declare const VERSION: number;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: `vulder-web@${VERSION}`,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  debug: false,
});
