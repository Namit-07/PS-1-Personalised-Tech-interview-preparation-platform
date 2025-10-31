'use client';

export default function ApiTestPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'NOT SET';
  
  const testConnection = async () => {
    try {
      const response = await fetch(`${apiUrl.replace('/api', '')}/`);
      const data = await response.json();
      alert(`Success! Backend responded: ${JSON.stringify(data)}`);
    } catch (error) {
      alert(`Failed to connect: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Configuration Test</h1>
      <p><strong>NEXT_PUBLIC_API_URL:</strong></p>
      <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        {apiUrl}
      </pre>
      
      <button 
        onClick={testConnection}
        style={{
          padding: '10px 20px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test Connection
      </button>

      <div style={{ marginTop: '30px' }}>
        <h2>Expected Values:</h2>
        <ul>
          <li><strong>Production:</strong> https://techprep-backend-6xs2.onrender.com/api</li>
          <li><strong>Development:</strong> http://localhost:5000/api</li>
        </ul>
      </div>

      <div style={{ marginTop: '30px', background: '#fff3cd', padding: '15px', borderRadius: '5px' }}>
        <h2>⚠️ If URL is wrong:</h2>
        <ol>
          <li>Go to Vercel Dashboard → Settings → Environment Variables</li>
          <li>Set NEXT_PUBLIC_API_URL = https://techprep-backend-6xs2.onrender.com/api</li>
          <li>Redeploy WITHOUT cache</li>
          <li>Refresh this page after deployment completes</li>
        </ol>
      </div>
    </div>
  );
}
