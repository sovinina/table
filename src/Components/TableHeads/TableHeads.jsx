import styles from './TableHeads.module.css';
import { SortSelect } from '../SortSelect/SortSelect';

export const THs = ({ columnKey, text, columnWidth, setSortBy, setOrder, sortBy, order, onMouseDown }) => {
    const hasSortSelect = !['country', 'city', 'email'].includes(columnKey);
    return(
        <th
            style={{
                width: columnWidth[columnKey] + 'px',
                minWidth: '50px'
                }}
            >
            {text}
            {hasSortSelect && (
                <SortSelect 
                    elName={columnKey}
                    setSortBy={setSortBy} 
                    setOrder={setOrder} 
                    value = {sortBy === columnKey ? order : 'def'} 
                />
            )}
            <div 
                className={styles.resizer}
                onMouseDown={(e) => onMouseDown(e, columnKey)}
            >
                
            </div>
        </th>
    )
}