import type { MetaFunction } from "@remix-run/node";
import { Button } from "components/ui";

export const meta: MetaFunction = () => {
  return [
    { title: "OpenCommerce" },
    { name: "description", content: "Welcome to OpenCommerce" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <Button>Test UI</Button>
        </header>
      </div>
    </div>
  );
}
