// Minimal markdown renderer (mirrors newsroom-uzinex/src/lib/markdown.ts).
// We don't pull a heavy markdown library — newsroom body uses ## subheadings,
// bullet lists, **bold**, and [link](url). Anything more goes through HTML.

export function renderMarkdown(md: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    let html = escape(para.join(" "));
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    out.push(`<p>${html}</p>`);
    para = [];
  };

  const closeList = () => {
    if (inList) {
      out.push(listType === "ol" ? "</ol>" : "</ul>");
      inList = false;
      listType = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      closeList();
      continue;
    }
    const h2 = /^##\s+(.*)$/.exec(line);
    const h3 = /^###\s+(.*)$/.exec(line);
    const ul = /^[-*]\s+(.*)$/.exec(line);
    const ol = /^\d+\.\s+(.*)$/.exec(line);

    if (h2) {
      flushPara();
      closeList();
      out.push(`<h2>${escape(h2[1])}</h2>`);
    } else if (h3) {
      flushPara();
      closeList();
      out.push(`<h3>${escape(h3[1])}</h3>`);
    } else if (ul) {
      flushPara();
      if (!inList || listType !== "ul") {
        closeList();
        out.push("<ul>");
        inList = true;
        listType = "ul";
      }
      out.push(`<li>${escape(ul[1]).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</li>`);
    } else if (ol) {
      flushPara();
      if (!inList || listType !== "ol") {
        closeList();
        out.push("<ol>");
        inList = true;
        listType = "ol";
      }
      out.push(`<li>${escape(ol[1]).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</li>`);
    } else {
      if (inList) closeList();
      para.push(line);
    }
  }
  flushPara();
  closeList();
  return out.join("\n");
}
