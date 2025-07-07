import { getArticleById } from "@/actions/article";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MessageCircle, ThumbsUp } from "lucide-react";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { data: article } = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  // Calculate reading time (assuming 200 words per minute)
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="container max-w-8xl py-8 px-4 md:px-6">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center space-y-4">
          <Badge variant="outline" className="w-fit mx-auto text-sm">
            {article.category || "Uncategorized"}
          </Badge>
          <CardTitle className="text-4xl font-bold tracking-tight">
            {article.title}
          </CardTitle>
          
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={article.author?.imageUrl} alt={article.author?.name} />
                <AvatarFallback>
                  {article.author?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">{article.author?.name || 'Anonymous'}</p>
              </div>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {article.featuredImage && (
            <div className="flex justify-center">
              <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted max-w-4xl w-full">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <div 
            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:text-primary hover:prose-a:underline prose-img:rounded-lg prose-img:border"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 border-t pt-6">
          <div className="flex w-full flex-col items-center justify-between gap-4 text-center max-w-2xl">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{article._count?.likes || 0} Likes</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{article._count?.comments || 0} Comments</span>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Updated {new Date(article.updatedAt || article.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          {/* {article.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-2 max-w-2xl">
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )} */}
        </CardFooter>
      </Card>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const { data: article } = await getArticleById(params.id);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Your Blog Name`,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      images: article.featuredImage ? [article.featuredImage] : [],
      type: 'article',
      publishedTime: new Date(article.createdAt).toISOString(),
      authors: [article.author?.name || 'Your Blog Name'],
    },
  };
}
