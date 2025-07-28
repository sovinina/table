import { useEffect, useState } from 'react';
import styles from './Table.module.css';
import { User } from '../User/User'
import { PageCountSelect } from '../PageCountSelect/PageCountSelect';
import { Pagination } from '../Pagination/Pagination';
import { Filter } from '../Filter/Filter';
import { THs } from '../TableHeads/TableHeads';

const tableHeads = [
    'lastName',
    'firstName',
    'maidenName',
    'age',
    'gender',
    'phone',
    'email',
    'country',
    'city'
]

const headers = {
    lastName: "Фамилия",
    firstName: "Имя",
    maidenName: "Отчество",
    age: "Возраст",
    gender: "Пол",
    phone: "Номер телефона",
    email: "Email",
    country: "Страна",
    city: "Город"
  };

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
    const [columnWidth, setColumnWidths] = useState({
        lastName: 100,
        firstName: 100,
        maidenName: 100,
        age: 80,
        gender: 80,
        phone: 150,
        email:200,
        country:100,
        city: 100
    })

    const handleRowClick = (userData) => {
        setUser(userData);
        setModal(true);
    }

    const onMouseDown = (e, columnKey) => {
        const startX = e.clientX;
        const startWidth = columnWidth[columnKey];

        const onMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newWidth = Math.max(50, startWidth + deltaX);
            setColumnWidths(prev => ({
                ...prev,
                [columnKey]: newWidth
            }))
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
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
            
            {isModalOpen && <User user={user} onClose={() => setModal(false)} />}
            <table className={styles.table}>
                <thead>
                    <tr>
                        {tableHeads.map(key => 
                            <THs 
                                key={key}
                                columnKey={key} 
                                text={headers[key]} 
                                columnWidth={columnWidth} 
                                setOrder={setOrder} 
                                setSortBy={setSortBy} 
                                sortBy={sortBy} 
                                order={order}
                                onMouseDown={onMouseDown}
                            />

                        )}
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