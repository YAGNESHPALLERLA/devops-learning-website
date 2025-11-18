import { NextRequest, NextResponse } from "next/server";
import { connectDB, toObjectId } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

interface PostDocument {
  _id: { toString(): string; getTimestamp(): Date };
  authorId?: string;
  author?: { id?: string; _id?: string; name?: string; title?: string };
  authorName?: string;
  authorTitle?: string;
  content: string;
  image?: string | null;
  likes?: number;
  comments?: number;
  shares?: number;
  commentsList?: unknown[];
  createdAt?: Date;
}

interface JwtPayload {
  id: string;
  name?: string;
  email?: string;
  [key: string]: string | number | boolean | undefined;
}

// CORS helper
function applyCors(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://www.ohg365.com",
    "https://ohg365.com",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function OPTIONS(request: NextRequest) {
  return applyCors(request, new NextResponse(null, { status: 200 }));
}

// GET all posts - visible to everyone (authentication optional for liked status)
export async function GET(request: NextRequest) {
  try {
    const db = await connectDB();
    
    // Try to get user ID from token (optional)
    let currentUserId: string | null = null;
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as JwtPayload;
        currentUserId = decoded.id;
      } catch {
        // Invalid token, continue without authentication
        currentUserId = null;
      }
    }
    
    const posts = await db.collection("posts")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    // Get user's liked posts if authenticated
    let likedPostIds: Set<string> = new Set();
    if (currentUserId) {
      try {
        const likes = await db.collection("postLikes").find({ 
          userId: currentUserId 
        }).toArray();
        likedPostIds = new Set(likes.map(like => like.postId?.toString()));
      } catch {
        // If there's an error getting likes, continue without them
      }
    }

    // Format posts for frontend
    const formattedPosts = posts.map((post) => {
      const postDoc = post as unknown as PostDocument;
      const postId = postDoc._id.toString();
      return {
        id: postId,
        author: {
          id: postDoc.authorId || postDoc.author?.id || postDoc.author?._id || "unknown",
          name: postDoc.authorName || postDoc.author?.name || "Unknown",
          title: postDoc.authorTitle || postDoc.author?.title,
        },
        content: postDoc.content,
        image: postDoc.image,
        likes: postDoc.likes || 0,
        comments: postDoc.comments || 0,
        shares: postDoc.shares || 0,
        liked: likedPostIds.has(postId), // Check if current user liked this post
        createdAt: postDoc.createdAt 
          ? (postDoc.createdAt instanceof Date ? postDoc.createdAt.toISOString() : postDoc.createdAt)
          : postDoc._id.getTimestamp().toISOString(),
        commentsList: postDoc.commentsList || [],
      };
    });

    return applyCors(request, NextResponse.json(formattedPosts));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return applyCors(
      request,
      NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    );
  }
}

// POST - Create a new post
export async function POST(request: NextRequest) {
  try {
    // Get user from JWT token
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return applyCors(
        request,
        NextResponse.json({ error: "No token provided" }, { status: 401 })
      );
    }

    const token = authHeader.substring(7);
    let decoded: JwtPayload;
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as JwtPayload;
    } catch {
      return applyCors(
        request,
        NextResponse.json({ error: "Invalid token" }, { status: 401 })
      );
    }

    const body = await request.json();
    const { content, image } = body;

    if (!content || !content.trim()) {
      return applyCors(
        request,
        NextResponse.json({ error: "Content is required" }, { status: 400 })
      );
    }

    // Connect to database
    const db = await connectDB();
    
    // Get user details
    let user = null;
    try {
      user = await db.collection("users").findOne({ _id: toObjectId(decoded.id) });
    } catch {
      // If ObjectId conversion fails, user will remain null
      // We'll use decoded.name as fallback
    }
    const authorName = user?.name || decoded.name || "Unknown User";
    const authorTitle = user?.professionalRole || user?.title || "Professional";

    // Create post
    const newPost = {
      content: content.trim(),
      image: image || null,
      authorId: decoded.id,
      authorName,
      authorTitle,
      likes: 0,
      comments: 0,
      shares: 0,
      commentsList: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("posts").insertOne(newPost);

    // Format response
    const formattedPost = {
      id: result.insertedId.toString(),
      author: {
        id: decoded.id,
        name: authorName,
        title: authorTitle,
      },
      content: newPost.content,
      image: newPost.image,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      createdAt: newPost.createdAt.toISOString(),
      commentsList: [],
    };

    return applyCors(
      request,
      NextResponse.json(formattedPost, { status: 201 })
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return applyCors(
      request,
      NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    );
  }
}

