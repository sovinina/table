import styles from './PageCountSelect.module.css'

export const PageCountSelect = ({ setPage, setElemsOnPage }) =>{
    const handleElemsOnPage = (elems) => {
        setElemsOnPage(elems);
        setPage(1);
    }
    return(
        <label className={styles.elemsOnPageSelect}>
            Количество элементов на странице: 
            <select
                onChange={e => handleElemsOnPage(parseInt(e.target.value))}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </label>
        
    )
}