import { supabase } from "../../../api";

export default async function rentalsHandler(req: any, res: any) {
  const { method, body } = req;
  let response;
  switch (method) {
    case "GET":
      response = await supabase.from("rentals").select().order("id");

      res.status(200).json({ rentals: response.data });
      break;

    case "POST":
      if (!body.name) {
        return res.status(500).json({ error: "Name is Mandatory" });
      }
      response = await supabase
        .from("rentals")
        .insert({ name: body.name, amount: body.amount });

      res.status(200).json({ data: response.data });
      break;
    case "DELETE":
      response = await supabase.from("rentals").delete().match({ id: body.id });
      res.status(200).json({ data: response.data });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
