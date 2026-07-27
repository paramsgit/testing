import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/rsvp
 * Handles party RSVP submissions
 * Captures IP address and stores response with timestamp
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP from request headers
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Validate request body
    const body = await request.json();
    console.log({ body });

    const name = body?.name;
    try {
      const BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
      const CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;

      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      const now = new Date();

      const formattedDate =
        now.toLocaleString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) +
        ` ${String(now.getDate()).padStart(2, "0")}-${String(
          now.getMonth() + 1,
        ).padStart(2, "0")}-${now.getFullYear()}`;

      const payload = {
        chat_id: CHAT_ID,
        text: `Hi 💖, Our little adventure is set! We'll meet on ${body.values.date} at ${body.values.time}, spend ${body.values.duration} together, hop on the ${body.values.transport}, and finish it off with some delicious ${body.values.food}. I can't wait to make beautiful memories with you. ✨ \n\n From ${ip} at ${formattedDate}`,
        parse_mode: "Markdown",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
      } catch (error) {
        console.error("Error sending log:", error);
      }
    } catch (error) {
      console.log("Failed to send message", error);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
