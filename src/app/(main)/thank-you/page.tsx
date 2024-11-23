import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CheckCircle, Download, Github } from "lucide-react";
import Link from "next/link";
import { GithubForm } from "./github-form";
import { stripeRequest } from "../../../lib/stripe";

export default async function ThankYou({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  let verified = false;
  let error = null;

  try {
    const { env } = await getCloudflareContext();
    const sessionId = searchParams.session_id;

    if (sessionId) {
      const session = await stripeRequest<{ payment_status: string }>(
        {
          method: "GET",
          path: `/checkout/sessions/${sessionId}`,
        },
        env.STRIPE_SECRET_KEY!
      );
      verified = session.payment_status === "paid";
    }
  } catch (e: any) {
    error = e.message;
  }

  if (!searchParams.session_id) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">
            Invalid Session
          </h1>
          <p className="text-slate-300">No session ID provided.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">
            Verification Error
          </h1>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">
            Payment Not Verified
          </h1>
          <p className="text-slate-300">
            We couldn&apos;t verify your payment. If you&apos;ve completed the
            purchase, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
          <div className="text-center mb-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Thank You for Your Purchase!
            </h1>
            <p className="text-slate-300">
              Your payment has been verified. You can now download the template
              or connect your GitHub account.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/api/download-template"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
            >
              <Download className="h-5 w-5" />
              Download Template (.zip)
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/50 text-slate-400">or</span>
              </div>
            </div>

            <GithubForm sessionId={searchParams.session_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
