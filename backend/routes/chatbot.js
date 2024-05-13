import express from 'express';
import { LlamaModel, LlamaContext, LlamaChatSession, ChatPromptWrapper } from 'node-llama-cpp';
import path from 'path';
import { fileURLToPath } from 'url';

class ModenaMotorsChatPromptWrapper extends ChatPromptWrapper {
    wrapPrompt(prompt, {systemPrompt, promptIndex}) {
        // Simplificamos el systemPrompt para que sea más genérico y menos repetitivo
        const customSystemPrompt = "Eres el asistente virtual de Modena Motors, dedicado a ayudar a los usuarios a obtener información precisa sobre nuestros vehículos y servicios. Mantén siempre un tono respetuoso y profesional. Si no comprendes una pregunta o no tienes la información disponible, pide amablemente más detalles o sugiere alternativas útiles.";
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

const model = new LlamaModel({
    modelPath: modelPath
});
const context = new LlamaContext({ model });
const session = new LlamaChatSession({
    context,
    promptWrapper: new ModenaMotorsChatPromptWrapper()
});

router.post('/', async (req, res) => {
	console.log('Received chat request:', req.body);
  const { prompt } = req.body;
  try {
    const response = await session.prompt(prompt);
    res.json({ reply: response });
  } catch (error) {
    console.error('Error during chat session:', error);
    res.status(500).json({ error: 'Failed to process the chat request.' });
  }
});

export default router;
