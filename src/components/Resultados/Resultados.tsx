import "./Resultados.css"
import React, { useEffect, useState } from "react";
import api from "../api/api.ts";

interface ResponseData {
    id: string;
    name: string;
    description: string;
    commics: {
        items: {
            resourceURI: string;
            name: string;
        }
    };
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface ResultadosProps {
    searchQuery: string;
    onPersonagemClick: (personagem: ResponseData) => void;
    temaAtual: string;
}

const Resultados: React.FC<ResultadosProps> = (props) => {

    const [pesquisa, setPesquisa] = useState<ResponseData[]>([])

    useEffect(() => {
        if (props.searchQuery.trim() === "") return;
        
        api.get(`/characters?nameStartsWith=${props.searchQuery}&`)
        .then(response => {
            setPesquisa(response.data.data.results);
            console.log(response)
        })
        .catch(err => console.log(err));
    }, [props.searchQuery]);


    const corFundo = props.temaAtual === 'Dark' ? '#313140' : '#DFD3D2';
    const corTexto = props.temaAtual === 'Dark' ? 'white' : 'black';

    return (
        <div className="container-results">
            <section className="container-lista">
                {pesquisa.map(personagem => {
                    return (
                        <div key={personagem.id} className="lista-resultado">
                            <div 
                                className={"container-personagens" + (props.temaAtual === 'Dark' ? " cor-dark" : " cor-light bordar-light")}
                                style={{ backgroundColor: corFundo }}
                            >
                                <img 
                                    src={`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`} 
                                    alt={personagem.name} 
                                    className="imagem-resultado" 
                                />
                                <div className="texto-personagem" style={{ color: corTexto }}> 
                                    <span className="nome-personagem">{personagem.name}</span>
                                    <span className="descricao-personagem">{personagem.description ? personagem.description : "Sem descrição..."}</span>
                                </div>
                                <button className={"botao-personagem" + (props.temaAtual === 'Dark' ? " cor-dark" : " cor-light")}
                                    onClick={() => props.onPersonagemClick(personagem)}>
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    )
                })}
                
            </section>
        </div>
    )
}

export default Resultados;
