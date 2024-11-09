// src/components/DataFetcherWithForm.js
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axiosInstance from '@/utils/axios-util';

export default function DataFetcherWithForm() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
        let response;
        switch (method) {
            case 'GET':
                response = await axiosInstance.get(`http://localhost:3200/${url}`);
                setData(response.data);
                break;
            case 'POST':
                response = await axiosInstance.post(`http://localhost:3200/${url}`);
                setData(response.data);
                break;
            case 'PUT':
                response = await axiosInstance.put(`http://localhost:3200/${url}`);
                setData(response.data);
                break;
            case 'DELETE':
                response = await axiosInstance.delete(`http://localhost:3200/${url}`);
                setData(response.data);
                break;
            default:
                throw new Error('Invalid method');
        }
    } catch (err:AxiosError | any) {    
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Fetch Data from URL</h2>

      <form onSubmit={handleFetchData}>
        <Input
          type="text"
          placeholder="Enter API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)} required name="method" id="method">
            <option value="" disabled>Select request method</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
        </select>
        <Button type="submit">Fetch Data</Button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h3>Fetched Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
