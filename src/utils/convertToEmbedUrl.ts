export function convertToEmbedUrl(inputUrl: string): { embedUrl: string | null, platform: string | null } {
  try {
    const url = new URL(inputUrl);
    const hostname = url.hostname;
    const searchParams = url.searchParams;
    let embedUrl = null;
    let platform = null;

    // YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      platform = "YouTube";
      const videoId = searchParams.get("v") || url.pathname.split("/").pop();
      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    // Vimeo
    else if (hostname.includes("vimeo.com")) {
      platform = "Vimeo";
      const videoId = url.pathname.split("/").pop();
      if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    // Dailymotion
    else if (hostname.includes("dailymotion.com")) {
      platform = "Dailymotion";
      const videoId = url.pathname.split("/").pop();
      if (videoId) embedUrl = `https://www.dailymotion.com/embed/video/${videoId}`;
    }

    // Twitch
    else if (hostname.includes("twitch.tv")) {
      platform = "Twitch";
      const videoId = url.pathname.split("/").pop();
      if (videoId) embedUrl = `https://player.twitch.tv/?video=${videoId}&parent=yourdomain.com`; // customize domain
    }

    // Facebook
    else if (hostname.includes("facebook.com")) {
      platform = "Facebook";
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(inputUrl)}`;
    }

    // Wistia
    else if (hostname.includes("wistia.com") || hostname.includes("wi.st")) {
      platform = "Wistia";
      const videoId = url.pathname.split("/").pop();
      if (videoId) embedUrl = `https://fast.wistia.net/embed/iframe/${videoId}`;
    }

    // Brightcove (needs account ID)
    else if (hostname.includes("brightcove")) {
      platform = "Brightcove";
      const videoId = searchParams.get("videoId");
      const accountId = url.pathname.split("/")[1]; // crude check
      if (videoId && accountId) {
        embedUrl = `https://players.brightcove.net/${accountId}/default_default/index.html?videoId=${videoId}`;
      }
    }

    // Loom
    else if (hostname.includes("loom.com")) {
      platform = "Loom";
      const videoId = url.pathname.split("/").pop();
      if (videoId) embedUrl = `https://www.loom.com/embed/${videoId}`;
    }

    return { embedUrl, platform };
  } catch (err) {
    console.warn("Invalid URL input:", inputUrl);
    return { embedUrl: null, platform: null };
  }
}
