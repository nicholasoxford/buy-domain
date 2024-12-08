import dns from "dns";
import { promisify } from "util";

const resolveNs = promisify(dns.resolveNs);

export async function getNameservers(domain: string): Promise<string[]> {
  try {
    const nameservers = await resolveNs(domain);
    return nameservers;
  } catch (error) {
    console.error(`Error looking up nameservers for ${domain}:`, error);
    return [];
  }
}
