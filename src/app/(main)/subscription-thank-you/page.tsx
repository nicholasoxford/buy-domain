import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { getEnvVariables } from "@/utils/env";
import { stripeRequest } from "@/lib/stripe";

export default async function SubscriptionThankYou({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  let verified = false;
  let error = null;

  try {
    const env = await getEnvVariables();
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
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center p-4">
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
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center p-4">
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
      <div className="min-h-dvh bg-slate-900 flex items-center justify-center p-4">
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
    <div className="min-h-dvh bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
          <div className="text-center mb-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to Domain Bobber Pro!
            </h1>
            <p className="text-slate-300">
              Your subscription has been activated. You now have access to all
              premium features.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <h3 className="font-medium text-white mb-2">What&apos;s Next?</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Set up your first domain</li>
                <li>• Configure email notifications</li>
                <li>• Explore advanced analytics</li>
                <li>• Access premium support</li>
              </ul>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
