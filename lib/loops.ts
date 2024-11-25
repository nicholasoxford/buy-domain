import { LoopsClient } from "loops";

const LOOPS_API_KEY = process.env.LOOPS_API_KEY ?? "";
const loops = new LoopsClient(LOOPS_API_KEY);

export default loops;

export async function sendDomainAddedNotification(
  domain: string,
  email: string
) {
  try {
    console.log("Sending domain added notification to: ", email);
    const resp = await loops.sendTransactionalEmail({
      transactionalId: "cm3wis2ev00o3epr4uf1yrq5g",
      email,
      dataVariables: {
        domain,
      },
    });
    if (!resp.success) {
      throw new Error("Failed to send domain added notification");
    }
    console.log("Domain added notification sent successfully to: ", email);
  } catch (error) {
    console.error("Error sending domain added notification: ", error);
  }
}
