import TestFrontend from "./test-frontend";

export const metadata = {
  title: "Routecycle Test Front — route planner prototype",
  description:
    "A responsive Routecycle route-planner frontend prototype preserving the current product logic and visual language.",
  alternates: {
    canonical: "/routecycle/test-frontend/",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestFrontendPage() {
  return <TestFrontend />;
}
