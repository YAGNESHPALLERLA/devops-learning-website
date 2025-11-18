import { NextRequest, NextResponse } from "next/server";
import { connectDB, toObjectId } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

interface JwtPayload {
  id: string;
  name?: string;
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

// POST - Add a comment to a post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    
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
    const { content } = body;

    if (!content || !content.trim()) {
      return applyCors(
        request,
        NextResponse.json({ error: "Comment content is required" }, { status: 400 })
      );
    }

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

    // Create comment
    const newComment = {
      id: new ObjectId().toString(),
      author: {
        id: decoded.id,
        name: authorName,
      },
      content: content.trim(),
      likes: 0,
      liked: false,
      createdAt: new Date().toISOString(),
    };

    // Add comment to post
    const post = await db.collection("posts").findOne({ _id: new ObjectId(postId) });
    if (!post) {
      return applyCors(
        request,
        NextResponse.json({ error: "Post not found" }, { status: 404 })
      );
    }

    const commentsList = post.commentsList || [];
    commentsList.push(newComment);

    await db.collection("posts").updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          comments: (post.comments || 0) + 1,
          commentsList: commentsList,
          updatedAt: new Date(),
        },
      }
    );

    return applyCors(
      request,
      NextResponse.json({
        success: true,
        comment: newComment,
        comments: (post.comments || 0) + 1,
      })
    );
  } catch (error) {
    console.error("Error commenting on post:", error);
    return applyCors(
      request,
      NextResponse.json({ error: "Failed to add comment" }, { status: 500 })
    );
  }
}

