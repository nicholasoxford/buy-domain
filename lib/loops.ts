"use server";
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
      email.trim(),
      " for domain: ",
      domain.trim()
    );
    const test = await loops.testApiKey();
    console.log({ test });
    console.log({ email, emailTrim: email.trim() });
    const resp = await loops
      .sendTransactionalEmail({
        transactionalId: "cm3wis2ev00o3epr4uf1yrq5g",
        email: email.trim(),
        dataVariables: {
          domain: domain.trim(),
        },
      })
      .catch((err) => {
        console.log({ err });
      });

    if (resp && !resp.success && resp.type === "error") {
      console.log({ resp });
      throw new Error("Failed to send domain added notification");
    } else if (resp && !resp.success && resp.type === "nestedError") {
      console.dir({ resp }, { depth: null });
      throw new Error("Failed to send domain added notification");
    }

    // If Loops client fails, try direct API call
    if (!resp || !resp.success) {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          transactionalId: "cm3wis2ev00o3epr4uf1yrq5g",
          addToAudience: true,
          dataVariables: {
            domain: domain.trim(),
          },
        }),
      };

      const fetchResp = await fetch(
        "https://app.loops.so/api/v1/transactional",
        options
      );
      const fetchData = await fetchResp.json();

      if (!fetchResp.ok) {
        console.log({ fetchData });
        throw new Error("Both notification attempts failed");
      }

      console.log(
        "Domain added notification sent successfully via fetch to: ",
        email
      );
      return;
    }

    console.log("Domain added notification sent successfully to: ", email);
    return;
  } catch (error) {
    console.error("Error sending domain added notification: ", error);
    throw error;
  }
}
