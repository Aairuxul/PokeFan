import Link from "next/link";

export default async function TestRoutePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Démo de routing dynamique</h1>
        <p className="mt-2 text-gray-500">
          Route optionnelle attrape-tout <code>[[...slug]]</code>. Essayez :
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          <li>
            <Link className="underline" href="/test/a">
              /test/a
            </Link>
          </li>
          <li>
            <Link className="underline" href="/test/a/b/c">
              /test/a/b/c
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Dernier segment : {slug[slug.length - 1]}
      </h1>
      <pre className="mt-4 rounded bg-gray-100 p-4 text-sm text-black">
        {JSON.stringify(slug, null, 2)}
      </pre>
    </div>
  );
}
