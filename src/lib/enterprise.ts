"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitEnterpriseForm(formData: FormData) {
  const supabase = await createClient();

  const company = formData.get("company");
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const employees = formData.get("employees");
  const message = formData.get("message");

  if (!company || !name || !email || !employees || !message) {
    throw new Error("Please fill in all required fields");
  }

  const data = {
    company_name: company.toString(),
    contact_name: name.toString(),
    email: email.toString(),
    phone: phone?.toString() || null,
    employees: employees.toString(),
    message: message.toString(),
    status: "new" as const,
    created_at: new Date().toISOString(),
  };

  try {
    const { error } = await supabase
      .from("enterprise_inquiries")
      .insert([data]);

    if (error) throw error;

    revalidatePath("/enterprise");
    return { success: true, redirect: "/enterprise/thank-you" };
  } catch (error) {
    console.error("Error submitting enterprise form:", error);
    throw new Error("Failed to submit form. Please try again later.");
  }
}
