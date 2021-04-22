import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptPT from 'date-fns/locale/pt'

export function Header(){
  const currentDate = format(new Date(),'EEEEEE, d MMMM',{
      locale: ptPT,
  });

  return(
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr"/>
      <p>O melhor para tu ouvires.</p>
      <span>{currentDate}</span>
    </header>
  );
}