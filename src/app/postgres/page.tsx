import { sql } from "@vercel/postgres";

export default async function Cart({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from cart `;
  //const { rows } = await sql`SELECT * from cart where user_id=${params.user}`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.product_id} - {row.product_name} - {row.price}
        </div>
      ))}
    </div>
  );
}