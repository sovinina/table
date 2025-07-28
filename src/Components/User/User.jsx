import styles from './User.module.css';

const yearsSpelling = (age) => {
    const lastNumber = age % 10;
    switch(lastNumber){
        case 1:
            return `${age} год`;
        case 2:
        case 3:
        case 4:
            return `${age} года`;
        default:
            return `${age} лет`;
    }
}

export const User = ({ user, onClose }) => {

    return(
        <div 
            className={styles.back}
            onClick={() => onClose()}
        >
            <div 
                className={styles.userCard}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.userCardHeader}>
                    <p className={styles.name}>
                        {`${user.lastName} ${user.firstName} ${user.maidenName}`}
                    </p>

                    <button 
                        className={styles.closeBtn} 
                        onClick={() => onClose()}
                    >
                        <svg width="24" height="24" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.59966 2.59966C6.06596 -0.866635 11.686 -0.866474 15.1524 2.59966L43.5108 30.9581L71.7852 2.68365C75.2515 -0.782689 80.8716 -0.782605 84.3379 2.68365C87.8043 6.15003 87.8043 11.77 84.3379 15.2364L56.0635 43.5108L84.3165 71.7637C87.7828 75.2301 87.7828 80.8501 84.3165 84.3165C80.8501 87.7828 75.2301 87.7828 71.7637 84.3165L43.5108 56.0635L15.1749 84.4004C11.7085 87.8668 6.08753 87.8668 2.62115 84.4004C-0.844983 80.9342 -0.844819 75.3141 2.62115 71.8477L30.9581 43.5108L2.59966 15.1524C-0.866475 11.686 -0.866635 6.06596 2.59966 2.59966Z"/>
                        </svg>

                    </button>
                </div>

                <div className={styles.userData}>
                    <div className={styles.biometric}>
                        <img src={user.image} alt={`Фото пользователя ${user.lastName} ${user.firstName} ${user.maidenName}`} />
                        <div>
                            <p>Возраст: {yearsSpelling(user.age)}</p>
                            <p>Пол: {user.gender === 'male' ? 'мужской' : 'женский'}</p>
                            <p>Вес: {user.weight} кг</p>
                            <p>Рост: {Math.round(user.height)} см</p>
                        </div>
                        
                    </div>
                    <div className={styles.personal}>
                        <p className={styles.heading}>Email </p>
                        <p>{user.email}</p>
                        <p className={styles.heading}>Номер телефона</p>
                        <p>{user.phone}</p>
                        <p className={styles.heading}>Адрес </p>
                        <p>{user.address.country}, {user.address.state}, {user.address.city}, {user.address.address}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}