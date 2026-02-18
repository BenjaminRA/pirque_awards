import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY || ''}`,
  },
});

export enum CandidateType {
  ALL = 'All',
  HOMBRES = 'Hombre',
  MUJERES = 'Mujer',
}

class API {
  static fetchCategories = async () => {
    try {
      const response = await api.get(
        '/categorias?populate=*&sort=createdAt:ASC',
      );
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.data.map((item: any) => ({
          id: item.id,
          title: item.titulo,
          image: `${API_URL.replace('/api', '')}${item.imagen.url}`,
          candidateType: item.candidateType as CandidateType,
        })) || []
      );
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  static fetchVoters = async () => {
    try {
      const response = await api.get(
        '/acampantes?populate=*&sort=nombre:ASC&filters[$and][0][voto][$eq]=false',
      );
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.data.map((item: any) => ({
          id: item.id,
          name: item.nombre,
        })) || []
      );
    } catch (error) {
      console.error('Error fetching voters:', error);
      return [];
    }
  };

  static fetchCandidates = async (candidateType = CandidateType.ALL) => {
    try {
      let url = '/acampantes?populate=*&sort=nombre:ASC';

      if (candidateType !== CandidateType.ALL) {
        url += `&filters[$and][0][sexo][$eq]=${candidateType}`;
      }

      const response = await api.get(url);
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.data.map((item: any) => ({
          id: item.id,
          name: item.nombre,
        })) || []
      );
    } catch (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
  };

  static submitVote = async (
    voterId: number,
    votes: { categoryId: number; candidateId: number }[],
  ) => {
    try {
      const response = await api.post('/voto/submit-voto', {
        voterId,
        votes,
      });

      return response;
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };
}

export default API;
