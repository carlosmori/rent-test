import { supabase } from "../../../api";

export default async function rentalsHandler(req: any, res: any) {
  const {
    query: { id, name },
    method,
  } = req;
  let response;
  switch (method) {
    case "GET":
      response = await supabase.from("rentals").select("*").eq("id", id);
      res.status(200).json(...response.data);
      break;
    case "DELETE":
      response = await supabase.from("rentals").delete().match({ id });
      // Update or create data in your database
      res.status(200).json({ id, name: name || `Rental ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      res.status(200).json({ id, name: name || `Rental ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
