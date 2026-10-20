import { redirect } from "next/navigation";

// The page moved to /jeppesen-foreflight, the company's full name; this keeps
// any link already shared working.
export default function Page() {
  redirect("/jeppesen-foreflight");
}
