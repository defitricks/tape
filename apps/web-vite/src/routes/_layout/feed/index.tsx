import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/feed/")({
  component: () => <div>feed</div>
});