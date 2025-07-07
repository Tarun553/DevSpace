"use client"
import React, { useState, useTransition } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import "react-quill-new/dist/quill.snow.css"
import dynamic from "next/dynamic"
import { UploadButton } from "@/lib/uploadthing"
import { useRouter } from 'next/navigation'
import { createArticle } from '@/actions/article'



const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticle = () => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    
    if (!title || !category || !content) {
      alert("Please fill in all required fields");
      return;
    }
    
    startTransition(async () => {
      try {
        const result = await createArticle({
          title,
          content,
          category,
          featuredImage: imageUrl || undefined,
        });
        
        if (result.success) {
          alert("Your article has been published.");
          router.push("/dashboard");
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error creating article:", error);
        alert(error instanceof Error ? error.message : "Failed to create article");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter article title"
                required
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label>Article Image</Label>
              <div className="border-2 border-dashed rounded-lg p-4">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]?.url) {
                      setImageUrl(res[0].url);
                      alert("Image uploaded successfully!");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload Error:", error);
                    alert(error.message);
                  }}
                  className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
                />
                {imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Image preview:</p>
                    <img
                      src={imageUrl} 
                      alt="Article preview" 
                      className="mt-2 max-h-40 rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>


            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
                disabled={isPending}
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Content *</Label>
              <div className="h-[400px] overflow-y-auto">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-[350px]"
                  placeholder="Write your article content here..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending || !content}
              >
                {isPending ? 'Publishing...' : 'Publish Article'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticle;