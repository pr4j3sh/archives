import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <div className="w-1/2 mx-auto flex justify-between py-2 border-b">
      <Button variant="link">
        <Link href={""}>github.com</Link>
      </Button>
      <ModeToggle />
    </div>
  );
}
