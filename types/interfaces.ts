export interface Usuario {
  usuarioId: number;
  email: string;
  criadoEm: string;
}

export interface Categoria {
  categoriaId: number;
  nome: string;
  criadoEm: string;
}

export interface Item {
  itemId: number;
  nome: string;
  categoriaId: number;
  categoria?: Categoria;
  criadoEm: string;
}

export interface Comentario {
  comentarioId: number;
  texto: string;
  itemId: number;
  data: string;
  usuario?: {
    usuarioId: number;
    email: string;
  };
}