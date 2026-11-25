exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    return { statusCode: 500, body: "BOT_TOKEN sozlanmagan" };
  }

  try {
    const { chat_id, text } = JSON.parse(event.body || "{}");
    if (!chat_id || !text) {
      return { statusCode: 400, body: "Ma'lumot to'liq emas" };
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text })
    });

    if (!tgRes.ok) {
      return { statusCode: 502, body: "Telegram API xatosi" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    return { statusCode: 400, body: "Noto'g'ri JSON" };
  }
};
