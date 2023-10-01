import User from "@/lib/models/user.model";

export async function POST(req) {
  const payload = await req.json();

  const findUser = await User.findOne({ email: payload.email });
}
