import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "../PostForm";
import { getInternalLinks } from "../internal-links";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const internalLinks = await getInternalLinks();

  return (
    <div>
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Posts
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        New post
      </h1>
      <div className="mt-8">
        <PostForm internalLinks={internalLinks} />
      </div>
    </div>
  );
}
