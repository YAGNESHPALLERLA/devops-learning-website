import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

interface JwtPayload {
  id: string;
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

// POST - Like/Unlike a post
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

    const db = await connectDB();
    const post = await db.collection("posts").findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return applyCors(
        request,
        NextResponse.json({ error: "Post not found" }, { status: 404 })
      );
    }

    // Check if user already liked this post
    const likesCollection = db.collection("postLikes");
    const existingLike = await likesCollection.findOne({
      postId: new ObjectId(postId),
      userId: decoded.id,
    });

    let newLikesCount = post.likes || 0;

    if (existingLike) {
      // Unlike - remove like
      await likesCollection.deleteOne({
        postId: new ObjectId(postId),
        userId: decoded.id,
      });
      newLikesCount = Math.max(0, newLikesCount - 1);
    } else {
      // Like - add like
      await likesCollection.insertOne({
        postId: new ObjectId(postId),
        userId: decoded.id,
        createdAt: new Date(),
      });
      newLikesCount = newLikesCount + 1;
    }

    // Update post likes count
    await db.collection("posts").updateOne(
      { _id: new ObjectId(postId) },
      { $set: { likes: newLikesCount, updatedAt: new Date() } }
    );

    return applyCors(
      request,
      NextResponse.json({
        success: true,
        likes: newLikesCount,
        liked: !existingLike,
      })
    );
  } catch (error) {
    console.error("Error liking post:", error);
    return applyCors(
      request,
      NextResponse.json({ error: "Failed to like post" }, { status: 500 })
    );
  }
}

