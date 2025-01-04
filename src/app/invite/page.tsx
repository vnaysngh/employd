"use client"; // Next.js client component

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const InviteRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract query parameters as is
    const attestationId = searchParams.get("attestationId");
    const referrer = searchParams.get("referrer");

    if (attestationId && referrer) {
      // Redirect to the /auth URL without re-encoding the parameters
      const redirectUrl = `/auth?attestationId=${attestationId}&referrer=${referrer}`;
      router.push(redirectUrl);
    } else {
      // Handle cases where query parameters are missing
      console.error("Missing required query parameters for redirection.");
      router.push("/");
    }
  }, [router, searchParams]);

  // Render a loading state while redirecting
  return <p>Redirecting...</p>;
};

export default InviteRedirect;
