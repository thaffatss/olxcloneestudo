import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchArea, PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';


import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect (()=> {
        const getStates = async () => {
            const sList = await api.getStates();
            setStateList(sList);
        }
        getStates();
    }, []);

    useEffect (()=> {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect (()=> {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="type" name="q" placeholder="O que você procura?" />
                            <select name="state">
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link key={k} to="" className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,k) =>
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>
                    

                    <hr/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus ut sem nec pretium. Morbi ultricies eleifend diam in fermentum. Etiam finibus eget augue ut egestas. Morbi auctor fringilla nisl nec vehicula. Aliquam erat volutpat. Praesent tempus ipsum nec est viverra blandit. Suspendisse sed sagittis sapien. Quisque volutpat felis sodales pulvinar facilisis. Integer ultrices vitae libero id molestie. Praesent porttitor turpis sit amet nunc porttitor varius. Cras sit amet vestibulum erat. Pellentesque aliquam enim vel eleifend pellentesque. Integer a faucibus lectus, sed congue lectus. Duis erat velit, dapibus et velit et, bibendum iaculis massa.
                    </p>
                </PageArea>
            </PageContainer>
        </>
        
    );
}

export default Page;