import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./styles.css";

export default function App() {
  const SITE_TITLE = "";
  const SITE_DESCRIPTION = "";

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          {/* === META === */}
          <Title>{SITE_TITLE}</Title>
          <Meta name="description" content={SITE_DESCRIPTION} />

          {/* OpenGraph  */}
          <Meta property="og:url" content="https://tateti.mourglia.dev" />
          <Meta property="og:type" content="website" />
          <Meta property="og:title" content={SITE_TITLE} />
          <Meta property="og:description" content={SITE_DESCRIPTION} />
          <Meta
            property="og:image"
            content="https://tateti.mourglia.dev/og.jpg"
          />
          <Meta property="og:locale" content="en_US" />

          {/* Twitter  */}
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta property="twitter:domain" content="tateti.mourglia.dev" />
          <Meta property="twitter:url" content="https://tateti.mourglia.dev" />
          <Meta name="twitter:title" content={SITE_TITLE} />
          <Meta name="twitter:description" content={SITE_DESCRIPTION} />
          <Meta
            name="twitter:image"
            content="https://tateti.mourglia.dev/og.jpg"
          />

          {/* === APP === */}
          <Suspense>
            <main class="grid place-items-center h-full bg-background text-foreground">
              {props.children}
            </main>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
