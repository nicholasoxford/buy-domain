import { createClient } from "@/lib/supabase/server";
import { getUserDomainCount } from "@/lib/supabase/actions";

async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const count = await getUserDomainCount(user.id);
  return Response.json({ count });
}
