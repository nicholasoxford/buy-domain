interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuestCheckout: () => void;
  onSignIn: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  onGuestCheckout,
  onSignIn,
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-4">
          Sign in to continue
        </h2>
        <div className="space-y-4">
          <button
            onClick={onSignIn}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium"
          >
            Sign in / Create account
          </button>
          <button
            onClick={onGuestCheckout}
            className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium border border-white/10"
          >
            Continue as guest
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-slate-400 hover:text-white text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
