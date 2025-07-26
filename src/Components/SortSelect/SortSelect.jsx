import styles from './SortSelect.module.css'

export const SortSelect = ({ elName, setSortBy, setOrder, value }) => {
    const handleSort = (field, orderVal) => {
        if (orderVal === 'def'){
            setSortBy(null);
            setOrder(orderVal);
        }
        else {
            setSortBy(field);
            setOrder(orderVal)
        }
    }
    return(
        <div className={styles.selectWrapper}>
            <select
                value = {value}
                onChange={e => handleSort(elName, e.target.value)}
            >
                <option value="def">Без сортировки</option>
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
            </select>
        </div>
        
    )
}