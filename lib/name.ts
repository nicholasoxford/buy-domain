/**
 * Utility functions for interacting with the Name.com API
 */

/**
 * Gets the Base64 encoded authentication string for Name.com API
 * Requires NAME_USERNAME and NAME_TOKEN environment variables
 */
export async function getNameAuth(): Promise<string> {
  const username = process.env.NAMECOM_USERNAME;
  const token = process.env.NAMECOM_TOKEN;

  if (!username || !token) {
    throw new Error("Missing Name.com API credentials");
  }

  // Create Basic auth string
  const auth = Buffer.from(`${username}:${token}`).toString("base64");
  return auth;
}
