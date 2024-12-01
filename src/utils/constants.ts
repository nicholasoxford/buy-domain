export const TEMPLATE_STRIPE_LINK =
  process.env.PUBLIC_TEMPLATE_STRIPE_LINK ??
  "https://pay.dash.domains/b/test_dR63f48ve81hbyE144";

export const BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK =
  process.env.PUBLIC_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK ??
  "https://pay.dash.domains/b/3cs4jm4yW0dX2wE6op";

export const PRO_DOMAIN_BRIDGE_SUBSCRIPTION_LINK =
  process.env.PUBLIC_PRO_DOMAIN_BRIDGE_SUBSCRIPTION_LINK ??
  "https://pay.dash.domains/b/00gcPS5D02m5c7e7sv";

export const ADD_DOMAIN_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK =
  process.env.PUBLIC_ADD_DOMAIN_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK ??
  "https://pay.dash.domains/b/eVa9DG6H47Gp5IQ4gi";

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
