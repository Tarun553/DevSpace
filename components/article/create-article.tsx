"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticle = () => {
  const [content, setContent] = useState("");
  
  const handelSubmit = () =>{
    
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create New Article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handelSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Article Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter article title"
            />
          
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="programming">Programming</option>
              <option value="web-development">Web Development</option>
            </select>
          
          </div>

          <div className="space-y-2">
            <Label htmlFor="featuredImage">Featured Image</Label>
            <Input
              id="featuredImage"
              name="featuredImage"
              type="file"
              accept="image/*"
            />
          
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent} 
            />
           
          </div>
         
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">
            publish Article
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}

export default CreateArticle