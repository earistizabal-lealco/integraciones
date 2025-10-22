import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInput, endpointsContext } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `Eres un asistente especializado en la API de Leal, un sistema de puntos de lealtad. 

ENDPOINTS DISPONIBLES:
${JSON.stringify(endpointsContext, null, 2)}

Tu trabajo es interpretar la intención del usuario y generar una guía técnica paso a paso que incluya SOLO los endpoints disponibles en la documentación.

INSTRUCCIONES:
1. Analiza la intención del usuario
2. Identifica qué endpoints son necesarios y en qué orden
3. Genera una respuesta en formato JSON con esta estructura:
{
  "title": "Título descriptivo del flujo",
  "description": "Descripción general del proceso",
  "steps": [
    {
      "step": 1,
      "title": "Nombre del paso",
      "endpoint": "endpoint exacto",
      "method": "GET|POST|PUT|DELETE",
      "description": "Qué hace este paso",
      "parameters": ["parámetro1", "parámetro2"],
      "purpose": "Por qué es necesario este paso"
    }
  ]
}

REGLAS IMPORTANTES:
- Solo usa endpoints que existen en la documentación
- Ordena los pasos lógicamente (ej: autenticación primero)
- Incluye parámetros relevantes para cada endpoint
- Explica el propósito de cada paso
- Si no hay endpoints suficientes para cumplir la solicitud, indícalo en la descripción`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error de OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const flowJson = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(flowJson), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-flow function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});