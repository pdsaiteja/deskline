# Development Report — Deskline Local Migration

**Student:** [Your Name]  
**Course:** [Course Name]  
**Date:** July 19, 2026  
**App:** Deskline — RAG Support Chatbot

---

## IDE and AI Assistant Choice

I chose **Cursor** as my AI-powered IDE because it combines a full code editor with an integrated AI agent that can create files, run terminal commands, and debug issues in context. Cursor was recommended in the assignment and works well for converting a single-file prototype into a multi-file React project without writing code manually.

The AI assistant used was **Cursor Agent (Composer)**, which helped scaffold the project, split components, migrate styling, and run the development server.

## Path Taken

I chose **Path A: Migrate My Claude Artifacts App**.

My Workshop 1.4 artifact was a single HTML file containing HTML, CSS, and JavaScript for Deskline — a RAG-style support chatbot with FAQ ingestion, chat matching, and an admin dashboard. I pasted the artifact code into Cursor and asked the agent to convert it into a proper React project with separated components, utilities, and styles.

## Most Helpful AI Prompts

1. **Migration prompt:**
   > "Convert this single-file React app from Claude Artifacts into a proper React project with multiple files and components: [paste code]"

2. **Run locally:**
   > "Please run this application locally for me. Show me how to start the development server."

3. **Persistence enhancement:**
   > "Save user data so it persists when they refresh"

4. **Organization:**
   > "Please organize my project with proper folders and create a professional README file"

5. **Validation:**
   > "Add validation to all my forms"

## Claude Artifacts vs Local Development

| Aspect | Claude Artifacts | Local Development (Cursor) |
|--------|------------------|----------------------------|
| Setup | Instant in browser | Requires Node.js, npm install, dev server |
| File structure | Single file | Multiple components, hooks, utils |
| Persistence | Session-only | Can use localStorage, APIs, databases |
| Debugging | Limited | Full IDE tools, terminal, browser devtools |
| Collaboration | Share artifact link | Git, GitHub, team workflows |
| Scalability | Prototype/demo | Production-ready architecture |
| AI assistance | Chat in artifact | Agent edits files and runs commands |

**Key insight:** Artifacts are excellent for rapid prototyping and validating ideas. Local development adds structure, persistence, version control, and a path toward real deployment.

## Challenges and How AI Helped

### Challenge 1: Splitting a monolithic file
The original artifact mixed markup, styles, and logic in one file. The AI agent separated concerns into `components/`, `utils/ragMatcher.js`, `hooks/useLocalStorage.js`, and `styles/App.css`.

### Challenge 2: Converting DOM manipulation to React state
The original used `document.getElementById`, `innerHTML`, and event listeners. The AI refactored this into React state (`useState`) and declarative JSX rendering.

### Challenge 3: npm certificate errors
During setup, `npm create vite` failed with an SSL certificate error. The AI worked around this by manually scaffolding the Vite project files and running `npm install`.

### Challenge 4: Assignment deliverables
The AI created a README, project structure documentation, and this development report template to satisfy submission requirements.

## Time Spent on Each Step

| Step | Activity | Approx. Time |
|------|----------|--------------|
| 1 | IDE setup (Cursor already installed, verified Node.js) | 10 min |
| 2 | Paste artifact and request migration | 15 min |
| 3 | Review generated project structure | 20 min |
| 4 | Run app locally (`npm install`, `npm run dev`) | 15 min |
| 5 | Enhancements (validation, persistence, README) | 20 min |
| 6 | Screenshots and development report | 30 min |
| **Total** | | **~1 hr 50 min** |

## Deliverables Checklist

- [ ] Screenshot 1: Project code open in Cursor IDE
- [ ] Screenshot 2: App running at `http://localhost:5173`
- [ ] Original Claude Artifacts link from Workshop 1.4
- [x] Development report (this document)

## Original Claude Artifacts Link

[Paste your published Claude Artifact URL from Workshop 1.4 here]

Example format: `https://claude.ai/public/artifacts/...`

---

## Conclusion

Migrating Deskline from Claude Artifacts to a local React project demonstrated how AI agents can handle technical scaffolding while the developer focuses on product behavior and assignment requirements. The local version preserves all original functionality while adding form validation, data persistence, and a maintainable project structure suitable for future enhancements such as a real backend API or vector database.
