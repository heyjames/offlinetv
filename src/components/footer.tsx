import { THEMES } from '../models/themes';

export interface FooterProps {
  themeID: number,
  setThemeID: any
}

const Footer: React.SFC<FooterProps> = ({ themeID, setThemeID}) => {

  const aboutTitle: string = `I made this to quickly find Offline TV and \
related live streamers across platforms.`;

  return (
    <div className="footer">
      <span className="theme-label about" title={aboutTitle}>About</span>
      <span className="theme">
        <i
          className="fas fa-caret-left theme-back"
          onClick={() => setThemeID(themeID - 1)}
        >
        </i>

        <span
          className="theme-label"
          title={THEMES[themeID]?.remark}
        >
          {THEMES[themeID]?.label}
        </span>
        
        <i
          className="fas fa-caret-right theme-forward"
          onClick={() => setThemeID(themeID + 1)}
        >
        </i>
      </span>
    </div>
  );
}
 
export default Footer;