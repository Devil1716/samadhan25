import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to admin dashboard
  redirect("/dashboard/admin");
  
  // This won't be rendered due to the redirect
  return null;
}
