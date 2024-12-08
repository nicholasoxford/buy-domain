"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormSection,
  FormRow,
  FormField,
  FormActions,
} from "@/components/ui/form";
import { ChevronDown, ChevronUp, Shield, Lock, RefreshCw } from "lucide-react";

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
  fax?: string;
  email: string;
}

interface DomainRegistration {
  domainName: string;
  nameservers: string[];
  registrant: Contact;
  privacyEnabled: boolean;
  locked: boolean;
  autorenewEnabled: boolean;
}

interface RegistrationFormProps {
  initialDomain?: string;
}

export function RegistrationForm({ initialDomain }: RegistrationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [showDomainLockDetails, setShowDomainLockDetails] = useState(false);
  const [prices, setPrices] = useState<{
    registration_price: number;
    renewal_price: number;
    transfer_price: number;
    premium: boolean;
  } | null>(null);
  const [whoisPrivacy, setWhoisPrivacy] = useState(true);
  const [formData, setFormData] = useState<DomainRegistration>({
    domainName: initialDomain || "",
    nameservers: ["", "", "", ""],
    registrant: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      phone: "",
      email: "",
    },
    privacyEnabled: true,
    locked: true,
    autorenewEnabled: true,
  });
  const [advancedSecurity, setAdvancedSecurity] = useState(true);
  const ADVANCED_SECURITY_PRICE = 4.99;

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch(`/api/domains/${initialDomain}`);
        const data = await response.json();
        if (data.prices && data.prices.length > 0) {
          setPrices(data.prices[0]);
        }
      } catch (error) {
        console.error("Error fetching pricing:", error);
      }
    };

    fetchPricing();
  }, [initialDomain]);

  const handleContactChange = (field: keyof Contact, value: string) => {
    setFormData((prev) => ({
      ...prev,
      registrant: {
        ...prev.registrant,
        [field]: value,
      },
    }));
  };

  const handleNameserverChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      nameservers: prev.nameservers.map((ns, i) => (i === index ? value : ns)),
    }));
  };

  const handleToggleChange = (
    field: keyof Pick<
      DomainRegistration,
      "privacyEnabled" | "locked" | "autorenewEnabled"
    >,
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    if (!prices) return 0;
    let total = prices.registration_price;
    if (advancedSecurity) {
      total += ADVANCED_SECURITY_PRICE;
    }
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!prices) {
        throw new Error("Pricing information not available");
      }

      const checkoutResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domainName: formData.domainName,
          price: calculateTotal(),
          currency: "usd",
          email: formData.registrant.email,
          whoisPrivacy,
          advancedSecurity,
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await checkoutResponse.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <FormSection
          title="Contact Information"
          description="Enter the domain registrant's details"
        >
          <div className="space-y-4">
            <FormRow columns={2}>
              <FormField label="First Name">
                <Input
                  required
                  value={formData.registrant.firstName}
                  onChange={(e) =>
                    handleContactChange("firstName", e.target.value)
                  }
                  className="bg-slate-800/50 border-slate-700 text-slate-300"
                />
              </FormField>
              <FormField label="Last Name">
                <Input
                  required
                  value={formData.registrant.lastName}
                  onChange={(e) =>
                    handleContactChange("lastName", e.target.value)
                  }
                  className="bg-slate-800/50 border-slate-700 text-slate-300"
                />
              </FormField>
            </FormRow>

            <FormField label="Email Address">
              <Input
                type="email"
                required
                value={formData.registrant.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-slate-300"
              />
            </FormField>

            <FormField label="Phone Number">
              <Input
                required
                value={formData.registrant.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                placeholder="+1.1234567890"
                className="bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
              />
            </FormField>

            <FormField label="Company Name" optional>
              <Input
                value={formData.registrant.companyName || ""}
                onChange={(e) =>
                  handleContactChange("companyName", e.target.value)
                }
                className="bg-slate-800/50 border-slate-700 text-slate-300"
              />
            </FormField>

            <FormField label="Address Line 1">
              <Input
                required
                value={formData.registrant.address1}
                onChange={(e) =>
                  handleContactChange("address1", e.target.value)
                }
                className="bg-slate-800/50 border-slate-700 text-slate-300"
              />
            </FormField>

            <FormField label="Address Line 2" optional>
              <Input
                value={formData.registrant.address2 || ""}
                onChange={(e) =>
                  handleContactChange("address2", e.target.value)
                }
                className="bg-slate-800/50 border-slate-700 text-slate-300"
              />
            </FormField>

            <FormRow columns={3}>
              <FormField label="City">
                <Input
                  required
                  value={formData.registrant.city}
                  onChange={(e) => handleContactChange("city", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-slate-300"
                />
              </FormField>
              <FormField label="State/Province">
                <Input
                  required
                  value={formData.registrant.state}
                  onChange={(e) => handleContactChange("state", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-slate-300"
                />
              </FormField>
              <FormField label="Postal Code">
                <Input
                  required
                  value={formData.registrant.zip}
                  onChange={(e) => handleContactChange("zip", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-slate-300"
                />
              </FormField>
            </FormRow>

            <FormField label="Country Code">
              <Input
                required
                value={formData.registrant.country}
                onChange={(e) => handleContactChange("country", e.target.value)}
                placeholder="US"
                className="bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
              />
            </FormField>
          </div>
        </FormSection>

        <FormSection
          title="Domain Settings"
          description="Configure privacy and security settings"
        >
          <div className="space-y-3">
            <FormField label="Advanced Security">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 text-sm text-slate-400">
                      <Shield className="h-4 w-4 text-purple-500 shrink-0" />
                      Shield your personal information online with WHOIS Privacy
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-400">
                      <Lock className="h-4 w-4 text-purple-500 shrink-0" />
                      Domain Lock Plus for an added layer of protection
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-400">
                      <svg
                        className="h-4 w-4 text-purple-500 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Included SSL Certificate for every domain
                    </li>
                  </ul>
                  <p className="text-sm font-medium text-purple-400 pl-4">
                    Only $4.99/year
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm text-slate-400 hover:text-slate-300 p-0 h-auto font-normal"
                  onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                >
                  {showPrivacyDetails ? (
                    <ChevronUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-1" />
                  )}
                  {showPrivacyDetails
                    ? "Show less"
                    : "Learn more about Advanced Security"}
                </Button>

                {showPrivacyDetails && (
                  <div className="rounded-lg border border-slate-800">
                    <div className="grid grid-cols-2 divide-x divide-slate-800">
                      <div className="p-3">
                        <div className="text-sm font-medium text-slate-300 mb-2">
                          Unprotected
                        </div>
                        <div className="space-y-1 text-sm text-slate-400">
                          <p>example.com</p>
                          <p>John Smith</p>
                          <p>123 Main Street</p>
                          <p>Apt 4B</p>
                          <p>New York, NY 10001</p>
                          <p>+1.2125555555</p>
                          <p>john.smith@example.com</p>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-medium text-slate-300 mb-2">
                          With Advanced Security
                        </div>
                        <div className="space-y-1 text-sm text-slate-400">
                          <p>{formData.domainName}</p>
                          <p>Redacted For Privacy</p>
                          <p>Domain Protection Services, Inc.</p>
                          <p>PO Box 1769</p>
                          <p>Denver, CO 80201</p>
                          <p>Registrant Country: US</p>
                          <p>+1.7208009072</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-slate-800 p-3">
                      <p className="text-sm font-medium text-slate-300 mb-1.5">
                        What&apos;s included:
                      </p>
                      <ul className="space-y-1 text-sm text-slate-400">
                        <li>
                          • Complete WHOIS privacy protection to shield your
                          personal information
                        </li>
                        <li>
                          • Domain Lock Plus to prevent unauthorized transfers
                          and changes
                        </li>
                        <li>
                          • SSL Certificate included to secure your website
                        </li>
                        <li>
                          • Protection against spam and unwanted solicitation
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <RadioGroup
                  defaultValue={
                    formData.privacyEnabled ? "enabled" : "disabled"
                  }
                  onValueChange={(value: string) => {
                    handleToggleChange("privacyEnabled", value === "enabled");
                    setAdvancedSecurity(value === "enabled");
                  }}
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2 rounded-md border border-slate-800 p-2">
                    <RadioGroupItem value="enabled" id="privacy-enabled" />
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <label
                          htmlFor="privacy-enabled"
                          className="text-sm font-medium leading-none text-slate-200"
                        >
                          Advanced Security
                        </label>
                      </div>
                      <Shield className="h-4 w-4 text-purple-500" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-slate-800 p-2">
                    <RadioGroupItem value="disabled" id="privacy-disabled" />
                    <label
                      htmlFor="privacy-disabled"
                      className="text-sm font-medium leading-none text-slate-200"
                    >
                      Unprotected
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </FormField>

            <FormField label="Domain Lock">
              <div className="space-y-2">
                <div className="flex flex-col justify-start items-start">
                  <p className="text-sm text-slate-400">
                    Domain Lock adds enhanced security by preventing
                    unauthorized transfers and changes
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-sm text-slate-400 hover:text-slate-300 p-0 h-auto font-normal "
                    onClick={() =>
                      setShowDomainLockDetails(!showDomainLockDetails)
                    }
                  >
                    {showDomainLockDetails ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    {showDomainLockDetails ? "Show less" : "Learn more"}
                  </Button>
                </div>

                {showDomainLockDetails && (
                  <div className="rounded-lg border border-slate-800 p-3 space-y-2">
                    <p className="text-sm font-medium text-slate-300">
                      When locked, this prevents:
                    </p>
                    <ul className="space-y-1 text-sm text-slate-400">
                      <li>• Domain transfers between accounts</li>
                      <li>• Changes to contact information</li>
                      <li>• Changes to nameservers</li>
                      <li>• Changes to WHOIS privacy settings</li>
                    </ul>
                    <p className="text-sm text-slate-400 mt-2">
                      Note: Select Standard Security if you plan to transfer or
                      modify the domain soon
                    </p>
                  </div>
                )}

                <RadioGroup
                  defaultValue={formData.locked ? "locked" : "unlocked"}
                  onValueChange={(value: string) =>
                    handleToggleChange("locked", value === "locked")
                  }
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2 rounded-md border border-slate-800 p-2">
                    <RadioGroupItem value="locked" id="security-locked" />
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <label
                          htmlFor="security-locked"
                          className="text-sm font-medium leading-none text-slate-200"
                        >
                          Lock Domain
                        </label>
                      </div>
                      <Lock className="h-4 w-4 text-purple-500" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-slate-800 p-2">
                    <RadioGroupItem value="unlocked" id="security-unlocked" />
                    <label
                      htmlFor="security-unlocked"
                      className="text-sm font-medium leading-none text-slate-200"
                    >
                      Standard Security
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </FormField>

            <FormField label="Auto-Renewal">
              <RadioGroup
                defaultValue={
                  formData.autorenewEnabled ? "enabled" : "disabled"
                }
                onValueChange={(value: string) =>
                  handleToggleChange("autorenewEnabled", value === "enabled")
                }
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-md border border-slate-800 p-2">
                  <RadioGroupItem value="enabled" id="renewal-enabled" />
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <label
                        htmlFor="renewal-enabled"
                        className="text-sm font-medium leading-none text-slate-200"
                      >
                        Auto-Renew
                      </label>
                    </div>
                    <RefreshCw className="h-4 w-4 text-purple-500" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 rounded-md border border-slate-800 p-2">
                  <RadioGroupItem value="disabled" id="renewal-disabled" />
                  <label
                    htmlFor="renewal-disabled"
                    className="text-sm font-medium leading-none text-slate-200"
                  >
                    Manual Renewal
                  </label>
                </div>
              </RadioGroup>
            </FormField>

            <div className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-slate-400 hover:text-slate-300 p-0 h-auto font-normal w-full text-left flex items-center"
              >
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 mr-1" />
                )}
                Advanced Options
              </Button>

              {showAdvanced && (
                <div className="pt-3">
                  <FormField label="Custom Nameservers" optional>
                    <p className="text-sm text-slate-400 mb-2">
                      Leave empty to use our default nameservers
                    </p>
                    <FormRow columns={2}>
                      {formData.nameservers.map((ns, index) => (
                        <Input
                          key={index}
                          value={ns}
                          onChange={(e) =>
                            handleNameserverChange(index, e.target.value)
                          }
                          placeholder={`Nameserver ${index + 1}`}
                          className="bg-slate-800/50 border-slate-700 text-slate-300 placeholder:text-slate-500"
                        />
                      ))}
                    </FormRow>
                  </FormField>
                </div>
              )}
            </div>
          </div>
        </FormSection>
      </div>

      <FormActions>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
          className="border-slate-700 hover:bg-slate-800 text-slate-300"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !prices}
          className="bg-purple-600 hover:bg-purple-500 text-white px-8"
        >
          {loading ? "Processing..." : `Pay $${calculateTotal().toFixed(2)}`}
        </Button>
      </FormActions>
    </form>
  );
}
