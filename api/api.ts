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
      const response = await api.get('/categorias?populate=*');
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.data.map((item: any) => ({
          id: item.documentId,
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
      const response = await api.get('/acampantes?populate=*');
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.data.map((item: any) => ({
          id: item.documentId,
          name: item.Nombre,
        })) || []
      );
    } catch (error) {
      console.error('Error fetching voters:', error);
      return [];
    }
  };

  static fetchCandidates = async (candidateType = CandidateType.ALL) => {
    try {
      let url = '/acampantes?populate=*&sort=Nombre:ASC';

      if (candidateType !== CandidateType.ALL) {
        url += `&filters[$and][0][Sexo][$eq]=${candidateType}`;
      }

      const response = await api.get(url);
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.data.map((item: any) => ({
          id: item.documentId,
          name: item.Nombre,
        })) || []
      );
    } catch (error) {
      console.error('Error fetching voters:', error);
      return [];
    }
  };
}

export default API;
