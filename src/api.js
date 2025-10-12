import axios from 'axios';

export const api = axios.create({
  baseURL: '/',
  timeout: 15000
});

api.interceptors.response.use(
  (res)=>res,
  (err)=>{
    return Promise.reject(err);
  }
);

export async function submitApplication(payload){
  // Mock submit endpoint
  await new Promise(r=>setTimeout(r, 1000));
  // In real app: return api.post('/api/submit', payload);
  return { data: { ok: true, id: Math.random().toString(36).slice(2) } };
}

export async function aiSuggest(prompt){
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  try {
    if(apiKey){
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{role:'user', content: prompt}],
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      const text = res.data.choices?.[0]?.message?.content?.trim() || '';
      return { ok: true, text };
    } else {
      // Fallback mock if no API key provided
      await new Promise(r=>setTimeout(r, 600));
      return { ok: true, text: 'This is a sample suggestion summarizing your situation in a clear, respectful tone. Provide concise details, relevant dates, and any documentation you have.' };
    }
  } catch (e){
    return { ok: false, error: e.message || 'AI error' };
  }
}