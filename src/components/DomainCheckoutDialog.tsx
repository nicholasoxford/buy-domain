import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Contact {
  firstName: string;
  lastName: string;
  companyName?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

interface DomainRegistrationForm {
  contacts: {
    registrant: Contact;
    // The API allows admin, tech, and billing contacts to be the same as registrant
    // We'll use the same contact for all roles to simplify the form
  };
  nameservers?: string[];
}

interface DomainCheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  prices: {
    registration_price: number;
    premium: boolean;
  };
}

export function DomainCheckoutDialog({
  isOpen,
  onClose,
  domain,
  prices,
}: DomainCheckoutDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DomainRegistrationForm>({
    contacts: {
      registrant: {
        firstName: "",
        lastName: "",
        address1: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        email: "",
      },
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        registrant: {
          ...prev.contacts.registrant,
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("PRE FETCH");
      // Then create the Stripe checkout session
      const checkoutResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domainName: domain,
          price: prices.registration_price,
          currency: "usd",
          email: "noxford96@gmail.com",
          userId: "4e45fc7e-c9ea-4a24-944b-86a8460a79e6",
        }),
      });

      const { url } = await checkoutResponse.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Register {domain}
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Please provide your contact information for domain registration
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  First Name
                </label>
                <Input
                  required
                  value={formData.contacts.registrant.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Last Name
                </label>
                <Input
                  required
                  value={formData.contacts.registrant.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={formData.contacts.registrant.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Street Address
              </label>
              <Input
                required
                value={formData.contacts.registrant.address1}
                onChange={(e) => handleInputChange("address1", e.target.value)}
                className="text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  City
                </label>
                <Input
                  required
                  value={formData.contacts.registrant.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  State
                </label>
                <Input
                  required
                  value={formData.contacts.registrant.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Postal Code
                </label>
                <Input
                  required
                  value={formData.contacts.registrant.zip}
                  onChange={(e) => handleInputChange("zip", e.target.value)}
                  className="text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Country
                </label>
                <Input
                  required
                  value={formData.contacts.registrant.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="US"
                  className="text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Phone Number
              </label>
              <Input
                required
                value={formData.contacts.registrant.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1.1234567890"
                className="text-slate-900"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="bg-white text-slate-900 border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-sky-500 text-white hover:bg-sky-600"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
