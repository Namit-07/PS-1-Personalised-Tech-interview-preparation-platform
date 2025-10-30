require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  console.log('Attempting to list available Gemini models...\n');
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ No Gemini API key found!');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to fetch available models using the REST API directly
    const fetch = (await import('node-fetch')).default;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    
    console.log('Fetching models list from Google AI...');
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error ${response.status}: ${response.statusText}`);
      console.error(`Details: ${errorText}`);
      
      if (response.status === 403 || response.status === 400) {
        console.log('\n⚠️  Your API key might not have the Generative Language API enabled.');
        console.log('\n📋 To fix this:');
        console.log('1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
        console.log('2. Select your project');
        console.log('3. Click "Enable API"');
        console.log('4. Wait a few minutes and try again');
      }
      return;
    }
    
    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      console.log(`\n✅ Found ${data.models.length} available models:\n`);
      data.models.forEach(model => {
        console.log(`  - ${model.name}`);
        if (model.displayName) console.log(`    Display Name: ${model.displayName}`);
        if (model.description) console.log(`    Description: ${model.description}`);
        console.log('');
      });
    } else {
      console.log('No models found or API key has no access.');
    }
    
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
    console.error('\nFull error:', error);
  }
}

listModels();
