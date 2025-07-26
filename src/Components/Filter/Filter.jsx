import styles from './Filter.module.css'

export const Filter = ({ setFilter }) => {
    const handleFilter = (e) => {
        if(e.target.value !== 'all')
            setFilter(e.target.value)
        else
            setFilter(null)
    }

    return(
        <div className={styles.filter}>
            <p>Фильтры</p>
            <div className={styles.radioBtns}>
                <p>Пол:</p>
                <label>
                    <input 
                        type="radio" 
                        name='gender' 
                        value='female' 
                        onChange={handleFilter}
                    />
                    Женский
                </label>
                <label>
                    <input 
                        type="radio" 
                        name='gender' 
                        value='male' 
                        onChange={handleFilter}
                    />
                    Мужской
                </label>
                <label>
                    <input 
                        type="radio" 
                        name='gender' 
                        value='all' 
                        onChange={handleFilter}
                    />
                    Без фильтрации
                </label>
            </div>
            
        </div>
    )
}