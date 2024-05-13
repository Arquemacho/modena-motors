import express from 'express';
import { LlamaModel, LlamaContext, LlamaChatSession, ChatPromptWrapper } from 'node-llama-cpp';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../database/db.js'; // Adjust the path as necessary

class ModenaMotorsChatPromptWrapper extends ChatPromptWrapper {
    wrapPrompt(prompt, {systemPrompt, promptIndex}) {
        const customSystemPrompt = "You are an intelligent assistant for Modena Motors, dedicated to helping users gain accurate information about our vehicles and services. Maintain a respectful and professional tone at all times.";
        return `${customSystemPrompt}\nUSER: ${prompt}\nASSISTANT:`;
    }

    getStopStrings() {
        return ["USER:"];
    }

    getDefaultStopString() {
        return "USER:";
    }
}

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelPath = path.join(__dirname, '..', 'capybarahermes-2.5-mistral-7b.Q4_K_M.gguf');

// Global model and context initialization
let model = null;
let context = null;

async function initializeModel() {
    if (!model) {
        model = new LlamaModel({ modelPath });
        context = new LlamaContext({ model });
    }
}

async function fetchDatabaseInfo(prompt) {
    const keywords = prompt.toLowerCase().split(" ");
    let info = "";

    if (keywords.includes("marcas")) {
        info += await fetchFromDatabase('SELECT name FROM brands', 'marcas disponibles: ', true);
    }
    if (keywords.includes("categorias")) {
        info += await fetchFromDatabase('SELECT name FROM categories', 'categorías disponibles: ', true);
    }
    if (keywords.includes("vehiculos")) {
        info += await fetchFromDatabase('SELECT model FROM vehicles', 'modelos de vehículos: ', false);
    }

    return info;
}

async function fetchFromDatabase(sql, prefix, isListShortened) {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err.message);
                return;
            }
            let items = rows.map(row => row.name || row.model);
            if (isListShortened && items.length > 3) {
                items = items.slice(0, 3);
                items.push('y otros...');
            }
            resolve(items.length > 0 ? `${prefix} ${items.join(", ")}. ` : "");
        });
    });
}

router.post('/', async (req, res) => {
    console.log('Chat request received:', req.body);
    const { prompt } = req.body;
    await initializeModel(); // Ensure model is loaded and ready

    try {
        const dbInfo = await fetchDatabaseInfo(prompt);
        const fullPrompt = `${dbInfo}\nUSER: ${prompt}\nASSISTANT:`;
        const session = new LlamaChatSession({
            context,
            promptWrapper: new ModenaMotorsChatPromptWrapper()
        });
        const response = await session.prompt(fullPrompt);
        res.json({ reply: response });
    } catch (error) {
        console.error('Error during chat session:', error);
        res.status(500).json({ error: 'Failed to process the chat request.' });
    }
});

export default router;
