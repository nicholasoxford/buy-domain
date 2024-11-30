import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseAuthModalProps {
  onGuestCheckout?: () => void;
  redirectPath?: string;
}

export function useAuthModal({
  onGuestCheckout,
  redirectPath = "/self-host",
}: UseAuthModalProps = {}) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAuthModal(false);
      }
    };

    if (showAuthModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showAuthModal]);

  const handleGuestCheckout = () => {
    if (onGuestCheckout) {
      onGuestCheckout();
    }
    setShowAuthModal(false);
  };

  const handleSignIn = () => {
    router.push(`/login?redirect=${redirectPath}`);
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  return {
    showAuthModal,
    setShowAuthModal,
    handleGuestCheckout,
    handleSignIn,
    closeModal,
  };
}
