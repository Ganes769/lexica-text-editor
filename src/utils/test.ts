// import * as htmlparser2 from "htmlparser2";
// import { sanitizeHtml } from 'sanitize-html';
// function parseHTMLContent(htmlString) {
//   const parser = new htmlparser2.Parser({
//     ontext: (text) => {
//       // Create text nodes
//       return { type: "text", text };
//     },
//     onopentag: (tag, attributes) => {
//       // Create DOM nodes with attributes
//       return { type: tag, attributes };
//     },
//     onclosetag: (tag) => {}, // No action needed for closing tags
//     oncomment: (comment) => {
//       // Handle comments (optional)
//     },
//   });

//   const domTree = [];
//   let currentElement = null;

//   parser.onend = () => domTree;
//   parser.write(htmlString);

//   return domTree;
// }
// export class ContentEditableEditorState {
//   constructor(config = {}) {
//     this.content = config.initialContent || ''; // String containing HTML
//     this.selection = config.selection || null; // Selection object
//     this.domTree = this.content ? parseHTMLContent(this.content) : []; // Parse initial content
//   }

//   // State update methods (replace with your specific logic)

//   updateContent(newContent) {
//     this.content = newContent;
//     this.domTree = parseHTMLContent(newContent);
//   }

//   updateSelection(newSelection) {
//     this.selection = newSelection;
//   }

//   // Implement methods for specific actions (e.g., insertText, deleteSelection)

//   insertText(text, position) {
//     // Logic to insert text at the specified position within the DOM tree
//   }

//   deleteSelection() {
//     // Logic to remove the currently selected content from the DOM tree
//   }

//   applyFormatting(formatType, selection = null) {
//     // Logic to apply formatting (bold, italic, etc.) to the selection or entire content
//   }

//   getHTMLContent() {
//     // Convert DOM tree to a sanitized HTML string
//     const html = new htmlparser2.Serializer((node, level) => {
//       let tag = '';
//       if (node.type === 'text') {
//         return node.text;
//       } else {
//         tag = `<${node.type}`;
//         if (node.attributes) {
//           tag += Object.entries(node.attributes)
//             .map(([key, value]) => ` ${key}="${value}"`)
//             .join('');
//         }
//         return tag + (node.children ? `>` : `/>`);
//       }
//     }).serialize(this.domTree);
//     return sanitizeHtml(html, { allowedTags: [... /* allowed HTML tags */] });
//   }
// }
