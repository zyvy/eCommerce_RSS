import styles from './ProfileCards.module.css';
import SergK from '../../assets/1.jpg';
import SergT from '../../assets/2.jpg';
import VitaZ from '../../assets/3.jpg';
import RsLogo from '../../assets/rs_school_js.svg';
function ProfileCards() {
  return (
    <div className={styles.about_wrapper}>
      <div className={styles.about_intro}>
        <h1>Team CodeRunners42</h1>
        <p>
          We are a dedicated team of three students currently enrolled in a Front End Developer course.
          <br />
          Our journey has been filled with challenges and nonsleep nights, but our determination and passion drive us
          forward every day.
          <br />
          Despite the difficulties, we are constantly learning and improving our skills, eager to tackle any obstacle
          that comes our way. <br />
          Our motivation is fueled by a shared vision of becoming proficient developers, and we are committed to giving
          our best efforts to achieve our goals. Together, we strive to turn our aspirations into reality, one line of
          code at a time.
        </p>
      </div>
      <div className={styles.profile_card}>
        <img src={VitaZ} className={styles.profile_image} />
        <h2 className="profile-name">Vitali Zabairachny</h2>
        <h3 className="profile-name">Team leader</h3>
        <h4>Significant contributions: team motivation, user experience enhancement and wireframing.</h4>
        <a href="https://github.com/zyvy" className={styles.profile_github} target="_blank">
          GitHub Link
        </a>
        <p className={styles.profile_description}>Never think I can do it</p>User experience enhancement and
        wireframing.
      </div>
      <div className={styles.profile_card}>
        <img src={SergK} className={styles.profile_image} />
        <h2 className="profile-name">Sergey Kruglov</h2>
        <h3 className="profile-name">Front End Programmer</h3>
        <h4>Significant contributions: UI design and implementation.</h4>
        <a href="https://github.com/serega3526" className={styles.profile_github} target="_blank">
          GitHub Link
        </a>
        <p className={styles.profile_description}>
          I am a novice developer. I'm learning fast. Now I work as a marketer, but in the future I want to change my
          profession.
        </p>
      </div>
      <div className={styles.profile_card}>
        <img src={SergT} className={styles.profile_image} />
        <h2 className="profile-name">Sergey Terebinov</h2>
        <h3 className="profile-name">Front End Programmer</h3>
        <h4>Significant contributions: API hacker and Context provider</h4>
        <a href="https://github.com/terebinovsergey" className={styles.profile_github} target="_blank">
          GitHub Link
        </a>
        <p className={styles.profile_description}>
          I like learning to program. I want to become a frontend developer, so I study this profession. I really enjoy
          learning and learning new things!
        </p>
      </div>
      <div className={styles.rs_logo}>
        <a href="https://rs.school/" target="_blank">
          <img src={RsLogo} alt="RS School Logo" />
        </a>
      </div>
    </div>
  );
}

export default ProfileCards;
