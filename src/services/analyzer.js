// API key is loaded from .env (VITE_OPENAI_API_KEY) or from in-app settings modal
const DEFAULT_OPENAI_KEY = '';

// OpenAI vision model to use
const OPENAI_MODEL = 'gpt-4o';

const ANALYSIS_PROMPT = `You are Agrivision, a genuine computer vision botanical plant pathologist.
Examine this image with extreme care.

STEP 1 — VALIDATION
Decide whether the image genuinely shows a crop leaf, plant foliage, or botanical vegetation.
If the image is a human face, selfie, person, animal, vehicle, indoor scene, food dish, document, screenshot, meme, or any non-plant subject, you MUST set "isLeaf" to false and describe what you actually see. Never diagnose a plant disease on a non-plant image.

STEP 2 — DIAGNOSIS (only when isLeaf is true)
Identify the crop species (common + botanical name).
Assess chlorophyll health, chlorosis, necrotic spots, fungal lesions, powdery mildew, rust, blight, insect damage, or healthy vitality.
Set status to "healthy" or "unhealthy".

Respond ONLY with valid JSON matching this schema:

If the image is NOT a plant leaf:
{"isLeaf":false,"notLeafReason":"This is a [description], not a plant leaf. Please upload a clear photo of a crop leaf for diagnosis.","status":"invalid"}

If the image IS a plant leaf:
{"isLeaf":true,"notLeafReason":"","status":"healthy or unhealthy","crop":"Crop (Botanical name)","disease":"Disease name or None (Healthy Plant)","diseaseHi":"Hindi disease name","diseaseHinglish":"Hinglish disease name","confidence":95,"severity":"None/Mild/Moderate/Severe","visualObservations":"One-line description of what you see on the leaf surface.","recommendations":{"en":{"diagnosisSummary":"2-3 sentences.","immediateAction":["step1","step2"],"organicSolution":["neem/bio tip1","tip2"],"chemicalSolution":["fungicide dose1","dose2"],"wateringAndSoil":["water tip1","soil tip2"],"preventionTips":["prev1","prev2"]},"hi":{"diagnosisSummary":"हिंदी में 2-3 वाक्य।","immediateAction":["कदम 1","कदम 2"],"organicSolution":["नीम उपाय 1","उपाय 2"],"chemicalSolution":["दवा 1","दवा 2"],"wateringAndSoil":["सिंचाई 1","मिट्टी 2"],"preventionTips":["बचाव 1","बचाव 2"]},"hinglish":{"diagnosisSummary":"Hinglish mein 2-3 lines.","immediateAction":["Step 1","Step 2"],"organicSolution":["Neem spray 1","Tip 2"],"chemicalSolution":["Spray dose 1","Dose 2"],"wateringAndSoil":["Paani tip 1","Mitti tip 2"],"preventionTips":["Bachav 1","Tip 2"]}}}`;

/**
 * Calls OpenAI GPT-4o Vision with the leaf image.
 * Returns parsed JSON result or throws on failure.
 */
async function callOpenAIVision(base64Data, mimeType, apiKey) {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  // 30-second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  let resp;
  try {
    resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: ANALYSIS_PROMPT },
              {
                type: 'image_url',
                image_url: { url: `data:${mimeType};base64,${base64Data}`, detail: 'high' }
              }
            ]
          }
        ],
        temperature: 0.15,
        response_format: { type: 'json_object' },
        max_tokens: 1500,
      })
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    throw new Error(`OpenAI HTTP ${resp.status}: ${errBody.slice(0, 200)}`);
  }

  const json = await resp.json();
  const rawText = json.choices?.[0]?.message?.content;
  if (!rawText) {
    throw new Error('OpenAI returned empty content.');
  }

  const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleaned);
}

/**
 * Main entry point. Extracts base64 from the image source,
 * then calls OpenAI GPT-4o Vision for analysis.
 */
export async function analyzeLeaf(imageSrc) {
  const localKey = typeof localStorage !== 'undefined'
    ? localStorage.getItem('agrivision_openai_key')
    : null;
  const envKey = typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_OPENAI_API_KEY
    : null;
  const apiKey = (localKey || envKey || DEFAULT_OPENAI_KEY).trim();

  // Extract base64 and mime type
  let base64Data, mimeType = 'image/jpeg';
  if (imageSrc.startsWith('data:')) {
    const parts = imageSrc.split(',');
    mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    base64Data = parts[1];
  } else {
    // Fetch external URL and convert to base64
    const resp = await fetch(imageSrc);
    const blob = await resp.blob();
    mimeType = blob.type || 'image/jpeg';
    const arrayBuffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    base64Data = btoa(binary);
  }

  try {
    console.log(`[Agrivision] Calling OpenAI ${OPENAI_MODEL}...`);
    const result = await callOpenAIVision(base64Data, mimeType, apiKey);
    console.log(`[Agrivision] Success with OpenAI ${OPENAI_MODEL}`);
    return {
      ...result,
      imageUrl: imageSrc,
      source: `OpenAI ${OPENAI_MODEL} Vision`
    };
  } catch (err) {
    throw new Error(
      `OpenAI Vision analysis failed: ${err.message}. Please check your API key and try again.`
    );
  }
}
