import express from 'express';
import { LlamaModel, LlamaContext, LlamaChatSession, ChatPromptWrapper } from 'node-llama-cpp';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../database/db.js'; // Adjust the path as necessary

class ModenaMotorsChatPromptWrapper extends ChatPromptWrapper {
    wrapPrompt(prompt, {systemPrompt, promptIndex}) {
        const customSystemPrompt = "Eres el asistente virtual de Modena Motors, dedicado a ayudar a los usuarios a obtener información precisa sobre nuestros vehículos y servicios.";
        return `${customSystemPrompt}\nUSER: ${prompt}\nASSISTANT:`;
    }

    getStopStrings() {
        return ["USER:"];
    }

    getDefaultStopString() {
        return "USER:";
    }
}

const app = express();
const PORT = 3001;
const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelPath = path.join(__dirname, '..', 'capybarahermes-2.5-mistral-7b.Q4_K_M.gguf');

const model = new LlamaModel({ modelPath });
const context = new LlamaContext({ model });
const session = new LlamaChatSession({
    context,
    promptWrapper: new ModenaMotorsChatPromptWrapper()
});

async function fetchDatabaseInfo(prompt) {
    const keywords = prompt.toLowerCase().split(" ");
    let info = "";

    if (keywords.includes("marcas") || keywords.includes("marca")) {
        info += await fetchFromDatabase('SELECT name FROM brands', 'marcas disponibles: ', true);
    }
    if (keywords.includes("categoria") || keywords.includes("categorías") || keywords.includes("categorias")) {
        info += await fetchFromDatabase('SELECT name FROM categories', 'categorías disponibles: ', true);
    }
    if (keywords.includes("vehículos") || keywords.includes("vehiculos") || keywords.includes("modelos") || keywords.includes("modelo") || keywords.includes("autos") || keywords.includes("coches") || keywords.includes("vehiculo")  || keywords.includes("vehículo")) {
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
                items = items.slice(0, 3); // Limitar a los primeros tres elementos
                items.push('y otros...');
            }
            resolve(items.length > 0 ? `${prefix} ${items.join(", ")}. ` : "");
        });
    });
}

router.post('/', async (req, res) => {
    console.log('Chat request received:', req.body);
    const { prompt } = req.body;
    try {
        const dbInfo = await fetchDatabaseInfo(prompt);
        const fullPrompt = `${dbInfo}\nUSER: ${prompt}\nASSISTANT:`;
        console.log('Full prompt:', fullPrompt);
        const response = await session.prompt(fullPrompt);
        res.json({ reply: response });
    } catch (error) {
        console.error('Error during chat session:', error);
        res.status(500).json({ error: 'Failed to process the chat request.' });
    }
});

app.use('/api/chatbot', router);

app.listen(PORT, () => {
    console.log(`Chatbot server running on http://localhost:${PORT}`);
});

export default router;
