import { useEffect, useState } from 'react';
import styles from './Table.module.css';
import { User } from '../User/User'
import { PageCountSelect } from '../PageCountSelect/PageCountSelect';
import { Pagination } from '../Pagination/Pagination';
import { SortSelect } from '../SortSelect/SortSelect';
import { Filter } from '../Filter/Filter';

export const Table = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [sortBy, setSortBy] = useState(null);
    const [order, setOrder] = useState('def');

    const [filter, setFilter] = useState(null);

    const [isModalOpen, setModal] = useState(false);
    const [user, setUser] = useState(null);

    const [page, setPage] = useState(1);
    const [elemsOnPage, setElemsOnPage] = useState(5);
    const [totalPages, setTotalPages] = useState(null);

    const handleRowClick = (userData) => {
        setUser(userData);
        setModal(true);
    }

    useEffect(() => {
        async function fetchUsers(){
            setLoading(true);
            setError(null);
            let skip = (page - 1) * elemsOnPage;
            let URL = `https://dummyjson.com/users?&limit=${elemsOnPage}&skip=${skip}`;
            if(filter) 
                URL = `https://dummyjson.com/users/filter?key=gender&value=${filter}&limit=${elemsOnPage}&skip=${skip}`;
            if(sortBy && order !== 'def')
                URL += `&sortBy=${sortBy}&order=${order}`;
            
            try{
                const res = await fetch(URL);

                if(!res.ok){
                    throw new Error(`Ошибка ответа: ${res.status}`)
                }

                const json = await res.json();
                setData(json);
                setTotalPages(Math.ceil(json.total / elemsOnPage));
            }
            catch(e){
                setError(e.message);
            }
            finally{
                setLoading(false);
            }
        }
        
        fetchUsers();
        
    }, [sortBy, order, elemsOnPage, page, filter])

    return (
        <main>
            <Filter setFilter={setFilter} />
            <div className={styles.container}>
                <PageCountSelect setPage={setPage} setElemsOnPage={setElemsOnPage}  />
                {data && (
                    <p>Всего пользователей: {data.total}</p>
                )}
            </div>
            
            {isModalOpen && <User user={user} onClose={setModal} />}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            Фамилия
                            <SortSelect 
                                elName='lastName'
                                setSortBy={setSortBy} 
                                setOrder={setOrder} 
                                value = {sortBy === 'lastName' ? order : 'def'} 
                            />
                        </th>
                        <th>
                            Имя
                            <SortSelect 
                                elName='firstName' 
                                setSortBy={setSortBy} 
                                setOrder={setOrder} 
                                value = {sortBy === 'firstName' ? order : 'def'} 
                            />
                        </th>
                        <th>
                            Отчество
                            <SortSelect 
                                elName='maidenName' 
                                setSortBy={setSortBy} 
                                setOrder={setOrder} 
                                value = {sortBy === 'maidenName' ? order : 'def'} 
                            />
                        </th>
                        <th>
                            Возраст
                            <SortSelect 
                                elName='age' 
                                setSortBy={setSortBy} 
                                setOrder={setOrder}  
                                value = {sortBy === 'age' ? order : 'def'} 
                            />
                        </th>
                        <th>
                            Пол
                            <SortSelect 
                                elName='gender' 
                                setSortBy={setSortBy} 
                                setOrder={setOrder}  
                                value = {sortBy === 'gender' ? order : 'def'} 
                            />
                        </th>
                        <th>
                            Номер телефона
                            <SortSelect 
                                elName='phone' 
                                setSortBy={setSortBy} 
                                setOrder={setOrder}  
                                value = {sortBy === 'phone' ? order : 'def'} 
                            />
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Страна
                        </th>
                        <th>
                            Город
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {error ? 
                    (
                        <tr>
                            <td colSpan="9">Ошибка загрузки данных: {error}</td>
                        </tr>
                    )
                    : data && data.users.length > 0 ?
                        data.users.map(user => (
                            <tr className={styles.userTr} key={user.id} onClick={() => handleRowClick(user)}>
                                <td>{user.lastName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.maidenName}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.address.country}</td>
                                <td>{user.address.city}</td>
                            </tr>
                        ))
                        : !isLoading ?
                        (
                            <tr>
                                <td colSpan="9">Нет данных</td>
                            </tr>
                        )
                        : (
                            <tr>
                                <td colSpan="9">Загрузка...</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Pagination currPage={page} total={totalPages} setPage={setPage}/>
        </main>
    )
}