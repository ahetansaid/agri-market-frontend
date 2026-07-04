import sanitizeHtmlLib from "sanitize-html";

/**
 * Nettoie du HTML issu du backend (contenu CKEditor rédigé par des
 * vendeurs / organisateurs) avant de l'injecter via dangerouslySetInnerHTML.
 *
 * Défense contre le XSS stocké : on retire tout script, gestionnaire
 * d'événement (onerror, onload, onclick…), iframe, et tout schéma d'URL
 * dangereux (javascript:, data:). Seules les balises de mise en forme
 * légitimes et un jeu d'attributs restreint sont conservés.
 *
 * Exécuté côté serveur (les pages détail sont des Server Components).
 */
export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return "";
  return sanitizeHtmlLib(dirty, {
    allowedTags: [
      "p", "br", "hr", "span", "div",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "strong", "b", "em", "i", "u", "s", "strike", "sub", "sup", "mark",
      "blockquote", "code", "pre",
      "ul", "ol", "li",
      "a", "img",
      "table", "thead", "tbody", "tr", "td", "th", "caption", "figure", "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      span: ["class"],
      p: ["class"],
      div: ["class"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      "*": ["class"],
    },
    // Schémas d'URL autorisés uniquement (bloque javascript:, data:, vbscript:)
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    // Force les liens externes à s'ouvrir sans fuite de referrer / tabnabbing
    transformTags: {
      a: sanitizeHtmlLib.simpleTransform("a", {
        rel: "noopener noreferrer nofollow",
      }),
    },
    disallowedTagsMode: "discard",
  });
}
