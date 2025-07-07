"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Define the article input type
type CreateArticleInput = {
  title: string;
  content: string;
  category: string;
  featuredImage?: string;
};

export const createArticle = async (data: CreateArticleInput) => {
  try {
    // Get the current user from Clerk
    const { userId: clerkUserId, sessionClaims } = await auth();
    
    if (!clerkUserId) {
      throw new Error("You must be signed in to create an article");
    }

    // Get user info from session
    const userEmail = sessionClaims?.email as string;
    const userName = sessionClaims?.fullName as string || 'Anonymous';
    const userImage = sessionClaims?.imageUrl as string | undefined;

    // Validate input
    if (!data.title || !data.content || !data.category) {
      throw new Error("Title, content, and category are required");
    }

    // Find or create the user in our database
    let user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      // Create the user if they don't exist
      user = await prisma.user.create({
        data: {
          clerkUserId,
          email: userEmail || `${clerkUserId}@user.com`,
          name: userName,
          imageUrl: userImage,
        },
      });
    }

    // Create the article in the database
    const article = await prisma.articles.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        authorId: user.id,
        featuredImage: data.featuredImage || null,
      },
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    // Revalidate the articles page to show the new article
    revalidatePath("/articles");
    
    return {
      success: true,
      data: {
        id: article.id,
        title: article.title,
        slug: article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        category: article.category,
        featuredImage: article.featuredImage,
        author: article.author,
        createdAt: article.createdAt,
      },
    };
  } catch (error) {
    console.error("Error creating article:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create article",
    };
  }
};

// Get all articles with author information
export const getArticles = async () => {
  try {
    const articles = await prisma.articles.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    
    return {
      success: true,
      data: articles,
     
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { success: false, error: "Failed to fetch articles" };
  }
};


// get a single article by ID with author information

export const getArticleById = async (id: string) => {
  try{
  const article = await prisma.articles.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  
  return {
    success: true,
    data: article,
  };
  }
  catch (error) {
    console.error("Error fetching article:", error);
    return { success: false, error: "Failed to fetch article" };
  }
}

// make the server action for delete blog
export const deleteArticleById = async(id: string) => {
  try {
    // Delete the article from the database
    const deletedArticle = await prisma.articles.delete({
      where: { id },
    });

    // Revalidate the articles page to reflect the changes
    revalidatePath('/dashboard/articles');
    
    return { success: true, data: deletedArticle };
  } catch (error) {
    console.error('Error deleting article:', error);
    return { 
      success: false, 
      error: 'Failed to delete article',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// make the server action from edit blog 
export const editArticleById = async (id: string, data: CreateArticleInput) => {
  try {
    // Update the article in the database
    const updatedArticle = await prisma.articles.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    // Revalidate the articles page to reflect the changes
    revalidatePath('/dashboard/articles');
    
    return { success: true, data: updatedArticle };
  } catch (error) {
    console.error('Error updating article:', error);
    return { 
      success: false, 
      error: 'Failed to update article',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}