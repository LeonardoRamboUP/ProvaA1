import { Comentario } from '../types/interfaces';

interface Props {
  comentarios: Comentario[];
  onDelete?: (id: number) => void;
  usuarioLogadoId?: number;
}

export default function ComentarioList({ comentarios, onDelete, usuarioLogadoId }: Props) {
  return (
    <div>
      <h3>Comentários</h3>
      {comentarios.length === 0 && <p>Nenhum comentário ainda.</p>}
      <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.comentarioId} style={{ marginBottom: 12 }}>
            <div>
              <strong>{comentario.usuario?.email ?? 'Anônimo'}</strong> em{' '}
              {new Date(comentario.data).toLocaleString()}
            </div>
            <div>{comentario.texto}</div>
            {onDelete && usuarioLogadoId === comentario.usuario?.usuarioId && (
              <button onClick={() => onDelete(comentario.comentarioId)}>Excluir</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}