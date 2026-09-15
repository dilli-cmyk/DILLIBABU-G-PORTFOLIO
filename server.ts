import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { portfolioStore } from './src/services/store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Simple Rate Limiter for Contact and AI Chat
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment before trying again.'
      });
      return;
    }

    record.count++;
    next();
  };
}

// Simple Admin Auth Middleware
const ADMIN_TOKEN_SECRET = process.env.JWT_SECRET || 'dillibabu_secret_jwt_key_2026';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin_dillibabu_2026';

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized: Admin authentication required.' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (token !== `admin-session-${ADMIN_TOKEN_SECRET}`) {
    res.status(403).json({ success: false, message: 'Forbidden: Invalid admin token.' });
    return;
  }
  next();
}

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn('Gemini AI initialization warning:', err);
  }
}

// ==================== REST API ROUTES ==================== //

// 1. Profile API
app.get('/api/profile', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: portfolioStore.getProfile()
  });
});

app.put('/api/profile', requireAdmin, (req: Request, res: Response) => {
  const updated = portfolioStore.updateProfile(req.body);
  res.json({
    success: true,
    message: 'Profile updated successfully.',
    data: updated
  });
});

// 2. Skills API
app.get('/api/skills', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: portfolioStore.getSkills()
  });
});

app.post('/api/skills', requireAdmin, (req: Request, res: Response) => {
  const { name, category, description, level, icon } = req.body;
  if (!name || !category) {
    res.status(400).json({ success: false, message: 'Skill name and category are required.' });
    return;
  }
  const newSkill = portfolioStore.addSkill({
    name,
    category,
    description: description || '',
    level: level || 'Proficient',
    icon: icon || 'Code'
  });
  res.status(201).json({
    success: true,
    message: 'Skill added successfully.',
    data: newSkill
  });
});

app.delete('/api/skills/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = portfolioStore.deleteSkill(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, message: 'Skill not found.' });
    return;
  }
  res.json({ success: true, message: 'Skill deleted successfully.' });
});

// 3. Projects API
app.get('/api/projects', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: portfolioStore.getProjects()
  });
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = portfolioStore.getProjectById(req.params.id);
  if (!project) {
    res.status(404).json({ success: false, message: 'Project not found.' });
    return;
  }
  res.json({
    success: true,
    data: project
  });
});

app.post('/api/projects', requireAdmin, (req: Request, res: Response) => {
  const { title, description, problem, solution, technologies, githubUrl, liveUrl, category, aiMlApproach, keyFeatures } = req.body;
  if (!title || !description) {
    res.status(400).json({ success: false, message: 'Title and description are required.' });
    return;
  }
  const newProject = portfolioStore.addProject({
    title,
    slug: req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description,
    problem: problem || 'Real-world AI / Software challenge',
    solution: solution || 'Built an end-to-end intelligent solution.',
    technologies: Array.isArray(technologies) ? technologies : ['Python', 'Machine Learning'],
    githubUrl: githubUrl || 'https://github.com/dilli-cmyk',
    liveUrl: liveUrl || 'https://github.com/dilli-cmyk',
    imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
    featured: req.body.featured || false,
    status: req.body.status || 'Completed',
    aiMlApproach: aiMlApproach || 'Machine learning model pipeline & feature engineering.',
    keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : ['Clean modular structure'],
    results: req.body.results || 'Demonstrated high evaluation metrics.',
    category: category || 'Machine Learning'
  });
  res.status(201).json({
    success: true,
    message: 'Project created successfully.',
    data: newProject
  });
});

app.put('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = portfolioStore.updateProject(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ success: false, message: 'Project not found.' });
    return;
  }
  res.json({
    success: true,
    message: 'Project updated successfully.',
    data: updated
  });
});

app.delete('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const deleted = portfolioStore.deleteProject(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, message: 'Project not found.' });
    return;
  }
  res.json({ success: true, message: 'Project deleted successfully.' });
});

// 4. Contact API
app.post('/api/contact', rateLimiter(5, 60000), (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.'
    });
    return;
  }

  // Basic email syntax check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
    return;
  }

  const newMsg = portfolioStore.addMessage({ name, email, subject, message });
  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been sent successfully to DILLIBABU G.',
    data: { id: newMsg.id, createdAt: newMsg.createdAt }
  });
});

app.get('/api/contact/messages', requireAdmin, (req: Request, res: Response) => {
  res.json({
    success: true,
    data: portfolioStore.getMessages()
  });
});

app.put('/api/contact/messages/:id', requireAdmin, (req: Request, res: Response) => {
  const msg = portfolioStore.markMessageRead(req.params.id);
  if (!msg) {
    res.status(404).json({ success: false, message: 'Message not found.' });
    return;
  }
  res.json({ success: true, data: msg });
});

// 5. Admin Authentication
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === ADMIN_PASS) {
    const token = `admin-session-${ADMIN_TOKEN_SECRET}`;
    res.json({
      success: true,
      token,
      message: 'Authenticated successfully as Admin.'
    });
    return;
  }
  res.status(401).json({
    success: false,
    message: 'Invalid password. Access denied.'
  });
});

app.get('/api/auth/me', requireAdmin, (req: Request, res: Response) => {
  res.json({
    success: true,
    user: { role: 'admin', name: 'DILLIBABU G (Admin)' }
  });
});

// 6. AI Assistant Chat API (AI LAB)
app.post('/api/ai/chat', rateLimiter(15, 60000), async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    res.status(400).json({ success: false, message: 'Prompt message is required.' });
    return;
  }

  const profile = portfolioStore.getProfile();
  const skills = portfolioStore.getSkills();
  const projects = portfolioStore.getProjects();

  const contextPrompt = `
You are DILLIBABU's AI Portfolio Assistant embedded in his 3D AI Engineering Website.
Your goal is to answer questions from recruiters, hiring managers, software companies, and visitors about DILLIBABU G.

PROFILE INFO:
- Name: ${profile.name}
- Role: ${profile.role}
- Degree: ${profile.degree} (BCA - Bachelor of Computer Applications)
- Primary Skills: Python, Machine Learning, Deep Learning, Natural Language Processing (NLP)
- Email: ${profile.email}
- Phone: ${profile.phone}
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- Location: ${profile.location}

SKILLS LIST:
${skills.map(s => `- ${s.name} (${s.category}): ${s.description}`).join('\n')}

PROJECTS:
${projects.map(p => `- ${p.title} [${p.category}]: ${p.description}. Tech: ${p.technologies.join(', ')}. GitHub: ${p.githubUrl}`).join('\n')}

GUIDELINES:
1. Always be professional, concise, direct, helpful, and recruiter-friendly.
2. Emphasize DILLIBABU's focus on Python, Machine Learning, Deep Learning, and NLP.
3. If asked about contact info, provide his email (${profile.email}) and phone (${profile.phone}) clearly.
4. Do NOT make up fake work experience or fake degrees. Stick to the facts provided.
5. Keep answers well-formatted with bullet points or brief paragraphs.
`;

  // Try Gemini API if key is present
  if (ai || process.env.GEMINI_API_KEY) {
    try {
      const activeAi = ai || new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const response = await activeAi.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: message,
        config: {
          systemInstruction: contextPrompt,
          temperature: 0.7
        }
      });

      const replyText = response.text || 'I am ready to help answer questions about DILLIBABU G!';
      res.json({
        success: true,
        response: replyText
      });
      return;
    } catch (err: any) {
      console.error('Gemini API call error:', err);
      // Fall through to smart fallback engine
    }
  }

  // Fallback Rule-Based Response Engine if Gemini API key is unavailable or fails
  const lowerMsg = message.toLowerCase();
  let fallbackReply = "";

  if (lowerMsg.includes('skill') || lowerMsg.includes('know') || lowerMsg.includes('tech')) {
    fallbackReply = `DILLIBABU G specializes in **Python, Machine Learning, Deep Learning, and Natural Language Processing (NLP)**. Key technical strengths include:\n\n` +
      `• **Programming:** Python, Data Structures, OOP\n` +
      `• **Machine Learning:** Scikit-Learn, Supervised Learning, Model Tuning, Evaluation\n` +
      `• **Deep Learning:** Neural Networks, PyTorch / TensorFlow basics, Layer Optimization\n` +
      `• **NLP:** Tokenization, TF-IDF, Sentiment Analysis, Text Classification (NLTK/SpaCy)`;
  } else if (lowerMsg.includes('project') || lowerMsg.includes('build') || lowerMsg.includes('portfolio')) {
    fallbackReply = `DILLIBABU G has built several AI and ML projects including:\n\n` +
      `1. **NLP Text Sentiment & Classifier Laboratory:** Tokenization, TF-IDF, and Naive Bayes sentiment analysis.\n` +
      `2. **Predictive Analytics & ML Model Suite:** Supervised regression & classification benchmark suite.\n` +
      `3. **Deep Learning Neural Network Classifier:** Multi-layer perceptron built in PyTorch with loss curve visualizations.\n` +
      `4. **AI Engineer Assistant & Portfolio Hub:** Full-stack 3D workspace with REST APIs and Gemini AI integration.`;
  } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('reach') || lowerMsg.includes('hire')) {
    fallbackReply = `You can contact **DILLIBABU G** directly via:\n\n` +
      `• **Email:** [dillibabu2618@gmail.com](mailto:dillibabu2618@gmail.com)\n` +
      `• **Phone:** +91 7539949771\n` +
      `• **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/dillibabu-g-395a90291/)\n` +
      `• **GitHub:** [GitHub Repositories](https://github.com/dilli-cmyk)`;
  } else if (lowerMsg.includes('education') || lowerMsg.includes('degree') || lowerMsg.includes('college') || lowerMsg.includes('bca')) {
    fallbackReply = `DILLIBABU G is pursuing his **BCA (Bachelor of Computer Applications)** degree, focusing on core Computer Science, Data Structures, Algorithms, and specialized self-directed learning in AI, Machine Learning, Deep Learning, and NLP.`;
  } else {
    fallbackReply = `DILLIBABU G is an **Aspiring AI Engineer** specializing in **Python, Machine Learning, Deep Learning, and NLP**.\n\n` +
      `He builds practical AI solutions and is eager to contribute to AI/ML internships, fresher roles, and software engineering teams. Feel free to ask about his skills, projects, degree, or contact info!`;
  }

  res.json({
    success: true,
    response: fallbackReply
  });
});

// 7. Resume Download API Endpoint
app.get('/api/resume', (req: Request, res: Response) => {
  const profile = portfolioStore.getProfile();
  const skills = portfolioStore.getSkills();
  const projects = portfolioStore.getProjects();

  const resumeText = `
================================================================================
                           ${profile.name.toUpperCase()}
                        ${profile.role.toUpperCase()}
================================================================================
Degree:   ${profile.degree}
Email:    ${profile.email}
Phone:    ${profile.phone}
LinkedIn: ${profile.linkedin}
GitHub:   ${profile.github}
Location: ${profile.location}

--------------------------------------------------------------------------------
SUMMARY
--------------------------------------------------------------------------------
${profile.supportingText}
${profile.bio}

--------------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------------
${skills.map(s => `• ${s.name} (${s.category}): ${s.description}`).join('\n')}

--------------------------------------------------------------------------------
FEATURED PROJECTS
--------------------------------------------------------------------------------
${projects.map(p => `
* ${p.title.toUpperCase()}
  Category:     ${p.category}
  Tech Stack:   ${p.technologies.join(', ')}
  GitHub:       ${p.githubUrl}
  Problem:      ${p.problem}
  Solution:     ${p.solution}
  AI/ML Method: ${p.aiMlApproach}
`).join('\n')}

--------------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------------
Degree: BCA (Bachelor of Computer Applications)
Focus:  Computer Science, Data Structures, Python, Machine Learning, Deep Learning & NLP
================================================================================
  `;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="DILLIBABU_G_AI_Engineer_Resume.txt"');
  res.send(resumeText);
});

// 8. Interactive API Documentation (/api/docs)
app.get('/api/docs', (req: Request, res: Response) => {
  const docsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DILLIBABU G | Portfolio REST API Specs</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; background: #0b0f19; color: #e2e8f0; }
    h1 { color: #38bdf8; border-bottom: 2px solid #1e293b; padding-bottom: 0.5rem; }
    .endpoint { background: #1e293b; padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 4px solid #38bdf8; }
    .method { font-weight: bold; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; margin-right: 8px; display: inline-block; }
    .get { background: #0284c7; color: white; }
    .post { background: #16a34a; color: white; }
    .put { background: #ca8a04; color: white; }
    .delete { background: #dc2626; color: white; }
    pre { background: #0f172a; padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>⚡ DILLIBABU G - Portfolio REST API Documentation</h1>
  <p>Production OpenAPI Specification and Live REST API endpoints powering the 3D AI Engineering Portfolio.</p>

  <div class="endpoint">
    <h3><span class="method get">GET</span> /api/profile</h3>
    <p>Retrieve DILLIBABU G's profile information.</p>
    <pre>Response: { "success": true, "data": { "name": "DILLIBABU G", "role": "Aspiring AI Engineer", ... } }</pre>
  </div>

  <div class="endpoint">
    <h3><span class="method get">GET</span> /api/skills</h3>
    <p>Get categorized list of AI, ML, Deep Learning & Python skills.</p>
  </div>

  <div class="endpoint">
    <h3><span class="method get">GET</span> /api/projects</h3>
    <p>Fetch all AI/ML portfolio projects with detailed metadata.</p>
  </div>

  <div class="endpoint">
    <h3><span class="method post">POST</span> /api/contact</h3>
    <p>Submit contact inquiry form directly to database.</p>
    <pre>Payload: { "name": "Recruiter", "email": "test@example.com", "subject": "Hiring", "message": "Hello!" }</pre>
  </div>

  <div class="endpoint">
    <h3><span class="method post">POST</span> /api/ai/chat</h3>
    <p>Interactive AI Assistant API powered server-side by Gemini 3.6 Flash.</p>
    <pre>Payload: { "message": "What skills does DILLIBABU have?" }</pre>
  </div>

  <div class="endpoint">
    <h3><span class="method post">POST</span> /api/auth/login</h3>
    <p>Authenticate for Admin Dashboard capabilities.</p>
  </div>

  <div class="endpoint">
    <h3><span class="method get">GET</span> /api/resume</h3>
    <p>Download generated formatted Resume text/document.</p>
  </div>
</body>
</html>
  `;
  res.send(docsHtml);
});

// ==================== VITE & STATIC FILES ==================== //
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
