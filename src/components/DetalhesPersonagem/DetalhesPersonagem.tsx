import './DetalhesPersonagem.css';
import React, { useEffect, useState } from 'react';
import api from '../api/api.ts';

interface Comic {
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface DetalhesPersonagemProps {
  personagem: {
    id: string;
    name: string;
    description: string;
    comics: {
      items: Array<{
        resourceURI: string;
        name: string;
      }>;
    };
    stories: {
      available: number;
    };
    events: {
      available: number;
    };
    series: {
      available: number;
    };
    thumbnail: {
      path: string;
      extension: string;
    };
  };
  temaAtual: 'Dark' | 'Light';
}

const DetalhesPersonagem: React.FC<DetalhesPersonagemProps> = ({ personagem, temaAtual }) => {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const fetchComicDetails = async () => {
      const comicPromises = personagem.comics.items.map(async (comicItem) => {
        const comicId = comicItem.resourceURI.split('/').pop();
        try {
          const response = await api.get(`/comics/${comicId}`);
          return response.data.data.results[0];
        } catch (error) {
          console.error(`Erro ao buscar detalhes do quadrinho ${comicItem.name}:`, error);
          return null;
        }
      });

      const fetchedComics = await Promise.all(comicPromises);
      setComics(fetchedComics.filter(Boolean));
    };

    fetchComicDetails();
  }, [personagem.comics.items]);

  const themeClass = temaAtual === 'Dark' ? 'dark-theme' : 'light-theme';

  return (
    <div className={`detalhes-personagem ${themeClass}`}>
      <div className='container-left'>
        <div className='imagem-nome'>
          {personagem.thumbnail ? (
            <img
              src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`}
              alt={personagem.name}
              className={`imagem-detalhes ${temaAtual === "Dark" ? '' : " shadow-img"}`}
            />
          ) : (
            <p>Imagem indisponível</p>
          )}
          <div className='nome-e-infos'>
            <h2 className={`nome-personagemnome ${temaAtual === "Dark" ? " cor-branca-mobile" :" cor-branca-mobile"}`}>{personagem.name}</h2>
            {/* Exibição das informações (histórias, eventos, etc) */}
            <div className='container-info'>
            <p className={`info ${temaAtual === "Dark" ? " cor-branca-mobile" :" cor-branca-mobile"}`}>
              <span className='info-numero'>{personagem.stories.available}</span> <br />
              histórias
            </p>
            <p className={`info ${temaAtual === "Dark" ? " cor-branca-mobile" :" cor-branca-mobile"}`}>
              <span className='info-numero'>{personagem.events.available}</span> <br />
              eventos
            </p>
            <p className={`info ${temaAtual === "Dark" ? " cor-branca-mobile" :" cor-branca-mobile"}`}>
              <span className='info-numero'>{personagem.series.available}</span> <br />
              séries
            </p>
            <p className={`info ${temaAtual === "Dark" ? " cor-branca-mobile" :" cor-branca-mobile"}`}>
              <span className='info-numero'>{personagem.comics.items.length}</span> <br />
              quadrinhos
            </p>
            </div>
          </div>
        </div>
        <p className={`sem-descricao ${temaAtual === "Dark" ? " cor-branca-mobile" :" cor-branca-mobile"}`}>{personagem.description || "Sem descrição..."}</p>
      </div>
      {/* Lista de quadrinhos */}
      <div className='container-lista-commics'>
        <h3 className={`quadrinhos ${temaAtual === "Dark" ? " cor-branca-mobile" :" cor-branca-mobile"}`}>Quadrinhos</h3>
        <div className="lista-comics">
          {comics.length > 0 ? (
            comics.map((comic) => (
              <div key={comic.id} className="comic-item">
                <p className='commic-title' style={{color: `white`}}>{comic.title}</p>
                {comic.thumbnail ? (
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className="comic-image"
                  />
                ) : (
                  <p>Imagem indisponível</p>
                )}
              </div>
            ))
          ) : (
            <p>Sem quadrinhos disponíveis.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesPersonagem;
