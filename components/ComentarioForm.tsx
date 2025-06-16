import { useState } from 'react';
import api from '../services/api'; // Certifique-se de que o caminho está correto

interface Props {
  id: number;
  onSubmit: (texto: string) => Promise<void>;
}

export default function ComentarioForm({ id, onSubmit }: Props) {
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.post(`/comentario/item/${id}/comentarios/cadastrar`, { texto });
    setTexto('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        required
        placeholder="Digite seu comentário"
        rows={3}
      />
      <br />
      <button type="submit" disabled={loading || !texto.trim()}>
        {loading ? 'Enviando...' : 'Comentar'}
      </button>
    </form>
  );
}