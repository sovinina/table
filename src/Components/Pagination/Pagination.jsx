import styles from './Pagination.module.css'

export const Pagination = ({ currPage, total, setPage }) =>{
    const handlePagination = (value) => {
        switch(value){
            case 'first':
                setPage(1);
                break;
            case 'prev':
                setPage(prevPage => prevPage - 1);
                break;
            case 'next':
                setPage(prevPage => prevPage + 1);
                break;
            case 'last':
                setPage(total);
                break;
        }
    }

    return(
        <div className={styles.pagination}>
            {currPage > 1 && (
                <>
                    <button onClick={() => handlePagination('first')}>
                        {`<`}
                    </button>
                    <button onClick={() => handlePagination('prev')}>
                        {currPage -1}
                    </button>
                </>
                
            )}
            
            <span>
                {currPage}
            </span>

            {currPage < total && (
                <>
                    <button onClick={() => handlePagination('next')}>
                        {currPage + 1}
                    </button>
                    <button onClick={() => handlePagination('last')}>
                        {`>`}
                    </button>
                </>
            )}     
        </div>
    )
}