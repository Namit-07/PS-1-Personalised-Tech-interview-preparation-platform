require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  console.log('Testing Gemini API...');
  console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
  console.log('API Key (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10));
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ No Gemini API key found!');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try different model names
    const modelsToTry = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-flash-latest'
    ];
    
    console.log('\nTrying different model names...\n');
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`Testing: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Say hello in one sentence');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ SUCCESS with ${modelName}!`);
        console.log(`Response: ${text}\n`);
        console.log(`\n🎯 Use this model name in your code: "${modelName}"\n`);
        return;
      } catch (e) {
        console.log(`❌ ${modelName} failed`);
        console.log(`   Error: ${e.message}`);
        if (e.status) console.log(`   Status: ${e.status}`);
        console.log('');
      }
    }

    console.error('❌ All model attempts failed. Your API key might be invalid or expired.');
    console.log('\n💡 Get a new FREE API key from: https://aistudio.google.com/app/apikey');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testGemini();
