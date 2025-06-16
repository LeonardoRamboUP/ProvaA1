import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import ComentarioList from '../../components/ComentarioList';
import ComentarioForm from '../../components/ComentarioForm';
import { Comentario } from '../../types/interfaces';

export default function ItemDetalhe() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<any>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [usuario, setUsuario] = useState<any>(null);

  // Busca item
  useEffect(() => {
    if (id) {
      api.get(`/item/listar`).then(res => {
        const data = res.data as any[];
        const encontrado = data.find((i: any) => i.itemId == id);
        setItem(encontrado);
      });
      api.get(`/comentario/item/${id}/comentarios`).then(res => setComentarios(res.data as Comentario[]));
      const usuarioSalvo = localStorage.getItem('usuario');
      if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));
    }
  }, [id]);

  // Adiciona novo comentário
  const handleNovoComentario = async (texto: string) => {
    await api.post('/comentario/cadastrar', { texto, itemId: id });
    const res = await api.get(`/comentario/item/${id}/comentarios`);
    setComentarios(res.data as Comentario[]);
  };

  // Exclui comentário
  const handleExcluirComentario = async (comentarioId: number) => {
    await api.delete(`/comentario/comentario/${comentarioId}`);
    setComentarios(comentarios.filter(c => c.comentarioId !== comentarioId));
  };

  if (!item) return <div>Carregando...</div>;

  return (
    <div>
      <h2>{item.nome}</h2>
      <p>Categoria: {item.categoria?.nome}</p>
      <hr />
      <ComentarioForm id={Number(id)} onSubmit={handleNovoComentario} />
      <ComentarioList
        comentarios={comentarios}
        onDelete={handleExcluirComentario}
        usuarioLogadoId={usuario?.usuarioId}
      />
    </div>
  );
}
