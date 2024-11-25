import { LoopsClient } from "loops";

export async function sendDomainAddedNotification(
  domain: string,
  email: string
) {
  const LOOPS_API_KEY = process.env.LOOPS_API_KEY ?? "";
  const loops = new LoopsClient(LOOPS_API_KEY);
  console.log("Loops API Key: ", LOOPS_API_KEY);
  try {
    console.log(
      "Sending domain added notification to: ",
      email,
      " for domain: ",
      domain
    );
    const resp = await loops.sendTransactionalEmail({
      transactionalId: "cm3wis2ev00o3epr4uf1yrq5g",
      email,
      dataVariables: {
        domain,
      },
    });
    if (!resp.success && resp.type === "error") {
      console.log({ resp });
      throw new Error("Failed to send domain added notification");
    } else if (!resp.success && resp.type === "nestedError") {
      console.dir({ resp }, { depth: null });
      throw new Error("Failed to send domain added notification");
    }
    console.log("Domain added notification sent successfully to: ", email);
  } catch (error) {
    console.error("Error sending domain added notification: ", error);
  }
}
