import Image from "next/image";
import Link from "next/link";

export default async function ProductList() {
  const products = await fetch(
    "https://express-server-pi-seven.vercel.app/api/products?sort=latest"
  ).then((res) => res.json());

  console.log({ products });

  return (
    <div className="ProductList px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <ul className="grid grid-cols-8 xs:grid-cols-12 sm:grid-cols-16 md:grid-cols-20 lg:grid-cols-24">
        {products.map((product: any) => (
          <Link
            key={product.productId}
            href={`/products/${product._id}`}
            className="group col-span-4 border"
          >
            <Image
              src={product.image || spareImageUrl}
              alt={""}
              width={700}
              height={700}
              className="/w-full aspect-[7/8] object-cover group-hover:opacity-75"
            />
            <h3 className="mt-4 text-sm">{product.title}</h3>
            <p className="mt-1 text-lg font-medium">{product.price}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}

const spareImageUrl =
  "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg";
